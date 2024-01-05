var map = L.map('map').setView([47.66, 11.86], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var gpx = 'https://mpetazzoni.github.io/leaflet-gpx/demo.gpx';
new L.GPX(gpx, {async: true}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);


L.tileLayer('https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);
