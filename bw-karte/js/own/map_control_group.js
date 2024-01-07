function group_map_control() {

    let group_headers_baselayers = {
        'Swisstopo':                'Topo',
        'ESRI..':                   'Satellit',    
        'OpenStreetMap':            'Straße'
    };

    let group_headers_overlays = {
        'OpenSnowMap':              'Wintersport',
        'Low Resolution 10m/20m':   'Hangneigung',
        'Rotwandgebiet':            'Schutzgebiete'
    };

    let labels_baselayers = document.querySelectorAll('.leaflet-control-layers-base label');
    let labels_overlays = document.querySelectorAll('.leaflet-control-layers-overlays label');

    add_headers(labels_baselayers, group_headers_baselayers);
    add_headers(labels_overlays, group_headers_overlays);

    // Iterate through the labels to find and insert headers from the group-headers-list as well as seperator-divs
    function add_headers(labels, group_headers) {
        let first_seperator = true;
        labels.forEach(label => {
            let label_text = label.textContent.trim();
            if (label_text in group_headers) {

                let separator_div = document.createElement('div');
                separator_div.className = 'leaflet-control-layers-separator';

                let header_label = document.createElement('label');
                header_label.className = "leaflet-control-layers-custom-header"
                header_label.textContent = group_headers[label_text];

                // do not add a seperator-div before the first header (first baselayer-header does not need one, first overlay-header already has one)
                if (first_seperator) {
                    first_seperator = false;
                } else {
                    label.parentNode.insertBefore(separator_div, label);
                }

                label.parentNode.insertBefore(header_label, label);
            }
        });

        // Iterate through the labels and remove trailing dots
        labels.forEach(label => {
            let second_span = label.querySelector('span:nth-child(2)');
            if (second_span) {
                second_span.textContent = second_span.textContent.replace(/\.*$/, '');      // Removes one or more trailing dots
            }
        }); 
    }
}