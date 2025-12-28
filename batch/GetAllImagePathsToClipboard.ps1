<#
    Bildpfade-Collector 3.1  (Natural Sort für ALLE PowerShell-Versionen)
    --------------------------------------------------------------------
    • Fragt Ordner & Dateityp(en)
    • Holt Dateien rekursiv
    • Sortiert numerisch korrekt: g1, g2, … g10
    • Kopiert relative /assets/-Pfade in die Zwischenablage
#>

# --- Basis --------------------------------------------------------------------
$projectRoot = Get-Location            # im Projekt-Root bleiben
$relPath     = Read-Host "Relativer Pfad ab Projekt-Root (z. B. assets/images/…)"
$types       = Read-Host "Dateityp(en) (png,gif,webp,avif … | * für alle)"

$targetDir   = Join-Path $projectRoot $relPath
if (-not (Test-Path -LiteralPath $targetDir)) {
    Write-Host "`n❌ Pfad nicht gefunden:`n$targetDir"; Pause; exit 1
}

# Liste der Endungen vorbereiten
$extList = $types -split '\s*,\s*' | ForEach-Object {
    if ($_ -eq '*' -or [string]::IsNullOrWhiteSpace($_)) { '*' } else { "*.$_" }
}

# --- Dateien holen & relativen Pfad basteln -----------------------------------
$rawPaths = Get-ChildItem $targetDir -Recurse -Include $extList -File |
            ForEach-Object {
                $_.FullName -replace '\\','/' -replace '.+?assets/','assets/'
            }

# --- NATÜRLICH sortieren – robust für alle Versionen --------------------------
# 1) Kann dieses PowerShell '-Natural'?  (PS ≥ 7.1)
$hasNatural = (Get-Command Sort-Object).Parameters.Keys -contains 'Natural'

$sortedPaths = if ($hasNatural) {
    $rawPaths | Sort-Object -Natural
} else {
    # 2) Fallback: Zahlen in der Sort-Schlüsselzeichenfolge mit Nullen auffüllen
    $rawPaths | Sort-Object {
        # Ersetze jede Zahl durch 15-stellige, links-gepolsterte Version
        [regex]::Replace($_, '\d+', { param($m) "{0:D15}" -f [int]$m.Value })
    }
}

# --- Ausgabe formattieren und in die Zwischenablage ---------------------------
$sortedPaths | ForEach-Object { '"{0}",' -f $_ } | Set-Clipboard

Write-Host "`n✅  Fertig! Natürlich sortierte Pfade sind in der Zwischenablage:"
Write-Host ($sortedPaths -join "`n")
Pause
