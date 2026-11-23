# Запуск проекта

## Требования

- Node.js 24+ (`node -v` → `v24.16.0`)
- npm 11+ (`npm -v` → `11.13.0`)

## Первый запуск

```powershell
cd C:\Opencode\1\anton-tech
.\start.ps1
```

Скрипт проверит Node, поставит зависимости при необходимости, откроет браузер и запустит Vite. Открыть вручную: <http://localhost:5173/>.

Вручную, без скрипта:

```powershell
npm ci
npm run dev
```

## Ежедневный цикл

```powershell
npm run dev      # разработка, HMR
npm run build    # типы + прод-сборка в dist/
npm run preview  # проверить именно сборку
npm run lint     # линтер
```

## Проверка, что всё живо

1. `npm run build` завершается без ошибок.
2. `npm run dev` печатает `VITE v8.x ready`.
3. `Invoke-WebRequest http://localhost:5173/ -UseBasicParsing` возвращает `200`.

## Частые проблемы

| Симптом | Причина | Решение |
| --- | --- | --- |
| `Port 5173 is already in use` | запущен другой dev-сервер | остановить старый процесс или указать `--port 5174` |
| Пустая белая страница | ошибка в JSX | смотреть консоль браузера и терминал Vite |
| `tsc` ругается на типы | несовпадение пропсов/данных | исправить тип, не отключать проверку |
| Стили не применились | опечатка в классе | сверить `className` с селектором в `App.css` |

## Версии в шаблоне

Проект создан командой:

```powershell
npm create vite@latest anton-tech -- --template react-ts
```

Использован `create-vite@9.3.4`, установлено 28 пакетов, уязвимостей — 0.

См. также: [dev-сервер](dev-server.md), [стек](../01-project/stack.md).
