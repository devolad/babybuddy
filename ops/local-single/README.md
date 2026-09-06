# Local single-instance stack

One Baby Buddy container, SQLite on a dedicated volume, unique CSRF origins per run. Stock LinuxServer image — no app patch, no external database.

## Prerequisites

- Docker Engine + Compose v2

## Quick start

```bash
cd ops/local-single
cp .env.example .env
# Optional: set a unique BB_CONFIG_DIR / CSRF_TRUSTED_ORIGINS / BB_HOST_PORT
docker compose up -d
```

Open `http://127.0.0.1:8000` (or your mapped port). Default login is `admin` / `admin` — change it immediately.

LinuxServer generates and persists a Django secret under `/config` on the volume. Keep `BB_CONFIG_DIR` dedicated to this instance so secrets and SQLite stay isolated.

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

Compose does not set a fixed `container_name`, so another checkout/directory can run in parallel:

1. Copy `ops/local-single` (or use a second host path).
2. Use a different `BB_HOST_PORT`, `BB_CONFIG_DIR`, and matching `CSRF_TRUSTED_ORIGINS` in that `.env`.
3. `docker compose -p babybuddy2 up -d` (unique project name avoids resource clashes).

## Notes

- Default DB is SQLite (no Postgres).
- Building from this fork’s source is out of scope for this proto; pin/replace the image tag when you need a fork-derived image later.
