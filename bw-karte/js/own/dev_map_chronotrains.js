// Function to process and add polygons to the map
function processAndAddPolygons(data, color) {
    let multipolygon_data = data.geometry.geometry.coordinates;
    let flipped_polygons = multipolygon_data.map(polygon =>
        polygon.map(ring => ring.map(coord => [coord[1], coord[0]]))
    );
    L.polygon(flipped_polygons, {color: color}).addTo(map);
}

// Fetch the JSON data
fetch('./chronotrains/8004128.json')
    .then(response => response.json())
    .then(data => {
        // Process and add each set of polygons with respective colors
       
        /*
        processAndAddPolygons(data.isochrones[0], 'rgba(255, 255, 178, 0.60)');
        processAndAddPolygons(data.isochrones[1], 'rgba(254, 217, 118, 0.65)');
        processAndAddPolygons(data.isochrones[2], 'rgba(254, 204,  92, 0.70)');
        processAndAddPolygons(data.isochrones[3], 'rgba(254, 171,  70, 0.75)');
        processAndAddPolygons(data.isochrones[4], 'rgba(253, 141,  60, 0.80)');
        processAndAddPolygons(data.isochrones[5], 'rgba(250, 115,  51, 0.85)');
        processAndAddPolygons(data.isochrones[6], 'rgba(245,  90,  42, 0.90)');
        processAndAddPolygons(data.isochrones[7], 'rgba(240,  59,  32, 1)');
        */

        // https://colorswall.com/palette/171299
        processAndAddPolygons(data.isochrones[0], 'rgb(199, 128, 232)');
        processAndAddPolygons(data.isochrones[1], 'rgb(157, 148, 255)');
        processAndAddPolygons(data.isochrones[2], 'rgb( 89, 173, 246)');
        processAndAddPolygons(data.isochrones[3], 'rgb(  8, 202, 209)');
        processAndAddPolygons(data.isochrones[4], 'rgb( 66, 214, 164)');
        processAndAddPolygons(data.isochrones[5], 'rgb(248, 243, 141)');
        processAndAddPolygons(data.isochrones[6], 'rgb(255, 180, 128)');
        processAndAddPolygons(data.isochrones[7], 'rgb(255, 105,  97)');
    })
    .catch(error => console.error('Error fetching the JSON data:', error));

let layer_control_chronotrains = L.control.layers(null, null, {position: 'topright'}).addTo(map);
let layer_control_chronotrains_html = layer_control_chronotrains.getContainer()
layer_control_chronotrains_html.className = `${layer_control_chronotrains_html.className} layer-control-chronotrains`