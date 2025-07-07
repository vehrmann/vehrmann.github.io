const general_map_settings = {
    'center':               [47.66, 11.86],
    'zoom':                 10,//14,
    'minZoom':              3,
    'maxZoom':              22,
    'default_map':          baselayer_topo_mapycz,

    // Needed for opacity sliders
    header_input_attributes: {
        type:       'range',
        min:        '0',
        max:        '1',
        step:       '0.01'
    }
};


// Layer controls for the map, as listed in map_layers.js
const tile_layer_groups = {
    base_maps: {                                        // list with all map service variables which should be added to the base map menu    
        is_overlay:         false,
        class_name:         'layer-control-base',
        default_opacity:    1.0,
        opacity_slider:     false,
        elements: [
            // Topographisch
            ['header', 'Topo'],
            ['layer', baselayer_topo_swisstopo],
            ['layer', baselayer_topo_opentopomap],
            ['layer', baselayer_topo_alpenkarteeu],
            //['layer', baselayer_topo_stamen],         // excluded as it is not public anymore
            ['layer', baselayer_topo_bergfex],
            ['layer', baselayer_topo_various],
            ['layer', baselayer_topo_alpenverein],
            ['layer', baselayer_topo_freemapsk],
            ['layer', baselayer_topo_mapycz],
            //['layer', baselayer_topo_mapycz2],
            //['layer', baselayer_topo_mapycz3],
            ['layer', baselayer_topo_mtbmapcz],
            ['layer', baselayer_topo_google],
            ['layer', baselayer_topo_esri],
            ['layer', baselayer_topo_kartverketno],

            // Straße
            ['header', 'Straße'],
            ['layer', baselayer_street_osm],
            ['layer', baselayer_street_bkg],
            ['layer', baselayer_street_google],
            ['layer', baselayer_street_basemapat],
            ['layer', baselayer_street_kartverketno]
        ]
    },

    satellite_maps: {
        is_overlay:         true,
        class_name:         'layer-control-satellite',
        default_opacity:    1.0,
        opacity_slider:     true,
        elements: [
            ['header', 'Satellit'],
            ['layer', overlay_sat_esri],
            //['layer', overlay_sat_bayern_wms],
            ['layer', overlay_sat_bayern_wmts],
            ['layer', overlay_sat_google],
            ['layer', overlay_sat_googlehybrid]
        ]
    },

    hillshade_maps: {
        is_overlay:         true,
        class_name:         'layer-control-hillshade',
        default_opacity:    0.5,
        opacity_slider:     true,        
        elements: [
            ['header', 'Schummerung'],
            ['layer', overlay_hillshade_esri]
        ]
    },

    slopeangle_maps: {
        is_overlay:         true,
        class_name:         'layer-control-slopeangle',
        default_opacity:    0.4,
        opacity_slider:     true,        
        elements: [
            ['header', 'Hangneigung'],
            ['layer', overlay_openslopemap_low],
            ['layer', overlay_openslopemap_med],
            ['layer', overlay_openslopemap_high],
            ['layer', overlay_openslopemap_ultrahigh]
        ]
    },

    /*
    avalancherisk_maps: {
        is_overlay:         true,
        class_name:         'layer-control-avalancherisk',
        default_opacity:    0.65,
        opacity_slider:     true,        
        elements: [
        // stays empty so that only control is created, overlays are added later
        ]
    },
    */

    weather_maps: {
        is_overlay:         true,
        class_name:         'layer-control-weather',
        default_opacity:    0.75,
        opacity_slider:     true,        
        elements: [
            ['header', 'Wetter'],
            //['layer', overlay_weather_temperature],
            ['layer', overlay_weather_wind],
            //['layer', overlay_weather_snowheight],
            //['layer', overlay_weather_snownew],
            //['layer', overlay_weather_snowline],
            //['layer', overlay_weather_snowdiff],
        ]
    },

    schutzgebiete_maps: {
        is_overlay:         true,
        class_name:         'layer-control-schutzgebiete',
        default_opacity:    0.75,
        opacity_slider:     true,        
        elements: [
            ['header', 'Schutzgebiete'],
            ['layer', overlay_schutzgebiete_rotwand]
        ]
    },

    /*
    bergwacht_ausbildung_maps: {
        is_overlay:         true,
        class_name:         'layer-control-bergwacht-eignungstests',
        default_opacity:    1.0,
        opacity_slider:     false,        
        elements: [
            ['header', 'Bergwacht Eignungstests'],
            ['layer', overlay_bergwacht_eignungstest_winter_20240204]
        ]
    },
    */

    wintersports_maps: {
        is_overlay:         true,
        class_name:         'layer-control-wintersports',
        default_opacity:    1.0,
        opacity_slider:     true,        
        elements: [
            ['header', 'Wintersport'],
            ['layer', overlay_wintersports_opensnowmap],
            ['layer', overlay_wintersports_skirouten_av_sac],
            //['layer', overlay_wintersports_skitourenabende]
        ]
    },

    cycling_maps: {
        is_overlay:         true,
        class_name:         'layer-control-cycling',
        default_opacity:    1.0,
        opacity_slider:     true,        
        elements: [
            ['header', 'Fahrrad'],
            ['layer', overlay_cycling_cyclosm],
            ['layer', overlay_cycling_cyclosmlite]
        ]
    },

    oepnv_maps: {
        is_overlay:         true,
        class_name:         'layer-control-oepnv',
        default_opacity:    0.8,
        opacity_slider:     true,        
        elements: [
            ['header', 'ÖPNV'],
            ['layer', overlay_oepnv_oepnvkarte],
            ['layer', overlay_oepnv_chronotrains]
        ]
    },

    car_maps: {
        is_overlay:         true,
        class_name:         'layer-control-car',
        default_opacity:    0.9,
        opacity_slider:     true,        
        elements: [
            ['header', 'Auto'],
            ['layer', overlay_car_highways_toll_without_motorway],
            ['layer', overlay_car_at_motorway_wo_toll],
            ['layer', overlay_car_at_asfinag_toll]
        ]
    },

    van_maps: {
        is_overlay:         true,
        class_name:         'layer-control-van',
        default_opacity:    1.0,
        opacity_slider:     false,
        elements: [
            ['header', 'Campervan'],
            ['layer', overlay_van_spots],
        ]
    },

    seamaps_maps: {
        is_overlay:         true,
        class_name:         'layer-control-seamaps',
        default_opacity:    1.0,
        opacity_slider:     true,        
        elements: [
            ['header', 'Seekarten'],
            ['layer', overlay_seamaps_openseamap],
            ['layer', overlay_seamaps_kartverketno]
        ]
    }
};


// Create THE map
let map = L.map('map', {   
    center:             general_map_settings.center,
    zoom:               general_map_settings.zoom,
    minZoom:            general_map_settings.minZoom,
    maxZoom:            general_map_settings.maxZoom,
    zoomControl:        false,                          // default zoom control by Leaflet with +/- buttons
    zoominfoControl:    true,                           // zoom control by plugin with +/- buttons and box for showing current zoom level

    //zoomSnap:           0.5,
    //rotate:           true,
    //touchRotate:      true,
    //renderer:           labels_renderer,
});


// Create layers
const tile_layers = {};
for (const [group, { elements }] of Object.entries(tile_layer_groups)) {
    tile_layers[group] = Object.fromEntries(
        elements
            .filter(([type]) => type === 'layer')   // only use layer entries
            .map(([_, layer]) => [layer.name, createSingleTileLayer(layer)])
    );
}


// Add default layer
map.addLayer(tile_layers['base_maps'][general_map_settings.default_map.name]);


// Add controls
const layer_controls = {};
for (const [group, config] of Object.entries(tile_layer_groups)) {
    const { is_overlay, class_name } = config;

    const control = L.control.layers(
        is_overlay ? null : tile_layers[group],
        is_overlay ? tile_layers[group] : null,
        { autoZIndex: false }
    ).addTo(map);

    
    // add custom class-name to control-object, which allows for easier css-styling (icons etc.)
    const container = control.getContainer();
    container.classList.add(class_name);
    layer_controls[group] = control;
}