# Структура файлов

## Карта проекта

```text
anton-tech/
├── index.html              # точка входа: lang="ru", title, favicon, мета-описание
├── package.json            # скрипты и зависимости
├── vite.config.ts          # конфигурация Vite (+ plugin-react)
├── tsconfig*.json          # конфигурация TypeScript (app / node)
├── .oxlintrc.json          # правила линтера
├── start.ps1               # запуск одной командой (npm ci при необходимости + браузер)
├── .nvmrc                  # версия Node для проекта (24)
├── .gitignore              # node_modules, dist, логи
├── public/
│   └── favicon.svg         # иконка-монограмма «A» с градиентом
├── src/
│   ├── main.tsx            # создание корня React, StrictMode
│   ├── App.tsx             # контент + разметка визитки, hash-роутинг на вики
│   ├── App.css             # стили карточки и анимации
│   ├── index.css           # сброс стилей, базовые токены, selection
│   └── wiki/
│       ├── config.ts       # каталог страниц, группы, резолвер ссылок
│       ├── WikiPage.tsx    # страница вики: меню, Markdown, pager
│       └── WikiPage.css    # стили вики и типографика Markdown
├── dist/                   # результат build (не редактируется вручную)
└── wiki/                   # эта документация
```

Репозиторий git инициализирован в корне проекта; `node_modules`, `dist` и логи исключены через `.gitignore`.

## Где что менять

| Задача | Файл |
| --- | --- |
| Имя, роль, описание | `src/App.tsx` → объект `profile` |
| Ссылки и контакты | `src/App.tsx` → массив `contacts` |
| Навыки | `src/App.tsx` → массив `skills` |
| Цвета, отступы, анимации | `src/App.css` |
| Фон, системные шрифты, выделение текста | `src/index.css` |
| Заголовок вкладки и описание для поиска | `index.html` |
| Иконка сайта | `public/favicon.svg` |
| Каталог страниц вики | `src/wiki/config.ts` |
| Оформление вики | `src/wiki/WikiPage.css` |

## Правила

1. `src/App.tsx` держим «тонким»: данные вверху, разметка ниже, иконки — отдельным компонентом `Icon`.
2. Новые секции оформляем как `<section>` с классом по БЭМ-подобной схеме (`card__head`, `contact__icon`).
3. Глобальные стили — только в `index.css`; всё остальное в `App.css`.
4. Изображения кладём в `src/assets/` и импортируем, а не хардкодим пути.
5. После любых правок — `npm run build` (он же проверяет типы).
