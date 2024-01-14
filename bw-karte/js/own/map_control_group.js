function group_map_control() {
    let header_input_attributes = {
        type:       'range',
        min:        '0',
        max:        '1',
        step:       '0.01'
    };

    let group_headers_baselayers = {
        'Swisstopo':                'Topo',
        'ESRI..':                   'Satellit',    
        'OpenStreetMap':            'Straße'
    };

    let group_headers_overlays = {
        'OpenSnowMap':              'Wintersport',
        'Low Resolution 10m/20m':   'Hangneigung',
        'Schneehöhe':               'Schneehöhe',
        'Rotwandgebiet':            'Schutzgebiete',
        'OpenSeaMap':               'Seekarte',
    };

    let labels_baselayers = document.querySelectorAll('.leaflet-control-layers-base label');
    let labels_overlays = document.querySelectorAll('.leaflet-control-layers-overlays label');

    add_headers(labels_baselayers, group_headers_baselayers, false);
    add_headers(labels_overlays, group_headers_overlays, true);

    // Iterate through the labels to find and insert headers from the group-headers-list as well as seperator-divs
    function add_headers(labels, group_headers, add_opacity_sliders) {
        let first_seperator = true;
        labels.forEach(label => {
            let label_text = label.textContent.trim();
            if (label_text in group_headers) {

                // insert seperator-div (=line) if necessary
                let separator_div = document.createElement('div');
                separator_div.className = 'leaflet-control-layers-separator';

                // do not add a seperator-div before the first header (first baselayer-header does not need one, first overlay-header already has one)
                if (first_seperator) {
                    first_seperator = false;
                } else {
                    label.parentNode.insertBefore(separator_div, label);
                }

                // insert header-div
                let header_div =    document.createElement('div');
                header_div.className = "leaflet-control-layers-custom-header"

                let header_label =  document.createElement('label');
                header_label.textContent = group_headers[label_text];

                header_div.appendChild(header_label);

                if (add_opacity_sliders) {
                    let header_input = Object.assign(document.createElement('input'), header_input_attributes);
                    header_input.setAttribute('id', group_headers[label_text]);
                    header_input.setAttribute('onchange', 'updateOverlayOpacity(this.id, this.value)');
                    header_div.appendChild(header_input);
                }
                label.parentNode.insertBefore(header_div, label);
            }
        });

        // Iterate through the labels and remove trailing dots (needed naming convention otherwise names can't be used multiple times)
        labels.forEach(label => {
            let second_span = label.querySelector('span:nth-child(2)');
            if (second_span) {
                second_span.textContent = second_span.textContent.replace(/\.*$/, '');      // Removes one or more trailing dots
            }
        }); 
    }
}

// pretify this function, add opacity to Schutzgebiete. Add blur/saturation (for slopes)
function updateOverlayOpacity(overlay_type, opacity_value) {
    switch(overlay_type) {
        case 'Wintersport':
            overlay_maps[overlay_opensnowmap.name].setOpacity(opacity_value);
            overlay_maps[overlay_skirouten_av_sac.name].setOpacity(opacity_value);
            break;
        case 'Hangneigung':
            overlay_maps[overlay_openslopemap_low.name].setOpacity(opacity_value);
            overlay_maps[overlay_openslopemap_med.name].setOpacity(opacity_value);
            overlay_maps[overlay_openslopemap_high.name].setOpacity(opacity_value);
            overlay_maps[overlay_openslopemap_ultrahigh.name].setOpacity(opacity_value);
            break;
        case 'Seekarte':
            overlay_maps[overlay_openseamap.name].setOpacity(opacity_value);
            break;
        case 'Schneehöhe':
            document.querySelector('canvas').style.opacity = opacity_value;
            break;
        case 'Schutzgebiete':
            //gpx.setOpacity(opacity_value)     // find the proper name of the gpx layer
            break;
    }    
}