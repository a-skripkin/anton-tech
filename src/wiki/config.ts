import adrTemplate from '../../wiki/06-templates/adr.md?raw'
import adr0001 from '../../wiki/05-decisions/0001-vite-react-ts.md?raw'
import changelog from '../../wiki/changelog.md?raw'
import conventions from '../../wiki/00-meta/conventions.md?raw'
import design from '../../wiki/03-design/ui-kit.md?raw'
import devServer from '../../wiki/02-dev/dev-server.md?raw'
import gettingStarted from '../../wiki/02-dev/getting-started.md?raw'
import glossary from '../../wiki/00-meta/glossary.md?raw'
import home from '../../wiki/README.md?raw'
import logEntry from '../../wiki/04-logs/2026-11-23.md?raw'
import logEntry24 from '../../wiki/04-logs/2026-11-24.md?raw'
import logTemplate from '../../wiki/06-templates/log-entry.md?raw'
import opencodeFallback from '../../wiki/02-dev/opencode-rate-limit-fallback.md?raw'
import overview from '../../wiki/01-project/overview.md?raw'
import recovery from '../../wiki/02-dev/recovery.md?raw'
import stack from '../../wiki/01-project/stack.md?raw'
import structure from '../../wiki/01-project/structure.md?raw'
import wikiUi from '../../wiki/02-dev/wiki-ui.md?raw'

export type WikiPage = {
  slug: string
  title: string
  file: string
  group: string
  content: string
}

const groupOrder = [
  'Обзор',
  'Мета',
  'Проект',
  'Разработка',
  'Дизайн',
  'Журнал',
  'Решения',
  'Шаблоны',
  'История',
]

export const wikiPages: WikiPage[] = [
  {
    slug: 'home',
    title: 'Главная',
    file: 'README.md',
    group: 'Обзор',
    content: home,
  },
  {
    slug: 'conventions',
    title: 'Правила ведения',
    file: '00-meta/conventions.md',
    group: 'Мета',
    content: conventions,
  },
  {
    slug: 'glossary',
    title: 'Глоссарий',
    file: '00-meta/glossary.md',
    group: 'Мета',
    content: glossary,
  },
  {
    slug: 'overview',
    title: 'О проекте',
    file: '01-project/overview.md',
    group: 'Проект',
    content: overview,
  },
  {
    slug: 'stack',
    title: 'Стек',
    file: '01-project/stack.md',
    group: 'Проект',
    content: stack,
  },
  {
    slug: 'structure',
    title: 'Структура файлов',
    file: '01-project/structure.md',
    group: 'Проект',
    content: structure,
  },
  {
    slug: 'getting-started',
    title: 'Запуск',
    file: '02-dev/getting-started.md',
    group: 'Разработка',
    content: gettingStarted,
  },
  {
    slug: 'dev-server',
    title: 'Dev-сервер',
    file: '02-dev/dev-server.md',
    group: 'Разработка',
    content: devServer,
  },
  {
    slug: 'wiki-ui',
    title: 'Веб-версия вики',
    file: '02-dev/wiki-ui.md',
    group: 'Разработка',
    content: wikiUi,
  },
  {
    slug: 'recovery',
    title: 'Восстановление',
    file: '02-dev/recovery.md',
    group: 'Разработка',
    content: recovery,
  },
  {
    slug: 'opencode-rate-limit-fallback',
    title: 'OpenCode: rate-limit fallback',
    file: '02-dev/opencode-rate-limit-fallback.md',
    group: 'Разработка',
    content: opencodeFallback,
  },
  {
    slug: 'design',
    title: 'Дизайн-система',
    file: '03-design/ui-kit.md',
    group: 'Дизайн',
    content: design,
  },
  {
    slug: 'log-2026-11-23',
    title: 'Журнал · 23.11.2026',
    file: '04-logs/2026-11-23.md',
    group: 'Журнал',
    content: logEntry,
  },
  {
    slug: 'log-2026-11-24',
    title: 'Журнал · 24.11.2026',
    file: '04-logs/2026-11-24.md',
    group: 'Журнал',
    content: logEntry24,
  },
  {
    slug: 'adr-0001',
    title: 'ADR 0001 · Стек',
    file: '05-decisions/0001-vite-react-ts.md',
    group: 'Решения',
    content: adr0001,
  },
  {
    slug: 'template-log',
    title: 'Шаблон журнала',
    file: '06-templates/log-entry.md',
    group: 'Шаблоны',
    content: logTemplate,
  },
  {
    slug: 'template-adr',
    title: 'Шаблон ADR',
    file: '06-templates/adr.md',
    group: 'Шаблоны',
    content: adrTemplate,
  },
  {
    slug: 'changelog',
    title: 'Changelog',
    file: 'changelog.md',
    group: 'История',
    content: changelog,
  },
]

export const wikiGroups = groupOrder
  .map((title) => ({
    title,
    pages: wikiPages.filter((page) => page.group === title),
  }))
  .filter((group) => group.pages.length > 0)

export const pagesBySlug = new Map(wikiPages.map((page) => [page.slug, page]))
export const pagesByFile = new Map(wikiPages.map((page) => [page.file, page]))

export function findIndexBySlug(slug: string): number {
  return wikiPages.findIndex((page) => page.slug === slug)
}

/**
 * Превращает относительную ссылку из Markdown в slug страницы вики.
 * Поддерживает `../`, `.md` и ссылки на папку (берёт первую страницу раздела).
 */
export function resolveWikiLink(currentFile: string, href: string): string | null {
  const withoutAnchor = href.split('#')[0].split('?')[0]
  if (!withoutAnchor) return null

  const baseDir = currentFile.includes('/')
    ? currentFile.slice(0, currentFile.lastIndexOf('/'))
    : ''

  const parts = [...(baseDir ? baseDir.split('/') : []), ...withoutAnchor.split('/')]
  const stack: string[] = []

  for (const part of parts) {
    if (!part || part === '.') continue
    if (part === '..') {
      stack.pop()
      continue
    }
    stack.push(part)
  }

  const path = stack.join('/')
  const direct = pagesByFile.get(path)
  if (direct) return direct.slug

  const prefix = path.endsWith('/') ? path : `${path}/`
  const firstInFolder = wikiPages.find((page) => page.file.startsWith(prefix))
  if (firstInFolder) return firstInFolder.slug

  const withExtension = pagesByFile.get(`${path}.md`)
  return withExtension ? withExtension.slug : null
}
