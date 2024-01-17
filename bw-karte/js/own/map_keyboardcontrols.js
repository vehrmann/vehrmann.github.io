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