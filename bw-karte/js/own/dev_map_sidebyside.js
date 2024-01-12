let l1 = base_maps[baselayer_topo_bergfex.name].addTo(map)
let l2 = base_maps[baselayer_topo_mapycz.name].addTo(map)
L.control.sideBySide(l1, l2).addTo(map);