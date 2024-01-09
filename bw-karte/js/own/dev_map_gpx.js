var gpx_path = "./gpx/wildschutzgebiete.gpx";   // filepath is relative to HTML-file which imports js-file

new L.GPX(gpx_path,
    {   async: true,
        marker_options: {
            startIconUrl:   null,
            endIconUrl:     null,
            shadowUrl:      null
        },
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
    layer_control.addOverlay(gpx, 'Rotwandgebiet');
    group_map_control();                                // only group layer-entries after GPX-files are loaded
}).addTo(map);