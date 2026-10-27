# Quellen, Daten und Nutzungsrechte

Dieses Projekt verwendet verschiedene freie oder öffentlich zugängliche Quellen. Die zugehörigen Rechte gelten **jeweils für die betreffende Datei**, nicht automatisch für das gesamte Projekt.

## Stern- und Sternbildkataloge

- **D3-Celestial**, Olaf Frohn: Sternkatalog, Namen, Sternbildlinien und Metadaten.
- Projekt: https://github.com/ofrohn/d3-celestial
- Lizenz der mitgelieferten Daten: **BSD-3-Clause**; der Hinweis wird in `public/data/D3-CELESTIAL-LICENSE.txt` aufbewahrt.
- ASTRA verwendet die Katalogdaten lokal, nicht über einen externen Laufzeitdienst.

## Sternbildillustrationen

- **Johan Meuris**, westliche Sternkultur aus dem Projekt **Stellarium**.
- Quelle: https://github.com/Stellarium/stellarium-skycultures/tree/master/western
- Beschreibung mit Lizenzhinweis: https://github.com/Stellarium/stellarium-skycultures/blob/master/western/description.md
- Lizenz: **Free Art License 1.3 (Licence Art Libre)**, https://artlibre.org/licence/lal/en/
- Die 25 unveränderten Originalillustrationen liegen als WebP-Dateien unter `public/constellation-art/`. Ein gesonderter Bilddownload ist nicht erforderlich.
- Rechtehinweis und Link zur Lizenz erscheinen ebenfalls **unterhalb der Sternbildliste**.
- Die Illustrationen stellen Sternbilder künstlerisch dar; ihre Konturen sind keine Projektion der Kataloglinien.
- Bei einer Weitergabe oder Bearbeitung der Bilder müssen die Bedingungen der Free Art License eingehalten werden.

## Erdtexturen

- Tagtextur: https://github.com/mrdoob/three.js/blob/master/examples/textures/planets/earth_atmos_2048.jpg
- Nachtbeleuchtung: https://github.com/mrdoob/three.js/blob/master/examples/textures/planets/earth_lights_2048.png
- Höhentextur: https://github.com/vasturiano/three-globe/blob/master/example/img/earth-topology.png
- Diese Dateien liegen bereits lokal im Verzeichnis `public/`. Ein zusätzliches Asset-Skript wird nicht benötigt. Die genaue Rechtekette der Originalbilder sollte vor einer öffentlichen Weiterverbreitung anhand der Quelldateien geprüft werden.

## Hintergrundbilder

- **Startseite / Erde**: echte NASA/ESA-Hubble-Aufnahme der Region **N44 (LHA 120-N44)** in der Großen Magellanschen Wolke, 3840 × 2160 Pixel.
- Offizielle Bildseite: https://esahubble.org/images/potm2608a/
- Originale 4K-Desktopdatei (extern eingebunden, ohne lokale Qualitätsreduktion): https://cdn.esahubble.org/archives/images/wallpaper_uhd/potm2608a.jpg
- **Urhebernachweis (vollständig)**: ESA/Hubble & NASA, D. Gouliermis.
- **Lizenz**: Creative Commons Attribution 4.0 International, https://creativecommons.org/licenses/by/4.0/ ; kostenlose Wiedergabe mit sichtbarer Quellenangabe. Die Quellenangabe ist auf der Startseite als Link eingeblendet.
- **Gestaltung**: Das Foto bleibt in seiner ursprünglichen Bildauflösung erhalten; lediglich die Anzeige wird per CSS dezent abgedunkelt und in die Bildschirmfläche eingepasst. Es wurden keine künstlichen Sternpunkte ergänzt.
- **Technischer Hinweis**: Die Startseite lädt das Bild vom offiziellen ESA/Hubble-CDN. Dafür ist beim Besuch eine Internetverbindung erforderlich. Das alte lokale Hintergrundbild `public/earth-background.webp` wurde entfernt.
- **Sternkarte**: `public/space-background.jpg` bleibt **unverändert**. Ihre genaue Ursprungslizenz ist weiterhin gesondert zu dokumentieren.

## Astronomische Berechnungen

- **astronomy-engine**: https://github.com/cosinekitty/astronomy
- **Three.js / react-globe.gl**: https://github.com/mrdoob/three.js und https://github.com/vasturiano/react-globe.gl
- **tz-lookup**: https://github.com/darkskyapp/tz-lookup-oss
- Für alle npm-Abhängigkeiten gelten die Lizenzen ihrer jeweiligen Pakete.

## Screenshots

Die Dateien in `docs/screenshots/` sind aufgenommene Beispielansichten der entwickelten ASTRA-Oberfläche. Sie dienen ausschließlich der Projektdokumentation.
