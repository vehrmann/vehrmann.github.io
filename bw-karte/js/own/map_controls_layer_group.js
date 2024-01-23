function group_map_control() {
    let group_headers = {
        /* text of label:                                       header-label which is placed above that overlay-label, 
                                                                first_item indicates if a separator-div needs to be inserted or not (true does not need one),
                                                                opacity_slider needed or not */
        [baselayer_topo_swisstopo.name]:                    {   'header':           'Topo',
                                                                'first_item':       true,
                                                                'opacity_slider':   false,
                                                                'default_opacity':  [baselayer_topo_swisstopo.opacity]
                                                            },
        [baselayer_street_osm.name]:                        {   'header':           'Straße',
                                                                'first_item':       false,
                                                                'opacity_slider':   false,
                                                                'default_opacity':  [baselayer_street_osm.opacity]
                                                            },
        [overlay_sat_esri.name]:                            {   'header':           'Satellit',
                                                                'first_item':       true,
                                                                'opacity_slider':   true,
                                                                'default_opacity':  [overlay_sat_esri.opacity]
                                                            },
        [overlay_hillshade_esri.name]:                      {   'header':           'Schummerung',
                                                                'first_item':       true,
                                                                'opacity_slider':   true,
                                                                'default_opacity':  [overlay_hillshade_esri.opacity]
                                                            },
        [overlay_openslopemap_low.name]:                    {   'header':           'Hangneigung',
                                                                'first_item':       true,
                                                                'opacity_slider':   true,
                                                                'default_opacity':  [overlay_openslopemap_low.opacity]
                                                            },
        /* avalancherisk header changed seperately */
        [overlay_weather_wind.name]:                        {   'header':           'Wetter',
                                                                'first_item':       true,
                                                                'opacity_slider':   true,
                                                                'default_opacity':  [overlay_weather_wind.opacity]
                                                            },
        [overlay_schutzgebiete_rotwand.name]:               {   'header':           'Schutzgebiete',
                                                                'first_item':       true,
                                                                'opacity_slider':   true,
                                                                'default_opacity':  [overlay_schutzgebiete_rotwand.opacity]
                                                            },
        [overlay_wintersports_opensnowmap.name]:            {   'header':           'Wintersport',
                                                                'first_item':       true,
                                                                'opacity_slider':   true,
                                                                'default_opacity':  [overlay_wintersports_opensnowmap.opacity]
                                                            },
        [overlay_cycling_cyclosm.name]:                     {   'header':           'Fahrrad',
                                                                'first_item':       true,
                                                                'opacity_slider':   true,
                                                                'default_opacity':  [overlay_cycling_cyclosm.opacity]
                                                            },
        [overlay_oepnv_oepnvkarte.name]:                    {   'header':           'ÖPNV',
                                                                'first_item':       true,
                                                                'opacity_slider':   true,
                                                                'default_opacity':  [overlay_oepnv_oepnvkarte.opacity]
                                                            },
        [overlay_car_highways_toll_without_motorway.name]:  {   'header':           'Auto',
                                                                'first_item':       true,
                                                                'opacity_slider':   true,
                                                                'default_opacity':  [overlay_car_highways_toll_without_motorway.opacity]
                                                            },
        [overlay_seamaps_openseamap.name]:                  {   'header':           'Seekarte',
                                                                'first_item':       true,
                                                                'opacity_slider':   true,
                                                                'default_opacity':  [overlay_seamaps_openseamap.opacity]
                                                            }
    };

    let labels = document.querySelectorAll('.leaflet-control-layers-base label, .leaflet-control-layers-overlays label');
    add_headers(labels, group_headers);
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
        case 'Lawinenlage':
            layer_vectormap_eaws_am.setOpacity(opacity_value);
            layer_vectormap_eaws_pm.setOpacity(opacity_value);
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
        case 'Fahrrad':
            cycling_maps[overlay_cycling_cyclosm.name].setOpacity(opacity_value);
            cycling_maps[overlay_cycling_cyclosmlite.name].setOpacity(opacity_value);
            break;
        case 'ÖPNV':
            oepnv_maps[overlay_oepnv_oepnvkarte.name].setOpacity(opacity_value);
            oepnv_maps[overlay_oepnv_chronotrains.name].setStyle({
                opacity:        opacity_value,
                fillOpacity:    opacity_value
                });
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
addLayerControlClass(layer_control_avalancherisk,   'layer-control-avalancherisk');
addLayerControlClass(layer_control_weather,         'layer-control-weather');
addLayerControlClass(layer_control_schutzgebiete,   'layer-control-schutzgebiete');
addLayerControlClass(layer_control_wintersports,    'layer-control-wintersports');
addLayerControlClass(layer_control_cycling,         'layer-control-cycling');
addLayerControlClass(layer_control_oepnv,           'layer-control-oepnv');
addLayerControlClass(layer_control_car,             'layer-control-car');
addLayerControlClass(layer_control_seamaps,         'layer-control-seamaps');


// functions to show and hide overlay_weather_legends as well as potentially further legends
function showImage(prev_sibling_id) {
    document.getElementById(prev_sibling_id).nextElementSibling.style.display = 'block';
}
function hideImage(prev_sibling_id) {
    document.getElementById(prev_sibling_id).nextElementSibling.style.display = 'none';
}