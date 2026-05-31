$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Category Thesis Builder", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ProofImage -Title "Narrative snapshot for the next investor and board memo" -Subtitle "One executive surface for category claim, why-now clarity, evidence gaps, and thesis-defensible positioning." -Bullets @(
  "The overview keeps coherence, timing strength, investor clarity, defensible themes, and narrative risk in one executive view.",
  "Leadership can see which themes belong in the lead story and which still need tighter proof or cleaner wording.",
  "This layer sits after the scorecards, briefs, registry, radar, timing index, relationship graph, and boardroom rehearsal."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ProofImage -Title "Thesis lane keeps the core category claim visible" -Subtitle "Every theme retains buyer, lead claim, investor question, priority band, wedge summary, and the next move." -Bullets @(
  "The lane makes it obvious which themes are ready to defend and which should stay out of the lead memo.",
  "Investor questions stay attached to the actual operating proof instead of drifting into generic positioning language.",
  "Leadership can refine the category wedge before the story gets reused publicly."
) -OutputPath (Join-Path $screenshots "02-thesis-lane-proof.png")

New-ProofImage -Title "Category map ties timing and clarity back to real surfaces" -Subtitle "Evidence state, investor clarity, market tailwind, company tags, and related surfaces stay visible in one executive table." -Bullets @(
  "This view keeps IBM, Azure, CyberArk, FinTech, biotech, nonprofit, and robotics traces tied to actual live surfaces.",
  "Timing and clarity stay visible before any theme gets promoted into investor or board language.",
  "Leadership can see where the category story is already strong and where it is still exposed."
) -OutputPath (Join-Path $screenshots "03-category-map-proof.png")

New-ProofImage -Title "Why-now and narrative posture keep the story honest" -Subtitle "Timing thesis, coherence, and investor clarity remain attached to the actual executive theme." -Bullets @(
  "The builder keeps the category story grounded in what is actually defensible.",
  "Narrative risk remains attached to the specific theme instead of disappearing into summary prose.",
  "This creates a repeatable executive cadence for investor memos, board briefs, and category refreshes."
) -OutputPath (Join-Path $screenshots "04-narrative-posture-proof.png")
