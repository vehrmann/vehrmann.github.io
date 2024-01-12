L.Control.SettingsPanel = L.Control.extend({
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-control-settings leaflet-bar');    // Create a control div with a particular class        
        var icon = L.DomUtil.create('a', 'leaflet-control-settings-icon', container);       // Create the settings icon
        icon.href = '#';
        icon.title = 'Settings';
        icon.role = 'button'

        // Create the settings content container (hidden by default)
        var content = L.DomUtil.create('div', 'leaflet-control-settings-content', container);
        content.style.display = 'none';

        // Add HTML for settings (inputs, checkboxes, etc.)
        content.innerHTML = '<input type="text" id="settings-input" placeholder="Enter value..."><br>' +
                            '<input type="checkbox" id="settings-checkbox"> Disable Option<br>';

        // Event listeners to show/hide the settings content
        L.DomEvent.on(icon, 'mouseover', function() {
            content.style.display = 'block';
        });
        L.DomEvent.on(container, 'mouseleave', function() {
            content.style.display = 'none';
        });

        L.DomEvent.disableClickPropagation(container);                                  // Make sure we don't drag the map when we interact with the control
        
        return container;
    }
});

// Initialize the settings control 
L.control.settingsPanel = function(opts) {
    return new L.Control.SettingsPanel(opts);
}

// Add the settings control to the map
L.control.settingsPanel({ position: 'bottomright' }).addTo(map);