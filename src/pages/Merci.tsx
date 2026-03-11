import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AnimateIn from '../components/AnimateIn'
import '../styles/merci.css'

export default function Merci() {
  useEffect(() => {
    document.title = 'Votre pack est en route | LawIA'
  }, [])

  return (
    <>
      <Navbar
        links={[
          { label: 'Accueil', href: '/' },
          { label: 'Les 5 Skills', href: '#features' },
        ]}
      />

      <main className="merci-page">
        <div className="merci-card">
          <AnimateIn animation="anim-scale-in">
            <div className="merci-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </AnimateIn>

          <AnimateIn as="h1" animation="anim-slide-up">
            Votre pack est en route&nbsp;!
          </AnimateIn>

          <AnimateIn as="p" animation="anim-slide-up" className="subtitle">
            V&eacute;rifiez votre bo&icirc;te mail dans les prochaines minutes.
          </AnimateIn>

          <AnimateIn animation="anim-slide-up">
            <ul className="merci-steps">
              <li>
                <span className="step-num">1</span>
                <span>Ouvrez l'email de LawIA (pensez &agrave; v&eacute;rifier vos spams)</span>
              </li>
              <li>
                <span className="step-num">2</span>
                <span>T&eacute;l&eacute;chargez les Skills et installez-les dans Claude</span>
              </li>
              <li>
                <span className="step-num">3</span>
                <span>Testez-les sur un vrai dossier : vous verrez la diff&eacute;rence</span>
              </li>
            </ul>
          </AnimateIn>

          <AnimateIn animation="anim-fade-in" className="merci-back">
            <Link to="/" className="btn-ghost">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M14 9H4m0 0l4 4m-4-4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Retour &agrave; l'accueil
            </Link>
          </AnimateIn>
        </div>
      </main>
    </>
  )
}
