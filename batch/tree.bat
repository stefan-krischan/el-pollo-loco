@echo off
setlocal

REM Root-Pfad: 1. Parameter oder (wenn leer) Ordner der .bat
set "ROOT=%~1"
if "%ROOT%"=="" set "ROOT=%~dp0"
REM Entfernt evtl. trailing backslash
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop';" ^
  "function Get-Tree { param([string]$Path='.', [int]$Depth=1, [string[]]$Exclude=@('node_modules','.git'));" ^
  "  $items = Get-ChildItem -LiteralPath $Path -Force -ErrorAction SilentlyContinue | Where-Object { $_.PSIsContainer -and ($Exclude -notcontains $_.Name) };" ^
  "  foreach ($item in $items) { $prefix = '    ' * ($Depth - 1); Write-Host ($prefix + '|-- ' + $item.Name);" ^
  "    Get-Tree -Path $item.FullName -Depth ($Depth + 1) -Exclude $Exclude" ^
  "  }" ^
  "  $files = Get-ChildItem -LiteralPath $Path -Force -ErrorAction SilentlyContinue | Where-Object { -not $_.PSIsContainer };" ^
  "  foreach ($file in $files) { $prefix = '    ' * $Depth; Write-Host ($prefix + '|-- ' + $file.Name) }" ^
  "}" ^
  "Get-Tree -Path '%ROOT%' -Depth 1 -Exclude @('node_modules','.git')"

endlocal
