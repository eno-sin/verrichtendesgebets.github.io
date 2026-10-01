# download-audio.ps1 – lädt Wort-für-Wort-Rezitationen von audio.qurancdn.com
# Al-Fatiha (Sure 1), Al-Kauthar (Sure 108), Al-Ikhlas (Sure 112)
# Dateien landen in audio\wbw\ mit Namen im Format {sure}_{vers}_{wort}.mp3

$ErrorActionPreference = 'Continue'
$base = 'https://audio.qurancdn.com/wbw'
$out  = Join-Path $PSScriptRoot 'audio\wbw'
New-Item -ItemType Directory -Force -Path $out | Out-Null

$surahs = @(
    @{ Num = '001'; Ayahs = 7 },
    @{ Num = '108'; Ayahs = 3 },
    @{ Num = '112'; Ayahs = 4 }
)

$ok = 0
$missing = 0
$errors = 0

foreach ($s in $surahs) {
    for ($a = 1; $a -le $s.Ayahs; $a++) {
        $ayah = '{0}_{1:000}' -f $s.Num, $a
        $w = 1
        while ($w -le 30) {
            $name = '{0}_{1:000}.mp3' -f $ayah, $w
            $url  = "$base/$name"
            $dest = Join-Path $out $name
            $done = $false
            foreach ($attempt in 1..2) {
                try {
                    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -ErrorAction Stop
                    Write-Host "OK   $name"
                    $ok++
                    $done = $true
                    break
                } catch {
                    $code = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { -1 }
                    if ($code -eq 404) { $missing++; $done = $true; break }
                    if ($attempt -eq 2) {
                        Write-Warning "Fehler $name -> Status $code"
                        $errors++
                        $done = $true
                    }
                }
            }
            if ($done -and -not (Test-Path $dest)) { break }
            $w++
        }
    }
}

Write-Host ''
Write-Host "Fertig: $ok Dateien geladen (Stop bei fehlenden Worten: $missing)."
Write-Host "Zielordner: $out"
