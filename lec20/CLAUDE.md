# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Context

NestJS 11 + Mongoose REST API (course lecture 20). Paired frontend lives in sibling `../lec20-front` (Next.js); CORS allows only `FRONTEND_URL`.

## Commands

```bash
npm run start:dev                 # watch mode, port $PORT or 3000
npm run build                     # nest build -> dist/ (also copies swagger YAML)
npm run lint                      # eslint --fix
npm run format                    # prettier
npm test                          # unit tests (*.spec.ts under src/)
npx jest src/users/users.service.spec.ts   # single test file
npx jest -t "test name"           # single test by name
npm run test:e2e                  # test/*.e2e-spec.ts
```

## Environment

`.env` loaded via `ConfigModule` (global), but most modules read `process.env` directly at import/construct time (`JwtModule.register`, `MailerModule.forRoot`, `MongooseModule.forRoot`, `GoogleStrategy`, `AwsS3Service`). Required vars: `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, `PORT`, `AWS_ACCESS_KEY`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_BUCKET_NAME`, `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`. `.env.example` is incomplete (missing email + Google vars).

## Architecture

- **Imports use `src/...` absolute paths** (e.g. `from 'src/users/schema/user.schema'`); jest resolves them via `modulePaths: ["<rootDir>/.."]`.
- **Global setup** (`src/main.ts`): `ValidationPipe` with `whitelist` + `forbidNonWhitelisted` + `transform` — every DTO field must carry class-validator decorators or requests get rejected. Pino logger (`pino-nestjs`) replaces Nest logger.
- **Mongoose models registered by string name**, not class: `forFeature([{ name: 'user', schema: userSchema }])` and injected with `@InjectModel('user')`. Same model registered in multiple modules (`AuthModule` and `UsersModule` both register `'user'`; `UsersModule` also registers `'expense'`). Tests mock with `getModelToken('user')`.
- **User schema**: `password` is `select: false` — use `.select('+password')` when needed. `fullName`/`email` lowercased. Google users have no password.
- **Auth**:
  - Email/password: sign-up hashes with bcrypt, stores 6-digit `OTPCode` (5 min expiry) and emails it via `EmailSenderService`; sign-in rejects unverified users. JWT payload `{ userId }`, 1h expiry, signed by global `JwtModule`.
  - Google OAuth: `GoogleStrategy` (passport-google-oauth2) + `GoogleGuard`; callback sets `accessToken` cookie and redirects to `FRONTEND_URL`.
  - Protected routes use custom `IsAuthGuard` (not passport-jwt): reads `Authorization: Bearer <token>`, sets `req.userId`; controllers read it via `@UserId()` decorator (`src/users/decorators/user.decorator.ts`).
  - `ThrottlerGuard` applied per-route on sign-up/sign-in (global limit 20/min).
- **Other guards** in `src/guards/` (`role.guard.ts`, `safe.guard.ts`) are header-based teaching examples (`role`, `key` headers), not real authz.
- **Files**: `ProductsModule` uses multer interceptors and `AwsS3Service` (upload/get-as-base64-data-URI/delete).
- **Swagger is hand-written YAML**, not decorators. `src/swagger/docs/*.yaml` are deep-merged alphabetically (`_root.yaml` first) by `yaml-loader.ts` and served at `/docs` (`/docs/json`, `/docs/yaml`). When adding/changing endpoints, update the matching YAML file. `nest-cli.json` copies these into `dist`.
- Commented-out middleware/guard wiring in `app.module.ts`, `main.ts`, `users.module.ts` is intentional lecture reference material — leave it.
