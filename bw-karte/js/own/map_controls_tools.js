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


function getSearchControl() {
    let GeoSearchControl = window.GeoSearch.GeoSearchControl;
    let OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider;

    let search_control_options = {
        provider:           new OpenStreetMapProvider(),
        autoComplete:       true,
        autoCompleteDelay:  250,
        style:              'button',
        searchLabel:        'Adresse/POI eingeben',
        notFoundMessage:    'Kann nicht gefunden werden',

        retainZoomLevel:    true,
        animateZoom:        true,
        autoClose:          false,
        keepResult:         true,
    };
    let search_control = new GeoSearchControl(search_control_options);
    return search_control;
}


function getMeasureControl() {
    let measure_control_options = {
        position:   'topleft',
        title:      'Messwerkzeuge'
    };
    let measure_control = L.control.measure(measure_control_options);

    return measure_control;
}


function getMapscaleControl() {
    let mapscale_control_options = {
        imperial: false,
    };
    let mapscale_control = L.control.scale(mapscale_control_options);

    return mapscale_control;
}


const coordinates_control = new L.Control.Coordinates();
map.on('click', function(e) {
	coordinates_control.setCoordinates(e);
});


map.addControl(getFullscreenControl());
map.addControl(getLocateControl());
map.addControl(getSearchControl());
map.addControl(getMeasureControl());
map.addControl(coordinates_control);
map.addControl(getMapscaleControl());