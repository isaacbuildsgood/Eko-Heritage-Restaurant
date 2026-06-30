$dir = ".\"
$imgDir = Join-Path $dir "images"

if (-Not (Test-Path $imgDir)) {
    New-Item -ItemType Directory -Path $imgDir | Out-Null
}

$htmlFiles = Get-ChildItem -Path $dir -Filter "*.html"
$script:requiredImages = New-Object System.Collections.ArrayList
[void]$script:requiredImages.Add("map-placeholder.jpg (Rename your map screenshot to this)")
[void]$script:requiredImages.Add("hero-background.jpg (The main hero background image)")
[void]$script:requiredImages.Add("premium-dining.jpg (The Call-To-Action background image)")
[void]$script:requiredImages.Add("glass-pattern.jpg (The blurred background pattern for reservations)")

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw

    $regex = [regex]'(?i)<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>'
    $evaluator = [System.Text.RegularExpressions.MatchEvaluator] {
        param($match)
        $srcParam = $match.Groups[1].Value
        $altParam = $match.Groups[2].Value
        
        $slug = $altParam.ToLower() -replace '[^a-z0-9]+', '-' -replace '^-|-$', ''
        if ([string]::IsNullOrWhiteSpace($slug)) { $slug = "default-image" }
        
        $newFilename = "$slug.jpg"
        if ($script:requiredImages -notcontains $newFilename) {
            [void]$script:requiredImages.Add($newFilename)
        }
        
        return $match.Value.Replace("src=`"$srcParam`"", "src=`"./images/$newFilename`"")
    }
    
    $content = $regex.Replace($content, $evaluator)
    
    # Inline Map Placeholder
    $content = $content -replace "background:\s*url\('https://placehold.co/[^']*'\)", "background: url('./images/map-placeholder.jpg')"
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

$cssPath = Join-Path $dir "styles.css"
if (Test-Path $cssPath) {
    $css = Get-Content $cssPath -Raw
    $css = $css -replace "url\('https://placehold.co/[^\)]*HERO[^']*'\)", "url('./images/hero-background.jpg')"
    $css = $css -replace "url\('https://placehold.co/[^\)]*PATTERN[^']*'\)", "url('./images/glass-pattern.jpg')"
    $css = $css -replace "url\('https://placehold.co/[^']*'\)", "url('./images/premium-dining.jpg')"
    Set-Content -Path $cssPath -Value $css -Encoding UTF8
}

$readmeStr = "=== EKO HERITAGE IMAGE UPLOAD GUIDE ===`n`nTo make your website images appear, simply drag your real photos into this 'images' folder and rename them to EXACTLY match the filenames listed below. The website will automatically detect them!`n`nREQUIRED FILENAMES:`n`n"
$sortedImages = $script:requiredImages | Sort-Object -Unique
foreach ($img in $sortedImages) {
    $readmeStr += "- $img`n"
}

Set-Content -Path (Join-Path $imgDir "README_IMAGES.txt") -Value $readmeStr -Encoding UTF8
Write-Host "Update successfully completed!"
