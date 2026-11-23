[CmdletBinding()]
param(
  [int]$Port = 5173,
  [switch]$Reinstall,
  [switch]$NoOpen
)

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw 'Node.js не найден. Установите Node.js 24+ с https://nodejs.org и повторите запуск.'
}

Write-Host "Node $(node -v) · npm $(npm -v)" -ForegroundColor DarkGray

$modules = Join-Path $PSScriptRoot 'node_modules'
if ($Reinstall -or -not (Test-Path -LiteralPath $modules)) {
  Write-Host '→ Устанавливаю зависимости: npm ci' -ForegroundColor Cyan
  npm ci
  if ($LASTEXITCODE -ne 0) { throw 'npm ci завершился с ошибкой.' }
}

$url = "http://localhost:$Port/"

if (-not $NoOpen) {
  Start-Process -FilePath 'powershell.exe' -WindowStyle Hidden -ArgumentList @(
    '-NoProfile',
    '-Command',
    "Start-Sleep -Seconds 2; Start-Process '$url'"
  ) | Out-Null
}

Write-Host ''
Write-Host "  Визитка : $url" -ForegroundColor Green
Write-Host "  Вики    : ${url}#/wiki" -ForegroundColor Green
Write-Host '  Остановка: Ctrl+C' -ForegroundColor DarkGray
Write-Host ''

npm run dev -- --port $Port --strictPort
