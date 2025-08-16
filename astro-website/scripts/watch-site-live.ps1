# Poll https://coastlinesprayfoam.com/contact.html until it contains the contact CTA
# Usage: pwsh -File scripts\watch-site-live.ps1
param(
    [string[]]$Urls = @('https://coastlinesprayfoam.com/contact','https://coastlinesprayfoam.com/contact/','https://coastlinesprayfoam.com/contact.html'),
    [int]$IntervalSeconds = 30,
    [int]$MaxMinutes = 60,
    [string]$MarkerRegex = 'tel:|mailto:|Request Your Free Quote|Call \(|Get Your Free Spray Foam Quote',
    [string]$SnapshotPath = 'scripts/contact-snapshot.html',
    [string]$LogPath = 'scripts/watch-site-live.log'
)

$endTime = (Get-Date).AddMinutes($MaxMinutes)
Write-Host "Watching URLs: $($Urls -join ', ') every $IntervalSeconds seconds until $endTime (or until marker found)..."

while ((Get-Date) -lt $endTime) {
    foreach ($Url in $Urls) {
        try {
            $now = Get-Date -Format o
            $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
            $content = $resp.Content
            $logLine = "$now - Checked $Url - HTTP $($resp.StatusCode)"
            $logLine | Out-File -FilePath $LogPath -Append -Encoding utf8
            if ($content -match $MarkerRegex -and $content -notmatch 'permalink:|<<<<<<<|>>>>>>>') {
                Write-Host "Marker found on $Url at $now"
                # save snapshot
                $content | Out-File -FilePath $SnapshotPath -Encoding utf8
                "$now - Snapshot saved to $SnapshotPath (from $Url)" | Out-File -FilePath $LogPath -Append -Encoding utf8
                Write-Host "Snapshot saved to $SnapshotPath"
                exit 0
            } else {
                Write-Host "$now - $Url: marker not found or file still has frontmatter/merge markers"
            }
        } catch {
            $err = "$(Get-Date -Format o) - $Url: Request failed - $($_.Exception.Message)"
            Write-Host $err
            $err | Out-File -FilePath $LogPath -Append -Encoding utf8
        }
    }
    Start-Sleep -Seconds $IntervalSeconds
}
Write-Host "Timed out after $MaxMinutes minutes waiting for any URL to show the marker"
"$(Get-Date -Format o) - Timed out after $MaxMinutes minutes" | Out-File -FilePath $LogPath -Append -Encoding utf8
exit 2
