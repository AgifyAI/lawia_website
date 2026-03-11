import { Link, useLocation } from 'react-router-dom'

interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  links?: NavLink[]
  cta?: NavLink
  minimal?: boolean
}

export default function Navbar({ links = [], cta, minimal = false }: NavbarProps) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      if (isHome) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          const offset = 70
          const top = target.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <nav className="site-nav">
      <Link to="/" className="site-nav-logo">
        LAW<span>IA</span>
      </Link>

      {!minimal && (
        <div className="site-nav-links">
          {links.map(({ label, href }) => {
            if (href.startsWith('#')) {
              return isHome ? (
                <a key={href} href={href} onClick={(e) => handleClick(e, href)}>
                  {label}
                </a>
              ) : (
                <Link key={href} to={`/${href}`}>
                  {label}
                </Link>
              )
            }
            return (
              <Link key={href} to={href}>
                {label}
              </Link>
            )
          })}

          {cta && (
            cta.href.startsWith('#') ? (
              isHome ? (
                <a href={cta.href} className="nav-cta" onClick={(e) => handleClick(e, cta.href)}>
                  {cta.label}
                </a>
              ) : (
                <Link to={`/${cta.href}`} className="nav-cta">
                  {cta.label}
                </Link>
              )
            ) : (
              <Link to={cta.href} className="nav-cta">
                {cta.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  )
}
