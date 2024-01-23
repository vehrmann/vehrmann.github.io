let current_date = new Date();
let am_chosen, pm_chosen = false;
let control_is_expanded = false;
let opacity_overlay_avalancherisk = default_opacity_overlay_avalancherisk;

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
            console.error(`Error fetching JSON data from ${rating_url}:`, error);
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
                attribution:            overlay.attribution
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

        /*
        layer_vectormap_eaws_am.on('click', function (event) {
            let properties = event.layer.properties
            console.log('Clicked on feature: ', properties);
            let popup = L.popup()
                            .setLatLng(event.latlng)        // Set the position of the popup based on the click event
                            .setContent(`ID: ${properties.id} / elevation: ${properties.elevation}`);   // Set the content of the popup
            popup.addTo(map);
        });
        */


        // add header to the control group
        let group_headers = {
            ['Vormittag']:  {   'header':           'Lawinenlage',
                                'first_item':       true,
                                'opacity_slider':   true,
                                'default_opacity':  opacity_overlay_avalancherisk
                            }
        };

        let labels = document.querySelectorAll('.leaflet-control-layers-base label, .leaflet-control-layers-overlays label');
        add_headers(labels, group_headers);
        
        // Needed for toggling am vs. pm and storing visibility when bulletin date is changed
        let checkboxes = document.querySelectorAll('.layer-control-avalancherisk input[type="checkbox"]')

        // Insert date span and arrows
        const header_element =      document.querySelector('.layer-control-avalancherisk .leaflet-control-layers-custom-header');
        const div_date_control =    document.createElement('div');
        const span_date =           document.createElement('span');
        const span_leftarrow =      document.createElement('span');
        const span_rightarrow =     document.createElement('span');

        // Set the initial date and content for the date span
        span_date.textContent =         getFormattedDatetime(current_date, 'de-DE', 'DD, dd.mm.yyyy')
        span_leftarrow.textContent =    '◄ ';
        span_rightarrow.textContent =   ' ►';
        span_leftarrow.className =      'datepicker-arrow';
        span_rightarrow.className =     'datepicker-arrow';

        // Add event listeners to the arrows for changing the date
        function handleDateChange(date_offset) {
            current_date.setDate(current_date.getDate() + date_offset);
            span_date.textContent = getFormattedDatetime(current_date, 'de-DE', 'DD, dd.mm.yyyy');
        
            am_chosen = checkboxes[0].checked;
            pm_chosen = checkboxes[1].checked;
        
            map.removeLayer(layer_vectormap_eaws_am);
            map.removeLayer(layer_vectormap_eaws_pm);
        
            layer_control_avalancherisk.removeLayer(layer_vectormap_eaws_am);
            layer_control_avalancherisk.removeLayer(layer_vectormap_eaws_pm);
            control_is_expanded = true;
            createAvalancheRiskMaps();
        }
        
        span_leftarrow.addEventListener('click', function () {
            handleDateChange(-1);
        });
        
        span_rightarrow.addEventListener('click', function () {
            handleDateChange(1);
        });

        // Append the spans to the date control container
        div_date_control.appendChild(span_leftarrow);
        div_date_control.appendChild(span_date);
        div_date_control.appendChild(span_rightarrow);

        // Insert the container after the header element
        header_element.insertAdjacentElement('afterend', div_date_control);

        checkboxes.forEach(this_checkbox => {
            this_checkbox.addEventListener('change', function () {
                const other_checkbox = Array.from(checkboxes).find(cb => cb !== this_checkbox);
                // if both checkboxes are checked, click the other one so the respective avalancherisk-overlay is hidden
                if ( other_checkbox.checked && this_checkbox.checked ) {
                    other_checkbox.click()
                    am_chosen = !am_chosen
                    pm_chosen = !pm_chosen
                }
                // else: both avalancherisk-overlays are hidden
            });
        });
    })
    .catch(error => console.error('Error fetching the JSON data:', error));
}

createAvalancheRiskMaps()