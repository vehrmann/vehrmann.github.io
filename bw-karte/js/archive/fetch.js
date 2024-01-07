
const src = 'https://strava-heatmap.tiles.freemap.sk/all/purple/14/8733/5719.png';
//const src = 'https://tiles.bergfex.at/styles/bergfex-osm/14/8730/5719@2x.jpg'

const options = {
    headers: {
        'authority':                    'strava-heatmap.tiles.freemap.sk',
        'method':                       'GET',
        'path':                         '/all/purple/13/4390/2888.png',
        'scheme':                       'https',
        'Referer':                      'https://strava-heatmap.tiles.freemap.sk',
        'Accept':                       'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding':              'gzip, deflate, br',
        'Accept-Language':              'de-DE,de;q=0.9,en-GB;q=0.8,en;q=0.7,en-US;q=0.6',
        'Cache-Control':                'max-age=0',
        'Sec-Ch-Ua':                    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile':             '?0',
        'Sec-Ch-Ua-Platform':           '"Windows"',
        'Sec-Fetch-Dest':               'document',
        'Sec-Fetch-Mode':               'navigate',
        'Sec-Fetch-Site':               'none',
        'Sec-Fetch-User':               '?1',
        'Upgrade-Insecure-Requests':    '1',
        'User-Agent':                   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
};

fetch(src, options)
.then(res => res.blob())
.then(blob => {
    document.getElementById("testimg").src = URL.createObjectURL(blob);
});


//document.getElementById("testimg").src = 'https://tiles.bergfex.at/styles/bergfex-osm/14/8730/5719@2x.jpg'