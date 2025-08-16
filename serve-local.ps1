Param(
    [int]$Port = 4322
)

# serve-local.ps1
# Starts a simple Python static server from the repository root in the background
# and opens the default browser at the local URL. Designed for PowerShell (pwsh).

Set-StrictMode -Version Latest

$root = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Push-Location $root

Write-Host "Starting static server from: $root on port $Port..." -ForegroundColor Cyan

# If Python is already serving on this port, just open the browser and exit
try {
    $resp = Invoke-WebRequest -Uri "http://localhost:$Port/" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    if ($resp.StatusCode -eq 200) {
        Write-Host "Server already running at http://localhost:$Port/ — opening browser..." -ForegroundColor Yellow
        Start-Process "http://localhost:$Port/"
        Pop-Location
        return
    }
} catch {
    # Port not serving, continue to start server
}

# Start Python simple HTTP server as a background process
$py = Get-Command python -ErrorAction SilentlyContinue
if (-not $py) {
    Write-Error "Python not found on PATH. Install Python or use 'npx serve .' or 'php -S' instead.";
    Pop-Location
    exit 1
}

$startInfo = Start-Process -FilePath $py.Path -ArgumentList '-m','http.server',$Port -WorkingDirectory $root -NoNewWindow -PassThru
Start-Sleep -Milliseconds 600

Write-Host "Server started (PID $($startInfo.Id)). Opening http://localhost:$Port/ in your browser..." -ForegroundColor Green
Start-Process "http://localhost:$Port/"

# leave the process running in background
Pop-Location
