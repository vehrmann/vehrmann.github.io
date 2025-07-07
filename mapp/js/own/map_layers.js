// BASELAYERS TOPO
const baselayer_topo_swisstopo = {
    // https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml
    'url':              'https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked (in CH, elsewhere <= 14)
    'name':             'Swisstopo'
};


const baselayer_topo_opentopomap = {
    'url':              'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    'subdomains':       ['a', 'b', 'c'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    17,     // checked
    'name':             'OpenTopoMap'
};


const baselayer_topo_alpenkarteeu = {
    'url':              'https://cdn.schneider geo.com/tiles/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    16,     // checked
    'name':             'Alpenkarte.eu'
};


const baselayer_topo_stamen = {
    'url':              'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    15,     // checked, kann auch weiter gezoomt werden, aber dann wird Relief nicht angezeigt und zu viele Straßendetails etc. werden sichtbar
    'name':             'Stamen'
};


const baselayer_topo_bergfex = {
    'url':              'https://tiles.berg fex.at/styles/berg fex-osm/{z}/{x}/{y}{r}.jpg',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'Bergfex'
};


const baselayer_topo_various = {
    'url':              'https://w{s}.oa static.com/map/v1/topo/pro _ ign _ os _ swisstopo/{z}/{x}/{y}/t.png',
    'subdomains':       ['0', '1', '2', '3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    16,     // checked
    'name':             'Divers'
};


const baselayer_topo_alpenverein = {
    'url':              'https://w{s}.oa static.com/map/v1/topo/avk _ osm/{z}/{x}/{y}/t.png',
    'subdomains':       ['0', '1', '2', '3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    16,     // checked
    'name':             'Alpenverein'
};


const baselayer_topo_freemapsk = {
    'url':              'https://outdoor.tiles.freemap.sk/{z}/{x}/{y}{r}',
    'name':             'freemap.sk',
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'attribution':      '&copy; <a href="https://www.freemap.sk" target="_blank">freemap.sk</a>'
};


const baselayer_topo_mapycz = {     // Wanderkarte
    'url':              'https://wind y tiles.mapy.cz/turist-en/{z}-{x}-{y}',
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'name':             'Mapy.cz'
};


const baselayer_topo_mapycz2 = {    // Basiskarte
    'url':              'https://wind y tiles.mapy.cz/base-en/{z}-{x}-{y}',
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'name':             'Mapy.cz2'
};


const baselayer_topo_mapycz3 = {    // Winterkarte
    'url':              'https://wind y tiles.mapy.cz/winter-en{s}/{z}-{x}-{y}',
    'subdomains':       ['', '-down'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'name':             'Mapy.cz3'
};


const baselayer_topo_mtbmapcz = {
    // legend depends on zoom level, see mtbmap.cz
    'url':              'https://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'MTBmap.cz'
};


const baselayer_topo_kartverketno = {
    // https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml
    'url':              'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'Kartverket.no.'    // trailing dots to avoid duplicate layer names (removed when rendered)
};


const baselayer_topo_google = {
    'url':              'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',    
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    15,     // checked, ab 16 werden Höhenlinien ausgeblendet
    'name':             'Google.'   // trailing dots to avoid duplicate layer names (removed when rendered)
};


const baselayer_topo_esri = {
    'url':              'https://{s}.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    'subdomains':       ['server', 'services'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'name':             'ESRI.' // trailing dots to avoid confusion with other ESRI layers (removed when rendered)
};


// BASELAYERS STREET
const baselayer_street_bkg = {
    'url':              'https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'BKG',
    'attribution':      `&copy; <a href="https://sgx.geodatenzentrum.de/web_public/gdz/datenquellen/Datenquellen_TopPlusOpen.html" `+
                        `target="_blank">Bundesamt für Kartographie und Geodäsie (${new Date().getFullYear()})</a>`
};


const baselayer_street_google = {
    'url':              'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checkec
    'maxNativeZoom':    22,     // checked
    'name':             'Google...' // trailing dots to avoid duplicate layer names (removed when rendered)
};


const baselayer_street_osm = {
    'url':              'https://{s}tile.openstreetmap.org/{z}/{x}/{y}.png',
    'subdomains':       ['', 'a.', 'b.', 'c.'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    22,     // checked
    'name':             'OpenStreetMap',
    'attribution':      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
};


const baselayer_street_basemapat = {
    // https://mapsneu.wien.gv.at/basemapneu/1.0.0/WMTSCapabilities.xml
    'url':              'https://mapsneu.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg',
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'name':             'basemap.at',
    'attribution':      'Grundkarte: <a href="https://www.basemap.at" target="_blank">basemap.at</a>'
};


const baselayer_street_kartverketno = {
    // https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml
    'url':              'https://cache.kartverket.no/v1/wmts/1.0.0/toporaster/default/webmercator/{z}/{y}/{x}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'Kartverket.no..'   // trailing dots to avoid duplicate layer names (removed when rendered)
};

// OVERLAY SATELLITE
const overlay_sat_esri = {
    'url':              'https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    'subdomains':       ['server', 'services'],
    'minZoom':          3,          // checked
    'maxNativeZoom':    19,         // checked
    'name':             'ESRI..'    // trailing dot to avoid confusion with other ESRI layers (removed when rendered)
};


const overlay_sat_bayern_wms = {
    'url':              'https://geoservices.bayern.de/od/wms/dop/v1/dop20?',   // https://geoservices.bayern.de/wms/v2/ogc_dop80_oa.cgi?',
    'wms':              true,
    'layers':           'by_dop20c',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'Bayern WMS',
    'attribution':      '&copy; Datenquellen: Bayerische Vermessungsverwaltung, Europäische Union, enthält Copernicus Sentinel-2 Daten 2018, verarbeitet durch das Bundesamt für Kartographie und Geodäsie (BKG)'
};


const overlay_sat_bayern_wmts = {
    //                  https://geoservices.bayern.de/od/wmts/geobasis/v1/1.0.0/WMTSCapabilities.xml / https://geodaten.bayern.de/opengeodata/OpenDataDetail.html?pn=dop20rgb&active=SERVICE
    'url':              'https://wmtsod{s}.bayernwolke.de/wmts/by_dop/smerc/{z}/{x}/{y}',   // smerc = Pseudo-Mercator
    'subdomains':       ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'Bayern WMTS',
    'attribution':      '&copy; Datenquellen: Bayerische Vermessungsverwaltung, Europäische Union, enthält Copernicus Sentinel-2 Daten 2018, verarbeitet durch das Bundesamt für Kartographie und Geodäsie (BKG)'
};


const overlay_sat_google = {
    'url':              'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    21,     // checked
    'name':             'Google..'  // trailing dots to avoid duplicate layer names (removed when rendered)
};


const overlay_sat_googlehybrid = {
    'url':              'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    21,     // checked
    'name':             'Google Hybrid'
};


// OVERLAYS HILLSHADE
const overlay_hillshade_esri = {
    'url':              'https://{s}.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',
    'subdomains':       ['server', 'services'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    16,     // checked
    'name':             'ESRI...'   // trailing dots to avoid duplicate layer names (removed when rendered)
};


// OVERLAYS SLOPES
const overlay_openslopemap_low = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_LR_All_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minNativeZoom':    8,      // checked
    'maxNativeZoom':    16,     // checked
    'name':             'Low Resolution 10m/20m',
    'attribution':      '&copy; <a href="https://www.openslopemap.org/" target="_blank">OpenSlopeMap</a>'
};


const overlay_openslopemap_med = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_MR_AlpsEast_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minNativeZoom':    8,      // checked
    'maxNativeZoom':    16,     // checked
    'name':             'Medium Resolution 5m (interpol.) ⭐',
    'attribution':      '&copy; <a href="https://www.openslopemap.org/" target="_blank">OpenSlopeMap</a>'
};


const overlay_openslopemap_high = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_HR_AlpsEast_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minNativeZoom':    8,      // checked
    'maxNativeZoom':    16,     // checked
    'name':             'High Resolution 5m',
    'attribution':      '&copy; <a href="https://www.openslopemap.org/" target="_blank">OpenSlopeMap</a>'
};


const overlay_openslopemap_ultrahigh = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_UHR_AlpsEast_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minNativeZoom':    8,      // checked
    'maxNativeZoom':    16,     // checked
    'name':             'UltraHigh Resolution 2,5m (interpol.)',
    'attribution':      '&copy; <a href="https://www.openslopemap.org/" target="_blank">OpenSlopeMap</a>'
};

/*
// OVERLAYS AVALANCHERISK
let layer_vectormap_eaws_am
let layer_vectormap_eaws_pm
// initialize so that layers can be called later from outside their setup-function
const overlay_avalancherisk_am = {
    'url':              url_eaws_vectormap,
    'maxNativeZoom':    10,     // checked
    //'vectoroverlay':    true,
    //'options':          options_vectormap_eaws_am,
    'interactive':      true,
    'className':        'overlay_avalancherisk_am',
    'name':             'Vormittag',
    'attribution':      `&copy; <a href="${url_eaws_bulletins}yyyy-mm-dd" target="_blank">Bulletins</a> der Lawinenwarndienste`
};

const overlay_avalancherisk_pm = {
    'url':              url_eaws_vectormap,
    'maxNativeZoom':    10,     // checked
    //'vectoroverlay':    true,
    //'options':          options_vectormap_eaws_am,
    'interactive':      true,
    'className':        'overlay_avalancherisk_pm',
    'name':             'Nachmittag',
    'attribution':      `&copy; <a href="${url_eaws_bulletins}yyyy-mm-dd" target="_blank">Bulletins</a> der Lawinenwarndienste`
};
*/

// OVERLAYS WEATHER
/*
const overlay_weather_temperature = {
    'url':              `https://static.avalanche.report/zamg_meteo/overlays/temp/${formatted_datetime_string_utc}_temp_V2.gif`,
    'imageoverlay':     true,
    'bbox':             overlay_weather_bbox,
    'interactive':      false,
    'className':        'overlay_weather_temperature',
    'name':             'Temperatur',
    'attribution':      //`Temperatur vom ${formatted_dates[1]} ` +
                        `Temperatur vom 14.01.2024 ` +
                        '(Quelle: <a href="https://lawinen.report/weather/map/temp" target="_blank">lawinen.report</a>' +
                        ` / <span id="weather_legend_temperature" onmouseover="showImage(this.id)" onmouseout="hideImage(this.id)" style="cursor: pointer;">Legende &#9757;</span>)` +
                        '<img style="position: absolute; right: 5; bottom: 22px; display: none;"' + 
                        'src="./icons/weather_legend_temperature.jpg">'
};
*/

const overlay_weather_wind = {
    'url':              url_wind,
    'imageoverlay':     true,
    'bbox':             overlay_weather_bbox,
    'interactive':      false,
    'className':        'overlay_weather_wind',
    'name':             'Wind',
    'attribution':      attribution_wind
};

/*
const overlay_weather_snowheight = {
    'url':              url_snowheight,
    'imageoverlay':     true,
    'bbox':             overlay_weather_bbox,
    'interactive':      false,
    'className':        'overlay_weather_snowheight',
    'name':             'Schneehöhen',
    'attribution':      attribution_snowheight
};
*/

/*
const overlay_weather_snownew = {
    'url':              'https://static.avalanche.report/zamg_meteo/overlays/new-snow/2023-12-31_18-00_new-snow_6h_V2.gif',
    'imageoverlay':     true,
    'bbox':             overlay_weather_bbox,
    'interactive':      false,
    'className':        'overlay_weather_snownew',
    'name':             'Neuschnee',
    'attribution':      //`Neuschnee vom ${formatted_dates[1]} ` +
                        `Neuschnee vom 14.01.2024 ` +
                        '(Quelle: <a href="https://lawinen.report/weather/map/new-snow" target="_blank">lawinen.report</a>' +
                        ` / <span id="weather_legend_snownew" onmouseover="showImage(this.id)" onmouseout="hideImage(this.id)" style="cursor: pointer;">Legende &#9757;</span>)` +
                        '<img style="position: absolute; right: 5; bottom: 22px; display: none;"' + 
                        'src="./icons/weather_legend_snownew.jpg">'
};

const overlay_weather_snowline = {
    'url':              'https://static.avalanche.report/zamg_meteo/overlays/snow-line/2024-01-19_00-00_snow-line_V2.gif',
    'imageoverlay':     true,
    'bbox':             overlay_weather_bbox,
    'interactive':      false,
    'className':        'overlay_weather_snowline',
    'name':             'Schneefallgrenze',
    'attribution':      //`Schneefallgrenze vom ${formatted_dates[1]} ` +
                        `Schneefallgrenze vom 14.01.2024 ` +
                        '(Quelle: <a href="https://lawinen.report/weather/map/snow-line" target="_blank">lawinen.report</a>' +
                        ` / <span id="weather_legend_snowline" onmouseover="showImage(this.id)" onmouseout="hideImage(this.id)" style="cursor: pointer;">Legende &#9757;</span>)` +
                        '<img style="position: absolute; right: 5; bottom: 22px; display: none;"' + 
                        'src="./icons/weather_legend_snowline.jpg">'
};

const overlay_weather_snowdiff = {
    'url':              'https://static.avalanche.report/zamg_meteo/overlays/diff-snow/2024-01-15_06-00_diff-snow_6h_V2.gif',
    'imageoverlay':     true,
    'bbox':             overlay_weather_bbox,
    'interactive':      false,
    'className':        'overlay_weather_snowdiff',
    'name':             'Schneedifferenz',
    'attribution':      //`Schneedifferenz vom ${formatted_dates[1]} ` +
                        `Schneedifferenz vom 14.01.2024 ` +
                        '(Quelle: <a href="https://lawinen.report/weather/map/diff-snow" target="_blank">lawinen.report</a>' +
                        ` / <span id="weather_legend_snowdiff" onmouseover="showImage(this.id)" onmouseout="hideImage(this.id)" style="cursor: pointer;">Legende &#9757;</span>)` +
                        '<img style="position: absolute; right: 5; bottom: 22px; display: none;"' + 
                        'src="./icons/weather_legend_snowdiff.jpg">'
};
*/


// OVERLAYS SCHUTZGEBIETE
const overlay_schutzgebiete_rotwand = {
    //'minZoom':          x,      // xx
    //'maxNativeZoom':    x,     // xx
    'featuregroup':     true,
    'name':             'Rotwandgebiet',
    //'attribution':      'XXX'     // maybe link to overpass-query?
};


// OVERLAYS EIGNUNGSTESTS
/*
const overlay_bergwacht_eignungstest_winter_20240204 = {
    //'minZoom':          x,      // xx
    //'maxNativeZoom':    x,     // xx
    'featuregroup':     true,
    'name':             'Winter: Sudelfeld 04.02.2024',
    //'attribution':      'XXX'
};
*/


// OVERLAYS WINTERSPORTS
const overlay_wintersports_opensnowmap = {
    'url':              'https://tiles.opensnowmap.org/{s}/{z}/{x}/{y}.png',
    'subdomains':       ['pistes', 'tiles-pistes'],
    'minNativeZoom':    9,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'OpenSnowMap',
    'attribution':      '&copy; <a href="https://www.opensnowmap.org" target="_blank">OpenSnowMap</a>'
};


const overlay_wintersports_skirouten_av_sac = {
    'url':              'https://w{s}.oa static.com/map/v1/png/oac _ winter _ alpine _ overlay/{z}/{x}/{y}/t.png',
    'subdomains':       ['0', '1', '2', '3'],
    'minNativeZoom':    11,     // checked
    'maxNativeZoom':    17,     // checked
    'name':             'Skirouten AV/SAC',
};

/*
const overlay_wintersports_skitourenabende = {
    'geojson':          true,
    'name':             'Skitourenabende',
};
*/

// OVERLAYS CYCLING
const overlay_cycling_cyclosm = {
    'url':              'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    'subdomains':       ['a', 'b', 'c'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    20,     // checked
    'name':             'CyclOSM',
    'attribution':      '&copy; <a href="https://www.cyclosm.org/" target="_blank">CyclOSM</a>'
};


const overlay_cycling_cyclosmlite = {
    'url':              'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm-lite/{z}/{x}/{y}.png',
    'subdomains':       ['a', 'b', 'c'],
    'minNativeZoom':    11,     // checked
    'maxNativeZoom':    20,     // checked
    'name':             'CyclOSM Lite',
    'attribution':      '&copy; <a href="https://www.cyclosm.org/" target="_blank">CyclOSM</a>'
};


// OVERLAYS ÖPNV
const overlay_oepnv_oepnvkarte = {
    'url':              'https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    17,     // checked
    'name':             'ÖPNV-Karte',
    'attribution':      '&copy; <a href="https://www.xn--pnvkarte-m4a.de" target="_blank">ÖPNVKarte</a>'
};


// CHRONOTRAINS
const chronotrains_station_id = '8004128'   // Donnersberger Brücke
const overlay_oepnv_chronotrains = {
    //'minZoom':          x,      // xx
    //'maxNativeZoom':    x,     // xx
    'featuregroup':     true,
    'name':             'ChronoTrains',
    'attribution':      `&copy; <a href="https://www.chronotrains.com/de/station/${chronotrains_station_id}" target="_blank">ChronoTrains</a>`
};


// OVERLAYS CAR
const overlay_car_highways_toll_without_motorway = {
    //'minZoom':          x,      // xx
    //'maxNativeZoom':    x,     // xx
    'featuregroup':     true,
    'name':             'Mautstraßen (ohne Autobahnen)',
    //'attribution':      'XXX'     // maybe link to overpass-query?
};


const overlay_car_at_motorway_wo_toll = {
    'geojson':          true,
    'name':             'Mautfreie Autobahnabschnitte Österreich',
};


const overlay_car_at_asfinag_toll = {
    'url':              'https://odo.asfinag.at/wmts/geoserver/maps/wms?service=WMS&request=GetMap&styles=&format=image%2Fpng&transparent=true&version=1.1.1&tiled=true&exceptions=application%2Fvnd.ogc.se_inimage&tilesOrigin=-250000%2C-250000&width=256&height=256&srs=EPSG%3A3857',    
    'wms':              true,
    'layers':           'maps%3Agrp_verkauf',

    /*
    &request=GetMap
    &layers=maps%3Agrp_verkauf
    &styles=
    &format=image%2Fpng
    &transparent=true
    &version=1.1.1
    &tiled=true
    &exceptions=application%2Fvnd.ogc.se_inimage
    &tilesOrigin=-250000%2C-250000
    &width=256&height=256
    &srs=EPSG%3A3857
    &bbox=1252344.2714243277,5948635.289265559,1565430.3392804097,6261721.357121641'
    */
    //'minZoom':          3,      // checked
    //'maxNativeZoom':    18,     // checked
    'name':             'ASFINAG'
};


// OVERLAYS VAN
const overlay_van_spots = {
    //'minZoom':          x,      // xx
    //'maxNativeZoom':    x,     // xx
    'featuregroup':     true,
    'name':             'Stellplätze',
    'attribution':      'Zusammengetragen von freundlichen Menschen'
};


// OVERLAYS SEAMAPS
const overlay_seamaps_openseamap = {
    'url':              'https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png',
    'subdomains':       ['tiles', 't1'],
    'minNativeZoom':    9,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'OpenSeaMap',
    'attribution':      '&copy; <a href="https://www.openseamap.org" target="_blank">OpenSeaMap</a>'
};


const overlay_seamaps_kartverketno = {
    // https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml
    'url':              'https://cache.kartverket.no/v1/wmts/1.0.0/sjokartraster/default/webmercator/{z}/{y}/{x}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'Kartverket.no Seamap'
};


/* FURTHER POTENTIAL SOURCES

https://tileserver4.openslopemap.org/OSloContourOAM_AlpsEast_16/9/270/181.png
https://peaks.openslopemap.org/9/269/180.png
https://tileserver1.openslopemap.org/WinterLayer/13/4377/2859.png

basemap.de

Bayern
    https://wmtsod2.bayernwolke.de/wmts/by_amtl_karte/smerc/9/271/178
    https://geoservices.bayern.de/wms/v2/ogc_dop80_oa.cgi?&service=WMS&request=GetMap&layers=by_dop80c&styles=&format=image%2Fjpeg&transparent=false&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=1252344.2714243277,6026906.806229579,1330615.7883883484,6105178.3231936

basemap.at
    https://maps2.wien.gv.at/basemap/bmapgrau/normal/google3857/9/178/275.png
    https://maps3.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/9/179/271.jpeg    
    https://maps2.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/9/181/272.jpeg
    https://maps1.wien.gv.at/basemap/bmapgelaende/grau/google3857/9/181/271.jpeg
    https://maps1.wien.gv.at/basemap/bmapoverlay/normal/google3857/13/2860/4380.png
Tirol
    https://gis.tirol.gv.at/arcgis/services/Service_Public/terrain/MapServer/WMSServer?&service=WMS&request=GetMap&layers=Image_Gelaendeneigung_Wintersport&styles=&format=image%2Fpng&transparent=true&version=1.1.1&height=256&width=256&srs=EPSG%3A3857&bbox=1369751.5468703588,5929067.410024555,1389319.4261113636,5948635.289265559


Swisstopo
    https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.hangneigung-ueber_30/default/current/3857/9/269/180.png
    ... 

https://www.openandromaps.org/
https://www.thunderforest.com/      // needs API key
https://tile.waymarkedtrails.org/hiking/13/4377/2858.png
https://tile.waymarkedtrails.org/slopes/13/4380/2858.png

https://openskimap.org/#2/40/-100
https://www.xctrails.org/map/map.html?type=xc

"Public Transport"                      'http://openptmap.org/tiles/{0}/{1}/{2}.png'
"Hike Bike Map"                         'https://tiles.wmflabs.org/hikebike/{0}/{1}/{2}.png'
"Hike Bike Map (Hills Underlay)"        'http://tiles.wmflabs.org/hillshading/{0}/{1}/{2}.png'
"Relief"                                'http://www.maps-for-free.com/layer/relief/z{0}/row{2}/{0}_{1}-{2}.jpg' // Schulatlas-Style

"Yandex RU"                             'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&amp;x={1}&amp;y={2}&amp;z={0}'
"Top Yandex RU"                         'https://core-renderer-tiles.maps.yandex.net/tiles?l=skl&amp;x={1}&amp;y={2}&amp;z={0}'
"Yandex NK"                             'https://01.pvec.maps.yandex.net/?l=wmap&amp;x={1}&amp;y={2}&amp;z={0}'
"Top Yandex NK"                         'https://wvec.maps.yandex.net/?l=wskl&amp;x={1}&amp;y={2}&amp;z={0}'
"Yandex Satellite RU"                   'https://sat01.maps.yandex.net/tiles?l=sat&amp;x={1}&amp;y={2}&amp;z={0}'
"Yandex Traffic RU"                     'https://core-jams-rdr-cache.maps.yandex.net/1.1/tiles?trf&amp;l=trf,trfe&amp;x={1}&amp;y={2}&amp;z={0}'

"Wikimapia"                             seems not to include Bing anymore, Yahoo Satellite does not work either

"Eniro Map (NO,SE,FI,DK,PL))"           'http://map01.eniro.com/geowebcache/service/tms1.0.0/map/{0}/{1}/{2}.png'
"Eniro Aerial (NO,SE,DK)"               'http://map01.eniro.com/geowebcache/service/tms1.0.0/aerial/{0}/{1}/{2}.png'
"Eniro Nautical (NO,SE)"                'http://map01.eniro.com/geowebcache/service/tms1.0.0/nautical/{0}/{1}/{2}.png'

"Geofabrik.routing_eu"                  'https://tools.geofabrik.de/osmi/tiles/routing/{0}/{1}/{2}.png' // not necessary

/*
const baselayer_topo_wanderreitkarte1 = {
    'url':              'https://www.wanderreitkarte.de/topo/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'name':             'Wanderreitkarte.'  // trailing dots to avoid duplicate layer names (removed when rendered)
};

const baselayer_topo_wanderreitkarte2 = {
    'url':              'https://tradi.wanderreitkarte.de/tradi/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'name':             'Wanderreitkarte..' // trailing dots to avoid duplicate layer names (removed when rendered)
};

"Wanderreitkarte.."    'http://www.wanderreitkarte.de/hills/{z}/{x}/{y}.png'
"Wanderreitkarte..."    'http://www.wanderreitkarte.de/base/{z}/{x}/{y}.png'


const baselayer_topo_realitymaps = {
    'url':              'https://tms2.realitymaps.de/summer2d/{z}/{x}/{y}.jpeg',    // needs an y-offset of +5253 to work
    'name':             'Realitymaps'
};
*/


/*
// STRAVA HEATMAPS
const heatmap_strava_colors =     ['hot', 'blue', 'purple', 'gray', 'bluered'];
const heatmap_strava_activities = {
    'all':      '✔️',
    'ride':     '🚴',
    'run':      '👟',
    'winter':   '❄️',
    'water':    '🌊'
};
const heatmap_strava_url_base =   'https://strava-heatmap.tiles.freemap.sk/';
const heatmap_strava_url_end =    '/{z}/{x}/{y}.png'
*/