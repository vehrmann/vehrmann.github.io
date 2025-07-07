// Function to check if an url exists
function checkURL(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                //console.log('URL exists:', url);
                return response;
            } else {
                throw new Error(`URL does not exist: ${url}`);
            }
        })
        .catch(error => {
            //console.error(error.message);
            return false;
        });
}


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