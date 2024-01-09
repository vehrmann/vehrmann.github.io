let layer_control_bergwacht = L.control.layers(null, null, {position: 'topright'}).addTo(map);
let layer_control_bergwacht_html = layer_control_bergwacht.getContainer()
layer_control_bergwacht_html.className = `${layer_control_bergwacht_html.className} layer-control-bergwacht`