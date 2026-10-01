@echo off
title Mein Gebet – lokaler Server
cd /d "%~dp0"

echo.
echo  ============================================================
echo   Adresse fuer das Handy (muss im GLEICHEN WLAN sein):
powershell -NoProfile -Command "Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } | ForEach-Object { Write-Host ('    http://' + $_.IPAddress + ':8000/index.html') }"
echo  ============================================================
echo.
echo  Hinweis: Falls das Handy die Seite NICHT laedt, blockiert meist die
echo  Windows-Firewall den Port. Dann EINMAL in einer Admin-Konsole ausfuehren:
echo.
echo    netsh advfirewall firewall add rule name="Gebetsapp 8000" dir=in action=allow protocol=TCP localport=8000
echo.
echo  Wichtig: Offline-Nutzung und "App installieren" gehen ueber diese
echo  Adresse nicht (Browser verlangen dafuer HTTPS). Die Anleitung und alle
echo  Audios funktionieren aber ganz normal.
echo.

where python >nul 2>nul
if %errorlevel%==0 (
  echo Starte Server mit Python ...
  echo  - PC:    http://localhost:8000
  echo  - Handy: eine der oben angezeigten Adressen
  echo  (Beenden mit Strg+C)
  echo.
  python -m http.server 8000 --bind 0.0.0.0
  goto :eof
)

where npx >nul 2>nul
if %errorlevel%==0 (
  echo Starte Server mit npx serve ...
  echo Oeffne im Browser: http://localhost:3000
  npx serve .
  goto :eof
)

echo Weder Python noch Node.js/npx gefunden.
echo Alternativ: index.html einfach doppelt anklicken.
pause
