$ErrorActionPreference = 'Stop'
$repo = Join-Path $env:USERPROFILE 'OneDrive\Documents\GitHub\Beta'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
if (!(Test-Path (Join-Path $repo '.git'))) { throw "Git repository not found: $repo. Set `$repo to your actual TechMegaTrends/Beta folder." }
Push-Location $repo
try {
  $branch = (git branch --show-current).Trim()
  if ($branch -ne 'feature/v20-premium-landing') { throw "Switch to feature/v20-premium-landing first. Current branch: $branch" }
  if ((git status --porcelain).Count -gt 0) { throw 'Working tree has changes. Commit or stash your changes first.' }
  git pull --ff-only origin feature/v20-premium-landing
  if ($LASTEXITCODE -ne 0) { throw 'Git pull failed; no archive created.' }
  $assets = @('v20-hero.mp4','v20-hero.webm','v20-hero-poster.jpg')
  foreach ($asset in $assets) {
    $src = Join-Path $here "public\media\$asset"
    if (!(Test-Path $src)) { throw "Missing bundled media file: $src" }
    $dst = Join-Path $repo "public\media\$asset"
    New-Item -ItemType Directory -Force (Split-Path $dst -Parent) | Out-Null
    Copy-Item $src $dst -Force
  }
  node scripts/check-v20-assets.mjs
  if ($LASTEXITCODE -ne 0) { throw 'Hero media validation failed.' }
  git add -- public/media/v20-hero.mp4 public/media/v20-hero.webm public/media/v20-hero-poster.jpg
  $staged = @(git diff --cached --name-only)
  if ($staged.Count -gt 0) {
    git commit -m 'feat(v20): add approved cinematic London hero media'
    if ($LASTEXITCODE -ne 0) { throw 'Git commit failed.' }
  }
  # Generate exact tracked source + bundled media without .git, secrets, node_modules or local build artifacts.
  $out = Join-Path $env:USERPROFILE 'Downloads\TechMegaTrends-V20-COMPLETE-WEBSITE.zip'
  $temp = Join-Path $env:TEMP ("TechMegaTrends-V20-SNAPSHOT-" + [guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Force $temp | Out-Null
  try {
    git archive --format=zip -o $out HEAD
    if ($LASTEXITCODE -ne 0) { throw 'git archive failed.' }
    Write-Host "Complete website source ZIP created: $out" -ForegroundColor Green
    Write-Host 'To push V20 media to PR #10: git push origin feature/v20-premium-landing' -ForegroundColor Cyan
  } finally { Remove-Item $temp -Force -Recurse }
} finally { Pop-Location }
