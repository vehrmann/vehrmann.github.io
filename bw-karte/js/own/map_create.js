let general_map_settings = {
    'center':               [47.66, 11.86],
    'zoom':                 10,//14,
    'minZoom':              3,
    'maxZoom':              22,
    'default_map':          baselayer_topo_bergfex,
    //'slopesOpacity':        0.4,
    //'heatmapOpacity':       0.5,
    //'skiroutesOpacity':     0.5,
    //'heatmapType':          'winter',
    //'heatmapColor':         'hot',
    //'slopesResolution':     'MR_AlpsEast'
};


let base_maps_list = [                                  // list with all map service variables which should be added to the base map menu    
    // Topographisch
    baselayer_topo_swisstopo,
    baselayer_topo_opentopomap,
    baselayer_topo_alpenkarteeu,
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
    baselayer_topo_kartverketnovector,
    baselayer_topo_google,
    baselayer_topo_esri,

    // Straße
    baselayer_street_osm,
    baselayer_street_bkg,
    baselayer_street_google,
    baselayer_street_basemapat
];

let satellite_maps_list = [
    overlay_sat_esri,
    overlay_sat_bayern,
    overlay_sat_google,
    overlay_sat_googlehybrid
];

let hillshade_maps_list = [
    overlay_hillshade_esri
];

let wintersports_maps_list = [
    overlay_wintersports_opensnowmap,
    overlay_wintersports_skirouten_av_sac,
];

let slopeangle_maps_list = [
    overlay_openslopemap_low,
    overlay_openslopemap_med,
    overlay_openslopemap_high,
    overlay_openslopemap_ultrahigh
];

let weather_maps_list = [
    //overlay_weather_temperature,
    overlay_weather_wind,
    overlay_weather_snowheight,
    //overlay_weather_snownew,
    //overlay_weather_snowline,
    //overlay_weather_snowdiff,
];

let schutzgebiete_maps_list = [
    overlay_schutzgebiete_rotwand    
];

let oepnv_maps_list = [
    overlay_oepnv_oepnvkarte,
    overlay_oepnv_chronotrains
];

let cycling_maps_list = [
    overlay_cycling_cyclosm,
    overlay_cycling_cyclosmlite
];

let seamaps_maps_list = [
    overlay_seamaps_openseamap,
    overlay_seamaps_kartverketno
];


let map = L.map('map', {   
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
    });

let base_maps =             create_tile_layers(base_maps_list);                     // {L.tileLayer_1, L.tileLayer_2, ...}
let satellite_maps =        create_tile_layers(satellite_maps_list);
let hillshade_maps =        create_tile_layers(hillshade_maps_list);
let slopeangle_maps =       create_tile_layers(slopeangle_maps_list);
let weather_maps =          create_tile_layers(weather_maps_list);
let wintersports_maps =     create_tile_layers(wintersports_maps_list);
let schutzgebiete_maps =    create_tile_layers(schutzgebiete_maps_list);
let oepnv_maps =            create_tile_layers(oepnv_maps_list);
let cycling_maps =          create_tile_layers(cycling_maps_list);
let seamaps_maps =          create_tile_layers(seamaps_maps_list);

map.addLayer(base_maps[general_map_settings.default_map.name])                      // default map can only be added after it was created
let layer_control_basic =           L.control.layers(base_maps, null,           {autoZIndex: false}).addTo(map);
let layer_control_satellite =       L.control.layers(null, satellite_maps,      {autoZIndex: false}).addTo(map);
let layer_control_hillshade =       L.control.layers(null, hillshade_maps,      {autoZIndex: false}).addTo(map);
let layer_control_slopeangle =      L.control.layers(null, slopeangle_maps,     {autoZIndex: false}).addTo(map);
let layer_control_weather =         L.control.layers(null, weather_maps,        {autoZIndex: false}).addTo(map);
let layer_control_wintersports =    L.control.layers(null, wintersports_maps,   {autoZIndex: false}).addTo(map);
let layer_control_schutzgebiete =   L.control.layers(null, schutzgebiete_maps,  {autoZIndex: false}).addTo(map);
let layer_control_oepnv =           L.control.layers(null, oepnv_maps,          {autoZIndex: false}).addTo(map);
let layer_control_cycling =         L.control.layers(null, cycling_maps,        {autoZIndex: false}).addTo(map);
let layer_control_seamaps =         L.control.layers(null, seamaps_maps,        {autoZIndex: false}).addTo(map);


function create_single_tile_layer(layer_object) {
    let tile_layer, layer_options;

    // ImageOverlay (weather maps)
    if (layer_object.imageoverlay) {
        layer_options = {   opacity:        layer_object.opacity,
                            interactive:    layer_object.interactive,
                            className:      layer_object.className,
                            attribution:    layer_object.attribution
                        }
        tile_layer = L.imageOverlay(layer_object.url, layer_object.bbox, layer_options)

    // FeatureGroup (Chronotrains, Schutzgebiete)
    } else if (layer_object.featuregroup) {
        layer_options = {   attribution:    layer_object.attribution
                        }
        tile_layer = L.featureGroup(null, layer_options)    // layer is added later

    // WMS
    } else if (layer_object.wms) {
        layer_options = {   layers:         layer_object.layers,
                            minNativeZoom:  layer_object.minNativeZoom,
                            maxNativeZoom:  layer_object.maxNativeZoom,
                            maxZoom:        layer_object.maxZoom,
                            opacity:        layer_object.opacity,
                            attribution:    layer_object.attribution
                        }
        tile_layer = L.tileLayer.wms( layer_object.url, layer_options );

    // WMTS
    } else {
        layer_options = {   ...(layer_object.subdomains ? { subdomains: layer_object.subdomains } : {}),    // nur falls subdomains vorhanden sind, werden sie ausgelesen
                            minNativeZoom:  layer_object.minNativeZoom,
                            maxNativeZoom:  layer_object.maxNativeZoom,
                            maxZoom:        layer_object.maxZoom,
                            opacity:        layer_object.opacity,
                            attribution:    layer_object.attribution
                        }
        tile_layer = L.tileLayer( layer_object.url, layer_options );
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


function getFullscreenControl() {
    let fullscreen_control_options = {
        position:               "topleft",
        title:                  "Vollbildmodus",
        titleCancel:            "Vollbildmodus beenden",
        content:                null,   // change the content of the button, can be HTML, default null
        forceSeparateButton:    false,  // force separate button to detach from zoom buttons, default false
        forcePseudoFullscreen:  false,  // force use of pseudo full screen even if full screen API is available, default false
        fullscreenElement:      false   // Dom element to render in full screen, false by default, fallback to map._container
    };
    let fullscreen_control = new L.control.fullscreen({fullscreen_control_options});

    return fullscreen_control;
}


function getLocateControl() {
    let locate_control_options = {
        position:               "topleft",
        flyTo:                  true,
        keepCurrentZoomLevel:   true,
        drawCircle:             true,
        drawMarker:             true,
        //circleStyle
        //markerStyle
        strings:                {   title: "Meine Position anzeigen",
                                    //text, metersUnit, feetUnit, popup, outsideMapBoundsMsg
                                },
    };
    let locate_control = L.control.locate(locate_control_options);

    return locate_control;
}


function getSearchcontrol() {
    var GeoSearchControl = window.GeoSearch.GeoSearchControl;
    var OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider;

    var search_control = new GeoSearchControl({
        provider: new OpenStreetMapProvider()
    });

    return search_control;
}


function getMapscaleControl() {
    let mapscale_control_options = {
        imperial: false,
    };
    let mapscale_control = L.control.scale(mapscale_control_options);

    return mapscale_control;
}

map.addControl(getFullscreenControl());
map.addControl(getLocateControl());
map.addControl(getSearchcontrol());
map.addControl(getMapscaleControl());