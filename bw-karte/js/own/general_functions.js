// Function to fetch the header of an url (e.g. to check weather image-overlays
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


// Function to fetch JSON
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


// Function to format date object
function getFormattedDate(date, locale, format) {
    let formatted_date = '';

    if (format == 'dd.mm.yyyy, hh:mm') {
        formatted_date = date.toLocaleString(locale, {
            day:    '2-digit',
            month:  '2-digit',
            year:   'numeric',
            hour:   '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
    return formatted_date
}