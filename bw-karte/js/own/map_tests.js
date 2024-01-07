let quiz_buttons = new L.cascadeButtons(
    [   {
            ignoreActiveState:  false,                              // changes the button style when clicked, defined in L.cascadeButtons.css
            icon:       'quiz-toggle fas fa-mountain',
            title:      'Quiz Alps',
            command:    () => {
            }
        }
    ],
    {position:'topleft', direction:'vertical'});
quiz_buttons.addTo(map);