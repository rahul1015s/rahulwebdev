# Simple Tailwind CSS v4 class name fixer
Write-Host "Fixing Tailwind CSS v4 class names..." -ForegroundColor Cyan

$replacements = @{
    'flex-shrink-0' = 'shrink-0'
    'bg-gradient-to-r' = 'bg-linear-to-r'
    'bg-gradient-to-l' = 'bg-linear-to-l'
    'bg-gradient-to-t' = 'bg-linear-to-t'
    'bg-gradient-to-b' = 'bg-linear-to-b'
    'bg-gradient-to-tr' = 'bg-linear-to-tr'
    'bg-gradient-to-tl' = 'bg-linear-to-tl'
    'bg-gradient-to-br' = 'bg-linear-to-br'
    'bg-gradient-to-bl' = 'bg-linear-to-bl'
    '[mask-image:' = 'mask-['
}

$files = Get-ChildItem -Path "." -Include "*.tsx","*.ts","*.jsx","*.js" -Recurse -File | 
    Where-Object { $_.FullName -notmatch 'node_modules|\.next|\.git' }

$count = 0

foreach ($file in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        $original = $content
        
        foreach ($old in $replacements.Keys) {
            $new = $replacements[$old]
            if ($content.Contains($old)) {
                $content = $content.Replace($old, $new)
            }
        }
        
        if ($content -ne $original) {
            [System.IO.File]::WriteAllText($file.FullName, $content)
            Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
            $count++
        }
    }
    catch {
        Write-Host "Error: $($file.Name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Complete! Modified $count files." -ForegroundColor Cyan
Write-Host "Restart VS Code to clear linter cache." -ForegroundColor Yellow
