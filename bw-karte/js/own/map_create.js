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