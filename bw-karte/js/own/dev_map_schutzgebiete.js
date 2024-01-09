let layer_control_schutzgebiete = L.control.layers(null, null, {position: 'topright'}).addTo(map);
let layer_control_schutzgebiete_html = layer_control_schutzgebiete.getContainer()
layer_control_schutzgebiete_html.className = `${layer_control_schutzgebiete_html.className} layer-control-schutzgebiete`