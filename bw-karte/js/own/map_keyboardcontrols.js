// STRG+F opens search bar
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'f') {        
        document.querySelector("div.geosearch.leaflet-bar.leaflet-control.leaflet-control-geosearch.leaflet-geosearch-button a").click()        
        event.preventDefault();
    }
});