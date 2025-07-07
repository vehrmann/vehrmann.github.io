// Subtract all smaller polygons in polys from the current polygon
function subtractPolygons(current_polygon, current_key) {
    let current_poly_options = {    color:          polys[current_key].color,
                                    fillOpacity:    polys[current_key].opacity,
                                    stroke:         0
                                };
    let final_poly;
    if (current_key == 1) {
        final_poly = current_polygon.setStyle(current_poly_options)
    } else {
        for (let key in polys) {
            if (key < current_key && current_key != key) {
                let subtracted_polygon = turf.difference(current_polygon.toGeoJSON(), polys[key].polygon.toGeoJSON());
                polys[current_key].polygon = subtracted_polygon
            }
        }
        final_poly = L.GeoJSON.geometryToLayer(polys[current_key].polygon, current_poly_options)    // convert the polygon from geoJSON to layer
    }
    return final_poly
}


// Function to process and add polygons to the overlay
function processAndAddPolygons(data, color, identifier) {

    let multipolygon_data = data.geometry.geometry.coordinates;
    let flipped_polygons = multipolygon_data.map(polygon =>
        polygon.map(ring => ring.map(coord => [coord[1], coord[0]]))
    );

    // add flipped_polygons to poly-object along with some option data
    polys[identifier] = {   polygon:    L.polygon(flipped_polygons),
                            color:      color,
                            opacity:    overlay_oepnv_chronotrains.opacity
                        };
}


let polys = {};
let json_file = `./chronotrains/${chronotrains_station_id}.json`;
let station;

// Fetch the JSON data
fetch(json_file)
    .then(response => response.json())
    .then(data => {
        if (data.i18nNames && 'de' in data.i18nNames) {
            station = data.i18nNames.de;
        } else {
            station = data.name;
        }

        // Process and add each set of polygons with respective color and identifier (=train hours from center)
        processAndAddPolygons(data.isochrones[0], 'rgb(231, 111, 81)',  '8');
        processAndAddPolygons(data.isochrones[1], 'rgb(238, 137, 89)',  '7');
        processAndAddPolygons(data.isochrones[2], 'rgb(244, 162, 97)',  '6');
        processAndAddPolygons(data.isochrones[3], 'rgb(239, 179, 102)', '5');
        processAndAddPolygons(data.isochrones[4], 'rgb(233, 196, 106)', '4');
        processAndAddPolygons(data.isochrones[5], 'rgb(138, 177, 125)', '3');
        processAndAddPolygons(data.isochrones[6], 'rgb(42, 157, 143)',  '2');
        processAndAddPolygons(data.isochrones[7], 'rgb(40, 114, 113)',  '1');

        let reversedKeys = Object.keys(polys).reverse();
        for (let key of reversedKeys) {
            let current_polygon = polys[key].polygon;
            let current_polygon_subtracted = subtractPolygons(current_polygon, key);

            current_polygon_subtracted.bindPopup(`${key}h ab ${station}`)
            oepnv_maps[overlay_oepnv_chronotrains.name].addLayer(current_polygon_subtracted);
        }
    })
    .catch(error => console.error('Error fetching the JSON data:', error));