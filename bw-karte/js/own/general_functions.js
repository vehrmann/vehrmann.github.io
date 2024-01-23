// Function to fetch the header of an url (e.g. to check weather image-overlays)
function fetchHeader(url, header_item) {
    try {
        let req=new XMLHttpRequest();
        req.open("HEAD", url, false);
        req.send(null);
        if(req.status== 200){
            return req.getResponseHeader(header_item);
        }
        else return false;
    } catch(er) {
        return er.message;
    }
}


// Function to fetch JSON (e.g. avalanche bulletin ratings)
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject('Error fetching JSON');
                }
            }
        };
        xhr.send();
    });
}


// Function to format datetime object, locale is e.g. 'de-DE' and can be used for country specific datetime formats
function getFormattedDatetime(datetime, locale, format) {
    let weekdays_de = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    let weekdays_en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let yyyy =        datetime.getFullYear();
    let mm =          (datetime.getMonth() + 1).toString().padStart(2, '0');
    let dd =          datetime.getDate().toString().padStart(2, '0');
    let hh =          datetime.getHours().toString().padStart(2, '0');
    let min =         datetime.getMinutes().toString().padStart(2, '0');

    let formatted_datetime = ''
    switch(format) {
        case 'yyyy-mm-dd':
            formatted_datetime = `${yyyy}-${mm}-${dd}`
            break;
        case 'dd.mm.yyyy':
            formatted_datetime = `${dd}.${mm}.${yyyy}`
            break;
        case 'dd.mm.yyyy hh:mm':
            formatted_datetime = `${dd}.${mm}.${yyyy} ${hh}:${min}`
            break;
        case 'DD, dd.mm.yyyy':
            formatted_datetime = `${weekdays_de[datetime.getDay()]}, ${dd}.${mm}.${yyyy}`
            break;
        case 'DD, dd.mm.yyyy hh:mm':
            formatted_datetime = `${weekdays_de[datetime.getDay()]}, ${dd}.${mm}.${yyyy} ${hh}:${min}`
            break;            
    }
    return formatted_datetime
}

// used in map_layers_weather.js
function getFormattedDatetimeString(datetime, hour_offset, format_type) {
    const year =    datetime.getFullYear();
    const month =   ('0' + (datetime.getMonth() + 1)).slice(-2);      // add 1 to month because months are zero-indexed
    const day =     ('0' + datetime.getDate()).slice(-2);
    const hours =   ('0' + (datetime.getHours() + hour_offset) ).slice(-2)
    let formatted_datetime_string;
    switch(format_type) {
        case 'url':
            formatted_datetime_string = `${year}-${month}-${day}_${hours}-00` 
            break;
        case 'legend':
            formatted_datetime_string = `${day}.${month}.${year} ${hours}:00 Uhr`
            break;
    }
    return formatted_datetime_string
}



// Iterate through the labels to find and insert headers from the group-headers-list as well as separator-divs
function add_headers(labels, group_headers) {
    labels.forEach(label => {
        let label_text = label.textContent.trim();
        if (label_text in group_headers) {

            // insert separator-div (=line) if necessary
            let separator_div = document.createElement('div');
            separator_div.className = 'leaflet-control-layers-separator';

            // do not add a separator-div before the first header (first baselayer-header does not need one, first overlay-header already has one)                
            if (!group_headers[label_text].first_item) {
                label.parentNode.insertBefore(separator_div, label);
            }

            // insert header-div
            let header_div =        document.createElement('div');
            header_div.className =  "leaflet-control-layers-custom-header"
            let header_label =      document.createElement('label');
            let header_text =       group_headers[label_text].header
            header_label.textContent = header_text;

            header_div.appendChild(header_label);

            // add a opacity slider (= html input element) if specified
            if ( group_headers[label_text].opacity_slider ) {
                let header_input = Object.assign(document.createElement('input'), header_input_attributes);
                header_input.setAttribute('id', header_text);

                // event listener so that the opacity of the corresponding layers is changed upon slider movement
                header_input.addEventListener('input', function () {
                    updateOverlayOpacity(this.id, this.value);
                    if (this.id == 'Lawinenlage') {                     // Needed to update opacity of avalancherisk-overlays correctly when switching between dates 
                        opacity_overlay_avalancherisk = this.value
                    }
                });

                header_input.value = group_headers[label_text].default_opacity
                header_div.appendChild(header_input);
            }
            label.parentNode.insertBefore(header_div, label);
        }
    });

    // Iterate through the labels and remove trailing dots (needed naming convention otherwise names can't be used multiple times)
    labels.forEach(label => {
        let second_span = label.querySelector('span:nth-child(2)');
        if (second_span) {
            second_span.textContent = second_span.textContent.replace(/\.*$/, '');      // Removes one or more trailing dots
        }
    });
}


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