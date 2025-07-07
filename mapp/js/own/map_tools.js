function getFullscreenControl() {
    let fullscreen_control_options = {
        position:               'topleft',
        title:                  'Vollbildmodus',
        titleCancel:            'Vollbildmodus beenden',
        content:                null,   // change the content of the button, can be HTML, default null
        forceSeparateButton:    false,  // force separate button to detach from zoom buttons, default false
        forcePseudoFullscreen:  false,  // force use of pseudo full screen even if full screen API is available, default false
        fullscreenElement:      false   // Dom element to render in full screen, false by default, fallback to map._container
    };
    let fullscreen_control = L.control.fullscreen(fullscreen_control_options);

    return fullscreen_control;
}


function getLocateControl() {
    let locate_control_options = {
        position:               'topleft',
        flyTo:                  true,
        keepCurrentZoomLevel:   true,
        drawCircle:             true,
        drawMarker:             true,
        //circleStyle
        //markerStyle
        strings:                {   title: 'Meine Position anzeigen',
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


// STRG+L triggers locate
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'l') {   // keyCode == 76
        document.querySelector("div.leaflet-control-locate.leaflet-bar.leaflet-control a").click()        
        event.preventDefault();
    }
});

// STRG+F opens search bar
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'f') {   // keyCode == 70
        document.querySelector("div.geosearch.leaflet-bar.leaflet-control.leaflet-control-geosearch.leaflet-geosearch-button a").click()        
        event.preventDefault();
    }
});


function handlePaWoModal(slug, pw) {
    document.getElementById(`pawo-submit-${slug}`).addEventListener('click', function () {
        const pawo = document.getElementById(`pawo-input-${slug}`).value;
        document.getElementById(`pawo-modal-${slug}`).style.display = 'none';
        if (pawo === pw) {
            document.querySelector(`.layer-control-${slug}`).style.display = 'block';
        } else {
            alert('Leider falsch!');
        }
    });
}

function createPaWoListener(key, slug) {
    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === key) {
            event.preventDefault();
            const modal = document.getElementById(`pawo-modal-${slug}`);
            const input = document.getElementById(`pawo-input-${slug}`);
            modal.style.display = 'block';
            input.value = '';
            input.focus();
        }
    });
}

createPaWoListener('p', 'van');
handlePaWoModal('van', '123');