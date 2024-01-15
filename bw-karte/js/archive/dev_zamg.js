/*worked for importing weather imageoverlay from ZAMG which is in another projection*/

/*
HTML imports
<!-- Proj4 (adds support for using projections) / https://github.com/proj4js/proj4js -->
<!-- <script src="https://unpkg.com/proj4/dist/proj4-src.js"></script> -->
<!-- LEAFLET Proj4Leaflet (adds support for using projections supported by Proj4js) / https://github.com/kartena/Proj4Leaflet -->
<!-- <script src="https://cdn.jsdelivr.net/npm/proj4leaflet@1.0.2/src/proj4leaflet.min.js"></script> -->
<!-- LEAFLET ImageOverlay.Arrugator (Displays reprojected raster images, needs Proj4) / https://gitlab.com/IvanSanchez/Leaflet.ImageOverlay.Arrugator -->
<!-- <script src="https://unpkg.com/leaflet.imageoverlay.arrugator@1.0.0/dist/leaflet.imageoverlay.arrugator.js"></script> -->
*/

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





setTimeout(function() {
            // used for setting up, mostly for dev reasons, move to own files later
            setupSchneehoehenSlider()
        }, 50);
        //checkbox_schneehoehe.checked = false

        // change slider for Schneehöhen-Layer, as the layer is warped when hidden and shown again due to projection
        function setupSchneehoehenSlider() {
            let opacity_value = document.querySelector('canvas').style.opacity
            let checkbox_schneehoehe = null;
            let spans = document.querySelectorAll('span');
            
            // iterate through all spans to find the Schneehöhe-span
            spans.forEach(function(span) {
                if (span.textContent === " Schneehöhe") {
                    checkbox_schneehoehe = span.parentNode.querySelector('input');
                }
            });


            // clone checkbox_schneehoehe so that checkbox_schneehoehe can be deleted (along with its eventlisteners) and new one can be set to the clone
            if (checkbox_schneehoehe) {
                let checkbox_schneehoehe_clone = checkbox_schneehoehe.cloneNode(true);
                checkbox_schneehoehe.parentNode.replaceChild(checkbox_schneehoehe_clone, checkbox_schneehoehe);

                checkbox_schneehoehe_clone.addEventListener('change', function() {
                    if (this.checked) {
                        document.querySelector('canvas').style.opacity = opacity_value;
                    } else {
                        opacity_value = document.querySelector('canvas').style.opacity
                        document.querySelector('canvas').style.opacity = 0;
                    }
                });
            }
            

            // setup initial opacity-value and slider-value (somehow not possible with arrugator)
            let initial_schneehoehen_opacity = 0.5
            document.querySelector('canvas').style.opacity = initial_schneehoehen_opacity
            document.getElementById('Schneehöhe').value = initial_schneehoehen_opacity
        }