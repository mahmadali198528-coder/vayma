# Medrese platform

Публичный сайт и фундамент будущей цифровой платформы медресе.

## Стек

Next.js App Router, TypeScript, Tailwind CSS, React Hook Form + Zod, Prisma/PostgreSQL. Конфигурация `components.json` подготовлена для shadcn/ui; storage, analytics, RBAC и rate limiting изолированы в `lib/`.

## Запуск

1. Установите Node.js LTS (20+).
2. Скопируйте `.env.example` в `.env` и укажите `DATABASE_URL`.
3. Выполните `npm install`.
4. Выполните `npx prisma migrate dev` и `npm run db:seed`.
5. Запустите `npm run dev`.

Production: `npm run build`, затем `npm start`.

## Важно

Все записи с `[ ... ]` и `[DEMO]` — placeholders. Админ-маршруты сейчас намеренно закрыты middleware до подключения настоящего authentication adapter. Никогда не добавляйте `.env` в Git.
