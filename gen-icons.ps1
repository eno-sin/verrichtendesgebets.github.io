# Generiert die App-Icons (Mondsichel mit Stern auf blau-lila Verlauf)
Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot 'icons'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function New-RoundedRectPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = 2 * $r
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

function New-CrescentPath([float]$cx, [float]$cy, [float]$R) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $outer = New-Object System.Drawing.RectangleF(($cx - $R), ($cy - $R), (2 * $R), (2 * $R))
  $innerCx = $cx + $R * 0.32
  $r2 = $R * 0.84
  $inner = New-Object System.Drawing.RectangleF(($innerCx - $r2), ($cy - $r2), (2 * $r2), (2 * $r2))
  $p.AddArc($outer, 38, 300)
  $p.AddArc($inner, 320, -300)
  $p.CloseFigure()
  return $p
}

function New-Icon([int]$size, [string]$file, [bool]$maskable) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)

  $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
  $c1 = [System.Drawing.Color]::FromArgb(37, 99, 235)
  $c2 = [System.Drawing.Color]::FromArgb(168, 85, 247)
  $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 45.0)

  if ($maskable) {
    $g.FillRectangle($bg, $rect)
  } else {
    $r = [float]($size * 0.22)
    $path = New-RoundedRectPath 0 0 $size $size $r
    $g.FillPath($bg, $path)
    $g.SetClip($path)
  }

  $white = [System.Drawing.Brushes]::White
  $s = [float]$size

  # Mondsichel
  $crescent = New-CrescentPath ($s * 0.52) ($s * 0.45) ($s * 0.24)
  $g.FillPath($white, $crescent)

  # Stern (5-zackig) rechts oben neben der Sichel
  $cx = $s * 0.66
  $cy = $s * 0.42
  $outer = $s * 0.075
  $inner = $outer * 0.42
  $pts = New-Object System.Collections.Generic.List[System.Drawing.PointF]
  for ($i = 0; $i -lt 10; $i++) {
    $rad = $outer
    if ($i % 2 -eq 1) { $rad = $inner }
    $ang = (-90 + $i * 36) * [math]::PI / 180
    $x = $cx + $rad * [math]::Cos($ang)
    $y = $cy + $rad * [math]::Sin($ang)
    $pts.Add((New-Object System.Drawing.PointF($x, $y)))
  }
  $g.FillPolygon($white, $pts.ToArray())

  $bmp.Save($file, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-Icon 192 (Join-Path $outDir 'icon-192.png') $false
New-Icon 512 (Join-Path $outDir 'icon-512.png') $false
New-Icon 512 (Join-Path $outDir 'icon-maskable-512.png') $true

Write-Host 'Icons erstellt in:' $outDir
