param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('rxjs', 'migration', 'signal')]
    [string]$Branch
)

$ErrorActionPreference = 'Stop'

$patches = @{
    rxjs = @{
        Source = '18f0ece3fdae651fdb87f6db971145812a206f80'
        Tree = '62ea70a9c2dd670def7c7aa5074949390c320fb7'
        MainTree = '22a6ff2cce890ce22ee82e336fa311440d193a23'
        Message = 'test: complete RxJS validation and fix navbar'
    }
    migration = @{
        Source = '1fd4ad23f420546375ed1546edfa1dcd5cb7167e'
        Tree = '8013dcf3f61e9af3779aeda2449f2c87fcc96ed0'
        MainTree = '62ea70a9c2dd670def7c7aa5074949390c320fb7'
        Message = 'merge: integrate Angular 22 migration with RxJS fixes'
    }
    signal = @{
        Source = 'd8608b0881f8bfab4d3283a2534b26b8a6bff2d0'
        Tree = '542e91d98c8f6a6a986b34fdb3172b2f2044aa68'
        MainTree = '8013dcf3f61e9af3779aeda2449f2c87fcc96ed0'
        Message = 'merge: integrate Signals exercises into main'
    }
}

function Run-Git {
    $output = & git @args
    if ($LASTEXITCODE -ne 0) {
        throw "git $($args -join ' ') failed (exit code $LASTEXITCODE)"
    }
    return $output
}

$settings = $patches[$Branch]
$patchPath = Join-Path $PSScriptRoot "$Branch.patch"
if (-not (Test-Path -LiteralPath $patchPath)) {
    throw "Missing patch: $patchPath"
}
$root = (Run-Git rev-parse --show-toplevel | Select-Object -First 1).Trim()
Push-Location $root
try {
    $remote = (Run-Git remote get-url origin | Select-Object -First 1).Trim()
    if ($remote -notmatch '(?i)youssefchkili[/\\:]gl4-angular-tp1(?:\.git)?$') {
        throw "origin must point to youssefchkili/gl4-angular-tp1, not $remote"
    }
    if (& git status --porcelain) {
        throw 'The working tree must be clean. Use a fresh clone; do not discard local work.'
    }

    Run-Git fetch origin --prune | Out-Null
    $upstreamHead = (Run-Git rev-parse "origin/$Branch").Trim()
    if ($upstreamHead -ne $settings.Source) {
        throw "Upstream $Branch moved to $upstreamHead. The patch was made for $($settings.Source); stop and regenerate it."
    }

    $mainLocal = (Run-Git rev-parse main).Trim()
    $mainRemote = (Run-Git rev-parse origin/main).Trim()
    if ($mainLocal -ne $mainRemote) {
        throw 'Local main and origin/main differ. Synchronize the previous merge before continuing.'
    }
    $mainTree = (Run-Git rev-parse 'main^{tree}').Trim()
    if ($mainTree -ne $settings.MainTree) {
        throw "main has an unexpected tree ($mainTree). Apply the patches in order and do not merge unrelated work between them."
    }

    & git show-ref --verify --quiet "refs/heads/$Branch"
    if ($LASTEXITCODE -eq 0) {
        Run-Git switch $Branch | Out-Null
    } else {
        Run-Git switch --track -c $Branch "origin/$Branch" | Out-Null
    }
    $originalHead = (Run-Git rev-parse HEAD).Trim()
    if ($originalHead -ne $settings.Source) {
        throw "Local $Branch is not at the expected upstream commit. Use a fresh clone or inspect your local changes."
    }

    Run-Git apply --check --index -- $patchPath | Out-Null
    Run-Git apply --index -- $patchPath | Out-Null
    $resultTree = (Run-Git write-tree).Trim()
    if ($resultTree -ne $settings.Tree) {
        throw "Patched tree $resultTree differs from validated tree $($settings.Tree). Do not commit."
    }

    Write-Host "Exact source and destination trees verified for $Branch."
    Write-Host 'Running npm ci, production build, and the entire ChromeHeadless test suite.'
    & npm ci --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'npm ci failed' }
    & npm run build
    if ($LASTEXITCODE -ne 0) { throw 'Production build failed' }
    & npm test -- --watch=false --browsers=ChromeHeadless
    if ($LASTEXITCODE -ne 0) { throw 'Tests failed; no commit was created' }

    if ($Branch -eq 'rxjs') {
        $newCommit = (& git commit-tree $resultTree -p $originalHead -m $settings.Message)
    } else {
        # The second parent is the main commit previously integrated.
        # This is one conflict-free integration commit, not a second fix commit.
        $newCommit = (& git commit-tree $resultTree -p $originalHead -p $mainLocal -m $settings.Message)
    }
    if ($LASTEXITCODE -ne 0) { throw 'git commit-tree failed' }
    $newCommit = $newCommit.Trim()
    Run-Git reset --hard $newCommit | Out-Null
    Write-Host "Created exactly one commit on $Branch : $newCommit"
    Write-Host "Review: git show --stat --oneline $Branch"
    Write-Host "Push:   git push origin $Branch"
    Write-Host "Merge:  git switch main; git merge --ff-only $Branch; git push origin main"
} finally {
    Pop-Location
}
