# seatlock-gateway

NestJS 12 API gateway for SeatLock. Workspace rules and stack decisions live in `../seatlock-platform/WORKSPACE.md`. Read it first.

## Rules for this repo
- ESM: relative imports end in `.js`.
- HTTP uses `NodeAdapter` from `@nestjs/platform-node`, not Express. Tests create apps with `new NodeAdapter()`.
- App setup (helmet, CORS, shutdown hooks) lives in `src/app.setup.ts`. `main.ts` and e2e tests both call `setupApp(app)`.
- Config: add every new variable to `src/config/env.schema.ts` (with a test) and to `.env.example`. Read it with `ConfigService<Env, true>` and `{ infer: true }`, never `process.env` directly.
- Tests first. Unit tests sit next to the code (`*.spec.ts`), e2e tests in `test/` (`*.e2e-spec.ts`).
- Feature code is written by hand, never generated with `nest g`.

## NestJS Observe
- Monitoring through `@nestjs/observe`. Keys live in the git-ignored `.env`. Never commit them.
- Observe is turned off when `NODE_ENV` is `test`.

## Before committing
Run `npm run typecheck`, `npm run lint`, `npm test` and `npm run test:e2e`.
