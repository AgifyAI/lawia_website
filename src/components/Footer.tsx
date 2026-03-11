import { Link, useLocation } from 'react-router-dom'

interface NavLink {
  label: string
  href: string
}

interface FooterProps {
  navLinks?: NavLink[]
}

export default function Footer({ navLinks = [] }: FooterProps) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const renderLink = ({ label, href }: NavLink) => {
    if (href.startsWith('#')) {
      if (isHome) {
        return <a key={href} href={href}>{label}</a>
      }
      return <Link key={href} to={`/${href}`}>{label}</Link>
    }
    if (href.startsWith('mailto:')) {
      return <a key={href} href={href}>{label}</a>
    }
    return <Link key={href} to={href}>{label}</Link>
  }

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>LAW<span>IA</span></h3>
            <p>
              Pack de 5 Skills Claude con&ccedil;us par Me Patrice Humbert pour transformer
              la pratique juridique des avocats gr&acirc;ce &agrave; l'intelligence artificielle.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              {navLinks.map(({ label, href }) => (
                <li key={href}>{renderLink({ label, href })}</li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:contact@lawia.fr">contact@lawia.fr</a></li>
              <li><a href="#">Mentions l&eacute;gales</a></li>
              <li><a href="#">CGV</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2025 LAWIA SAS. Tous droits r&eacute;serv&eacute;s.</span>
          <div className="footer-legal-links">
            <span>SIREN 990 961 120</span>
            <span>11 Boulevard Emile Combes, 13200 Arles</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
