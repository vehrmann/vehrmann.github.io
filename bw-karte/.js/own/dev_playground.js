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