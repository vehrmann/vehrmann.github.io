const fullscreen_button_position =      "topleft";
const fullscreen_button_title =         "Vollbildmodus";
const fullscreen_button_title_cancel =  "Vollbildmodus beenden";

let general_map_settings = {
    'center':               [47.66, 11.86],
    'zoom':                 14,
    'minZoom':              3,
    'maxZoom':              22,
    'default_map':          baselayer_topo_bergfex,
    //'slopesOpacity':        0.4,
    //'heatmapOpacity':       0.5,
    //'skiroutesOpacity':     0.5,
    //'chronotrainsOpacity':  0.2,
    //'heatmapType':          'winter',
    //'heatmapColor':         'hot',
    //'slopesResolution':     'MR_AlpsEast'
};


let base_maps_list = [                                  // list with all map service variables which should be added to the base map menu    
    // Topographisch
    baselayer_topo_swisstopo,
    baselayer_topo_opentopomap,
    baselayer_topo_stamen,
    baselayer_topo_bergfex,
    baselayer_topo_various,
    baselayer_topo_alpenverein,
    baselayer_topo_freemapsk,
    baselayer_topo_mapycz,
//    baselayer_topo_mapycz2,
//    baselayer_topo_mapycz3,
    baselayer_topo_mtbmapcz,
    baselayer_topo_kartverketnoraster,
    baselayer_topo_kartverketnoseamap,
    baselayer_topo_kartverketnovector,
    baselayer_topo_google,
    baselayer_topo_esri,

    // Satellit
    baselayer_sat_esri,
    baselayer_sat_bayern,
    baselayer_sat_google,
    baselayer_sat_googlehybrid,

    // Straße
    baselayer_street_osm,
    baselayer_street_bkg,
    baselayer_street_google,
    baselayer_street_oepnv,
    baselayer_street_basemapat,
];

let overlay_maps_list = [                               // list with all map service variables which should be added to the overlay map menu
    // Wintersport
    overlay_opensnowmap,
    overlay_skirouten_av_sac,

    // Hangneigung
    overlay_openslopemap_low,
    overlay_openslopemap_med,
    overlay_openslopemap_high,
    overlay_openslopemap_ultrahigh,

    // Wetter
    //overlay_weather_temperature,
    overlay_weather_wind,
    overlay_weather_snowheight,
    //overlay_weather_snownew,
    //overlay_weather_snowline,
    //overlay_weather_snowdiff,

    // Seekarte
    overlay_openseamap
];
let base_maps =     create_tile_layers(base_maps_list);     // {L.tileLayer_1, L.tileLayer_2, ...}
let overlay_maps =  create_tile_layers(overlay_maps_list);

let map = L.map(
    'map',
    {   
        center:             general_map_settings.center,
        zoom:               general_map_settings.zoom,
        minZoom:            general_map_settings.minZoom,
        maxZoom:            general_map_settings.maxZoom,
        zoomControl:        false,                                                  // default zoom control by Leaflet with +/- buttons
        zoominfoControl:    true,                                                   // zoom control by plugin with +/- buttons and box for showing current zoom level

        //zoomSnap:           0.5,
        //rotate:           true,
        //touchRotate:      true,
        //renderer:           labels_renderer,
        layers:             base_maps[general_map_settings.default_map.name]       // selected by default
    }
);

let layer_control = L.control.layers(base_maps, overlay_maps).addTo(map);
let map_scale =     L.control.scale({imperial: false}).addTo(map);
let fullscreen_control = new L.control.fullscreen({
    position:               fullscreen_button_position,
    title:                  fullscreen_button_title,
    titleCancel:            fullscreen_button_title_cancel,
    content:                null,   // change the content of the button, can be HTML, default null
    forceSeparateButton:    false,  // force separate button to detach from zoom buttons, default false
    forcePseudoFullscreen:  false,  // force use of pseudo full screen even if full screen API is available, default false
    fullscreenElement:      false   // Dom element to render in full screen, false by default, fallback to map._container
});
map.addControl(fullscreen_control);

let locate_options = {
    position:               "topleft",
    flyTo:                  true,
    keepCurrentZoomLevel:   true,
    drawCircle:             true,
    drawMarker:             true,
    //circleStyle
    //markerStyle
    strings:                {
                                title: "Meine Position anzeigen",
                                //text, metersUnit, feetUnit, popup, outsideMapBoundsMsg
                            },
    
  }
L.control.locate(locate_options).addTo(map);


function create_single_tile_layer(layer_object) {
    let tile_layer;
    if (layer_object.wms) {
        tile_layer = L.tileLayer.wms(
            layer_object.url, {
                layers:         layer_object.layers,
                minZoom:        layer_object.minZoom,
                maxNativeZoom:  layer_object.maxNativeZoom,
                maxZoom:        layer_object.maxZoom,
                opacity:        layer_object.opacity,
                attribution:    layer_object.attribution
            }
        );
    } else if (layer_object.imageoverlay) {
        let overlay_options =   {   opacity:        layer_object.opacity,
                                    interactive:    layer_object.interactive,
                                    className:      layer_object.className,
                                    attribution:    layer_object.attribution
                                }
        tile_layer = L.imageOverlay(layer_object.url, layer_object.bbox, overlay_options)
    } else {
        tile_layer = L.tileLayer(
            layer_object.url, {
                ...(layer_object.subdomains ? { subdomains: layer_object.subdomains } : {}),    // nur falls subdomains vorhanden sind, werden sie ausgelesen
                minZoom:        layer_object.minZoom,
                maxNativeZoom:  layer_object.maxNativeZoom,
                maxZoom:        layer_object.maxZoom,
                opacity:        layer_object.opacity,
                attribution:    layer_object.attribution
            }
        );
    };
    return tile_layer;
}

function create_tile_layers(tile_layer_list) {
    let tile_layers = {};
    for (let t in tile_layer_list) {
        let tile_layer = tile_layer_list[t];
        tile_layers[tile_layer.name] = create_single_tile_layer(tile_layer);
    };
    return tile_layers;
}