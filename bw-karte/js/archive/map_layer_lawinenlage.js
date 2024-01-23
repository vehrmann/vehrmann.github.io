let url_json_lawinenlage_atde = 'https://www.avalanche-warnings.eu/api/report-current?service-id=7';    // LLB Bayern, delivers overlay for all Austrian + Bavarian services
let url_path_overlay_lawinenlage_atde = 'https://crossrisk.s3.eu-central-1.amazonaws.com/';             // check if this might change and can be read from somewhere else

fetchJson(url_json_lawinenlage_atde)
.then(data => {
    let lawinenlage_atde_published_at_raw = new Date(data.data['0'].published_at);
    let lawinenlage_atde_published_at = getFormattedDate(lawinenlage_atde_published_at_raw, 'de-DE', 'dd.mm.yyyy, hh:mm') + ' Uhr'

    let url_overlay_lawinenlage_atde_am = url_path_overlay_lawinenlage_atde + data.overlay.overlay_png_am;
    let url_overlay_lawinenlage_atde_pm = url_path_overlay_lawinenlage_atde + data.overlay.overlay_png_pm;

    let maxx = data.overlay.overlay_extent_maxx;    // 16.37244
    let maxy = data.overlay.overlay_extent_maxy;    // 48.320660844984
    let minx = data.overlay.overlay_extent_minx;    // 9.53079
    let miny = data.overlay.overlay_extent_miny;    // 45.995097581838
    let bbox_overlay_lawinenlage_atde = [[miny, minx], [maxy, maxx]];

    // when defining imageoverlays, urls and bounds? are empty
    lawinenlage_maps[overlay_lawinenlage_atde_am.name].setUrl(url_overlay_lawinenlage_atde_am);
    lawinenlage_maps[overlay_lawinenlage_atde_pm.name].setUrl(url_overlay_lawinenlage_atde_pm);
    lawinenlage_maps[overlay_lawinenlage_atde_am.name].setBounds(bbox_overlay_lawinenlage_atde);
    lawinenlage_maps[overlay_lawinenlage_atde_pm.name].setBounds(bbox_overlay_lawinenlage_atde);

    //lawinenlage_maps[overlay_lawinenlage_am.name].setAttribution('xyz')               // maybe create own function, only getAttribution exists //data.data['0'].service.name / data.data['0'].service.url

    function insertAfter(new_node, reference_node) {
        reference_node.parentNode.insertBefore(new_node, reference_node.nextSibling);
    }

    let label_lawinenlage_atde_published_at = document.createElement("label");
    label_lawinenlage_atde_published_at.textContent = 'ausgegeben am ' + lawinenlage_atde_published_at
    label_lawinenlage_atde_published_at.style.fontSize = '0.9em'
    
    let insert_position = document.querySelector('.layer-control-lawinenlage input').parentNode
    insertAfter(label_lawinenlage_atde_published_at, insert_position);
})
.catch(error => {
    console.error(error);
});