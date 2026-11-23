import { useEffect, useState } from 'react'
import './App.css'
import WikiPage from './wiki/WikiPage'

const profile = {
  name: 'Антон',
  role: 'Frontend-разработчик',
  tagline: 'Делаю быстрые, аккуратные и удобные интерфейсы',
  about:
    'Собираю веб-приложения на React и TypeScript: от идеи и прототипа до продакшена. Люблю чистый код, продуманный UX и интерфейсы, которыми приятно пользоваться.',
  location: 'Москва · открыт к проектам',
}

const contacts = [
  {
    label: 'Telegram',
    value: '@anton_tech',
    href: 'https://t.me/anton_tech',
    icon: 'telegram',
  },
  {
    label: 'GitHub',
    value: 'github.com/anton-tech',
    href: 'https://github.com/anton-tech',
    icon: 'github',
  },
  {
    label: 'Email',
    value: 'hello@anton-tech.dev',
    href: 'mailto:hello@anton-tech.dev',
    icon: 'mail',
  },
] as const

const skills = [
  'React',
  'TypeScript',
  'Vite',
  'Node.js',
  'CSS / UI',
  'Figma',
]

function Icon({ name }: { name: 'telegram' | 'github' | 'mail' }) {
  if (name === 'telegram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.9 4.3c.3-1.2-.4-1.7-1.4-1.3L2.7 9.9c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.8 5.5c.2.6.1.9.8.9.5 0 .8-.2 1.1-.5l2.6-2.5 4.4 3.3c.9.5 1.5.2 1.7-.8l3-14.4ZM9.9 14.2l9.1-5.7c.4-.3.8-.1.5.2l-7.6 6.9-.3 3-1.7-4.4Z"
        />
      </svg>
    )
  }

  if (name === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .5Z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.4-.5 7.6 6 7.6-6H4.4ZM20 6.9l-7.4 5.8a1 1 0 0 1-1.2 0L4 6.9v11.6c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5V6.9Z"
      />
    </svg>
  )
}

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

const WIKI_ROUTE = /^#\/wiki(?:\/(\w[\w-]*))?/

export default function App() {
  const hash = useHash()
  const wikiMatch = hash.match(WIKI_ROUTE)

  if (wikiMatch) {
    return <WikiPage slug={wikiMatch[1] ?? 'home'} />
  }

  return (
    <main className="page">
      <div className="glow glow--one" aria-hidden="true" />
      <div className="glow glow--two" aria-hidden="true" />

      <section className="card">
        <header className="card__head">
          <div className="avatar" aria-hidden="true">
            <span>А</span>
          </div>

          <div className="headline">
            <p className="eyebrow">
              <span className="dot" />
              {profile.location}
            </p>
            <h1>{profile.name}</h1>
            <p className="role">{profile.role}</p>
            <p className="tagline">{profile.tagline}</p>
          </div>
        </header>

        <p className="about">{profile.about}</p>

        <ul className="skills" aria-label="Навыки">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <nav className="contacts" aria-label="Контакты">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              className="contact"
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
            >
              <span className="contact__icon">
                <Icon name={contact.icon} />
              </span>
              <span className="contact__text">
                <span className="contact__label">{contact.label}</span>
                <span className="contact__value">{contact.value}</span>
              </span>
              <span className="contact__arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>

        <footer className="card__foot">
          <span>© {new Date().getFullYear()} anton-tech</span>
          <span className="foot-links">
            <span className="foot-note">Всегда на связи</span>
            <a className="foot-link" href="#/wiki">
              Вики →
            </a>
          </span>
        </footer>
      </section>
    </main>
  )
}
