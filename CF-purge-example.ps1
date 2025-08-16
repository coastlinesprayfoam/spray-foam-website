# Cloudflare purge all script (PowerShell)
# Requires: a Cloudflare API Token with 'Cache Purge' permission for the zone
# Usage: Set $zoneId and $apiToken, then run this script.

$zoneId = "<YOUR_ZONE_ID>"  # e.g. from the Cloudflare dashboard
$apiToken = "<YOUR_API_TOKEN>"

if ($zoneId -match "^<" -or $apiToken -match "^<") {
    Write-Host "Fill in your Zone ID and API Token in this script before running."
    return
}

$uri = "https://api.cloudflare.com/client/v4/zones/$zoneId/purge_cache"
$body = @{ "purge_everything" = $true } | ConvertTo-Json
$headers = @{ "Authorization" = "Bearer $apiToken"; "Content-Type" = "application/json" }

try {
    $resp = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $body -ErrorAction Stop
    Write-Host "Purge response:"
    $resp | ConvertTo-Json -Depth 4
} catch {
    Write-Host "Purge failed:" $_.Exception.Message
}
