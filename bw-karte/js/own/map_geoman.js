// Leaflet-Geoman controls with some options to the map
map.pm.addControls({
    position:         'topleft',
    drawMarker:         true,
    drawCircle:         true,
    drawPolyline:       true,
    drawPolygon:        true,
    drawText:           true,

    editMode:           true,
    dragMode:           true,  // only needed for text, disable esp. for polyline
    removalMode:        true,
  
    drawRectangle:      false,
    
    drawCircleMarker:   false,    
    cutPolygon:         false,
    rotateMode:         false,

    oneBlock:           true
});

map.pm.Toolbar.changeControlOrder([
    'drawMarker',
    'drawCircle',
    'drawPolyline',
    'drawPolygon',
    'drawText',
    'editMode',
    'dragMode',
    'removalMode',
]);
  
// https://github.com/geoman-io/leaflet-geoman/blob/develop/src/assets/translations/de.json
const ownTranslation = {
    buttonTitles: {
        drawLineButton: 'Track zeichnen',   // 'Polyline zeichnen'
        drawPolyButton: 'Fläche zeichnen',  // 'Polygon zeichnen'
        drawTextButton: 'Textbox einfügen', // 'Text zeichnen'
    }
};
map.pm.setLang('customName', ownTranslation, 'de');