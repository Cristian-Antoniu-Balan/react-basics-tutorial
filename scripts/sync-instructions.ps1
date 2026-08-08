$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Source = Join-Path $Root ".cursor\rules\project-guidelines.mdc"
$Banner = "<!-- AUTO-GENERATED from .cursor/rules/project-guidelines.mdc - do not edit directly -->"

if (-not (Test-Path $Source)) {
    Write-Error "Source file not found: $Source"
    exit 1
}

# Body only — strip YAML frontmatter used by Cursor rules
$Lines = Get-Content -Path $Source
$BodyLines = [System.Collections.Generic.List[string]]::new()
$InFrontmatter = $false
$DoneFrontmatter = $false
$SeenContent = $false

for ($i = 0; $i -lt $Lines.Count; $i++) {
    $Line = $Lines[$i]
    if ($i -eq 0 -and $Line -eq "---") {
        $InFrontmatter = $true
        continue
    }
    if ($InFrontmatter -and $Line -eq "---") {
        $InFrontmatter = $false
        $DoneFrontmatter = $true
        continue
    }
    if ($InFrontmatter) {
        continue
    }
    if ($DoneFrontmatter -and -not $SeenContent -and [string]::IsNullOrWhiteSpace($Line)) {
        continue
    }
    $SeenContent = $true
    $BodyLines.Add($Line)
}

$Body = ($BodyLines -join "`n") + "`n"

$Targets = @(
    (Join-Path $Root "docs\agent-instructions.md"),
    (Join-Path $Root ".github\cursor-instructions.md"),
    (Join-Path $Root "claude.md")
)

foreach ($Target in $Targets) {
    $Dir = Split-Path -Parent $Target
    if (-not (Test-Path $Dir)) {
        New-Item -ItemType Directory -Path $Dir -Force | Out-Null
    }
    Set-Content -Path $Target -Value "$Banner`n`n$Body" -NoNewline
    Write-Host "Synced: $Target"
}

Write-Host "Done. All instruction files synced from .cursor/rules/project-guidelines.mdc"
