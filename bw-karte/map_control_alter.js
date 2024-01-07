function alter_map_control() {

    let group_headers = {
        'Swisstopo':                'Topo',
        'ESRI..':                   'Satellit',    
        'BKG':                      'Straße',
        'OpenSnowMap':              'Wintersport',
        'Low Resolution 10m/20m':   'Hangneigung',
        'Rotwandgebiet':            'Schutzgebiete'
    };

    let labels_baselayer = document.querySelectorAll('.leaflet-control-layers-base label');
    let labels_overlays = document.querySelectorAll('.leaflet-control-layers-overlays label');

    add_headers(labels_baselayer);
    add_headers(labels_overlays);

    // Iterate through the labels to find and insert headers from the list as well as seperator-divs
    function add_headers(labels) {
        let first_seperator = true;
        labels.forEach(label => {
            let label_text = label.textContent.trim();
            if (label_text in group_headers) {

                let separator_div = document.createElement('div');
                separator_div.className = 'leaflet-control-layers-separator';

                let header_label = document.createElement('label');
                header_label.className = "leaflet-control-layers-custom-header"
                header_label.textContent = group_headers[label_text];

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