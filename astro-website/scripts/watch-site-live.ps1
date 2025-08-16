# Poll https://coastlinesprayfoam.com/contact.html until it contains the contact CTA
# Usage: pwsh -File scripts\watch-site-live.ps1
param(
    [string]$Url = 'https://coastlinesprayfoam.com/contact.html',
    [int]$IntervalSeconds = 30,
    [int]$MaxMinutes = 30,
    [string]$MarkerRegex = 'tel:|mailto:|Contact Us',
    [string]$SnapshotPath = 'scripts/contact-snapshot.html'
)

$endTime = (Get-Date).AddMinutes($MaxMinutes)
Write-Host "Watching $Url every $IntervalSeconds seconds until $endTime (or until marker found)..."

while ((Get-Date) -lt $endTime) {
    try {
        $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
        $content = $resp.Content
        if ($content -match $MarkerRegex) {
            Write-Host "Marker found at $(Get-Date)"
            # save snapshot
            $content | Out-File -FilePath $SnapshotPath -Encoding utf8
            Write-Host "Snapshot saved to $SnapshotPath"
            exit 0
        } else {
            Write-Host "$(Get-Date -Format o): Marker not found. Status: $($resp.StatusCode)"
        }
    } catch {
        Write-Host "$(Get-Date -Format o): Request failed - $($_.Exception.Message)"
    }
    Start-Sleep -Seconds $IntervalSeconds
}
Write-Host "Timed out after $MaxMinutes minutes waiting for $Url"
exit 2
