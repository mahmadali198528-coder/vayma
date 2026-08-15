# Project instructions for Copilot

## Project
This repository is a Next.js medrese website with admin features, public pages, API routes, and Prisma/PostgreSQL integration.

## Core rules
- Keep the app aligned with the existing Next.js App Router structure.
- Prefer editing existing files before creating new ones.
- Do not commit or expose secrets, tokens, or database passwords.
- Do not hardcode production credentials; use environment variables.
- Keep the project working locally on Windows PowerShell.

## Local environment
- Main app URL: http://localhost:3002
- Use PostgreSQL locally when database features are needed.
- Keep DATABASE_URL in .env.local and never commit it.
- If PostgreSQL is not running, fix the service first before assuming app logic is broken.

## Development workflow
- Install dependencies with: npm install
- Start dev server with: npm run dev
- Verify TypeScript with: npx tsc --noEmit
- If Prisma changes are made, use: npx prisma generate and npx prisma db push

## Git hygiene
- Never commit .env, .env.local, local DB files, logs, or generated build output.
- Respect the repository .gitignore rules.
- Keep commit messages clear and short.

## Content and product notes
- This project is for a medrese website with public pages, admissions, teachers, news, and admin management.
- Student registration should remain secure and code-based when required.
- Admin pages should show real data, not placeholder text.

## Safety
- Do not delete user data without confirmation.
- For DB or auth changes, validate with compilation and relevant tests before claiming success.
