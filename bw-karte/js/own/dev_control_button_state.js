
// Add event listener for the 'overlayadd' event
map.on('overlayadd', function (event) {
  updateControlButton(event.name, true);
});

// Add event listener for the 'overlayremove' event
map.on('overlayremove', function (event) {
  updateControlButton(event.name, false);
});

function updateControlButton(controlId, isActive) {
  var controlButton = document.getElementById(controlId);

  if (controlButton) {
    // Adjust margin-right based on the active state
    controlButton.style.marginRight = isActive ? '10px' : '0';
  }
}
