*****************************************************************************************
*        DIGITALES LiDAR GELÄNDEMODELL VON ÖSTERREICH, 1 Bogensekunde, Version 2        *
*****************************************************************************************


* Zusammengestellt und resampled von Sonny
* Website: https://sonny.4lima.de
* Twitter: https://twitter.com/SonnyLidarDTMs
* Alternativ gibt es auf der Website das Geländemodell auch noch in anderen Gitterweiten.

======================================================================================


Dieses digitale Höhenmodell (hier ein digitales Geländemodell DGM - im Gegensatz zu einem digitalen Oberflächenmodell DOM) verwendet per präziser LiDAR Technik erzeugte Geländemodelle als Datengrundlage. Diese wurden mittels Airborne Laserscan (ALS)-Befliegungen vermessen. Deshalb der große Vorteil dieses Modells: Die Abweichungen der Geländehöhen in diesem Modell im Vergleich zu den Laserhöhen der Quelldaten, speziell in bergigem und hügeligem Terrain, sind deutlich geringer als jene der verbreiteten SRTM-Kacheln.

Für das vollständige Auffüllen der Gradkacheln außerhalb der Landes-Quelldaten habe ich die für das jeweilige Gebiet aktuell besten Opendata-DGMs verwendet. Diese stammen entweder ebenfalls aus LiDAR-Vermessungen. Oder ansonsten Höhendaten der SRTM-Mission https://de.wikipedia.org/wiki/SRTM-Daten (SRTM Version 3.0 Global 1" DTMs, Download: https://dwtkns.com/srtm30m/ ) oder auch von Viewfinder Panoramas by Jonathan de Ferranti (1" DTMs, http://viewfinderpanoramas.org/dem3.html ). Alle Einzel-Dateien wurden neben- bzw. übereinander gelegt und mit 0.5" (0.5 Bogensekunde = 0,5/3600 Grad, entspricht in etwa 10 x 15 Meter) bzw. 1" (1 Bogensekunde = 1/3600 Grad, entspricht in etwa 20 x 30 Meter) bzw. 3" (3 Bogensekunden = 3/3600 Grad, entspricht in etwa 60 x 90 Meter) resampled.

Als Dateiformat (.hgt) wurde das weltweit verbreitete SRTM Format gewählt. Jede Höhenkacheldatei (.hgt) deckt dabei genau einen Bereich von 1 x 1° ab, deren Bereich sich automatisch aus dem Dateinamen ergibt. Der Dateiname bezeichnet die südwestliche Ecke, z.b. "N47E014.hgt" deckt den Bereich der geographischen Breite von N47° bis N48° und einer geographischen Länge von E14° bis E15° ab.


PROJEKTION und DATEIFORMAT
**************************

- Koordinatenreferenzsystem: EPSG:4326
- Geodätisches Datum: WGS 84
- Koordinatensystem: Geographische Grad
- 1 Dateikachel besteht genau aus 7201 x 7201 (0.5" Modell) bzw. 3601 x 3601 (1" Modell) bzw. 1201 x 1201 (3" Modell) Höhenpixel
- Horizontale Auflösung: 0.5 Bogensekunde = 0.5/3600 Grad = 0.000128889 Grad bzw. 1 Bogensekunde = 1/3600 Grad = 0.000277778 Grad (1" Modell) bzw. 3 Bogensekunden = 3/3600 Grad = 0.000833333 Grad (3" Modell)
- Vertikales Datum: Unverändertes Höhen-Bezugssystem der Quelldaten. Normalerweise das nationale, auf Höhe über dem mittleren Meeresspiegel basierende System
- Vertikale Auflösung: 1 Meter
- Byteorder: Motorola (Big Endian = most significant byte first)
- Dateigröße einer Kachel: 25934402 Bytes (1" Modell) bzw. 2884802 Bytes (3" Modell)


VERSIONEN
*********

v1: Erste Version
v2: Verwendung neuester LiDAR-Daten


QUELLEN und LIZENZ
******************

Dieses Geländemodell ist OFFEN, FREI und KOSTENLOS verwendbar, unterliegt aber der LIZENZ: Creative Commons Namensnennung 4.0 (CC BY 4.0), siehe https://creativecommons.org/licenses/by/4.0/deed.de

Ihr dürft daher dessen Daten vervielfältigen, verbreiten, öffentlich zugänglich machen, auch kommerziell nutzen, sowie Abwandlungen und Bearbeitungen des Inhalts anfertigen. Ihr solltet bei Verwendung meinen Namen (Sonny), sowie die Website (siehe ganz oben) erwähnen, herzlichen Dank!


Für das Geländemodell dieses Gebiets wurden folgende FREIE Opendata Quelldaten verwendet:


- Amt der Burgenländischen Landesregierung: DGM 5 Meter
https://geodaten.bgld.gv.at/de/downloads/fachdaten.html

- Amt der Kärntner Landesregierung: DGM 5 Meter
https://www.data.gv.at/katalog/dataset/a188992b-4071-45c3-99ce-65662395ebe6

- Amt der Niederösterreichischen Landesregierung: DGM 10 Meter 
https://noe.gv.at/noe/OGD_Detailseite.html?id=46a7a06a-f69b-405e-aac2-77f775449ad3

- Amt der Oberösterreichischen Landesregierung: DGM 10 Meter
https://www.land-oberoesterreich.gv.at/124923.htm

- Amt der Salzburger Landesregierung: DGM 5 Meter
https://service.salzburg.gv.at/ogd/client/showDetail/d585e816-1a36-4c76-b2dc-6db487d22ca3

- Amt der Steiermärkischen Landesregierung: DGM 10 Meter
https://data.steiermark.at/cms/beitrag/11822084/97108894/?AppInt_OGD_ID=63

- Amt der Tiroler Landesregierung: DGM 10 Meter
https://www.data.gv.at/katalog/dataset/land-tirol_tirolgelnde

- Amt der Vorarlberger Landesregierung: DGM 10 Meter
https://vorarlberg.at/-/geodaten-des-vorarlberger-geografischen-informationssystems-vogis-nutzen?article_id=327499

- Magistrat der Stadt Wien: DGM 1 Meter
https://www.wien.gv.at/stadtentwicklung/stadtvermessung/geodaten/dgm/

- Gebiete außerhalb der Landes-Quelldaten: siehe Datei "_Datasources.txt" in den Ressourcen "DTM Europe 1" oder "DTM Europe 3"
https://sonny.4lima.de


======================================================================================
======================================================================================



********************************************************************************
*        DIGITAL LiDAR TERRAIN MODEL OF AUSTRIA, 1 arcsecond, Version 2        *
********************************************************************************


* Compiled and resampled by Sonny
* Website: https://sonny.4lima.de
* Twitter: https://twitter.com/SonnyLidarDTMs
* Alternatively you can also find the Terrain model with other Grid spaces on the Website.

======================================================================================

This Digital Elevation Model (exactly: Digital Terrain Model DTM - in contrast to Digital surface model DSM) is based on precise LiDAR elevation sources. They have been surveyed using the method of Airborne Laserscan (ALS). The difference of my model's elevations, especially in rocky terrain, are significant less compared to those of the popular original SRTM-datasets.

The areas outside of the country's source data are filled with the best available Opensource elevation data of the particular region. Either these are based on LiDAR data too. Or otherwise from the SRTM-Mission https://en.wikipedia.org/wiki/Shuttle_Radar_Topography_Mission (SRTM Version 3.0 Global 1" DTMs, Download: https://dwtkns.com/srtm30m/ ) or also from Viewfinder Panoramas by Jonathan de Ferranti (1" DTMs, http://viewfinderpanoramas.org/dem3.html ). The source files have been aranged next and above each other and resampled with a sample spacing of 1" (1 arcseconds = 1/3600 degree, equals about 20 x 30 meters) or 3" (3 arcseconds = 3/3600 degree, equals about 60 x 90 meters).

I used the worldwide popular file format of the SRTM datasets (.hgt files). Each elevation file (.hgt) represends exactly 1 x 1°, which could automatically derived from the filename. The filename specifies the southwest corner, e.g. "N47E014.hgt" represends an area from N47° to N48° latitude and E14° to E15° longitude.


PROJECTION and FILEFORMAT
*************************

- Coordinate Reference System: EPSG:4326 
- Geodetic date: WGS 84
- Coordinate system: geographic degrees
- 1 file contains 3601 x 3601 (1" model) or 1201 x 1201 (3" model) elevation pixels
- Horizontal resolution: 1 arcsecond = 1/3600 degree = 0.000277778 degree (1" model) or 3 arcseconds = 3/3600 degree = 0.000833333 degree (3" model)
- Vertical datum: Unmodified elevation system of the source data. Usually the national elevation system, based on Height above mean sea level
- Vertical resolution: 1 meter
- Byteorder: Motorola (Big Endian = most significant byte first)
- Filesize of one file: 25934402 Bytes (1" model) or 2884802 Bytes (3" model)


VERSIONS
********

v1: Initial Release
v2: Integrated latest LiDAR data


SOURCES und LICENCE
*******************

This Terrain Model is OPEN, FREE and WITHOUT CHARGE. But it is licensed using the following LICENCE: Creative Commons Attribution 4.0 (CC BY 4.0),
look at https://creativecommons.org/licenses/by/4.0/deed.en

You are allowed to copy, redistribute the material in any medium or format as well as remix, transform, and build upon the material for any purpose, even commercially. Please mention my name (Sonny) and the Website (see at the top), thank you!


To create the terrain model of this territory I used the following FREE Opendata sources:


- Amt der Burgenländischen Landesregierung: DGM 5 Meter
https://geodaten.bgld.gv.at/de/downloads/fachdaten.html

- Amt der Kärntner Landesregierung: DGM 5 Meter
https://www.data.gv.at/katalog/dataset/a188992b-4071-45c3-99ce-65662395ebe6

- Amt der Niederösterreichischen Landesregierung: DGM 10 Meter 
https://noe.gv.at/noe/OGD_Detailseite.html?id=46a7a06a-f69b-405e-aac2-77f775449ad3

- Amt der Oberösterreichischen Landesregierung: DGM 10 Meter
https://www.land-oberoesterreich.gv.at/124923.htm

- Amt der Salzburger Landesregierung: DGM 5 Meter
https://service.salzburg.gv.at/ogd/client/showDetail/d585e816-1a36-4c76-b2dc-6db487d22ca3

- Amt der Steiermärkischen Landesregierung: DGM 10 Meter
https://data.steiermark.at/cms/beitrag/11822084/97108894/?AppInt_OGD_ID=63

- Amt der Tiroler Landesregierung: DGM 10 Meter
https://www.data.gv.at/katalog/dataset/land-tirol_tirolgelnde

- Amt der Vorarlberger Landesregierung: DGM 10 Meter
https://vorarlberg.at/-/geodaten-des-vorarlberger-geografischen-informationssystems-vogis-nutzen?article_id=327499

- Magistrat der Stadt Wien: DGM 1 Meter
https://www.wien.gv.at/stadtentwicklung/stadtvermessung/geodaten/dgm/

- Areas outside of the country's source data: open file "_Datasources.txt" within the ressources "DTM Europe 1" or "DTM Europe 3"
https://sonny.4lima.de
