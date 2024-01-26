let base_maps_list = [                                  // list with all map service variables which should be added to the base map menu    
    // Topographisch
    baselayer_topo_swisstopo,
    baselayer_topo_opentopomap,
    baselayer_topo_alpenkarteeu,
    //baselayer_topo_stamen,                            // excluded as it is not public anymore
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


let slopeangle_maps_list = [
    overlay_openslopemap_low,
    overlay_openslopemap_med,
    overlay_openslopemap_high,
    overlay_openslopemap_ultrahigh
];


let avalancherisk_maps_list = [
    // stays empty so that only control is created, overlays are added later
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


let wintersports_maps_list = [
    overlay_wintersports_opensnowmap,
    overlay_wintersports_skirouten_av_sac,
    overlay_wintersports_skitourenabende
];


let cycling_maps_list = [
    overlay_cycling_cyclosm,
    overlay_cycling_cyclosmlite
];


let oepnv_maps_list = [
    overlay_oepnv_oepnvkarte,
    overlay_oepnv_chronotrains
];


let car_maps_list = [
    overlay_car_highways_toll_without_motorway,
    overlay_car_at_motorway_wo_toll,
    overlay_car_at_asfinag_toll
];


let seamaps_maps_list = [
    overlay_seamaps_openseamap,
    overlay_seamaps_kartverketno
];


let base_maps =             create_tile_layers(base_maps_list);                     // {L.tileLayer_1, L.tileLayer_2, ...}
let satellite_maps =        create_tile_layers(satellite_maps_list);
let hillshade_maps =        create_tile_layers(hillshade_maps_list);
let slopeangle_maps =       create_tile_layers(slopeangle_maps_list);
let avalancherisk_maps =    create_tile_layers(avalancherisk_maps_list);
let weather_maps =          create_tile_layers(weather_maps_list);
let schutzgebiete_maps =    create_tile_layers(schutzgebiete_maps_list);
let wintersports_maps =     create_tile_layers(wintersports_maps_list);
let cycling_maps =          create_tile_layers(cycling_maps_list);
let oepnv_maps =            create_tile_layers(oepnv_maps_list);
let car_maps =              create_tile_layers(car_maps_list);
let seamaps_maps =          create_tile_layers(seamaps_maps_list);

map.addLayer(base_maps[general_map_settings.default_map])                      // default map can only be added after it was created

let layer_control_basic =           L.control.layers(base_maps, null,           {autoZIndex: false}).addTo(map);
let layer_control_satellite =       L.control.layers(null, satellite_maps,      {autoZIndex: false}).addTo(map);
let layer_control_hillshade =       L.control.layers(null, hillshade_maps,      {autoZIndex: false}).addTo(map);
let layer_control_slopeangle =      L.control.layers(null, slopeangle_maps,     {autoZIndex: false}).addTo(map);
let layer_control_avalancherisk =   L.control.layers(null, avalancherisk_maps,  {autoZIndex: false}).addTo(map);
let layer_control_weather =         L.control.layers(null, weather_maps,        {autoZIndex: false}).addTo(map);
let layer_control_schutzgebiete =   L.control.layers(null, schutzgebiete_maps,  {autoZIndex: false}).addTo(map);
let layer_control_wintersports =    L.control.layers(null, wintersports_maps,   {autoZIndex: false}).addTo(map);
let layer_control_cycling =         L.control.layers(null, cycling_maps,        {autoZIndex: false}).addTo(map);
let layer_control_oepnv =           L.control.layers(null, oepnv_maps,          {autoZIndex: false}).addTo(map);
let layer_control_car =             L.control.layers(null, car_maps,            {autoZIndex: false}).addTo(map);
let layer_control_seamaps =         L.control.layers(null, seamaps_maps,        {autoZIndex: false}).addTo(map);


function create_single_tile_layer(layer_object) {
    let layer_url, layer_options, tile_layer;

    /* not needed here yet
    // vector overlay (avalancherisk)
    if (layer_object.vectoroverlay) {
        layer_url = layer_object.url.replace(/\s/g, '');
        tile_layer = L.vectorGrid.protobuf(layer_url);
    */

    // ImageOverlay (weather maps)
    if (layer_object.imageoverlay) {
        layer_url = layer_object.url.replace(/\s/g, '');
        
        layer_options = {   opacity:        layer_object.opacity,
                            interactive:    layer_object.interactive,
                            className:      layer_object.className,
                            attribution:    layer_object.attribution
                        };
        tile_layer = L.imageOverlay(layer_url, layer_object.bbox, layer_options);

    // FeatureGroup (Chronotrains, Schutzgebiete)
    } else if (layer_object.featuregroup) {
        layer_options = {   opacity:        layer_object.opacity,
                            attribution:    layer_object.attribution
                        };
        tile_layer = L.featureGroup(null, layer_options);       // layer is added later
    
    // GeoJSON (Skitourenabende)
    } else if (layer_object.geojson) {
        layer_options = {};
        tile_layer = L.geoJSON(null, layer_options);            // layer is added later

    // WMS
    } else if (layer_object.wms) {
        layer_url = layer_object.url.replace(/\s/g, '');
        layer_options = {   layers:         layer_object.layers,
                            minNativeZoom:  layer_object.minNativeZoom,
                            maxNativeZoom:  layer_object.maxNativeZoom,
                            maxZoom:        layer_object.maxZoom,
                            opacity:        layer_object.opacity,
                            attribution:    layer_object.attribution
                        };
        tile_layer = L.tileLayer.wms( layer_url, layer_options );

    // WMTS
    } else {
        layer_url = layer_object.url.replace(/\s/g, '');
        layer_options = {   ...(layer_object.subdomains ? { subdomains: layer_object.subdomains } : {}),    // nur falls subdomains vorhanden sind, werden sie ausgelesen
                            minNativeZoom:  layer_object.minNativeZoom,
                            maxNativeZoom:  layer_object.maxNativeZoom,
                            maxZoom:        layer_object.maxZoom,
                            opacity:        layer_object.opacity,
                            attribution:    layer_object.attribution
                        };
        tile_layer = L.tileLayer( layer_url, layer_options );
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