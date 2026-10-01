# Generiert media.json – die Liste aller Medien-Dateien (Audios & Bilder),
# die der Service Worker für die Offline-Nutzung vorab cacht.
# Nach dem Hinzufügen neuer Audio-/Bild-Dateien dieses Skript erneut ausführen.
$root = $PSScriptRoot
$exts = @('*.mp3', '*.ogg', '*.wav', '*.m4a', '*.aac', '*.png', '*.jpg', '*.jpeg', '*.webp', '*.gif')

$files = foreach ($dir in @('audio', 'images')) {
  $p = Join-Path $root $dir
  if (Test-Path $p) {
    Get-ChildItem -Path $p -Recurse -File -Include $exts | ForEach-Object {
      $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    }
  }
}

$obj = [ordered]@{
  version = (Get-Date -Format 'yyyy-MM-dd HH:mm')
  files   = @($files | Sort-Object)
}
$json = $obj | ConvertTo-Json -Depth 3
[System.IO.File]::WriteAllText((Join-Path $root 'media.json'), $json, (New-Object System.Text.UTF8Encoding($false)))
Write-Host ("media.json erstellt mit {0} Dateien." -f $obj.files.Count)

# Service-Worker-Cache-Version erhöhen, damit die neuen Dateien beim nächsten Laden neu gecacht werden
$sw = Join-Path $root 'sw.js'
if (Test-Path $sw) {
  $content = [System.IO.File]::ReadAllText($sw)
  if ($content -match 'mein-gebet-v(\d+)') {
    $old = [int]$matches[1]
    $new = $old + 1
    $content = $content -replace ("mein-gebet-v{0}" -f $old), ("mein-gebet-v{0}" -f $new)
    [System.IO.File]::WriteAllText($sw, $content, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host ("Service-Worker-Cache auf mein-gebet-v{0} erhöht." -f $new)
  }
}
