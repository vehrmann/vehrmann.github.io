/* START: DEVELOPMENT STUFF */
function getAllKeys(object) { 
    return Object.getOwnPropertyNames(object)//.filter(item => typeof object[item] === 'function');
}  

function getKeys(object) {
    let keys = Object.keys(object);
    let keys_list;
    keys.forEach( function ( key ) {
        keys_list += `${key}\n`
    });
    return(keys_list)
}

function cons(text) {
    document.getElementById('cons').textContent = text;
}
/* END: DEVELOPMENT STUFF */

/*
var playgroundControl = L.Control.extend({
    options: { position: 'bottomleft' },

    onAdd: function (map) {
        var button = L.DomUtil.create('button', 'custom-control-button');
        button.innerHTML = '0';

        L.DomEvent.on(button, 'click', function () {
            centerToLayer();
        });

        return button;
    }
});

map.addControl(new playgroundControl());
*/