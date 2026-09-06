# Local single-instance stack

One Baby Buddy container, SQLite on a dedicated volume, unique CSRF origins per run. Stock LinuxServer image — no app patch, no external database.

## Prerequisites

- Docker Engine + Compose v2

## Quick start

```bash
cd ops/local-single
cp .env.example .env
# Optional: set unique BB_INSTANCE_ID / BB_CONFIG_DIR / CSRF_TRUSTED_ORIGINS / BB_HOST_PORT
docker compose up -d
```

Open `http://127.0.0.1:8000` (or your mapped port). Default login is `admin` / `admin` — change it immediately.

LinuxServer generates and persists a Django secret under `/config` on the volume. Keep `BB_CONFIG_DIR` dedicated to this instance so secrets and SQLite stay isolated.

`container_name` is `babybuddy-${BB_INSTANCE_ID}` (default `babybuddy-local`). Change `BB_INSTANCE_ID` for every parallel stack.

## Verify

```bash
docker compose ps
docker compose logs -f --tail=50
# After UI login works:
docker compose restart
# Confirm data still present (same volume)
docker compose ps
```

SQLite and config live in `${BB_CONFIG_DIR}` (default `./data`).

## Stop / wipe

```bash
docker compose down          # keep volume/data
docker compose down -v       # compose-named volumes only; bind data/ remains
rm -rf data                  # destroy local SQLite/config if using default path
```

## Second local instance

1. Use another directory (or another `.env`).
2. Set a **unique** `BB_INSTANCE_ID`, `BB_HOST_PORT`, `BB_CONFIG_DIR`, and matching `CSRF_TRUSTED_ORIGINS`.
3. Optionally `docker compose -p <unique-project> up -d` so Compose project resources do not clash.

## Notes

- Default DB is SQLite (no Postgres).
- Building from this fork’s source is out of scope for this proto; pin/replace the image tag when you need a fork-derived image later.
