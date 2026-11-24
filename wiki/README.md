# Wiki — anton-tech

База знаний проекта **anton-tech** (страница-визитка). Здесь фиксируется всё: договорённости, структура, дизайн, решения и журнал работ.

Эта же вики открывается в браузере: **<http://localhost:5173/#/wiki>** (см. [Веб-версия вики](02-dev/wiki-ui.md)).

> Правило: после каждой завершённой задачи добавляется запись в [журнал](04-logs/2026-11-23.md) и строка в [changelog](changelog.md).

## Быстрая навигация

| Раздел | Что внутри |
| --- | --- |
| [00-meta](00-meta/conventions.md) | Как ведётся вики, глоссарий |
| [01-project](01-project/overview.md) | О проекте, стек, структура файлов |
| [02-dev](02-dev/getting-started.md) | Запуск, сборка, dev-сервер, восстановление, веб-вики, OpenCode fallback |
| [03-design](03-design/ui-kit.md) | Дизайн-токены, компоненты, адаптив |
| [04-logs](04-logs/2026-11-23.md) | Журнал по датам |
| [05-decisions](05-decisions/0001-vite-react-ts.md) | ADR — архитектурные решения |
| [06-templates](06-templates/log-entry.md) | Шаблоны записей |
| [changelog](changelog.md) | История версий |

## Текущий статус

| Параметр | Значение |
| --- | --- |
| Версия | `0.3.0` |
| Состояние | MVP + веб-вики, git-репозиторий, запуск одной командой |
| Стек | Vite 8 · React 19 · TypeScript 7 · react-markdown |
| Dev URL | <http://localhost:5173/> |
| Вики | <http://localhost:5173/#/wiki> |
| Запуск | `.\start.ps1` |
| Сайт | <https://a-skripkin.github.io/anton-tech/> |
| Репозиторий | <https://github.com/a-skripkin/anton-tech> |
| Сборка | `npm run build` — успешно |
| Обновлено | 2026-11-24 |

## Структура вики

```text
wiki/
├── README.md                  # этот файл — точка входа
├── changelog.md               # хронология изменений
├── 00-meta/
│   ├── conventions.md         # правила ведения вики
│   └── glossary.md            # термины
├── 01-project/
│   ├── overview.md            # назначение и содержание проекта
│   ├── stack.md               # зависимости и их роли
│   └── structure.md           # карта файлов
├── 02-dev/
│   ├── getting-started.md     # установка и команды
│   ├── dev-server.md          # как поднять/остановить страницу
│   ├── wiki-ui.md             # как устроена вики в браузере
│   ├── recovery.md            # восстановление проекта, git, бэкап
│   └── opencode-rate-limit-fallback.md  # rate-limit fallback на бесплатные модели
├── 03-design/
│   └── ui-kit.md              # токены, компоненты, анимации
├── 04-logs/
│   ├── 2026-11-23.md          # журнал за день
│   └── 2026-11-24.md          # журнал за день
├── 05-decisions/
│   └── 0001-vite-react-ts.md  # ADR о выборе стека
└── 06-templates/
    ├── log-entry.md           # шаблон записи журнала
    └── adr.md                 # шаблон ADR
```

## Счётчик

18 страниц вики: 9 разделов, 2 шаблона, 2 журнала, changelog.

## Смежные проекты

| Проект | Назначение | Репозиторий |
| --- | --- | --- |
| `breach-watch` | Ежедневный дайджест взломов (РФ / мир / крипто) в Telegram через GitHub Actions | <https://github.com/a-skripkin/breach-watch> |

Подробности — в журнале за 2026-11-23, задача 5.
