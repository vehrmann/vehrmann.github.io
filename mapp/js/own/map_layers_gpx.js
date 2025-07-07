/*
// Schutzgebiete
let gpx_path = './gpx/wildschutzgebiete.gpx';   // filepath is relative to HTML-file which imports js-file

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


// car
gpx_path = './gpx/highways_toll_without_motorway.gpx'

new L.GPX(gpx_path,
    {   async: true,
        marker_options: {
            startIconUrl:   null,
            endIconUrl:     null,
            shadowUrl:      null
        },
        polyline_options:
        {
            //fill:     'orange',
            color:    'red',
            opacity:  0.9,
            weight:   4,
        }
    }
    ).on('loaded', function(e) {
    let gpx = e.target;
    car_maps[overlay_car_highways_toll_without_motorway.name].addLayer(gpx);
});


const jsonFileUrl = './gpx/at_autobahnabschnitte_mautfrei_output.geojson';
fetch(jsonFileUrl)
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Parse the JSON from the response
    return response.json();
})
.then(data => {
    layer_at_motorway_wo_toll = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.name) {
                layer.bindPopup(feature.properties.name);
            }
        }
    })
    
    car_maps[overlay_car_at_motorway_wo_toll.name].addLayer(layer_at_motorway_wo_toll);
})
.catch(error => {
    console.error('Error fetching JSON:', error.message);
});
*/