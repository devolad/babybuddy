# Fork workflow (devolad/babybuddy)

Short process for where to push and how to merge. No application code changes.

## Baseline (as of this doc)

| Item | Value |
| --- | --- |
| Working repo | `devolad/babybuddy` (fork only) |
| Default branch | `master` |
| Upstream | `babybuddy/babybuddy` (reference / sync source; not a default PR target) |
| Known tip when written | `87570d32` on both fork `master` and upstream `master` |

Topic branches on the fork may exist for experiments; they are not merge targets unless opened as a PR into fork `master`.

## Where to push

1. Push feature branches to **`devolad/babybuddy`**.
2. Open PRs with **base = `devolad/babybuddy` `master`**.
3. Do **not** open PRs to third-party or upstream repositories without explicit prior approval from the owner (via coordination channel).

## Merge gate

1. Author opens PR on the fork.
2. **Codelet** reviews (content + CI). Formal Approve requires green CI on the fork (`test` 3.10–3.14 at minimum).
3. Owner gives explicit merge OK (via coordination channel).
4. Merge into fork `master` (squash or merge commit as preferred by the owner).
5. No merge without owner OK, even if CI is green and Codelet approved.

## CI on this fork

GitHub Actions must be enabled on `devolad/babybuddy`. The `CI` workflow (`.github/workflows/ci.yml`) runs the test matrix. If a PR shows `check_runs: 0`, enable Actions / re-run the workflow before asking for Approve.

## Syncing with upstream (optional)

When pulling upstream changes into the fork, prefer a dedicated branch + PR into fork `master`, same Codelet + owner gate. Do not force-push `master` without owner OK.

## Out of scope here

Application feature work, multi-instance orchestration, proxies, backups, and public packaging beyond this fork workflow.
