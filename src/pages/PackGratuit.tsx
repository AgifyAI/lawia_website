import { useEffect, useState, useRef, type ReactNode, type CSSProperties, type Dispatch, type SetStateAction } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimateIn from '../components/AnimateIn'
import { WEBHOOK_URL } from '../lib/constants'
import '../styles/pack-gratuit.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

interface ButtonState {
  content: ReactNode
  style: CSSProperties
  disabled: boolean
}

const defaultButtonContent = (
  <>
    Recevoir le pack
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
)

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Les 5 Skills', href: '/#features' },
]

const navCta = { label: 'Recevoir le pack gratuit', href: '#pack-contents' }

const footerNavLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Les 5 Skills', href: '/#features' },
  { label: 'Prix', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
]

export default function PackGratuit() {
  const navigate = useNavigate()
  const [heroEmail, setHeroEmail] = useState('')
  const [finalEmail, setFinalEmail] = useState('')
  const [heroBtn, setHeroBtn] = useState<ButtonState>({ content: defaultButtonContent, style: {}, disabled: false })
  const [finalBtn, setFinalBtn] = useState<ButtonState>({ content: defaultButtonContent, style: {}, disabled: false })
  const heroTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const finalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    document.title = 'Pack Gratuit : nos Skills gratuits pour avocats | LawIA'
  }, [])

  useEffect(() => {
    return () => {
      if (heroTimerRef.current) clearTimeout(heroTimerRef.current)
      if (finalTimerRef.current) clearTimeout(finalTimerRef.current)
    }
  }, [])

  const resetButton = (setter: Dispatch<SetStateAction<ButtonState>>, timerRef: React.RefObject<ReturnType<typeof setTimeout> | null>) => {
    timerRef.current = setTimeout(() => {
      setter({ content: defaultButtonContent, style: {}, disabled: false })
      timerRef.current = null
    }, 3000)
  }

  const showError = (setter: Dispatch<SetStateAction<ButtonState>>, timerRef: React.RefObject<ReturnType<typeof setTimeout> | null>, msg?: string) => {
    setter({
      content: msg || 'Erreur, r\u00e9essayez',
      style: { background: 'var(--red, #c0392b)' },
      disabled: false,
    })
    resetButton(setter, timerRef)
  }

  const handleSubmit = async (email: string, setter: Dispatch<SetStateAction<ButtonState>>, timerRef: React.RefObject<ReturnType<typeof setTimeout> | null>) => {
    if (!emailRegex.test(email)) {
      showError(setter, timerRef, 'Email invalide')
      return
    }

    setter({ content: 'Envoi\u2026', style: {}, disabled: true })

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'subscribe', email }),
      })

      if (!res.ok) throw new Error(String(res.status))

      navigate('/bienvenue?email=' + encodeURIComponent(email))
    } catch {
      showError(setter, timerRef)
    }
  }

  const handleHeroSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(heroEmail.trim(), setHeroBtn, heroTimerRef)
  }

  const handleFinalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(finalEmail.trim(), setFinalBtn, finalTimerRef)
  }

  return (
    <>
      <Navbar links={navLinks} cta={navCta} />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="page-section" id="hero">
        <div className="container">

          <AnimateIn animation="anim-fade-in" as="span" className="tag hero-tag">
            <span className="gift-icon">&#127873;</span> Pack gratuit
          </AnimateIn>

          <AnimateIn animation="anim-slide-up" as="h1" className="mt-xl">
            Nos <span style={{ color: 'var(--accent)' }}>Skills</span> gratuits pour transformer votre pratique juridique avec
            l'IA
          </AnimateIn>

          <AnimateIn animation="anim-slide-up" as="p" className="hero-subtitle mt-lg">
            Un template DOCX juridique et un v&eacute;rificateur de sources, cr&eacute;&eacute;s par Me Patrice Humbert (20
            ans de barreau). Aucune carte bancaire requise.
          </AnimateIn>

          <AnimateIn animation="anim-scale-in">
            <form className="email-form mt-2xl" onSubmit={handleHeroSubmit}>
              <input
                type="email"
                name="email"
                placeholder="votre@email.fr"
                required
                autoComplete="email"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={heroBtn.disabled}
                style={heroBtn.style}
              >
                {heroBtn.content}
              </button>
            </form>
          </AnimateIn>

          <AnimateIn animation="anim-fade-in" className="hero-reassurance mt-lg">
            <span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 8l3 3L12 5" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              100% gratuit
            </span>
            <span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 8l3 3L12 5" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Aucune carte requise
            </span>
            <span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 8l3 3L12 5" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Re&ccedil;u par email en 2 min
            </span>
          </AnimateIn>

        </div>
      </section>


      {/* ============================================================
          PACK CONTENTS
          ============================================================ */}
      <section className="page-section" id="pack-contents">
        <div className="container">

          <AnimateIn animation="anim-slide-up" className="text-center mb-xl">
            <span className="tag">Ce que vous recevez</span>
            <h2 className="mt-lg">Vos <span style={{ color: 'var(--accent)' }}>Skills</span> IA juridiques gratuits</h2>
            <p className="mt-md" style={{ maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
              Deux ressources concr&egrave;tes pour d&eacute;couvrir comment l'IA peut acc&eacute;l&eacute;rer votre
              pratique. Con&ccedil;ues par un avocat, pour des avocats.
            </p>
          </AnimateIn>

          <div className="pack-grid stagger">

            {/* Card 1: DOCX juridique */}
            <AnimateIn animation="anim-slide-up" className="pack-card">
              <span className="pack-card-tag free">Inclus</span>
              <div className="pack-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3>Template DOCX juridique</h3>
              <p>
                Un mod&egrave;le d'assignation pr&ecirc;t &agrave; l'emploi, structur&eacute; selon les standards du
                barreau.
                Copiez, collez, adaptez : vous gagnez 1h sur chaque acte.
              </p>
            </AnimateIn>

            {/* Card 2: Verificateur de sources */}
            <AnimateIn animation="anim-slide-up" className="pack-card">
              <span className="pack-card-tag free">Inclus</span>
              <div className="pack-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
              </div>
              <h3>V&eacute;rificateur de sources</h3>
              <p>
                Un Skill Claude qui v&eacute;rifie automatiquement les r&eacute;f&eacute;rences jurisprudentielles et
                l&eacute;gislatives cit&eacute;es. Fini les hallucinations dans vos conclusions.
              </p>
            </AnimateIn>

            {/* Card 3: Coming soon */}
            <AnimateIn animation="anim-slide-up" className="pack-card coming-soon">
              <span className="pack-card-tag soon">Bient&ocirc;t</span>
              <div className="pack-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>Prochain outil</h3>
              <p>
                Un troisi&egrave;me outil est en pr&eacute;paration. Inscrivez-vous pour &ecirc;tre averti d&egrave;s sa
                sortie.
              </p>
            </AnimateIn>

          </div>

        </div>
      </section>


      {/* ============================================================
          WHY FREE
          ============================================================ */}
      <section className="page-section" id="why-free">
        <div className="container">

          <div className="why-grid">

            <AnimateIn animation="anim-slide-up" className="why-text">
              <span className="tag">Pourquoi c'est gratuit</span>
              <h2 className="mt-lg">On veut vous prouver la valeur avant de vous demander quoi que ce soit</h2>
              <p>
                Ces outils sont un extrait du <Link to="/" style={{ color: 'var(--accent-dark)', fontWeight: 500 }}>Pack
                  complet de 5 Skills</Link> que nous proposons aux avocats. Nous pr&eacute;f&eacute;rons vous laisser
                constater les r&eacute;sultats par vous-m&ecirc;me.
              </p>
              <ul className="why-points mt-lg">
                <li>
                  <span className="check-circle">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M4 8l3 3L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>Testez sur un vrai dossier en 5 minutes</span>
                </li>
                <li>
                  <span className="check-circle">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M4 8l3 3L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>Aucun engagement, aucune carte bancaire</span>
                </li>
                <li>
                  <span className="check-circle">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M4 8l3 3L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>Con&ccedil;u par Me Humbert (20 ans de barreau, certifi&eacute; CNB)</span>
                </li>
              </ul>
            </AnimateIn>

            <AnimateIn animation="anim-slide-left" className="why-visual">
              <div className="big-number">2</div>
              <div className="big-label"><span style={{ color: 'var(--accent)' }}>Skills</span> gratuits</div>
              <div className="big-detail">pr&ecirc;ts &agrave; utiliser</div>
              <div className="separator"></div>
              <div className="why-visual-stats">
                <div className="why-visual-stat">
                  <div className="stat-num">1h</div>
                  <div className="stat-desc">gagn&eacute;e par acte</div>
                </div>
                <div className="why-visual-stat">
                  <div className="stat-num">0 &euro;</div>
                  <div className="stat-desc">aucun frais</div>
                </div>
              </div>
            </AnimateIn>

          </div>

        </div>
      </section>


      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <section className="page-section" id="final-cta">
        <div className="container">

          <AnimateIn animation="anim-slide-up" className="text-center">
            <span className="tag">C'est gratuit</span>
            <h2 className="mt-lg">Recevez nos <span style={{ color: 'var(--accent)' }}>Skills</span> gratuits maintenant</h2>
            <p className="mt-md">
              Entrez votre email et recevez le pack en quelques minutes. Sans engagement.
            </p>
          </AnimateIn>

          <AnimateIn animation="anim-scale-in">
            <form className="email-form mt-2xl" onSubmit={handleFinalSubmit}>
              <input
                type="email"
                name="email"
                placeholder="votre@email.fr"
                required
                autoComplete="email"
                value={finalEmail}
                onChange={(e) => setFinalEmail(e.target.value)}
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={finalBtn.disabled}
                style={finalBtn.style}
              >
                {finalBtn.content}
              </button>
            </form>
          </AnimateIn>

          <AnimateIn animation="anim-fade-in" className="hero-reassurance mt-lg">
            <span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 8l3 3L12 5" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              100% gratuit
            </span>
            <span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 8l3 3L12 5" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Pas de spam, promis
            </span>
          </AnimateIn>

        </div>
      </section>


      <Footer navLinks={footerNavLinks} />
    </>
  )
}
