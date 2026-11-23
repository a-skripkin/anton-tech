# anton-tech

Страница-визитка разработчика: одностраничный сайт на Vite + React + TypeScript.

**Демо:** <http://localhost:5173/> (после `npm run dev`)

## Запуск

```powershell
.\start.ps1
```

Скрипт поставит зависимости при необходимости, откроет браузер и запустит Vite. Вручную:

```powershell
npm ci
npm run dev
```

## Скрипты

| Команда | Действие |
| --- | --- |
| `npm run dev` | dev-сервер с HMR |
| `npm run build` | проверка типов + сборка в `dist/` |
| `npm run preview` | просмотр сборки |
| `npm run lint` | oxlint |

## Документация

Вся документация проекта — в [wiki/README.md](wiki/README.md), а также в браузере: <http://localhost:5173/#/wiki>.

- [О проекте](wiki/01-project/overview.md)
- [Стек](wiki/01-project/stack.md)
- [Структура файлов](wiki/01-project/structure.md)
- [Запуск](wiki/02-dev/getting-started.md)
- [Веб-версия вики](wiki/02-dev/wiki-ui.md)
- [Дизайн-система](wiki/03-design/ui-kit.md)
- [Журнал работ](wiki/04-logs/2026-11-23.md)

## Контент

Имя, роль, описание, навыки и контакты задаются объектами в начале [`src/App.tsx`](src/App.tsx). Контакты сейчас — заглушки.
