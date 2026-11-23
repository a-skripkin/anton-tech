# Dev-сервер

## Текущее состояние

| Параметр | Значение |
| --- | --- |
| Статус | запущен |
| URL | <http://localhost:5173/> |
| Порт | 5173 (`--strictPort`) |
| Хост | только localhost |
| Запуск | `npm run dev -- --port 5173 --strictPort` |
| PID процесса | 42228 |
| Лог | `C:\Users\a.skripkin\.local\share\opencode\shell\global\sh_2080aa91b001SoTyW4bcUbMP4L.out` |
| Проверка | HTTP 200 |

## Остановить

```powershell
Stop-Process -Id 42228
```

Или найти процесс по порту:

```powershell
Get-NetTCPConnection -LocalPort 5173 | Select-Object OwningProcess
Stop-Process -Id <PID>
```

## Перезапустить

```powershell
cd C:\Opencode\1\anton-tech
npm run dev -- --port 5173 --strictPort
```

## Почему `--strictPort`

Если порт занят, Vite молча возьмёт следующий (5174), и ссылка в вики станет неверной. `--strictPort` заставляет упасть с понятной ошибкой — так проще заметить конфликт.

## Доступ с телефона в той же сети

```powershell
npm run dev -- --host
```

Vite покажет `Network: http://<ip>:5173/`. Порт должен быть разрешён в брандмауэре Windows.

## Важно

`dist/` — это статика, её можно раздавать любым веб-сервером. Dev-сервер для продакшена не используется.
