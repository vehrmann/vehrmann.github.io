const general_map_settings = {
    'center':               [47.66, 11.86],
    'zoom':                 10,//14,
    'minZoom':              3,
    'maxZoom':              22,
    'default_map':          'Mapy.cz'
};

// Needed for opacity sliders
const header_input_attributes = {
    type:       'range',
    min:        '0',
    max:        '1',
    step:       '0.01'
};

// DEFAULT LAYER OPACITIES
// important for default opacities: grouped layers should get the same value as the initial slider value is set correspondingly 
const default_opacity_overlay_sat =                     1.0
const default_opacity_overlay_hillshade =               0.5
const default_opacity_overlay_openslopemap =            0.4
const default_opacity_overlay_avalancherisk =           0.65
const default_opacity_overlay_weather =                 0.75
const default_opacity_overlay_schutzgebiete =           0.75
const default_opacity_overlay_bergwacht_eignungstest =  1.0
const default_opacity_overlay_wintersports =            1.0
const default_opacity_overlay_cycling =                 1.0
const default_opacity_overlay_oepnv =                   0.8
const default_opacity_overlay_car =                     0.9
const default_opacity_overlay_seamaps =                 1.0


// AVALANCHE RISK
const url_eaws_vectormap =          'https://static.avalanche.report/eaws_pbf/{z}/{x}/{y}.pbf'      // contains outlines of regions, for some also different elevations
const url_eaws_bulletins =          'https://static.avalanche.report/eaws_bulletins/'
const url_eaws_microregions_list =  './eaws/micro-regions.json'                                     // own file which lists all relevant regions so they can be iterated through
const url_eaws_microregions =       './eaws/micro-regions/'
const url_eaws_microregions_names = './eaws/micro-regions_names/de.json'                            // contains (translated) names of microregions. Can be extended to other languages. Not all regions seem to be translated
const slug_eaws_bulletin =          ''
const slug_eaws_ratings =           '.ratings'
const slug_eaws_problems =          '.problems'
const slug_eaws_microregions =      '_micro-regions.geojson.json'                                   // comes after region-code, contains region's geometries as well as validity in some cases  


//const url_eaws_metadata =           'https://static.avalanche.report/eaws_pbf/metadata.json'      // not needed yet

const url_eaws_bulletins_regions =  [   'AD',
                                        'AT-02', 'AT-03', 'AT-04', 'AT-05', 'AT-06', 'AT-07', 'AT-08',
                                        'CH',                       // not all regions covered by ratings.json
                                        'CZ',
                                        'DE-BY',
                                        'ES', 'ES-CT', 'ES-CT-L',
                                        'ES-CL', 'ES-GU', 'ES-PE',  // not sure if these were ever reported
                                        'FI',
                                        'FR',
                                        'GB',
                                        'IS',
                                        'IT-21', 'IT-23', 'IT-25', 'IT-25-SO-LI', 'IT-32-BZ', 'IT-32-TN', 'IT-34', 'IT-36', 'IT-42', 'IT-45', 'IT-52', 'IT-57', 'IT-65', 'IT-77', 'IT-82',
                                        //'IT-MeteoMont',           // covers some other IT-bulletins
                                        'LI',
                                        'NO',
                                        'PL',                       //PL-01, PL-02, PL-03 are named PL-1, PL-2, PL-3 in the pbf-map
                                        'PL-12',
                                        'RO',
                                        'SE',
                                        'SI',
                                        'SK'
                                        ]

// according to https://www.avalanches.org/downloads/#avalanche-danger-scale --> colors
const color_avalancherisk_0 =       '#d3d3d3'    // no report
const color_avalancherisk_1 =       '#ccff66'    // low
const color_avalancherisk_2 =       '#ffff00'    // moderate
const color_avalancherisk_3 =       '#ff9900'    // considerable
const color_avalancherisk_4 =       '#ff0000'    // high
const color_avalancherisk_5 =       '#000000'    // very high
const colors_avalancherisk =        [   color_avalancherisk_0, 
                                        color_avalancherisk_1,
                                        color_avalancherisk_2, 
                                        color_avalancherisk_3,
                                        color_avalancherisk_4,
                                        color_avalancherisk_5
                                    ]
const fill_opacity_avalancherisk =  1
const avalancheproblems_translations =   {
    'wind_slab':                {'de':  'Triebschnee'},
    'persistent_weak_layers':   {'de':  'Altschnee'},
    'new_snow':                 {'de':  'Neuschnee'},
    'wet_snow':                 {'de':  'Nassschnee'},
    'gliding_snow':             {'de':  'Gleitschnee'},
    'cornice_failure':          {'de':  'Wechtenbruch'}
    
}


// CHRONOTRAINS
const chronotrains_station_id = '8004128'   // Donnersberger Brücke