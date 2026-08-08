$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Source = Join-Path $Root "docs\agent-instructions.md"
$Banner = "<!-- AUTO-GENERATED from docs/agent-instructions.md - do not edit directly -->"

if (-not (Test-Path $Source)) {
    Write-Error "Source file not found: $Source"
    exit 1
}

$Targets = @(
    (Join-Path $Root ".github\cursor-instructions.md"),
    (Join-Path $Root "cursor.md"),
    (Join-Path $Root "claude.md")
)

$Content = Get-Content -Path $Source -Raw

foreach ($Target in $Targets) {
    $Dir = Split-Path -Parent $Target
    if (-not (Test-Path $Dir)) {
        New-Item -ItemType Directory -Path $Dir -Force | Out-Null
    }
    Set-Content -Path $Target -Value "$Banner`n`n$Content" -NoNewline
    Write-Host "Synced: $Target"
}

Write-Host "Done. All instruction files synced from docs/agent-instructions.md"
