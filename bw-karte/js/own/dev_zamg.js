proj4.defs(
    'EPSG:31287',
    '+proj=lcc +lat_0=47.5 +lon_0=13.3333333333333 +lat_1=49 +lat_2=46 +x_0=400000 +y_0=400000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs +type=crs'
);

/*temperature*/
//let topLeftX =       20500       // EPSG:31287 MGI / Austria Lambert
//let topLeftY =      619500       // EPSG:31287 MGI / Austria Lambert
//let bottomRightX =  719500       // EPSG:31287 MGI / Austria Lambert
//let bottomRightY =  220500       // EPSG:31287 MGI / Austria Lambert

/*snow height*/
let topLeftX =       20050       // EPSG:31287 MGI / Austria Lambert
let topLeftY =      619950       // EPSG:31287 MGI / Austria Lambert
let bottomRightX =  719950       // EPSG:31287 MGI / Austria Lambert
let bottomRightY =  220050       // EPSG:31287 MGI / Austria Lambert


function getFormattedDates(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    var day = date.getDate().toString().padStart(2, '0');
    var time = '0600'; // Assuming the time part of the filename is fixed to '0600'
    return [year + month + day + '_' + time, `${year}-${month}-${day} ${time.slice(0, 2)}:${time.slice(2)} Uhr`] 
}

let date = new Date();
date.setDate(date.getDate() - 1);       // Go back one day
let formatted_dates = getFormattedDates(date)
let filePath = `./zamg/${formatted_dates[0]}.gif`;

let snowheight = L.imageOverlay.arrugator(
    filePath,
    {
        // The "controlPoints" option must be an array of arrays of numbers, containing
        // the coordinates in the source CRS of the four corners of the image, as follows:
        controlPoints: [
            [topLeftX,      topLeftY],	    // top-left
            [topLeftX,      bottomRightY],	// bottom-left
            [bottomRightX,  topLeftY],	    // top-right
            [bottomRightX,  bottomRightY],	// bottom-right
        ],

        // The "projector" option must be a forward-projection function.
        // Leveraging proj4 as follows is recommended.
        // It's up to the developer to ensure that the destination projection matches the Leaflet display CRS.
        projector: proj4('EPSG:31287','EPSG:3857').forward,

        // The "epsilon" option controls how much the triangular mesh will be subdivided.
        // Set it to the *square* of the maximum expected error, in units of the destination CRS.
        // The default of one million means that the maximum reprojection error distance shall be 1000 "meters".
        epsilon: 1000000,

        // If you don't know what a "fragment shader" is, do not change this default.
        // If you *do* know what a "fragment shader" is, then be aware that there's a
        // predefined `uRaster` 2D sampler and a `vUV` `vec2` varying.
        fragmentShader: "void main() { gl_FragColor = texture2D(uRaster, vUV); }",

        // Rasters that cover very large areas (i.e. the whole earth) can lead to
        // projection artifacts. For those cases, subdivide the mesh before
        // arrugating by providing a value larger than 1.
        subdivisions: 1,

        // If the input coordinates are so large, or so close to discontinuties/asimptotic
        // points, these options will crop it to prevent artifacts.
        // In other words: when the input data covers the poles, prevent
        // projecting the areas near the poles by cropping the `Y` coordinate
        // between `[-85.5, 85.5]`.
        cropX: [-Infinity, Infinity],
        cropY: [-Infinity, Infinity],

        attribution:    `Schneehöhen vom ${formatted_dates[1]} ` +
                        '(Quelle: <a href="https://www.zamg.ac.at/incaanalyse/" target="_blank">ZAMG</a>' +
                        ' / <span onmouseover="showImage()" onmouseout="hideImage()" style="cursor: pointer;">Legende Schneehöhe &#9757;</span>)'+
                        '<img id="hover-image" style="position: absolute; right: 5; bottom: 22px; display: none;"' + 
                        'src="https://www.zamg.ac.at/incaanalyse/portallib/_IMG/portallegende/_SNOW_lgd.gif">'
    }
).addTo(map);

layer_control.addOverlay(snowheight, 'Schneehöhe');

function showImage() {
    document.getElementById('hover-image').style.display = 'block';
}
function hideImage() {
    document.getElementById('hover-image').style.display = 'none';
}