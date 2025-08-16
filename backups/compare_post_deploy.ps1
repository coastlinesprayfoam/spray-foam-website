$pairs = @(
  @{ resp='backups/post_deploy_root.response'; dist='astro-website/dist/index.html' },
  @{ resp='backups/post_deploy_about.response'; dist='astro-website/dist/about/index.html' },
  @{ resp='backups/post_deploy_contact.response'; dist='astro-website/dist/contact/index.html' }
)

foreach ($p in $pairs) {
  $r = $p.resp; $d = $p.dist
  Write-Host "---- $r  vs  $d ----"
  if (-not (Test-Path $r)) { Write-Host "MISSING_RESPONSE $r"; Continue }
  $raw = Get-Content -Raw -Path $r
  $parts = $raw -split '\r?\n\r?\n', 2
  $hdr = $parts[0]
  $body = if ($parts.Length -ge 2) { $parts[1] } else { '' }
  $bodyFile = "backups/" + (Split-Path $r -Leaf) + ".body"
  Set-Content -Path $bodyFile -Value $body -NoNewline
  $hashBody = Get-FileHash -Algorithm SHA256 -Path $bodyFile | Select-Object -ExpandProperty Hash

  if (-not (Test-Path $d)) {
    $hashDist = 'MISSING_DIST'
    $titleDist = ''
  } else {
    $hashDist = Get-FileHash -Algorithm SHA256 -Path $d | Select-Object -ExpandProperty Hash
    $distRaw = Get-Content -Raw -Path $d
    if ($distRaw -match '<title[^>]*>(.*?)</title>') { $titleDist = $matches[1] } else { $titleDist = '' }
  }

  $cfLines = ($hdr -split '\r?\n' | Where-Object { $_ -match '^(Cf-Cache-Status|Age|Cache-Control):' }) -join '; '
  if ($body -match '<title[^>]*>(.*?)</title>') { $titleResp = $matches[1] } else { $titleResp = '' }

  Write-Host "Cf/Age: $cfLines"
  Write-Host "title (resp): $titleResp"
  Write-Host "title (dist): $titleDist"
  Write-Host "sha(body): $hashBody"
  Write-Host "sha(dist): $hashDist"
  if ($hashBody -eq $hashDist) {
    Write-Host "MATCH: yes"
  } else {
    Write-Host "MATCH: no"
  }
  Write-Host ""
}
