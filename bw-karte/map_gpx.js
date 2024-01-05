var gpx_path = 'gpx/wildschutzgebiet.gpx';
new L.GPX(gpx_path, {async: true}).on('loaded', function(e) {
    var gpx = e.target;
    map.fitBounds(gpx.getBounds());
    layer_control.addOverlay(gpx, gpx.get_name());
}).addTo(map);