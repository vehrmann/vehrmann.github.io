// START: General map settings
var center =    [47.66, 11.86];
var zoom =      14;
var maxZoom =   22;
function getDefaultMap() {
    return baselayer_street_bkg;
};

var slopesOpacity =         0.4;
var heatmapOpacity =        0.5;
var skiroutesOpacity =      0.5;
var chronotrainsOpacity =   0.2;
var heatmapType =           'winter';
var heatmapColor =          'hot';
var slopesResolution =      'MR_AlpsEast';
// END : General map settings


// START: Define base map layers
var baselayer_topo_swisstopo = L.tileLayer(
    'https://wmts{s}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg', {
        subdomains:     [   '1','2','3','4','5','6','7','8','9',
                            '10','11','12','13','14',
                            '20','21','22','23','24',
                            '100','101','102','103','104','105','106','107','108','109'],
        minZoom:        0,
        maxNativeZoom:  22,
        name:           'Swisstopo'
});

var baselayer_topo_bergfex = L.tileLayer(
    'https://tiles.bergfex.at/styles/bergfex-osm/{z}/{x}/{y}@2x.jpg', {
        minZoom:        0,              // checked
        maxNativeZoom:  22,             // checked
        name:           'Topo Bergfex'
});

var baselayer_topo_various = L.tileLayer(
    'https://w{s}.oastatic.com/map/v1/topo/pro_ign_os_swisstopo/{z}/{x}/{y}/t.png', {
        subdomains: ['0', '1', '2', '3'],
        minZoom:        2,              // checked
        maxNativeZoom:  17,             // checked
        name:           'Topo Divers'
});

var baselayer_topo_alpenverein = L.tileLayer(
    'https://w{s}.oastatic.com/map/v1/topo/avk_osm/{z}/{x}/{y}/t.png', {
        subdomains: ['0', '1', '2', '3'],
        minZoom:        2,              // checked
        maxNativeZoom:  16,             // checked
        name:           'Topo Alpenverein'
});

var baselayer_topo_mapycz = L.tileLayer(
    'https://{s}.mapy.cz/turist-en/{z}-{x}-{y}', {
        subdomains: ['windytiles'],
        minZoom:        2,
        maxNativeZoom:  16,
        name:           'Topo Mapy.cz'
});

var baselayer_topo_google = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        minZoom:        0,              // checked
        maxNativeZoom:  16,             // checked
        name:           'Topo Google'
});

var baselayer_sat_esri = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        minZoom:        0,              // checked
        maxNativeZoom:  19,             // checked
        name:           'Satellit ESRI'
});

var baselayer_sat_bayern = L.tileLayer.wms(
    'https://geoservices.bayern.de/wms/v2/ogc_dop80_oa.cgi?', {
        layers: 'by_dop80c',
        minZoom:        7,              // checked
        maxNativeZoom:  20,             // checked
        name:           'Satellit Bayern'
});

var baselayer_sat_google = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        minZoom:        0,              // checked
        maxNativeZoom:  21,             // checked
        name:           'Satellit Google'
});

var baselayer_sat_googlehybrid = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        minZoom:        0,              // checked
        maxNativeZoom:  21,             // checked
        name:           'Satellit Google Hybrid'
});

var baselayer_street_bkg = L.tileLayer(
    'https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png', {
        minZoom:        0,              // checked
        maxNativeZoom:  18,             // checked
        name:           'Street BKG'
});

var baselayer_street_google = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        minZoom:        0,              // checked
        maxNativeZoom:  22,             // checked
        name:           'Street Google'
});

var baselayer_street_oepnv = L.tileLayer(
    'https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png', {
        minZoom:        5,              // checked
        maxNativeZoom:  18,             // checked
        name:           'Street ÖPNV',
        attribution:    '&copy; <a href="https://www.xn--pnvkarte-m4a.de" target="_blank">ÖPNVKarte</a>'
});

var baselayer_street_osm = L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom:        5,
        maxNativeZoom:  19,
        name:           'Street OpenStreetMap',
        attribution:    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
});
// END: Define base map layers


// START: Define overlay layers
var overlay_opensnowmap = L.tileLayer(
    'https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png', {
        maxZoom:        19,
        name:           'OpenSnowMap',
        attribution:    '&copy; <a href="https://www.opensnowmap.org" target="_blank">OpenSnowMap</a>'
});

var overlay_skirouten_av_sac = L.tileLayer(
    'https://w{s}.oastatic.com/map/v1/png/oac_winter_alpine_overlay/{z}/{x}/{y}/t.png', {
        subdomains:     ['0', '1', '2', '3'],
        name:           'Skirouten AV/SAC',
});

var overlay_heatmap_strava_purple_all = L.tileLayer(
    'https://strava-heatmap.tiles.freemap.sk/all/purple/{z}/{x}/{y}.png', {
        name:           'Strava ✔️ Purple',
});


// END: Define overlay layers


// START: Cluster maps
var base_maps = {
    'Topo Bergfex':             baselayer_topo_bergfex,
    'Topo Alpenverein':         baselayer_topo_alpenverein,
    'Topo divers':              baselayer_topo_various,
    'Topo Mapy.cz':             baselayer_topo_mapycz,
    'Topo Swisstopo':           baselayer_topo_swisstopo,
    'Topo Google':              baselayer_topo_google,

    'Satellit Esri':            baselayer_sat_esri,
    'Satellit Bayern':          baselayer_sat_bayern,
    'Satellit Google':          baselayer_sat_google,
    'Satellit Google Hybrid':   baselayer_sat_googlehybrid,
    'Street BKG':               baselayer_street_bkg,
    'Street Google':            baselayer_street_google,
    'Street ÖPNV':              baselayer_street_oepnv,
    'Street OpenStreetMap':     baselayer_street_osm,
};

var overlay_maps = {
    'OpenSnowMap':              overlay_opensnowmap,
    'Skirouten AV/SAC':         overlay_skirouten_av_sac,
    'Strava ✔️ Purple':         overlay_heatmap_strava_purple_all    
//    'Hangneigung':  slopes,
//    'Heatmap':      heatmap,
//    'Skirouten':    skiroutes,
//    'Chronotrains': chronotrains
};
// END: Cluster maps


// START: Create map
var map = L.map(
    'map', {
        center: center,
        zoom: zoom,
        //rotate: true,
        //touchRotate: true,
        layers: [getDefaultMap()]  // selected by default
        //layers: [baselayer_osm, overlay_opensnowmap]
});
//END: Create map

var layer_control = L.control.layers(base_maps, overlay_maps).addTo(map);


/*
BUGS:
IMPROVEMENTS:
    - add min-/max-zooms to all map layers
    - add attribution links to all map layers
    - Country-Filter/Flag for some maps
    - opacity, blur etc. for overlays
    - zoom-level between +/- buttons
    - GPS-location-button
    - Geo-Tools (Distance, Area, Drawing, ...)
    - Routing
EXTEND:
    BASELAYERS:
        - Swisstopo
        - Basemap.at
        - CyclOSM
        - Kartverket (NO)
        - BayernAtlas
    OBERLAYS:
        - Strava Heatmaps
        - OpenSlopeMap
        - ATHM
        - IsoChrones
        - Schutzgebiete
        - Webcams
        - Wetter / Schnee / Lawinenlage / LLB
        - BW-spezifische Orte & Gebiete
        - übergabepunkte
IDEAS:
    - Links zu Fahrplänen, Touren, Hütten
NICE TO HAVE:
    - Geo-Quiz
*/