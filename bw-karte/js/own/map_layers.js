
const current_year = new Date().getFullYear();      // needed for some source attributions

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
    'minZoom':          0,      // xx
    'maxNativeZoom':    22,     // xx
    'name':             'Swisstopo'
};

const baselayer_topo_opentopomap = {
    'url':              'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    'subdomains':       ['a', 'b', 'c'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    17,     // checked
    'maxZoom':          22,
    'name':             'OpenTopoMap'
};

const baselayer_topo_stamen = {
    'url':              'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    15,     // checked, kann auch weiter gezoomt werden, aber dann wird Relief nicht angezeigt und zu viele Straßendetails etc. werden sichtbar
    'maxZoom':          22,
    'name':             'Stamen'
};

const baselayer_topo_bergfex = {
    'url':              'https://tiles.bergfex.at/styles/bergfex-osm/{z}/{x}/{y}{r}.jpg',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'maxZoom':          22,

    'name':             'Bergfex'
};

const baselayer_topo_various = {
    'url':              'https://w{s}.oastatic.com/map/v1/topo/pro_ign_os_swisstopo/{z}/{x}/{y}/t.png',
    'subdomains':       ['0', '1', '2', '3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    16,     // checked
    'maxZoom':          22,
    'name':             'Divers'
};

const baselayer_topo_alpenverein = {
    'url':              'https://w{s}.oastatic.com/map/v1/topo/avk_osm/{z}/{x}/{y}/t.png',
    'subdomains':       ['0', '1', '2', '3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    16,     // checked
    'maxZoom':          22,
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
    'maxZoom':          22,
    'attribution':      '&copy; <a href="https://www.freemap.sk" target="_blank">freemap.sk</a>'
};

const baselayer_topo_mapycz = {     // Wanderkarte
    'url':              'https://{s}.mapy.cz/turist-en/{z}-{x}-{y}',
    'subdomains':       ['windytiles'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'maxZoom':          22,
    'name':             'Mapy.cz'
};

const baselayer_topo_mapycz2 = {    // Basiskarte
    'url':              'https://{s}.mapy.cz/base-en/{z}-{x}-{y}',
    'subdomains':       ['windytiles'],
    'minZoom':          3,      // xx
    'maxNativeZoom':    16,     // xx
    'name':             'Mapy.cz2'
};

const baselayer_topo_mapycz3 = {    // Winterkarte
    'url':              'https://windytiles.mapy.cz/winter-en{s}/{z}-{x}-{y}',
    'subdomains':       ['', '-down'],
    'minZoom':          3,      // xx
    'maxNativeZoom':    16,     // xx
    'name':             'Mapy.cz3'
};

const baselayer_topo_mtbmapcz = {
    // legend depends on zoom level, see mtbmap.cz
    'url':              'https://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'maxZoom':          22,
    'name':             'MTBmap.cz'
};

const baselayer_topo_kartverketnoraster = {
    'url':              'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=toporaster4&zoom={z}&x={x}&y={y}',
    // also available as wms
    'minZoom':          3,      // checked
    'maxNativeZoom':    20,     // checked
    'maxZoom':          22,
    'name':             'Kartverket.no Raster'
};

const baselayer_topo_kartverketnoseamap = {
    'url':              'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=sjokartraster&zoom={z}&x={x}&y={y}',
    // also available as wms
    'minZoom':          3,      // checked
    'maxNativeZoom':    20,     // checked
    'maxZoom':          22,
    'name':             'Kartverket.no Seamap'
};

const baselayer_topo_kartverketnovector = {
    'url':              'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}',
    'wms':              true,                   // only available as WMS
    'minZoom':          3,      // checked
    'maxNativeZoom':    20,     // checked
    'maxZoom':          22,
    'name':             'Kartverket.no Vector'
};

const baselayer_topo_google = {
    'url':              'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',    
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    15,     // checked, ab 16 werden Höhenlinien ausgeblendet
    'maxZoom':          22,
    'name':             'Google.'
};

const baselayer_topo_esri = {
    'url':              'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',
    'subdomains':       ['server', 'services'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    16,     // checked
    'maxZoom':          22,
    'name':             'ESRI.'
};

const baselayer_sat_esri = {
    'url':              'https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    'subdomains':       ['server', 'services'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'maxZoom':          22,
    'name':             'ESRI..'
};

const baselayer_sat_bayern = {
    'url':              'https://geoservices.bayern.de/wms/v2/ogc_dop80_oa.cgi?',
    'wms':              true,
    'layers':           'by_dop80c',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'maxZoom':          22,
    'name':             'Bayern'
};

const baselayer_sat_google = {
    'url':              'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    21,     // checked
    'maxZoom':          22,
    'name':             'Google..'
};

const baselayer_sat_googlehybrid = {
    'url':              'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    21,     // checked
    'maxZoom':          22,
    'name':             'Google Hybrid'
};

const baselayer_street_bkg = {
    'url':              'https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'maxZoom':          22,
    'name':             'BKG',
    'attribution':      `&copy; <a href="https://sgx.geodatenzentrum.de/web_public/gdz/datenquellen/Datenquellen_TopPlusOpen.html" target="_blank">Bundesamt für Kartographie und Geodäsie (${current_year})</a>`
};

const baselayer_street_google = {
    'url':              'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    'subdomains':       ['mt0', 'mt1', 'mt2', 'mt3'],
    'minZoom':          3,      // checkec
    'maxNativeZoom':    22,     // checked
    'maxZoom':          22,
    'name':             'Google...'
};

const baselayer_street_oepnv = {
    'url':              'https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png',
    'minZoom':          3,      // checked
    'maxNativeZoom':    18,     // checked
    'maxZoom':          22,
    'name':             'ÖPNV',
    'attribution':      '&copy; <a href="https://www.xn--pnvkarte-m4a.de" target="_blank">ÖPNVKarte</a>'
};

const baselayer_street_osm = {
    'url':              'https://{s}tile.openstreetmap.org/{z}/{x}/{y}.png',
    'subdomains':       ['', 'a.', 'b.', 'c.'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    22,     // checked
    'maxZoom':          22,
    'name':             'OpenStreetMap',
    'attribution':      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
};

const baselayer_street_basemapat = {
    'url':              'https://maps{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg',
    'subdomains':       ['', '1', '2', '3', '4'],
    'minZoom':          3,      // checked
    'maxNativeZoom':    19,     // checked
    'maxZoom':          22,
    'name':             'basemap.at'
}



// OVERLAYS
const overlay_openslopemap_low = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_LR_All_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minZoom':          3,      // xx
    'maxNativeZoom':    16,     // xx
    'name':             'Low Resolution 10m/20m',
    //'className':        'tilelayer-overlay-openslopemap-low'
};

const overlay_openslopemap_med = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_MR_AlpsEast_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minZoom':          3,      // xx
    'maxNativeZoom':    16,     // xx
    'name':             'Medium Resolution 5m interpol. ⭐'
};

const overlay_openslopemap_high = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_HR_AlpsEast_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minZoom':          3,      // xx
    'maxNativeZoom':    16,     // xx
    'name':             'High Resolution 5m'
};

const overlay_openslopemap_ultrahigh = {
    'url':              'https://tileserver{s}.openslopemap.org/OSloOVERLAY_UHR_AlpsEast_16/{z}/{x}/{y}.png',
    'subdomains':       ['1', '2', '3', '4'],
    'minZoom':          3,      // xx
    'maxNativeZoom':    16,     // xx
    'name':             'UltraHigh Resolution 2,5m interpol.'
};

const overlay_opensnowmap = {
    'url':              'https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png',
    'minZoom':          3,      // xx
    'maxZoom':          19,     // xx
    'name':             'OpenSnowMap',
    'attribution':      '&copy; <a href="https://www.opensnowmap.org" target="_blank">OpenSnowMap</a>'
};

const overlay_skirouten_av_sac = {
    'url':              'https://w{s}.oastatic.com/map/v1/png/oac_winter_alpine_overlay/{z}/{x}/{y}/t.png',
    'subdomains':       ['0', '1', '2', '3'],
    'minZoom':          3,      // xx
    'maxZoom':          19,     // xx
    'name':             'Skirouten AV/SAC',
};

const overlay_openseamap = {
    'url':              'https://{s}.openseamap.org/seamark/{z}/{x}/{y}.png',
    'subdomains':       ['tiles', 't1'],
    'minZoom':          3,      // xx
    'maxNativeZoom':    18,     // xx
    'name':             'OpenSeaMap',
    'attribution':      '&copy; <a href="https://www.openseamap.org" target="_blank">OpenSeaMap</a>'
};

/*
<!-- Bing Maps -->
"Microsoft Maps"    'http://r0.ortho.tiles.virtualearth.net/tiles/r{q}.png?g=45'
"Microsoft Hybrid"  'http://h0.ortho.tiles.virtualearth.net/tiles/h{q}.jpg?g=45'
"Microsoft Earth"   'http://a0.ortho.tiles.virtualearth.net/tiles/a{q}.jpg?g=45'


<tile_source name="Public Transport" url_template="http://openptmap.org/tiles/{0}/{1}/{2}.png" ext=".png" min_zoom="1" max_zoom="17" tile_size="256" img_density="16" avg_img_size="5000"/>
<tile_source name="Hike Bike Map" url_template="https://tiles.wmflabs.org/hikebike/{0}/{1}/{2}.png" ext=".png" min_zoom="1" max_zoom="17" tile_size="256" img_density="8" avg_img_size="18000"/>
<tile_source name="Hike Bike Map (Hills Underlay)" url_template="http://tiles.wmflabs.org/hillshading/{0}/{1}/{2}.png" ext=".png" min_zoom="1" max_zoom="17" tile_size="256" img_density="16" avg_img_size="18000"/>
<tile_source name="OpenPisteMap" url_template="http://openpistemap.org/tiles/contours/{0}/{1}/{2}.png" ext=".png" min_zoom="5" max_zoom="17" tile_size="256" img_density="32" avg_img_size="18000"/>-->
<!-- Does not work -->
<!--   <tile_source name="Relief" url_template="http://www.maps-for-free.com/layer/relief/z{0}/row{2}/{0}_{1}-{2}.jpg" ext=".jpg" min_zoom="1" max_zoom="12" tile_size="256" img_density="32" avg_img_size="24000"/>
<tile_source name="CyclOSM" url_template="https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{0}/{1}/{2}.png" ext=".png" min_zoom="1" max_zoom="20" tile_size="256" img_density="16" avg_img_size="26000"/>

<tile_source name="Yandex RU" url_template="https://core-renderer-tiles.maps.yandex.net/tiles?l=map&amp;x={1}&amp;y={2}&amp;z={0}" ext=".jpg" min_zoom="1" max_zoom="18" tile_size="256" img_density="16" avg_img_size="18000" ellipsoid="true"/>
   <tile_source name="Top Yandex RU" url_template="https://core-renderer-tiles.maps.yandex.net/tiles?l=skl&amp;x={1}&amp;y={2}&amp;z={0}" ext=".jpg" min_zoom="1" max_zoom="18" tile_size="256" img_density="16" avg_img_size="18000" ellipsoid="true"/>
   <!-- <tile_source name="Yandex NK" url_template="https://01.pvec.maps.yandex.net/?l=wmap&amp;x={1}&amp;y={2}&amp;z={0}" ext=".jpg" min_zoom="1" max_zoom="18" tile_size="256" img_density="16" avg_img_size="18000" ellipsoid="true"/> -->
<!--   <tile_source name="Top Yandex NK" url_template="https://wvec.maps.yandex.net/?l=wskl&amp;x={1}&amp;y={2}&amp;z={0}" ext=".jpg" min_zoom="1" max_zoom="18" tile_size="256" img_density="16" avg_img_size="18000" ellipsoid="true"/>-->
   <tile_source name="Yandex Satellite RU" url_template="https://sat01.maps.yandex.net/tiles?l=sat&amp;x={1}&amp;y={2}&amp;z={0}" ext=".jpg" min_zoom="1" max_zoom="19" tile_size="256" img_density="32" avg_img_size="18000" ellipsoid="true"/>
<!--   <tile_source rule="yandex_traffic" name="Yandex Traffic RU"/>-->
   <tile_source name="Yandex Traffic RU" url_template="https://core-jams-rdr-cache.maps.yandex.net/1.1/tiles?trf&amp;l=trf,trfe&amp;x={1}&amp;y={2}&amp;z={0}" ext=".png" min_zoom="1" max_zoom="18" tile_size="256" img_density="16" avg_img_size="18000" ellipsoid="true"/>

      <tile_source rule="template:1" name="Wikimapia" url_template="http://i{rnd}.wikimapia.org/?x={1}&amp;y={2}&amp;zoom={0}" randoms="wikimapia" min_zoom="1" max_zoom="18" tile_size="256" img_density="16" avg_img_size="18000" ext="png"/>
   <tile_source rule="template:1" name="Top Wikimapia" url_template="http://i{rnd}.wikimapia.org/?x={1}&amp;y={2}&amp;zoom={0}&amp;type=hybrid" randoms="wikimapia" min_zoom="1" max_zoom="18" tile_size="256" img_density="16" avg_img_size="18000" ext="png"/>

   <tile_source name="Wanderreitkarte Topo (DE, NL)" url_template="http://www.wanderreitkarte.de/topo/{0}/{1}/{2}.png" ext=".png" min_zoom="1" max_zoom="18" tile_size="256" img_density="16" avg_img_size="18000"/> 
   <tile_source name="Wanderreitkarte HillShade (DE, NL)" url_template="http://www.wanderreitkarte.de/hills/{0}/{1}/{2}.png" ext=".png" min_zoom="8" max_zoom="18" tile_size="256" img_density="16" avg_img_size="18000"/> 
   <tile_source name="Wanderreitkarte BaseLayer (DE, NL)" url_template="http://www.wanderreitkarte.de/base/{0}/{1}/{2}.png" ext=".png" min_zoom="1" max_zoom="18" tile_size="256" img_density="16" avg_img_size="18000"/> 

 <tile_source rule="template:1" name="Eniro Map (NO,SE,FI,DK,PL))" url_template="http://map01.eniro.com/geowebcache/service/tms1.0.0/map/{0}/{1}/{2}.png" ext=".png" min_zoom="2" max_zoom="20" tile_size="256" img_density="16" avg_img_size="18000" inverted_y="true"/>
   <tile_source rule="template:1" name="Eniro Aerial (NO,SE,DK)" url_template="http://map01.eniro.com/geowebcache/service/tms1.0.0/aerial/{0}/{1}/{2}.png" ext=".png" min_zoom="2" max_zoom="19" tile_size="256" img_density="16" avg_img_size="18000" inverted_y="true"/>
   <tile_source rule="template:1" name="Eniro Nautical (NO,SE)" url_template="http://map01.eniro.com/geowebcache/service/tms1.0.0/nautical/{0}/{1}/{2}.png" ext=".png" min_zoom="5" max_zoom="16" tile_size="256" img_density="32" avg_img_size="18000" inverted_y="true"/>

  <tile_source name="Geofabrik.routing_eu" url_template="https://tools.geofabrik.de/osmi/tiles/routing/{0}/{1}/{2}.png" ext=".png" min_zoom="1" max_zoom="16" tile_size="256" img_density="16" avg_img_size="18000" />
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