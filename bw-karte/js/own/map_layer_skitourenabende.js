let data =
{
    "type": "FeatureCollection",
    "features": [
      {
        "type":     "Feature",
        "geometry": {
          "type":         "Point",
          "coordinates":  [ 12.0391, 47.6643 ]
        },
        "properties": {
          "name":                   "Speck-Alm",
          "skitourenabend_day":     "Mittwoch",
          "skitourenabend_start":   "9:00 Uhr",
          "skitourenabend_end":     "21:30 Uhr",
          "website":                "https://www.speck-alm.de/#kontakt",
          "comment":                "nur Barzahlung",
          "author_rating":          "4",
          "last_checked":           "2024-01-24"
        }
      },
  
      {
        "type":     "Feature",
        "geometry": {
          "type":         "Point",
          "coordinates":  [ 12.0383, 47.6640 ]
        },
        "properties": {
          "name":                   "Walleralm",
          "skitourenabend_day":     "Mittwoch",
          "skitourenabend_start":   "8:30 Uhr",
          "skitourenabend_end":     "21:30 Uhr",
          "website":                "https://www.walleralm.de/",
          "comment":                "",
          "author_rating":          "",
          "last_checked":           "2024-01-24"
        }
      }
  
    ]
}

layer_skitourenabende = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, 
            //{ icon: yourCustomIcon }
        );
    },
    onEachFeature: function (feature, layer) {
        let header =    "<h4>" + feature.properties.name + "</h4>"
        let day =       "<div><strong>Skitourenabend:</strong> " + feature.properties.skitourenabend_day + " (bis " + feature.properties.skitourenabend_end + ")</div>"
        let comment =   feature.properties.comment ? "<div><strong>Kommentar:</strong> " + feature.properties.comment + "</div>" : "";
        let rating =    "<div><strong>Persönliche Bewertung:</strong> " + (feature.properties.author_rating ? feature.properties.author_rating : "noch nicht bewertet") + "</div>"
        let website =   "<div><a href='" + feature.properties.website + "' target='_blank'>" + feature.properties.website + "</a></div>"
        let checked =   "<br><div style='font-size: smaller'>Stand: " + feature.properties.last_checked + "</div>"

        let popup_content = header + 
                            day +
                            comment +
                            rating +
                            website +
                            checked
        layer.bindPopup(popup_content);
    }
})

wintersports_maps[overlay_wintersports_skitourenabende.name].addLayer(layer_skitourenabende);