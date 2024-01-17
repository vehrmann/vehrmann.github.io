function group_map_control() {
    let header_input_attributes = {
        type:       'range',
        min:        '0',
        max:        '1',
        step:       '0.01'
    };

    let group_headers = {
        /* text of label:                       header-label which is placed above that overlay-label, 
                                                first_item indicates if a separator-div needs to be inserted or not (true does not need one),
                                                opacity_slider needed or not */
        'Swisstopo':                        {   'header':           'Topo',
                                                'first_item':       true,
                                                'opacity_slider':   false
                                            },
        'OpenStreetMap':                    {   'header':           'Straße',
                                                'first_item':       false,
                                                'opacity_slider':   false
                                            },
        'ESRI..':                           {   'header':           'Satellit',
                                                'first_item':       true,
                                                'opacity_slider':   true
                                            },
        'ESRI...':                          {   'header':           'Schummerung',
                                                'first_item':       true,
                                                'opacity_slider':   true
                                            },
        'Low Resolution 10m/20m':           {   'header':           'Hangneigung',
                                                'first_item':       true,
                                                'opacity_slider':   true
                                            },
        'Wind':                             {   'header':           'Wetter',
                                                'first_item':       true,
                                                'opacity_slider':   true
                                            },
        'Rotwandgebiet':                    {   'header':           'Schutzgebiete',
                                                'first_item':       true,
                                                'opacity_slider':   true
                                            },
        'OpenSnowMap':                      {   'header':           'Wintersport',
                                                'first_item':       true,
                                                'opacity_slider':   true
                                            },
        'ÖPNV-Karte':                       {   'header':           'ÖPNV',
                                                'first_item':       true,
                                                'opacity_slider':   true
                                            },
        'CyclOSM':                          {   'header':           'Fahrrad',
                                                'first_item':       true,
                                                'opacity_slider':   true
                                            },
        'Mautstraßen (ohne Autobahnen)':    {   'header':           'Auto',
                                                'first_item':       true,
                                                'opacity_slider':   true
                                            },
        'OpenSeaMap':                       {   'header':           'Seekarte',
                                                'first_item':       true,
                                                'opacity_slider':   true
                                            }
    };

    let labels = document.querySelectorAll('.leaflet-control-layers-base label, .leaflet-control-layers-overlays label');
    add_headers(labels, group_headers);

    // Iterate through the labels to find and insert headers from the group-headers-list as well as separator-divs
    function add_headers(labels, group_headers) {
        labels.forEach(label => {
            let label_text = label.textContent.trim();
            if (label_text in group_headers) {
                // insert separator-div (=line) if necessary
                let separator_div = document.createElement('div');
                separator_div.className = 'leaflet-control-layers-separator';

                // do not add a separator-div before the first header (first baselayer-header does not need one, first overlay-header already has one)                
                if (!group_headers[label_text].first_item) {
                    label.parentNode.insertBefore(separator_div, label);
                }

                // insert header-div
                let header_div =        document.createElement('div');
                header_div.className =  "leaflet-control-layers-custom-header"

                let header_label =      document.createElement('label');
                let header_text =       group_headers[label_text].header
                header_label.textContent = header_text;

                header_div.appendChild(header_label);

                if ( group_headers[label_text].opacity_slider ) {
                    let header_input = Object.assign(document.createElement('input'), header_input_attributes);
                    header_input.setAttribute('id', header_text);

                    header_input.addEventListener('input', function () {
                        updateOverlayOpacity(this.id, this.value);
                    });

                    header_input.value = 0.7;
                    header_div.appendChild(header_input);
                }
                label.parentNode.insertBefore(header_div, label);
            }
        });

        // Iterate through the labels and remove trailing dots (needed naming convention otherwise names can't be used multiple times)
        labels.forEach(label => {
            let second_span = label.querySelector('span:nth-child(2)');
            if (second_span) {
                second_span.textContent = second_span.textContent.replace(/\.*$/, '');      // Removes one or more trailing dots
            }
        });
    }
}

// pretify this function, add opacity to Schutzgebiete. Add blur/saturation (for slopes)
function updateOverlayOpacity(overlay_type, opacity_value) {
    switch(overlay_type) {
        case 'Satellit':
            satellite_maps[overlay_sat_esri.name].setOpacity(opacity_value);
            satellite_maps[overlay_sat_bayern.name].setOpacity(opacity_value);
            satellite_maps[overlay_sat_google.name].setOpacity(opacity_value);
            satellite_maps[overlay_sat_googlehybrid.name].setOpacity(opacity_value);
            break;
        case 'Schummerung':
            hillshade_maps[overlay_hillshade_esri.name].setOpacity(opacity_value);
            break;
        case 'Hangneigung':
            slopeangle_maps[overlay_openslopemap_low.name].setOpacity(opacity_value);
            slopeangle_maps[overlay_openslopemap_med.name].setOpacity(opacity_value);
            slopeangle_maps[overlay_openslopemap_high.name].setOpacity(opacity_value);
            slopeangle_maps[overlay_openslopemap_ultrahigh.name].setOpacity(opacity_value);
            break;
        case 'Wetter':
            //weather_maps[overlay_weather_temperature.name].setOpacity(opacity_value);
            weather_maps[overlay_weather_wind.name].setOpacity(opacity_value);
            weather_maps[overlay_weather_snowheight.name].setOpacity(opacity_value);
            //weather_maps[overlay_weather_snownew.name].setOpacity(opacity_value);
            //weather_maps[overlay_weather_snowline.name].setOpacity(opacity_value);
            //weather_maps[overlay_weather_snowdiff.name].setOpacity(opacity_value);
            break;
        case 'Schutzgebiete':
            schutzgebiete_maps[overlay_schutzgebiete_rotwand.name].setStyle({
                opacity:        opacity_value,
                fillOpacity:    opacity_value
            });
            break;
        case 'Wintersport':
            wintersports_maps[overlay_wintersports_opensnowmap.name].setOpacity(opacity_value);
            wintersports_maps[overlay_wintersports_skirouten_av_sac.name].setOpacity(opacity_value);
            break;
        case 'ÖPNV':
            oepnv_maps[overlay_oepnv_oepnvkarte.name].setOpacity(opacity_value);
            oepnv_maps[overlay_oepnv_chronotrains.name].setStyle({
                opacity:        opacity_value,
                fillOpacity:    opacity_value
                });
            break;
        case 'Fahrrad':
            cycling_maps[overlay_cycling_cyclosm.name].setOpacity(opacity_value);
            cycling_maps[overlay_cycling_cyclosmlite.name].setOpacity(opacity_value);
            break;
        case 'Auto':
            car_maps[overlay_car_highways_toll_without_motorway.name].setStyle({
                opacity:        opacity_value,
                //fillOpacity:    opacity_value
            });
            break;
        case 'Seekarte':
            seamaps_maps[overlay_seamaps_openseamap.name].setOpacity(opacity_value);
            seamaps_maps[overlay_seamaps_kartverketno.name].setOpacity(opacity_value);
            break;
    }
}


// adds custom class-name to control-object, which allows for easier css-styling (icons etc.)
function addLayerControlClass(layer_control, class_name) {
    let container = layer_control.getContainer();
    container.className += ` ${class_name}`;
}

addLayerControlClass(layer_control_satellite,       'layer-control-satellite');
addLayerControlClass(layer_control_hillshade,       'layer-control-hillshade');
addLayerControlClass(layer_control_slopeangle,      'layer-control-slopeangle');
addLayerControlClass(layer_control_weather,         'layer-control-weather');
addLayerControlClass(layer_control_schutzgebiete,   'layer-control-schutzgebiete');
addLayerControlClass(layer_control_wintersports,    'layer-control-wintersports');
addLayerControlClass(layer_control_oepnv,           'layer-control-oepnv');
addLayerControlClass(layer_control_cycling,         'layer-control-cycling');
addLayerControlClass(layer_control_car,             'layer-control-car');
addLayerControlClass(layer_control_seamaps,         'layer-control-seamaps');


// functions to show and hide overlay_weather_legends as well as potentially further legends
function showImage(prev_sibling_id) {
    document.getElementById(prev_sibling_id).nextElementSibling.style.display = 'block';
}
function hideImage(prev_sibling_id) {
    document.getElementById(prev_sibling_id).nextElementSibling.style.display = 'none';
}