function createSingleTileLayer(layer_object) {
    let layer_url, layer_options, tile_layer;

    /* not needed here yet
    // vector overlay (avalancherisk)
    if (layer_object.vectoroverlay) {
        layer_url = layer_object.url.replace(/\s/g, '');
        tile_layer = L.vectorGrid.protobuf(layer_url);
    */

    // ImageOverlay (weather maps)
    if (layer_object.imageoverlay) {
        layer_url = layer_object.url.replace(/\s/g, '');

        layer_options = {   opacity:        layer_object.opacity,
                            interactive:    layer_object.interactive,
                            class_name:     layer_object.class_name,
                            attribution:    layer_object.attribution
                        };

        tile_layer = L.imageOverlay(layer_url, layer_object.bbox, layer_options);
    // FeatureGroup (Chronotrains, Schutzgebiete)
    } else if (layer_object.featuregroup) {
        layer_options = {   opacity:        layer_object.opacity,
                            attribution:    layer_object.attribution
                        };
        tile_layer = L.featureGroup(null, layer_options);       // layer is added later
    
    // GeoJSON (Skitourenabende)
    } else if (layer_object.geojson) {
        layer_options = {};
        tile_layer = L.geoJSON(null, layer_options);            // layer is added later

    /* XXX check this
    // WMS
    } else if (layer_object.wms) {
        layer_url = layer_object.url.replace(/\s/g, '');
        layer_options = {   elements:         layer_object.layers,
                            minNativeZoom:  layer_object.minNativeZoom,
                            maxNativeZoom:  layer_object.maxNativeZoom,
                            maxZoom:        layer_object.maxZoom,
                            opacity:        layer_object.opacity,
                            attribution:    layer_object.attribution
                        };
        tile_layer = L.tileLayer.wms( layer_url, layer_options );
    */

    // WMTS
    } else {
        layer_url = layer_object.url.replace(/\s/g, '');
        layer_options = {   ...(layer_object.subdomains ? { subdomains: layer_object.subdomains } : {}),    // nur falls subdomains vorhanden sind, werden sie ausgelesen
                            minNativeZoom:  layer_object.minNativeZoom,
                            maxNativeZoom:  layer_object.maxNativeZoom,
                            maxZoom:        layer_object.maxZoom,
                            opacity:        layer_object.opacity,
                            attribution:    layer_object.attribution
                        };
        tile_layer = L.tileLayer( layer_url, layer_options );
    };

    return tile_layer;
}


function groupLayerControls() {
    const labels = document.querySelectorAll('.leaflet-control-layers-base label, .leaflet-control-layers-overlays label');
    const meta_map = buildLayerLabelMetaMap(tile_layer_groups);
    addLayerControlGroupHeaders(labels, meta_map);
}


function buildLayerLabelMetaMap(groups) {
    const meta_map = new Map();

    for (const [group, config] of Object.entries(groups)) {
        let first_item_after_header, header_text;
        let header_count = 0;

        for (let i = 0; i < config.elements.length; i++) {
            const [type, entry] = config.elements[i];

            if (type === 'header') {
                header_text = entry;
                header_count++;
                first_item_after_header = true;  // reset first_item_after_header for each new header
            } else if (first_item_after_header && type === 'layer') {
                const key = entry.label || entry.name;
                if (!meta_map.has(key)) {
                    meta_map.set(key, {
                        header: header_text,
                        separator_needed: header_count > 1,
                        opacity_slider: header_count === 1 && config.opacity_slider,    // only add opacity slider for the first header in the group and if it is needed
                        default_opacity: config.default_opacity ?? 1.0
                    });
                    first_item_after_header = false;
                }
            }
        }
    }

    return meta_map;
}


function addLayerControlGroupHeaders(labels, meta_map) {
    labels.forEach(label => {
        const label_text = label.textContent.trim();
        const meta = meta_map.get(label_text);

        if (meta) {
            const container = label.parentNode;

            // Separator
            if (meta.separator_needed) {
                const separator = document.createElement('div');
                separator.className = 'leaflet-control-layers-separator';
                container.insertBefore(separator, label);
            }

            // Header
            const header_div = document.createElement('div');
            header_div.className = 'leaflet-control-layers-custom-header';

            const header_label = document.createElement('label');
            header_label.textContent = meta.header;
            header_div.appendChild(header_label);

            // Opacity slider
            if (meta.opacity_slider) {
                const input = Object.assign(document.createElement('input'), general_map_settings.header_input_attributes);
                input.id = meta.header;
                input.value = meta.default_opacity;
                input.addEventListener('input', () => updateOverlayOpacity(meta.header, input.value));
                header_div.appendChild(input);
            }

            container.insertBefore(header_div, label);
        }

        // Remove trailing dots from second span (dots needed to name layers with the same name)
        const second_span = label.querySelector('span:nth-child(2)');
        if (second_span) {
            second_span.textContent = second_span.textContent.replace(/\.*$/, '');
        }
    });
}


function updateOverlayOpacity(header_id, opacity_value) {
    for (const [group, config] of Object.entries(tile_layer_groups)) {
        if (!config.opacity_slider) continue;

        const group_header = config.elements.find(([type]) => type === 'header')?.[1];
        if (group_header !== header_id) continue;

        for (const [type, layer] of config.elements) {
            if (type !== 'layer') continue;

            const tile_layer = tile_layers[group]?.[layer.name];
            if (tile_layer?.setOpacity) {
                tile_layer.setOpacity(opacity_value);
            } else if (tile_layer?.setStyle) {
                tile_layer.setStyle({ opacity: opacity_value, fillOpacity: opacity_value });
            }
        }
    }
}


// functions to show and hide overlay_weather_legends as well as potentially further legends
function showImage(prev_sibling_id) {
    document.getElementById(prev_sibling_id).nextElementSibling.style.display = 'block';
}
function hideImage(prev_sibling_id) {
    document.getElementById(prev_sibling_id).nextElementSibling.style.display = 'none';
}