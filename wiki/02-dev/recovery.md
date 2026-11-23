# Восстановление проекта

Короткий ответ: **исходники и вики лежат на диске и не пропадают** при закрытии терминала. Теряется только запущенный dev-сервер — он поднимается одной командой.

## Быстрый запуск

```powershell
cd C:\Opencode\1\anton-tech
.\start.ps1
```

Скрипт сам поставит зависимости, если нет `node_modules`, откроет браузер и запустит Vite на порту 5173.

Параметры:

| Параметр | Действие |
| --- | --- |
| `-Port 5174` | другой порт |
| `-NoOpen` | не открывать браузер |
| `-Reinstall` | принудительно `npm ci` |

Без скрипта:

```powershell
npm ci        # только если нет node_modules
npm run dev
```

## Сценарии

| Что случилось | Что делать |
| --- | --- |
| Закрыл терминал | `.\start.ps1` — код и вики на месте |
| Новая сессия с агентом | сказать «продолжай по вики»: он прочитает `wiki/README.md` и журнал |
| Случайно удалил файлы | `git restore .` или `git checkout -- .` (если коммит был) |
| Переустановка Windows / новый ПК | `git clone https://github.com/a-skripkin/anton-tech.git`, `npm ci`, `.\start.ps1` |
| Пропала вся папка | клонировать из GitHub (репозиторий приватный, нужен вход `a-skripkin`) |

## Git

Репозиторий инициализирован в `C:\Opencode\1\anton-tech`.

| Команда | Назначение |
| --- | --- |
| `git status` | что изменено |
| `git log --oneline` | история |
| `git diff` | построчные правки |
| `git add -A; git commit -m "..."` | зафиксировать изменения |
| `git restore <file>` | откатить файл |

В репозиторий **не** попадают: `node_modules`, `dist`, логи (см. `.gitignore`). Это восстанавливается командами `npm ci` и `npm run build`.

Первый коммит: `093c5b7` (ветка `main`, 37 файлов).

Переводы строк нормализованы: `.gitattributes` (`* text=auto eol=lf`), локально `core.autocrlf=false`. Проверено: правка файла откатывается через `git restore`.

## Внешняя копия

Репозиторий создан и запушен:

| Параметр | Значение |
| --- | --- |
| Remote | `origin` → <https://github.com/a-skripkin/anton-tech> |
| Видимость | private |
| Ветка | `main` (отслеживает `origin/main`) |
| Аккаунт | `a-skripkin` |

Обычный цикл:

```powershell
git add -A
git commit -m "описание изменений"
git push
```

Восстановление на другой машине:

```powershell
git clone https://github.com/a-skripkin/anton-tech.git
cd anton-tech
npm ci
.\start.ps1
```

## GitHub CLI

`gh` установлен portable, без прав администратора:

| Параметр | Значение |
| --- | --- |
| Версия | 2.105.0 |
| Путь | `C:\Users\a.skripkin\AppData\Local\Programs\gh\bin\gh.exe` |
| PATH | добавлен в переменную пользователя (виден в новых терминалах) |
| Авторизация | device flow, токен в Windows keyring |
| Scopes | `repo`, `read:org`, `gist` |
| Git-протокол | HTTPS, credential helper → `gh auth git-credential` |

Полезные команды:

```powershell
gh auth status          # проверить вход
gh repo view            # сведения о репозитории
gh repo clone a-skripkin/anton-tech
```

Если токен истечёт: `gh auth login --hostname github.com --git-protocol https --web`.

## SSL за корпоративным прокси

Первый push упал с `self-signed certificate in certificate chain` — трафик перехватывает корпоративный прокси. Решение: git использует хранилище сертификатов Windows, где корневой сертификат компании уже доверенный.

```powershell
git config --global http.sslBackend schannel
```

Отключать проверку (`http.sslVerify false`) не нужно и небезопасно.

## Проверка после восстановления

- [ ] `node -v` → 24.x (зафиксировано в `.nvmrc` и `engines`);
- [ ] `npm ci` без ошибок;
- [ ] `.\start.ps1` открывает <http://localhost:5173/>;
- [ ] визитка на `/`, вики на `/#/wiki`;
- [ ] `npm run build` проходит.

## Что читать агенту в новой сессии

1. `wiki/README.md` — статус и навигация.
2. `wiki/04-logs/` — что уже сделано.
3. `wiki/01-project/structure.md` — где что лежит.
4. Этот файл — как поднять проект.

Контекст диалога агенту недоступен, поэтому вики и есть «память» проекта.
