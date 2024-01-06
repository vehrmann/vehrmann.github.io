var gpx_path = 'gpx/wildschutzgebiete.gpx';
new L.GPX(gpx_path,
    {   async: true,
        polyline_options:
        {
            fill:     'orange',
            color:    'orange',
            opacity:  0.75,
            weight:   2,
        }
    }
    ).on('loaded', function(e) {
    var gpx = e.target;
    //map.fitBounds(gpx.getBounds());
    layer_control.addOverlay(gpx, 'Schutzgebiete');
}).addTo(map);