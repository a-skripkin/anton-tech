import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  findIndexBySlug,
  pagesBySlug,
  resolveWikiLink,
  wikiGroups,
  wikiPages,
} from './config'
import './WikiPage.css'

type Props = {
  slug: string
}

function scrollTop() {
  window.scrollTo(0, 0)
}

export default function WikiPage({ slug }: Props) {
  const page = pagesBySlug.get(slug) ?? wikiPages[0]
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    scrollTop()
    setNavOpen(false)
  }, [page.slug])

  const index = findIndexBySlug(page.slug)
  const prev = index > 0 ? wikiPages[index - 1] : null
  const next = index >= 0 && index < wikiPages.length - 1 ? wikiPages[index + 1] : null

  const components = useMemo<Components>(
    () => ({
      a({ href, children }) {
        if (!href) return <span>{children}</span>

        if (/^(https?:|mailto:)/.test(href)) {
          return (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          )
        }

        if (href.startsWith('#')) {
          return <span>{children}</span>
        }

        const target = resolveWikiLink(page.file, href)
        if (!target) {
          return (
            <span className="md-link-missing" title={`Не найдено в вики: ${href}`}>
              {children}
            </span>
          )
        }

        return <a href={`#/wiki/${target}`}>{children}</a>
      },
      table({ children }) {
        return (
          <div className="md-table">
            <table>{children}</table>
          </div>
        )
      },
      input({ checked, ...props }) {
        return <input {...props} checked={checked} readOnly disabled />
      },
    }),
    [page.file],
  )

  return (
    <div className="wiki">
      <header className="wiki__top">
        <a className="wiki__brand" href="#/">
          anton-tech<span>/wiki</span>
        </a>

        <div className="wiki__top-actions">
          <span className="wiki__counter">{wikiPages.length} страниц</span>
          <a className="wiki__back" href="#/">
            ← Визитка
          </a>
          <button
            type="button"
            className="wiki__menu-btn"
            aria-expanded={navOpen}
            aria-controls="wiki-nav"
            onClick={() => setNavOpen((open) => !open)}
          >
            {navOpen ? 'Закрыть' : 'Разделы'}
          </button>
        </div>
      </header>

      <div className="wiki__body">
        {navOpen && (
          <button
            type="button"
            className="wiki__scrim"
            aria-label="Закрыть навигацию"
            onClick={() => setNavOpen(false)}
          />
        )}

        <aside
          id="wiki-nav"
          className={`wiki__nav${navOpen ? ' is-open' : ''}`}
          aria-label="Навигация по вики"
        >
          <nav>
            {wikiGroups.map((group) => (
              <div key={group.title} className="wiki__group">
                <p className="wiki__group-title">{group.title}</p>
                <ul>
                  {group.pages.map((item) => (
                    <li key={item.slug}>
                      <a
                        href={`#/wiki/${item.slug}`}
                        className={item.slug === page.slug ? 'is-active' : undefined}
                        aria-current={item.slug === page.slug ? 'page' : undefined}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <p className="wiki__nav-foot">
            Markdown → <code>wiki/</code>
            <br />
            Обновлено 23.11.2026
          </p>
        </aside>

        <main className="wiki__main">
          <div className="wiki__meta">
            <span className="wiki__path">
              wiki / {page.group.toLowerCase()} / {page.file.split('/').pop()}
            </span>
            <span className="wiki__badge">Markdown</span>
          </div>

          <article className="md">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {page.content}
            </ReactMarkdown>
          </article>

          <nav className="wiki__pager" aria-label="Соседние страницы">
            {prev ? (
              <a className="wiki__pager-link" href={`#/wiki/${prev.slug}`}>
                <span>← Предыдущая</span>
                <strong>{prev.title}</strong>
              </a>
            ) : (
              <span />
            )}
            {next ? (
              <a className="wiki__pager-link wiki__pager-link--next" href={`#/wiki/${next.slug}`}>
                <span>Следующая →</span>
                <strong>{next.title}</strong>
              </a>
            ) : (
              <span />
            )}
          </nav>

          <footer className="wiki__foot">
            <span>anton-tech · внутренняя документация</span>
            <button type="button" className="wiki__totop" onClick={scrollTop}>
              Наверх ↑
            </button>
          </footer>
        </main>
      </div>
    </div>
  )
}
