# OpenCode: rate-limit fallback на бесплатные модели

Инструкция по настройке плагина [`@azumag/opencode-rate-limit-fallback`](https://github.com/azumag/opencode-rate-limit-fallback) для OpenCode v2: при rate limit/quota ошибке сессия автоматически переключается на следующую модель из списка.

> Актуально для **OpenCode v2** (проверено на `v2.4.0`). Для v1 ключи и версия плагина отличаются — см. README плагина.

## 1. Подключить плагин

Глобальный конфиг OpenCode: `~/.config/opencode/opencode.jsonc` (Windows: `C:\Users\<user>\.config\opencode\opencode.jsonc`).

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "@azumag/opencode-rate-limit-fallback@2.1.1"
  ]
}
```

После изменения конфига: `/reload`. Если плагин добавлен впервые и не подхватился — перезапустить OpenCode.

## 2. Создать конфиг плагина

Плагин ищет `rate-limit-fallback.json` в порядке приоритета (первые пути перекрывают глобальные):

1. `<worktree>/.opencode/rate-limit-fallback.json`
2. `<worktree>/rate-limit-fallback.json`
3. `<project>/.opencode/rate-limit-fallback.json`
4. `<project>/rate-limit-fallback.json`
5. `~/.opencode/rate-limit-fallback.json` — рекомендован авторами
6. `~/.config/opencode/rate-limit-fallback.json` — удобно держать рядом с `opencode.jsonc`

Минимальный рабочий пример (бесплатные модели OpenCode):

```json
{
  "enabled": true,
  "fallbackMode": "cycle",
  "cooldownMs": 60000,
  "fallbackModels": [
    { "providerID": "opencode", "modelID": "deepseek-v4.1-flash-free" },
    { "providerID": "opencode", "modelID": "iceman-free" },
    { "providerID": "opencode", "modelID": "mimo-v2.6-flash-free" },
    { "providerID": "opencode", "modelID": "hy4-flash-free" },
    { "providerID": "opencode", "modelID": "flint-40b-free" },
    { "providerID": "opencode", "modelID": "beam-free" }
  ]
}
```

## 3. Как работает fallback

| Параметр | Значение | Смысл |
| --- | --- | --- |
| `fallbackModels` | массив `{providerID, modelID}` | упорядоченная цепочка fallback-моделей |
| `fallbackMode` | `cycle` / `stop` / `retry-last` / `wait` | что делать, когда цепочка исчерпана |
| `cooldownMs` | мс, по умолчанию 60000 | задержка перед повтором rate-limited модели |
| `enabled` | bool | выключить плагин без удаления конфига |

Поведение `fallbackMode`:

- `cycle` — после конца цепочки вернуться к первой модели после cooldown.
- `retry-last` — повторять последнюю модель.
- `stop` — остановиться с ошибкой.
- `wait` — не переключать модель, ждать cooldown и повторять ту же.

Важно: модель должна быть **подключена в OpenCode** и видна в `opencode models`. `providerID`/`modelID` берутся из вывода OpenCode, а не из маркетингового названия на сайте провайдера.

## 4. Подключение внешних провайдеров

Перед добавлением модели провайдера в `fallbackModels`:

1. Подключить провайдера в OpenCode (`opencode auth login` / конфиг провайдера в `opencode.jsonc`, в зависимости от провайдера).
2. Проверить, что модель появилась: `opencode models`.
3. Взять точный ID в формате `providerID/modelID` и разбить на поля `providerID`, `modelID`.

Проверка:

```powershell
opencode models                 # все доступные модели
opencode models | Select-String ":free|free"   # быстрый фильтр по free
```

## 5. Бесплатные/условно-бесплатные модели по провайдерам

Ниже — ориентиры по провайдерам, которые просили рассмотреть. **Бесплатность, лимиты и ID моделей меняются**; перед использованием сверяйте в кабинете провайдера и в `opencode models`.

| Провайдер | Как получить бесплатный доступ | Что проверять | Пример ID в OpenCode (проверить) |
| --- | --- | --- | --- |
| **OpenCode** | Встроенные `*-free` модели | `opencode models` | `opencode/deepseek-v4.1-flash-free`, `opencode/iceman-free`, `opencode/mimo-v2.6-flash-free` |
| **OpenRouter** | Модели с `:free` в ID; нужны аккаунт и ключ OpenRouter | Лимиты free-tier, доступность конкретной `:free` модели | `openrouter/<vendor>/<model>:free` — точный ID брать из каталога OpenRouter после подключения |
| **Groq** | Бесплатный tier с лимитами RPM/TPM/RPD | Актуальные лимиты и имена моделей в Groq Console | `groq/llama-3.3-70b-versatile`, `groq/llama-3.1-8b-instant` — примеры, сверить с `opencode models` |
| **Google AI Studio / Gemini** | Free tier для части Gemini-моделей; API key в AI Studio | Какая модель именно в free tier, лимиты RPM/TPM/RPD | `google/gemini-2.5-flash`, `google/gemini-2.5-flash-lite` — примеры, сверить с текущим каталогом |
| **GigaChat (Сбер)** | Freemium для физлиц: пакеты бесплатных токенов на Lite/Pro/Max/Ultra (срок действия ограничен) | Актуальные тарифы, ID моделей, срок действия пакета | `gigachat/GigaChat-2`, `gigachat/GigaChat-2-Pro`, `gigachat/GigaChat-2-Max` — уточнить по документации GigaChat и `opencode models` |
| **YandexGPT / Yandex AI Studio** | Гранты/пробный период/бесплатные квоты зависят от аккаунта и облака | Наличие гранта, модельный каталог, ID в OpenCode | `yandex/...` — точный ID брать только из `opencode models` после подключения Yandex Cloud |
| **OrcaRouter** | Нужна проверка: провайдер/агрегатор с собственным каталогом и тарифами | Есть ли бесплатные модели/квоты, как называется провайдер в OpenCode | Не фиксировать без проверки в `opencode models` |

### Заметки по провайдерам

- **OpenRouter** — удобен как агрегатор: одна учётка, много моделей. Free-модели обычно имеют суффикс `:free`, но у них отдельные лимиты и они могут меняться/исчезать. В fallback лучше ставить несколько `:free` моделей, а не одну.
- **Groq** — быстрый inference, но бесплатный tier имеет жёсткие лимиты по запросам/токенам/дню; для fallback хорош как «быстрый резерв», не как бесконечный.
- **Google AI Studio** — free tier есть не у всех Gemini-моделей; у preview/новых моделей условия часто отличаются от стабильных.
- **GigaChat** — по тарифам для физлиц (проверено по документации Сбер, 2026-11-24) есть Freemium-пакеты токенов на 12 месяцев; после исчерпания нужен платный пакет. Для OpenCode нужен настроенный GigaChat-провайдер/совместимый endpoint.
- **YandexGPT** — обычно требует облако/каталог/сервисный аккаунт; «бесплатно» чаще означает грант или пробные квоты, а не бессрочный free tier.
- **OrcaRouter** — на момент написания не подтверждён публичным каталогом из этой среды (сетевые ограничения). Перед добавлением проверить официальный сайт/документацию и наличие провайдера в OpenCode.

## 6. Пример: OpenCode free + внешние провайдеры

Используйте только те строки, для которых провайдер подключён и модель видна в `opencode models`.

```json
{
  "enabled": true,
  "fallbackMode": "cycle",
  "cooldownMs": 60000,
  "fallbackModels": [
    { "providerID": "opencode", "modelID": "deepseek-v4.1-flash-free" },
    { "providerID": "opencode", "modelID": "iceman-free" },

    { "providerID": "groq", "modelID": "llama-3.3-70b-versatile" },
    { "providerID": "groq", "modelID": "llama-3.1-8b-instant" },

    { "providerID": "google", "modelID": "gemini-2.5-flash" },

    { "providerID": "openrouter", "modelID": "google/gemma-3-27b-it:free" }
  ]
}
```

> Перед применением удалите/замените модели, которых нет в вашем `opencode models`. Несуществующий или неподключённый provider/model приведёт к ошибкам при fallback.

## 7. Диагностика

| Симптом | Что проверить |
| --- | --- |
| Плагин не ставится | Версия OpenCode v2; в `opencode.jsonc` ключ `plugins` (не `plugin`); версия плагина `@2.x` |
| Нет fallback при 429 | Есть ли `rate-limit-fallback.json`; `enabled: true`; `fallbackModels` не пустой |
| Fallback выбирает не ту модель | Точный `providerID/modelID` из `opencode models`; порядок в массиве |
| Внешняя модель не работает | Провайдер подключён, ключ/аккаунт активен, модель доступна в вашем регионе/тарифе |
| Нужно понять, что произошло | Логи OpenCode; метрики плагина (`metrics.enabled`) |

## 8. Безопасность

- Не хранить API-ключи в `rate-limit-fallback.json` — ключи живут в настройках провайдеров OpenCode/переменных окружения.
- Не добавлять в fallback платные модели, если цель — только free-резерв; иначе при лимите основной модели запрос уйдёт в платную.
- Для корпоративных провайдеров (GigaChat/Yandex) учитывать требования к данным и регион размещения.

## Связанные файлы

- Глобальный конфиг OpenCode: `C:\Users\<user>\.config\opencode\opencode.jsonc`
- Конфиг плагина: `C:\Users\<user>\.config\opencode\rate-limit-fallback.json`
- README плагина: <https://github.com/azumag/opencode-rate-limit-fallback>