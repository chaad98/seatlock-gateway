# seatlock-gateway

The API gateway for SeatLock. It is the only public service: the web app calls it over HTTP, and it talks to the other services over NATS.

## Requirements
- Node.js 26 (via nvm-windows)
- Local infra from `seatlock-platform` (not needed yet for this service)

## Setup
1. Install packages: `npm install`
2. Copy `.env.example` to `.env`
3. Optional: run `npx @nestjs/observe link` to connect NestJS Observe. It writes the keys into `.env`.

## Environment
Checked with Zod at boot (`src/config/env.schema.ts`). A bad value stops the app with a clear message.

| Variable | Default | Meaning |
|---|---|---|
| `NODE_ENV` | `development` | `development`, `production` or `test` |
| `HOST` | `127.0.0.1` | Address to listen on |
| `PORT` | `4000` | Port to listen on |
| `WEB_ORIGIN` | `http://localhost:3000` | The only browser origin allowed by CORS |

## Scripts
| Command | What it does |
|---|---|
| `npm run start:dev` | Run with watch mode (loads `.env`) |
| `npm run build` | Compile to `dist/` |
| `npm run start:prod` | Run the build (does not load `.env`, so set variables yourself) |
| `npm test` | Unit tests |
| `npm run test:e2e` | End-to-end tests |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | Lint with oxlint |

## Endpoints
- `GET /health` returns `{ "status": "ok" }`
