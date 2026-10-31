# Copy the approved V20 media pack into this branch and push it safely.
# Run from PowerShell in the Beta repository:
#   & ".\\scripts\\install-v20-media.ps1"
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location $root
if (-not (Test-Path (Join-Path $root '.git'))) { throw 'Run inside the cloned TechMegaTrends/Beta repository.' }
$branch = (git branch --show-current).Trim()
if ($branch -ne 'feature/v20-premium-landing') { throw "Wrong branch: $branch. Switch to feature/v20-premium-landing first." }
$changes = @(git status --porcelain)
if ($changes.Count -gt 0) { throw 'Uncommitted changes detected. Review git status before running this installer.' }
$zip = Join-Path $env:USERPROFILE 'Downloads\TechMegaTrends-V20-media.zip'
if (-not (Test-Path -LiteralPath $zip)) { throw "Download the approved media pack first: $zip" }
Write-Host 'Unpacking approved media to public/media...' -ForegroundColor Cyan
Expand-Archive -LiteralPath $zip -DestinationPath $root -Force
node scripts/check-v20-assets.mjs
if ($LASTEXITCODE -ne 0) { throw 'Media verification failed. Nothing has been committed.' }
git add -- public/media/v20-hero.mp4 public/media/v20-hero.webm public/media/v20-hero-poster.jpg
$staged = @(git diff --cached --name-only)
if ($staged.Count -ne 3) {
  Write-Warning "Expected 3 new files; staged $($staged.Count). Check git status."
  exit 1
}
git commit -m 'feat(v20): add approved London cinematic hero assets'
if ($LASTEXITCODE -ne 0) { throw 'Commit unsuccessful.' }
Write-Host 'Local commit created. Review output, then push with:' -ForegroundColor Green
Write-Host 'git push origin feature/v20-premium-landing' -ForegroundColor Yellow
