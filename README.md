# 🕌 Mein Gebet – Schritt für Schritt

Eine schlichte, moderne Web-App, die Schritt für Schritt zeigt, wie das Gebet verrichtet wird – für alle fünf Gebete:

| Gebet | Deutsche Bezeichnung | Rakʿa | Rezitation |
|---|---|---|---|
| 🌅 Fadschr | Morgengebet | 2 | 1.–2. Rakʿa laut |
| ☀️ Dhuhr | Mittagsgebet | 4 | alle leise |
| 🌤️ ʿAsr | Nachmittagsgebet | 4 | alle leise |
| 🌇 Maghrib | Abendgebet | 3 | 1.–2. laut, 3. leise |
| 🌙 ʿIschā | Nachtgebet | 4 | 1.–2. laut, 3.–4. leise |

**Funktionen**
- Startseite: Gebet antippen → Anleitung startet sofort
- Schritt für Schritt: **Weiter / Zurück**, Fortschrittsbalken, Rakʿa-Anzeige – eine neue Seite gibt es nur beim Wechsel der Haltung; Texte ohne Bewegung stehen zusammen auf einer Seite, jeweils mit Audio dazwischen
- Jeder Schritt: Haltung (Stehen, Verbeugung, Niederwerfung, Sitzen …), arabischer Text, Umschrift (Transliteration) und deutsche Bedeutung
- **Platzhalter** für Bilder (Haltungs-Grafik) und Audios (Rezitation zum Nachsprechen) – siehe unten
- **Audio**: jeder Player mit eigener Wiedergabegeschwindigkeit (bleibt gespeichert); für die Suren ein **Wort-für-Wort-Player** mit Wiederholung pro Wort
- Zwei Designs: **Männer (Blau)** / **Frauen (Lila-Rosa)** – oben umschaltbar, Auswahl wird gespeichert
- Installierbar als **Web-App (PWA)** – funktioniert auch offline
- Bedienung auch per Tastatur (Pfeiltasten)
- **Einstellungen**: Arabisch, Umschrift und Deutsch einzeln ein-/ausblendbar; erweiterte Audio-Optionen (Geschwindigkeit, Wiederholung) abschaltbar; „Alle auswählen / abwählen"

## Starten

**Möglichkeit A – einfach öffnen:**
`index.html` im Browser öffnen. (Installieren/Offline geht erst über einen lokalen Server.)

**Möglichkeit B – lokaler Server (empfohlen, für die Web-App-Funktion und zuverlässige Audios):**
- Windows: `start-server.bat` doppelklicken, oder
- im Ordner `python -m http.server 8000` bzw. `npx serve` ausführen

Dann im Browser `http://localhost:8000` öffnen.

> ⚠️ **Wichtig für die Audios:** Über den lokalen Server (HTTP) spielen alle Audios zuverlässig ab. Beim direkten Öffnen der `index.html` per Doppelklick (`file://`) blockieren manche Browser die Audio-Wiedergabe.

## Als App installieren (PWA)
- **Chrome/Edge (PC):** Adressleiste → Symbol „App installieren" (oder Menü → *Mein Gebet installieren*)
- **Android:** Menü ⋮ → *App installieren* / *Zum Startbildschirm hinzufügen*
- **iPhone:** Teilen-Button → *Zum Home-Bildschirm*

**Offline-Nutzung:** Beim ersten Öffnen über den Server (HTTP) werden **alle Dateien**
– inklusive aller Audios und Bilder – automatisch gespeichert. Danach funktioniert die App
komplett offline, auch auf dem Handy.

> Hinweis: Für die Installation auf einem echten Handy muss die App über **HTTPS** erreichbar
> sein (z. B. kostenlos über GitHub Pages oder Netlify). Auf dem eigenen PC reicht der
> lokale Server (`http://localhost:8000`).

## Bilder und Audios ergänzen

Die App hat überall Platzhalter. So füllst du sie:

1. **Bilder** in den Ordner `images/` legen (Frauen: `images/woman/`, Männer: `images/men/`), **Audios** in den Ordner `audio/`
2. Bilder je Darstellung in `js/data.js` eintragen – unter `POSE_IMAGES_WOMEN` (Frauen, Lila) bzw. `POSE_IMAGES_MEN` (Männer, Blau), oder pro Schritt mit `imageWomen` / `imageMen`:

```js
ruku: 'images/woman/ruku.png',
'salam-right': 'images/woman/salam.png',
```

Aktuell: Für Frauen sind alle Haltungen eingebunden (Takbīr, Stehen, Verbeugung,
Niederwerfung, Sitzen, Taschahhud, Salām rechts/links); Männer-Bilder folgen noch
(dann zeigt die App die Platzhalter-Figur).

3. Audios pro Schritt im jeweiligen `step(…)`-Baustein:

```js
audio: 'audio/Ruku.mp3',                       // ein Audio pro Text
audios: [                                     // mehrere Audios in einem Schritt
  { label: 'Beim Aufrichten', file: 'audio/SamiAllahuLimanHamida.mp3' },
  { label: 'Danach im Stehen', file: 'audio/RabbanaWalakalHamd.mp3' }
],
wbw: 'fatiha',                                // Wort-für-Wort-Player für die Suren
```

**Audio-Funktionen:**
- Jeder Player hat eine **Geschwindigkeitswahl** (0,5×–1,5×), die pro Audio gespeichert bleibt.
- Für die Suren (Al-Fātiha, Al-Kauthar, Al-Ikhlās) gibt es einen **Wort-für-Wort-Player**:
  jedes Wort antippen zum einzeln Hören, mit einstellbarer **Wiederholung pro Wort** (1×–3×) – ideal zum Nachsprechen.
- Die Wort-für-Wort-Dateien liegen in `audio/wbw/` und sind nach `Sure_Vers_Wort` benannt
  (z. B. `001_001_001.mp3`).

**Neue Medien für den Offline-Cache registrieren:**
Nach dem Hinzufügen neuer Audio- oder Bild-Dateien einmal `gen-media-list.ps1` ausführen
(erzeugt `media.json`). So werden die neuen Dateien beim Installieren der App ebenfalls
für die Offline-Nutzung mitgespeichert.

Die Texte und der Ablauf orientieren sich an [howdoipray.com](https://www.howdoipray.com/howdoipray/Home/).
