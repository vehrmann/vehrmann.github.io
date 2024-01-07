// BLUR & SATURATION //
function setBlurValue(blurValue) {
	document.getElementById("valueBlur").innerHTML	= blurValue + "px";
  document.documentElement.style.setProperty('--slopes-blur', blurValue + "px");
}
var blurValue = getComputedStyle(document.documentElement).getPropertyValue('--slopes-blur').slice(0, -2);
document.getElementById("slideBlur").value = parseInt(blurValue);
setBlurValue(blurValue);

function setSaturationValue(saturationValue) {
	document.getElementById("valueSaturation").innerHTML	= saturationValue * 100 + "%";
  document.documentElement.style.setProperty('--slopes-saturation', saturationValue * 100 + "%");
}
var saturationValue = getComputedStyle(document.documentElement).getPropertyValue('--slopes-saturation').slice(0, -1) / 100;
document.getElementById("slideSaturation").value = saturationValue;
setSaturationValue(saturationValue);

function toggleLayerFilter(checkbox, filterID) {
	if(checkbox.checked) {
  } else {
  }
}

function toggleLayerVisibility(layerID) {
	layerID = layerID.replace('checkbox','').toLowerCase();
	layerID = window[layerID];
  if(map.hasLayer(layerID)) {
    map.removeLayer(layerID);
  } else {
  	map.addLayer(layerID);
  }
}

// set sliders and value fields to respective opacity value
function sliderPercentage(value) {
	return Math.floor(value * 100) + '%';
}

function setOpacityValues(opacityType, opacityValue) {
	document.getElementById("slide" + opacityType).value			= opacityValue;
	document.getElementById("value" + opacityType).innerHTML	= sliderPercentage(opacityValue);
}

setOpacityValues("Slopes",		slopesOpacity);


// Functions for overlay opacity, value displaying and updating of heatmap
function updateOverlayOpacity(overlayType, opacityValue, id) {
	switch(overlayType) {
    case slopes:
      slopesOpacity = opacityValue;
      break;
    case heatmap:
      heatmapOpacity = opacityValue;
      break;
    case skiroutes:
      skiroutesOpacity = opacityValue;
      break;
  }

  overlayType.setOpacity(opacityValue);
  document.getElementById(id.replace("slide", "value")).innerHTML = sliderPercentage(opacityValue);
}



/*
<div class="overlay-row">
<div class="overlay-label">
  <span>Hangneigung</span>
</div>
<div class="overlay-slider">
  <input
      id="slideSlopes"
      type="range" min="0" max="1" step="0.01"
      onchange="updateOverlayOpacity(slopes, this.value, this.id)">
</div>
<div class="overlay-value">
  <span id="valueSlopes"></span>
</div>
<div class="overlay-checkbox">
  <input
      id="checkboxSlopes"
      type="checkbox" checked
      onclick="toggleLayerVisibility(this.id)">
</div>
</div>
*/