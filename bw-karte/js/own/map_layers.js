function fetchHeader(url, header_item) {
    try {
        let req=new XMLHttpRequest();
        req.open("HEAD", url, false);
        req.send(null);
        if(req.status== 200){
            return req.getResponseHeader(header_item);
        }
        else return false;
    } catch(er) {
        return er.message;
    }
}

function getFormattedDatetimeString(datetime, hour_offset, format_type) {
    const year =    datetime.getFullYear();
    const month =   ('0' + (datetime.getMonth() + 1)).slice(-2);      // add 1 to month because months are zero-indexed
    const day =     ('0' + datetime.getDate()).slice(-2);
    const hours =   ('0' + (datetime.getHours() + hour_offset) ).slice(-2)
    let formatted_datetime_string;
    switch(format_type) {
        case 'url':
            formatted_datetime_string = `${year}-${month}-${day}_${hours}-00` 
            break;
        case 'legend':
            formatted_datetime_string = `${day}.${month}.${year} ${hours}:00 Uhr`
            break;
    }
    return formatted_datetime_string
}

function getActualWeather(type) {
    let time =              new Date();
    let utc_hour_offset =   time.getTimezoneOffset() / 60;
    let formatted_datetime_string_utc, img_url, img_content_length;

    const wording = overlay_weather_wording[type];

    do {
        formatted_datetime_string_utc = getFormattedDatetimeString(time, utc_hour_offset, 'url');
        img_url = `https://static.avalanche.report/zamg_meteo/overlays/${wording.url_part}/${formatted_datetime_string_utc}_${wording.url_part}_V2.gif`;
        img_content_length = fetchHeader(img_url, 'Content-Length');
        time.setTime(time.getTime() - 60 * 60 * 1000);
    } while (!img_content_length || img_content_length < 10000);

    const formatted_datetime_string_local = getFormattedDatetimeString(time, 0, 'legend');
    const attribution_text = `${wording.layer_control_label} am ${formatted_datetime_string_local} ` +
        `(Quelle: <a href="https://lawinen.report/weather/map/${wording.url_part}" target="_blank">lawinen.report</a>` +
        ` / <span id="weather_legend_${wording.class_name}" onmouseover="showImage(this.id)" onmouseout="hideImage(this.id)" style="cursor: pointer;">Legende &#9757;</span>)` +
        `<img style="position: absolute; right: 5; bottom: 22px; display: none;" src="./icons/weather_legend_${wording.class_name}.jpg">`;

    return [img_url, attribution_text];
}

const overlay_weather_bbox =            [[45.6167, 9.4], [47.8167, 13.0333]]    // from weathermaps.settings.bbox @ https://gitlab.com/albina-euregio/albina-website/-/blob/master/app/config.json?ref_type=heads
const overlay_weather_defaultopacity =  0.7

const overlay_weather_wording =         {
    //'identifier': ['Control Label', 'className', 'url-part']
    'wind':         {   'layer_control_label':  'Wind',
                        'class_name':           'wind',
                        'url_part':             'wind'
                    },
    'snowheight':   {   'layer_control_label':  'Schneehöhen',
                        'class_name':           'snowheight',
                        'url_part':             'snow-height'
                    }
}

// newsnow forecast intervalls: 6, 12, 24, 48, 72

let [url_wind, attribution_wind] =              getActualWeather('wind');
let [url_snowheight, attribution_snowheight] =  getActualWeather('snowheight');

// BASELAYERS

/*
const baselayer_topo_realitymaps = {
    'url':              'https://tms2.realitymaps.de/summer2d/{z}/{x}/{y}.jpeg',    // needs an y-offset of +5253 to work
    'name':             'Realitymaps'
};
*/

const baselayer_topo_swisstopo = {
    'url':              'https://wmts{s}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',
    'subdomains':       [   '1','2','3','4','5','6','7','8','9',
                            '10','11','12','13','14',
                            '20','21','22','23','24',
                            '100','101','102','103','104','105','106','107','108','109'],
    //'minZoom':          0,      // xx
    //'maxNativeZoom':    22,     // xx
    'name':             'Swisstopo'
};

const baselayer_topo_opentopomap = {
    'url':              'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    'subdomains':       ['a', 'b', 'c'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    17,     // checked
    'name':             'OpenTopoMap'
};

const baselayer_topo_stamen = {
    'url':              'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    15,     // checked, kann auch weiter gezoomt werden, aber dann wird Relief nicht angezeigt und zu viele Straßendetails etc. werden sichtbar
    'name':             'Stamen'
};

const baselayer_topo_bergfex = {
    'url':              'https://tiles.bergfex.at/styles/bergfex-osm/{z}/{x}/{y}{r}.jpg',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'Bergfex'
};

const baselayer_topo_various = {
    'url':              'https://w{s}.oastatic.com/map/v1/topo/pro_ign_os_swisstopo/{z}/{x}/{y}/t.png',
    'subdomains':       ['0', '1', '2', '3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    16,     // checked
    'name':             'Divers'
};

const baselayer_topo_alpenverein = {
    'url':              'https://w{s}.oastatic.com/map/v1/topo/avk_osm/{z}/{x}/{y}/t.png',
    'subdomains':       ['0', '1', '2', '3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    16,     // checked
    /*'attribution':      '',
    'detect_retina':    False,
    'overlay':          False,
    'control':          True,
    'show':             False,
    'tms':              False,
    'opacity':          0.5,*/
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
    'url':              'https://{s}.mapy.cz/turist-en/{z}-{x}-{y}',
    'subdomains':       ['windytiles'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'name':             'Mapy.cz'
};

const baselayer_topo_mapycz2 = {    // Basiskarte
    'url':              'https://{s}.mapy.cz/base-en/{z}-{x}-{y}',
    'subdomains':       ['windytiles'],
    //'minZoom':          3,      // xx
    //'maxNativeZoom':    16,     // xx
    'name':             'Mapy.cz2'
};

const baselayer_topo_mapycz3 = {    // Winterkarte
    'url':              'https://windytiles.mapy.cz/winter-en{s}/{z}-{x}-{y}',
    'subdomains':       ['', '-down'],
    //'minZoom':          3,      // xx
    //'maxNativeZoom':    16,     // xx
    'name':             'Mapy.cz3'
};

const baselayer_topo_mtbmapcz = {
    // legend depends on zoom level, see mtbmap.cz
    'url':              'https://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'MTBmap.cz'
};

const baselayer_topo_kartverketnoraster = {
    'url':              'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=toporaster4&zoom={z}&x={x}&y={y}',
    // also available as wms
    'minZoom':          3,      // checked
    'maxNativeZoom':    20,     // checked
    'name':             'Kartverket.no Raster'
};

const baselayer_topo_kartverketnoseamap = {
    'url':              'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=sjokartraster&zoom={z}&x={x}&y={y}',
    // also available as wms
    'minZoom':          3,      // checked
    'maxNativeZoom':    20,     // checked
    'name':             'Kartverket.no Seamap'
};

const baselayer_topo_kartverketnovector = {
    'url':              'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}',
    'wms':              true,                   // only available as WMS
    'minZoom':          3,      // checked
    'maxNativeZoom':    20,     // checked
    'name':             'Kartverket.no Vector'
};

const baselayer_topo_google = {
    'url':              'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',    
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    15,     // checked, ab 16 werden Höhenlinien ausgeblendet
    'name':             'Google.'
};

const baselayer_topo_esri = {
    'url':              'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',
    'subdomains':       ['server', 'services'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    16,     // checked
    'name':             'ESRI.'
};

const baselayer_sat_esri = {
    'url':              'https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    'subdomains':       ['server', 'services'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'name':             'ESRI..'
};

const baselayer_sat_bayern = {
    'url':              'https://geoservices.bayern.de/wms/v2/ogc_dop80_oa.cgi?',
    'wms':              true,
    'layers':           'by_dop80c',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'Bayern'
};

const baselayer_sat_google = {
    'url':              'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    21,     // checked
    'name':             'Google..'
};

const baselayer_sat_googlehybrid = {
    'url':              'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    21,     // checked
    'name':             'Google Hybrid'
};

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
    'name':             'Google...'
};

const baselayer_street_oepnv = {
    'url':              'https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    17,     // checked
    'name':             'ÖPNV',
    'attribution':      '&copy; <a href="https://www.xn--pnvkarte-m4a.de" target="_blank">ÖPNVKarte</a>'
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
    'url':              'https://maps{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg',
    'subdomains':       ['', '1', '2', '3', '4'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'name':             'basemap.at'
}



// OVERLAYS SLOPES
const overlay_openslopemap_low = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_LR_All_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minZoom':          8,      // checked
    'maxNativeZoom':    16,     // checked
    'opacity':          0.5,
    'name':             'Low Resolution 10m/20m',
    //'className':        'tilelayer-overlay-openslopemap-low'
};

const overlay_openslopemap_med = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_MR_AlpsEast_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minZoom':          8,      // checked
    'maxNativeZoom':    16,     // checked
    'opacity':          0.5,
    'name':             'Medium Resolution 5m interpol. ⭐'
};

const overlay_openslopemap_high = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_HR_AlpsEast_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minZoom':          8,      // checked
    'maxNativeZoom':    16,     // checked
    'opacity':          0.5,
    'name':             'High Resolution 5m'
};

const overlay_openslopemap_ultrahigh = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_UHR_AlpsEast_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minZoom':          8,      // checked
    'maxNativeZoom':    16,     // checked
    'opacity':          0.5,
    'name':             'UltraHigh Resolution 2,5m interpol.'
};

// OVERLAYS WEATHER
/*
const overlay_weather_temperature = {
    'url':              `https://static.avalanche.report/zamg_meteo/overlays/temp/${formatted_datetime_string_utc}_temp_V2.gif`,
    'imageoverlay':     true,
    'bbox':             overlay_weather_bbox,
    'opacity':          overlay_weather_defaultopacity,
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
    'opacity':          overlay_weather_defaultopacity,
    'interactive':      false,
    'className':        'overlay_weather_wind',
    'name':             'Wind',
    'attribution':      attribution_wind
};

const overlay_weather_snowheight = {
    'url':              url_snowheight,
    'imageoverlay':     true,
    'bbox':             overlay_weather_bbox,
    'opacity':          overlay_weather_defaultopacity,
    'interactive':      false,
    'className':        'overlay_weather_snowheight',
    'name':             'Schneehöhen',
    'attribution':      attribution_snowheight
};

/*
const overlay_weather_snownew = {
    'url':              'https://static.avalanche.report/zamg_meteo/overlays/new-snow/2023-12-31_18-00_new-snow_6h_V2.gif',
    'imageoverlay':     true,
    'bbox':             overlay_weather_bbox,
    'opacity':          overlay_weather_defaultopacity,
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
    'opacity':          overlay_weather_defaultopacity,
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
    'opacity':          overlay_weather_defaultopacity,
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

// OVERLAYS OTHER
const overlay_opensnowmap = {
    'url':              'https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png',
    'minZoom':          9,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'OpenSnowMap',
    'attribution':      '&copy; <a href="https://www.opensnowmap.org" target="_blank">OpenSnowMap</a>'
};

const overlay_skirouten_av_sac = {
    'url':              'https://w{s}.oastatic.com/map/v1/png/oac_winter_alpine_overlay/{z}/{x}/{y}/t.png',
    'subdomains':       ['0', '1', '2', '3'],
    'minZoom':          11,     // checked
    'maxNativeZoom':    17,     // checked
    'name':             'Skirouten AV/SAC',
};

const overlay_openseamap = {
    'url':              'https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png',
    'subdomains':       ['tiles', 't1'],
    'minZoom':          9,      // checked
    'maxNativeZoom':    18,     // checked
    'name':             'OpenSeaMap',
    'attribution':      '&copy; <a href="https://www.openseamap.org" target="_blank">OpenSeaMap</a>'
};


/*
basemap.de

"Microsoft Maps"                        'http://r0.ortho.tiles.virtualearth.net/tiles/r{q}.png?g=45'
"Microsoft Hybrid"                      'http://h0.ortho.tiles.virtualearth.net/tiles/h{q}.jpg?g=45'
"Microsoft Earth"                       'http://a0.ortho.tiles.virtualearth.net/tiles/a{q}.jpg?g=45'

"Public Transport"                      'http://openptmap.org/tiles/{0}/{1}/{2}.png'
"Hike Bike Map"                         'https://tiles.wmflabs.org/hikebike/{0}/{1}/{2}.png'
"Hike Bike Map (Hills Underlay)"        'http://tiles.wmflabs.org/hillshading/{0}/{1}/{2}.png'
"OpenPisteMap"                          'http://openpistemap.org/tiles/contours/{0}/{1}/{2}.png'
"Relief"                                'http://www.maps-for-free.com/layer/relief/z{0}/row{2}/{0}_{1}-{2}.jpg'
"CyclOSM"                               'https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{0}/{1}/{2}.png'
"Yandex RU"                             'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&amp;x={1}&amp;y={2}&amp;z={0}'

"Top Yandex RU"                         'https://core-renderer-tiles.maps.yandex.net/tiles?l=skl&amp;x={1}&amp;y={2}&amp;z={0}'
"Yandex NK"                             'https://01.pvec.maps.yandex.net/?l=wmap&amp;x={1}&amp;y={2}&amp;z={0}'
"Top Yandex NK"                         'https://wvec.maps.yandex.net/?l=wskl&amp;x={1}&amp;y={2}&amp;z={0}'
"Yandex Satellite RU"                   'https://sat01.maps.yandex.net/tiles?l=sat&amp;x={1}&amp;y={2}&amp;z={0}'
"Yandex Traffic RU"                     'https://core-jams-rdr-cache.maps.yandex.net/1.1/tiles?trf&amp;l=trf,trfe&amp;x={1}&amp;y={2}&amp;z={0}'

"Wikimapia"                             'http://i{rnd}.wikimapia.org/?x={1}&amp;y={2}&amp;zoom={0}'
"Top Wikimapia"                         'http://i{rnd}.wikimapia.org/?x={1}&amp;y={2}&amp;zoom={0}&amp;type=hybrid'

"Wanderreitkarte Topo (DE, NL)"         'http://www.wanderreitkarte.de/topo/{0}/{1}/{2}.png'
"Wanderreitkarte HillShade (DE, NL)"    'http://www.wanderreitkarte.de/hills/{0}/{1}/{2}.png'
"Wanderreitkarte BaseLayer (DE, NL)"    'http://www.wanderreitkarte.de/base/{0}/{1}/{2}.png'

"Eniro Map (NO,SE,FI,DK,PL))"           'http://map01.eniro.com/geowebcache/service/tms1.0.0/map/{0}/{1}/{2}.png'
"Eniro Aerial (NO,SE,DK)"               'http://map01.eniro.com/geowebcache/service/tms1.0.0/aerial/{0}/{1}/{2}.png'
"Eniro Nautical (NO,SE)"                'http://map01.eniro.com/geowebcache/service/tms1.0.0/nautical/{0}/{1}/{2}.png'

"Geofabrik.routing_eu"                  'https://tools.geofabrik.de/osmi/tiles/routing/{0}/{1}/{2}.png'
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

/*
lawine.report
    Filename-Times seem to be in UTC (Lokalzeit ist UTC+1 im Winter sowie UTC+2 im Sommer)
    - temp:
        - stündlich
            um 15:50
            https://static.avalanche.report/zamg_meteo/overlays/temp/2024-01-15_14-00_temp_V2.gif   hat Messwerte, wird als 15 Uhr in Stundenauswahl/Legende angezeigt, erstellt um 15:41 (Lokalzeit?)
            https://static.avalanche.report/zamg_meteo/overlays/temp/2024-01-15_15-00_temp_V2.gif   hat keine Messwerte, wird als 16 Uhr in Stundenauswahl/Legende angezeigt, erstellt um 8:27 (Lokalzeit?) 
        - Vorhersage: 3 Tage
    - wind
        - wie temp
        - zusätzlich PNG mit wind direction (normal map o.ä.)
    - snow height
        - stündlich
        - bis aktuelle Zeit - 2h
        - Bsp: 2024-01-15_12-00_snow-height_V2.gif (Dateiname in UTC!) wurde am 15.1.2024 13:38:20 erstellt (Lokalzeit!))
    - snow new
    - snow line
    - snow diff


*/