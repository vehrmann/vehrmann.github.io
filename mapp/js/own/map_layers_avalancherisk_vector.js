let current_date =                  new Date();
let am_chosen, pm_chosen =          false;
let control_is_expanded =           false;
let opacity_overlay_avalancherisk = default_opacity_overlay_avalancherisk;
var input_date_visible = false;


// Function to find the region in a specific bulletin (=json-data)
function findRegionWithinBulletin(bulletin_json_data, target_region) {
    console.log("target_region", target_region)
    console.log("bulletin_json_data", bulletin_json_data)
    const bulletins = bulletin_json_data.bulletins;

    for (const bulletin of bulletins) {
        const regions = bulletin.regions;

        for (const region of regions) {
            if (region.regionID === target_region) {
                // Found the bulletin for the target region
                return bulletin;
            }
        }
    }

    // If no bulletin is found for the target region
    return null;
}

// Function to get a region bulletin with fallbacks
function getRegionData(url1, region, url2) {
    return checkURL(url1 + region + url2)
    .then(result => {
        if (result) {
            // Return the url if checkURL succeeded
            return url1 + region + url2;
        } else {
            if (region.length > 0) {
                // Modify url by removing the last char of the region string (changes region from e.g. DE-BY-51 to DE-BY-5 to DE-BY- to DE-BY, char by char so that e.g. SI4 is also covered)
                region = region.slice(0, -1);
                // Recursively try with the modified URL
                return getRegionData(url1, region, url2);
            } else {
                // If all attempts fail, return false
                return false;                
            }
        }
    });
}

// Function to find and read bulletin of a clicked region, read its avalanche problems and show them as icons in a popup
function setupPopup(layer, url_eaws_bulletins_date) {
    layer.bindPopup();

    layer.on('click', async function (event) {
        let properties = event.layer.properties;
        let region_url = properties.id;

        let region_name, country_name, popup_content
        // create popup content basics (in German)
        fetchJson('./eaws/micro-regions_names/de.json')
        .then(json_data => {
            region_name = json_data[region_url]
            country_name = json_data[region_url.substring(0, 2)]
            //let region_popup = region_url.replace(/-/g, '‑');      // replace regular - with non-breaking hyphen
            popup_content = `<div>
                                <p class="llb_popup_header"><strong>${region_name}</strong> (${country_name}) </p>
                                <p class="llb_popup_date">${getFormattedDatetime(current_date, 'de-DE', 'DD, dd.mm.yyyy')}</p>
                            </div>`
            console.log("region_url", region_url)
        })
        .catch(error => {
            //console.error(error)
        });

        // read specific bulletin and add icons to popup content
        let bulletin_url1 = `${url_eaws_bulletins}${url_eaws_bulletins_date}/${url_eaws_bulletins_date}-`
        let bulletin_url2 = `${slug_eaws_bulletin}.json`
        try {
            const valid_bulletin_url = await getRegionData(bulletin_url1, region_url, bulletin_url2);
            if (!valid_bulletin_url) {
                throw new Error('All attempts failed. No valid URL found.');
            }

            const response = await fetch(valid_bulletin_url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json_data = await response.json();
            const region_bulletin = findRegionWithinBulletin(json_data, region_url);
            if (region_bulletin) {
                const icon_list = region_bulletin.avalancheProblems.map(problem => {
                    let img = `<img src="./icons/avalancheproblems_${problem.problemType}_c.webp"
                                    alt="${problem.problemType}"
                                    class="llb_popup_icon">`;
                    return img;
                });
                popup_content = popup_content + icon_list.join('\n');
            } else {
                popup_content = popup_content + `<p>Kein Lawinenlagebericht vorhanden</p>`;
            }

        } catch (error) {
            //console.error(`Error during popup setup for region ${region_url}:`, error);
        }

        this.setPopupContent(popup_content);
        this.openPopup();
    });
}


function createAvalancheRiskMaps() {

    let url_eaws_bulletins_date = getFormattedDatetime(current_date, null, 'yyyy-mm-dd')

    // Create a list with bulletin-ratings.json-file-URLs from all regions
    const rating_urls = url_eaws_bulletins_regions.map(region => {
        const rating_url = `${url_eaws_bulletins}${url_eaws_bulletins_date}/${url_eaws_bulletins_date}-${region}${slug_eaws_ratings}.json`;
        return rating_url;
    });

    // Combine ratings of all regions into one json object
    let all_ratings = {
        maxDangerRatings: {}
    };

    // Map each URL to a fetch promise
    const fetchPromises = rating_urls.map(rating_url => {
        return fetch(rating_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            //console.error(`Error fetching JSON data from ${rating_url}:`, error);
            return null;            // Return null for failed requests
        });
    });

    // Wait for all fetch operations to complete
    Promise.all(fetchPromises)
    .then(dataArray => {
        if ( control_is_expanded ) {
            layer_control_avalancherisk.expand()
        }
        return dataArray;
    })
    .then(dataArray => {
        // Iterate through the array of fetched data and merge into all_ratings
        dataArray.forEach(data => {
            if (data && data.maxDangerRatings) {
                all_ratings.maxDangerRatings = {
                    ...all_ratings.maxDangerRatings,
                    ...data.maxDangerRatings
                };
            }
        });

        // Style function for the avalanche risk vector map layers
        function generateVectorTileStyles(properties, time_period) {
            let maxDangerRatings = all_ratings.maxDangerRatings;                    // json file
            let key;                                                                // pbf-map
            let danger_rating;

            if ( properties.end_date < url_eaws_bulletins_date                      // old regions, consider them for historic bulletins!
                || properties.id.startsWith('IT-MeteoMont') ) {                     // hide all IT-MeteoMont-regions as they cover other (more important) IT-regions from other bulletins
                return {
                    stroke:         false,
                    fill:           false
                };

            } else if ( ['PL-1', 'PL-2', 'PL-3'].includes(properties.id) && properties.elevation == 'low_high' ) {
                // insert '-0' after 'PL'
                let [country_code, region_id] = properties.id.split('-')
                key = `${country_code}-0${region_id}:${time_period}`

            } else if (properties.elevation == 'low_high') {                        // for some regions, elevation is not distinguished and low_high are covered in one rating
                key = `${properties.id}:${time_period}`

            } else {                                                                // for some regions, elevation is distinguished and low / high are covered in individual ratings
                key = `${properties.id}:${properties.elevation}:${time_period}`
            }


            // Check if the ID and elevation combination exists in the JSON data
            if (maxDangerRatings.hasOwnProperty( key )) {
                danger_rating = maxDangerRatings[key];

                return {
                    stroke:         true,
                    color:          'gray',
                    weight:         1,
                    //dashArray:      null,
                    //dashOffset:     null,
                    opacity:        0.5,

                    fill:           true,
                    fillColor:      colors_avalancherisk[danger_rating],
                    fillOpacity:    fill_opacity_avalancherisk,
                    //fillRule:       "evenodd"
                };
            } else {
                // Default style for other features
                return {
                    stroke:         true,
                    color:          'gray',
                    weight:         1,
                    //dashArray:      null,
                    //dashOffset:     null,
                    opacity:        0.5,

                    fill:           true,
                    fillColor:      'gray',//colors_avalancherisk[0],
                    fillOpacity:    fill_opacity_avalancherisk,
                    //fillRule:       "evenodd"
                };
            }
        }


        // Create a partial function with the time period parameter
        let generateStyles = time_period => properties => generateVectorTileStyles(properties, time_period);

        let createAvalancheRiskLayer = (overlay, time_period, overlay_is_chosen) => {

            // Options for the avalanche risk vector map layers
            let options_vectormap_eaws = {
                interactive:            overlay.interactive,
                maxNativeZoom:          overlay.maxNativeZoom,
                vectorTileLayerStyles:  {
                    'outline':                  { stroke: false, fill: false },
                    'micro-regions':            { stroke: false, fill: false },
                    'micro-regions_elevation':  generateStyles(time_period)
                },
                attribution:            overlay.attribution.replace('yyyy-mm-dd', url_eaws_bulletins_date)
            };

            let layer_vectormap_eaws = L.vectorGrid.protobuf(overlay.url, options_vectormap_eaws);

            // Add avalanche risk vector map layer to the map if it was already visible (needed when clicking through dates)
            if ( overlay_is_chosen ) {
                layer_vectormap_eaws.addTo(map);
            }
            // Add avalanche risk vector map layer to the respective control
            layer_control_avalancherisk.addOverlay(layer_vectormap_eaws, time_period === 'am' ? "Vormittag" : "Nachmittag");
            layer_vectormap_eaws.setOpacity(opacity_overlay_avalancherisk);

            return layer_vectormap_eaws
        };


        // Create avalanche risk vector map layers
        layer_vectormap_eaws_am = createAvalancheRiskLayer(overlay_avalancherisk_am, 'am', am_chosen);
        layer_vectormap_eaws_pm = createAvalancheRiskLayer(overlay_avalancherisk_pm, 'pm', pm_chosen);


        // Setup popups for each avalanche-risk layer to show more detailed information when a region is clicked
        setupPopup(layer_vectormap_eaws_am, url_eaws_bulletins_date);
        setupPopup(layer_vectormap_eaws_pm, url_eaws_bulletins_date);

        //xyz
        let microregion_layer, prev_region;

        layer_vectormap_eaws_am.on('mouseover', async function (event) {
            let properties = event.layer.properties;
            let region_url = properties.id;
            //console.log("hover region_url", region_url)

            if (region_url != prev_region) {
                // get geojson of specific microregion
                try {
                    console.log("region_url1", region_url)   //works
                    console.log(url_eaws_microregions, region_url, slug_eaws_microregions)
                    const valid_microregion_url = await getRegionData(url_eaws_microregions, region_url, slug_eaws_microregions);
                    if (!valid_microregion_url) {
                        throw new Error('All attempts failed. No valid URL found.');
                    }
                    console.log("region_url2", region_url)   //does not work
        
                    const response = await fetch(valid_microregion_url);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
        
                    const json_data_microregion = await response.json();
                    //console.log("feature.properties.id", feature.properties.id)
                    const microregion_geojson_geometry = json_data_microregion.features.find(feature => feature.properties.id === region_url);

                    // Remove existing microregion layer before creating and adding a new one
                    if (microregion_layer) {
                        map.removeLayer(microregion_layer);
                    }

                    microregion_layer = L.geoJSON(microregion_geojson_geometry, {
                        style: {
                            color: 'black',
                            weight: 2,
                            fill: false
                        }
                    });

                    microregion_layer.addTo(map);
                } catch (error) {
                    //console.error(error);
                }
            }
            prev_region = region_url
        });


        // Add header to the control group
        let group_headers = {
            ['Vormittag']:  {   'header':           'Lawinenlage',
                                'first_item':       true,
                                'opacity_slider':   true,
                                'default_opacity':  opacity_overlay_avalancherisk
                            }
        };

        let labels = document.querySelectorAll('.leaflet-control-layers-base label, .leaflet-control-layers-overlays label');
        addControlGroupHeaders(labels, group_headers);


        // Add event listeners to the datepicker arrows as well as when chosing date from datepicker calendar for changing the date of the data
        function handleDateChange(date_offset) {
            current_date.setDate(current_date.getDate() + date_offset);
            input_date.value = getFormattedDatetime(current_date, null, 'yyyy-mm-dd');

            //span_date.textContent = input_date.value //getFormattedDatetime(current_date, null, 'DD, dd.mm.yyyy');   //XXX
            span_date.textContent = getFormattedDatetime( new Date(input_date.value), null, 'DD, dd.mm.yyyy')       // set the new date     //XXX

            // save selection status  of the two layers
            am_chosen = checkboxes[0].checked;
            pm_chosen = checkboxes[1].checked;

            // when date was changed, the control must be open
            control_is_expanded = true;

            // remove layers with old date from the map
            map.removeLayer(layer_vectormap_eaws_am);
            map.removeLayer(layer_vectormap_eaws_pm);

            // remove layers with old date from the control
            layer_control_avalancherisk.removeLayer(layer_vectormap_eaws_am);
            layer_control_avalancherisk.removeLayer(layer_vectormap_eaws_pm);

            // create new layers
            createAvalancheRiskMaps();
        }

        // Needed for toggling am vs. pm and storing visibility when bulletin date is changed
        let checkboxes = document.querySelectorAll('.layer-control-avalancherisk input[type="checkbox"]')

        // Create div + date span + arrows
        let div_date_control =  document.createElement('div');
        let input_date =        document.createElement('input');
        input_date.type =       'date'
        let span_date =         document.createElement('span');
        let span_leftarrow =    document.createElement('span');
        let span_rightarrow =   document.createElement('span');

        // Set the initial date and content for the date span
        input_date.value =              getFormattedDatetime(current_date, null, 'yyyy-mm-dd')
        //span_date.textContent =         input_date.value;   //XXX
        span_date.textContent =         getFormattedDatetime( new Date(input_date.value), null, 'DD, dd.mm.yyyy')   //XXX
        span_leftarrow.textContent =    '◄';
        span_rightarrow.textContent =   '►';
        input_date.className =          'avalancherisk_datepicker_input'
        span_date.className =           'avalancherisk_datepicker_span'
        span_leftarrow.className =      'avalancherisk_datepicker_arrow_left';
        span_rightarrow.className =     'avalancherisk_datepicker_arrow_right';

        span_leftarrow.addEventListener('click', function () {
            handleDateChange(-1);
        });

        span_rightarrow.addEventListener('click', function () {
            handleDateChange(1);
        });

        let input_date_visible = false;
        span_date.addEventListener('click', function () {
            if (input_date_visible) {
                input_date_visible = false
                //when clicked next to picker, next toggle needs to take place 2x
            } else {
                input_date.showPicker();                        // opens datepicker calendar
                input_date_visible = true
            }
        });

        input_date.addEventListener('change', function () {

            const date_components = span_date.textContent.split(', ')[1].split('.');
            const day =     parseInt(date_components[0], 10);
            const month =   parseInt(date_components[1], 10) - 1; // Months are zero-based in JavaScript
            const year =    parseInt(date_components[2], 10);

            let date_offset = ( new Date(input_date.value) - new Date(year, month, day) ) / (24*60*60*1000)    //XXX
            handleDateChange(date_offset)
        });

        // Append the spans to the date control container, input_date will be invisible and is only needed to show calendar when span_date is clicked
        div_date_control.append(span_leftarrow, span_date, input_date, span_rightarrow);

        // Insert the div_date_control after the header element
        let header_element = document.querySelector('.layer-control-avalancherisk .leaflet-control-layers-custom-header');
        header_element.insertAdjacentElement('afterend', div_date_control);

        // Ensures that only one checkbox is checked at a time: if both checkboxes are checked, click the other one so the respective avalancherisk-overlay is hidden
        checkboxes.forEach(this_checkbox => {
            this_checkbox.addEventListener('change', function () {
                let other_checkbox = Array.from(checkboxes).find(cb => cb !== this_checkbox);
                if ( other_checkbox.checked && this_checkbox.checked ) {
                    other_checkbox.click()
                    am_chosen = !am_chosen
                    pm_chosen = !pm_chosen
                }
            });
        });
    })
    .catch(error => {
        //console.error('Error fetching the JSON data:', error)
    });

}

createAvalancheRiskMaps()

/*
check PL
check SI (no hyphen?)
check Spitzbergen
*/
