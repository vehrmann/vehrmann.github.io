function getActualWeather(type) {
    let time =              new Date();
    let utc_hour_offset =   time.getTimezoneOffset() / 60;
    let formatted_datetime_string_utc, img_url, img_content_length;

    const wording = overlay_weather_wording[type];

    do {
        formatted_datetime_string_utc = getFormattedDatetimeString(time, utc_hour_offset, 'url');
        img_url = `https://static.avalanche.report/zamg_meteo/overlays/${wording.url_part}/${formatted_datetime_string_utc}_${wording.url_part}_V2.gif`;
        img_content_length = fetchHeader(img_url, 'Content-Length');
        time.setTime(time.getTime() - 60 * 60 * 1000);
    } while (!img_content_length || img_content_length < 10000);

    const formatted_datetime_string_local = getFormattedDatetimeString(time, 0, 'legend');
    const attribution_text = `${wording.layer_control_label} am ${formatted_datetime_string_local} ` +
        `(Quelle: <a href="https://lawinen.report/weather/map/${wording.url_part}" target="_blank">lawinen.report</a>` +
        ` / <span id="weather_legend_${wording.class_name}" onmouseover="showImage(this.id)" onmouseout="hideImage(this.id)" style="cursor: pointer;">Legende &#9757;</span>)` +
        `<img class="weather_legend_img" src="./icons/weather_legend_${wording.class_name}.jpg">`;

    //alert(img_url)
    //alert(attribution_text)
    return [img_url, attribution_text];
}


const overlay_weather_bbox =            [[45.6167, 9.4], [47.8167, 13.0333]]    // from weathermaps.settings.bbox @ https://gitlab.com/albina-euregio/albina-website/-/blob/master/app/config.json?ref_type=heads
const overlay_weather_wording =         {
    'wind':         {   'layer_control_label':  'Wind',
                        'class_name':           'wind',
                        'url_part':             'wind'
                    },
    'snowheight':   {   'layer_control_label':  'Schneehöhen',
                        'class_name':           'snowheight',
                        'url_part':             'snow-height'
                    }
}

// newsnow forecast intervalls: 6, 12, 24, 48, 72

let [url_wind, attribution_wind] =              getActualWeather('wind');
//let [url_snowheight, attribution_snowheight] =  getActualWeather('snowheight'); // seems to work only in winter

/*
lawine.report
    Filename-Times seem to be in UTC (Lokalzeit ist UTC+1 im Winter sowie UTC+2 im Sommer)
    - temp:
        - stündlich
            um 15:50
            https://static.avalanche.report/zamg_meteo/overlays/temp/2024-01-15_14-00_temp_V2.gif   hat Messwerte, wird als 15 Uhr in Stundenauswahl/Legende angezeigt, erstellt um 15:41 (Lokalzeit?)
            https://static.avalanche.report/zamg_meteo/overlays/temp/2024-01-15_15-00_temp_V2.gif   hat keine Messwerte, wird als 16 Uhr in Stundenauswahl/Legende angezeigt, erstellt um 8:27 (Lokalzeit?) 
        - Vorhersage: 3 Tage
    - wind
        - wie temp
        - zusätzlich PNG mit wind direction (normal map o.ä.)
    - snow height
        - stündlich
        - bis aktuelle Zeit - 2h
        - Bsp: 2024-01-15_12-00_snow-height_V2.gif (Dateiname in UTC!) wurde am 15.1.2024 13:38:20 erstellt (Lokalzeit!))
    - snow new
    - snow line
    - snow diff
*/