$url = 'https://coastlinesprayfoam.com/contact'
$maxTries = 6
$interval = 30
for ($i=1; $i -le $maxTries; $i++) {
  Write-Host "Attempt $i of $maxTries - fetching $url"
  try {
    $resp = curl -sS -D - $url -o - | Select-Object -First 80
    $text = ($resp -join "`n")
    if ($text -match 'permalink: /contact|<<<<<<<') {
      Write-Host "Still showing old content (found permalink or merge markers)"
    } else {
      Write-Host "New content detected on attempt $i"
      $resp | ForEach-Object { Write-Host $_ }
      exit 0
    }
  } catch {
    Write-Host "Request failed: $($_.Exception.Message)"
  }
  Start-Sleep -Seconds $interval
}
Write-Host "Timed out after $maxTries attempts"
exit 2
