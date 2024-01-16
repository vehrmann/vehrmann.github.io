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
    let gpx = e.target;
    schutzgebiete_maps[overlay_schutzgebiete_rotwand.name].addLayer(gpx);
});