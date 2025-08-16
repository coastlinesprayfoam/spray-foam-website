param(
    [string]$Source = "..\",
    [string]$Dest = "public",
    [switch]$WhatIf
)

Write-Host "Syncing static files from $Source to $Dest (inside astro-website)"

$srcPath = Join-Path -Path $PSScriptRoot -ChildPath $Source
$destPath = Join-Path -Path $PSScriptRoot -ChildPath $Dest

if (-not (Test-Path $srcPath)) {
    Write-Error "Source path $srcPath does not exist"
    exit 1
}

if (-not (Test-Path $destPath)) {
    Write-Host "Creating destination path $destPath"
    New-Item -ItemType Directory -Path $destPath | Out-Null
}

# Files/folders to copy from repo root into astro-website/public
$items = @('index.html','assets','about.html','contact.html','services.html','gallery.html','faq.html','cost-calculator.html','privacy-policy.html','terms-of-service.html','sitemap.xml')

foreach ($item in $items) {
    $s = Join-Path $srcPath $item
    $d = Join-Path $destPath $item
    if (Test-Path $s) {
        Write-Host "Copying $item..."
        if ($WhatIf) {
            Copy-Item -Path $s -Destination $d -Recurse -Force -WhatIf
        } else {
            Copy-Item -Path $s -Destination $d -Recurse -Force
        }
    } else {
        Write-Host "Warning: $item not found in source"
    }
}

Write-Host "Sync complete. You can run: cd $PSScriptRoot; npm run dev"
