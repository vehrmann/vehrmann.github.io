function partAfterComma(number) {
    return parseFloat('0.' + (number + '').split('.')[1]);          // returns only the comma part of a float number
}


function getRowOrCol(byteFraction, bytes) {
    // returns the row number (for a latitude's  byteFraction)
    //          or col number (for a longitude's byteFraction)
    // for finding the right row-col-position in a hgt-file at which the altitude of a coordinate is stored
    return Math.round( byteFraction * (bytes - 1) ) + 1;
}


function getData(file) {
    // reads and returns data from files (e.g. hgt-DTM-files)
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', file, true);
        xhr.responseType = 'arraybuffer';
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
            //if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                if (xhr.status === 200) {
                    //var data = JSON.parse(xhr.responseText);      // useful for JSON- instead of hgt-files
                    var data = new DataView(xhr.response);
                    resolve(data);
                } else {
                    reject(xhr.statusText);
                }
            }
        };
        xhr.send();
    });
}


function getElevation(lat, lon) {
    return new Promise((resolve, reject) => {
        let bytes = 3601;
        let filePath = '../../../hgt/DTM_1/';

        bytes = 7201;
        filePath = '../../../hgt/DTM_0.5/';
        //let { fileNameLat, fileNameLon } = getCoordDirection(lat, lon);

        // 1ARC / 3601*3601 pixels from https://sonny.4lima.de
        //let hgtFile = filePath + fileNameLat + parseInt(lat) + fileNameLon + String(parseInt(lon)).padStart(3, 0) + '.hgt';
        let hgtFile = `${filePath}N${parseInt(lat)}E${String(parseInt(lon)).padStart(3, 0)}.hgt`;

        let row = getRowOrCol(1 - partAfterComma(lat), bytes);
        let col = getRowOrCol(partAfterComma(lon), bytes);
        let cell = row * bytes - (bytes - col);                 // row by row, cell(col) by cell(col) 1,2,...,3600,3601 -> 3602,3603,...7201,7202 -> ... -> from NW to NE to SW to SE
                                                                // cell = 1;                NW 49.9999 , 15.0
                                                                // cell = 3601;             NE 49.9999 , 15.9999
                                                                // cell = 3601 * 3600 + 1;  SW 49.0    , 15.0
                                                                // cell = 3601 * 3601;      SE 49.0    , 15.9999
        let offset = (cell - 1) * 2;                            // equals index of bytelist

        getData(hgtFile)
            .then(function (data) {
                // DTM0,5" data.byteLength = 103708802 ( = 7201 * 7201 * 2 )
                // DTM1"   data.byteLength = 25934402  ( = 3601 * 3601 * 2 )
                // DTM3"   data.byteLength = 2884802   ( = 1201 * 1201 * 2 )
                let ele = data.getInt16(offset, false);
                resolve(ele);

                // result can be cross-checked on https://r.oastatic.com/elevation?format=sjs&locations=47.1234,12.567&callback=alp.jsonp[12595776838]
                // Read the two bytes of elevation data as a big-endian short                
            })
            .catch(function (error) {
                reject(error);
            });
    });
}


function onMapClick(e) {
    let { lat, lng } = e.latlng;
    getElevation(lat, lng)
        .then(altitude => {
            let checkURL = `https://r.oastatic.com/elevation?format=sjs&locations=${lat},${lng}&callback=alp.jsonp[12595776838]`;
            navigator.clipboard.writeText(checkURL);        // copy checkURL to clipboard
            alert(`lat: ${lat.toFixed(4)} / lon: ${lng.toFixed(4)}\nAltitude: ${altitude} meters\n${checkURL}`);
        })
        .catch(error => {
            alert(`Error: ${error}`);
        });
}


L.DomUtil.addClass(map._container,'crosshair-cursor-enabled');
map.on('click', onMapClick);


  
  
  /*
  const track = [
    [47.750, 11.690],
    [47.751, 11.690],
    [47.752, 11.691]];
  
  
  const trackCenter = getTrackCenter(track);
  const fractions = meterToDecimalDegrees(trackCenter.lat, meters = 50);  // step is measured in decimal degrees
  const fractionedTrack = getFractionedTrack(track, fractions);
  
  let elevations = [];
  let currentElevation, previousElevation;
  let startElevation, endElevation;
  let upElevation    = 0;
  let downElevation  = 0;
  
  let prevLat = fractionedTrack[0][0];
  let prevLon = fractionedTrack[0][1];
  
  //todo: group coordinates which are present in the same hgt file to speed up elevation reading
  for (let k = 0; k < fractionedTrack.length; k++) {
      let lat = fractionedTrack[k][0];
      let lon = fractionedTrack[k][1];
  
      getElevation(lat, lon)
        .then(currentElevation => {
          if (k == 0) {
            previousElevation = currentElevation;
          } else {
            con("current:  " + currentElevation)
            con("previous: " + previousElevation)
            if (previousElevation < currentElevation ) {
              upElevation += (currentElevation - previousElevation)
              con("add to up: " + (currentElevation - previousElevation))
            } else {
              // add to down
              downElevation += (previousElevation - currentElevation)
              con("add to down: " + (previousElevation - currentElevation))            
            }
            previousElevation = currentElevation
          }
          if (k == fractionedTrack.length - 1) {
            con("Up: "   + upElevation)
            con("Down: " + downElevation)
          }
        })
        .catch(error => {
          con(error);
        });
  
      //elevations.push( getElevation(lat, lon) );
      if (k > 0) {
          distanceToPrevious = getDistance(lat, lon, prevLat, prevLon);
          //con("Distance: " + distanceToPrevious.toFixed(2) + "m");
          prevLat = lat;
          prevLon = lon;
      }
  }
*/