# Upstream GL4-TP1 patch handoff

The three `.patch` files reproduce the **tested code trees** from
`Selmi-Med-Dhia/gl4-angular-tp1`, against the exact branch heads of
`youssefchkili/gl4-angular-tp1` on 2026-10-26. Pages 12–13 are excluded.

**Important:** apply to the original repository's branch heads, not to the fork or
to a branch that has already received a patch. Check the upstream SHA each time.

| Order | Branch | Original HEAD | Expected result tree | Single commit message |
|---|---|---|---|---|
| 1 | rxjs | `18f0ece3fdae651fdb87f6db971145812a206f80` | `62ea70a9c2dd670def7c7aa5074949390c320fb7` | `test: complete RxJS validation and fix navbar` |
| 2 | migration | `1fd4ad23f420546375ed1546edfa1dcd5cb7167e` | `8013dcf3f61e9af3779aeda2449f2c87fcc96ed0` | `merge: integrate Angular 22 migration with RxJS fixes` |
| 3 | signal | `d8608b0881f8bfab4d3283a2534b26b8a6bff2d0` | `542e91d98c8f6a6a986b34fdb3172b2f2044aa68` | `merge: integrate Signals exercises into main` |

## Apply in order on Windows

1. Put `rxjs.patch`, `migration.patch`, `signal.patch` and
   `apply-in-order.ps1` together in a directory **outside** the working Git repository.
2. Use a **fresh clone** of `youssefchkili/gl4-angular-tp1`.
   Confirm your Git author name and email are configured, and install Node.js 22 and Chrome.
3. From the clone directory, run the script once for each branch, in order:

```powershell
& "C:\path\to\patches\apply-in-order.ps1" -Branch rxjs
git show --stat --oneline rxjs
git push origin rxjs
git switch main
git merge --ff-only rxjs
git push origin main

& "C:\path\to\patches\apply-in-order.ps1" -Branch migration
git show --stat --oneline migration
git push origin migration
git switch main
git merge --ff-only migration
git push origin main

& "C:\path\to\patches\apply-in-order.ps1" -Branch signal
git show --stat --oneline signal
git push origin signal
git switch main
git merge --ff-only signal
git push origin main
```

The script verifies the upstream SHA, exact expected target tree, and current
`main` tree **before** it creates a commit. It also runs `npm ci`,
`npm run build`, and `npm test -- --watch=false --browsers=ChromeHeadless`.
It **does not push or merge for you**. It stops immediately if a branch has
moved, tests fail, or a tree differs. Preserve existing local work outside
this fresh clone.

## Why the merge commits have two parents

The migration code and the Signals code already incorporate the preceding
branch's fixes. A normal one-parent commit on migration followed by a later
merge from main can conflict. The script instead builds the *one* new
migration commit with **upstream/migration and the newly updated main** as
its two parents, using `git commit-tree`. The Signals step does the same.
Each branch therefore has exactly one new commit, and `git merge --ff-only`
adds **no extra merge commit** to `main`.

Do not use GitHub's Squash and Merge option for the migration or Signals
step: it would lose the explicit integration ancestry.

## Validated equivalent code

From fork GitHub Actions runs on 2026-10-26:
- RxJS / Angular 18: production build passed, **52/52** Jasmine tests passed.
- Migration / Angular 22: production build passed, **53/53** Jasmine tests passed.
- Signals / Angular 22 integrated main: production build passed, **61/61** Jasmine tests passed.

These are automated build and unit-test results. They do not replace a
real-backend browser smoke test, particularly authenticated CV operations.
