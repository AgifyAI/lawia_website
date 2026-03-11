import { useEffect, useState, type ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimateIn from '../components/AnimateIn'
import '../styles/skills.css'

interface Skill {
  category: string | null
  title: string
  desc: string
  tags: string[]
  videoId: string
  icon: ReactNode
  bonus?: boolean
}

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Les 5 Skills', href: '#features' },
  { label: 'Prix', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

const footerNavLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Les 5 Skills', href: '#features' },
  { label: 'Me Humbert', href: '#social-proof' },
  { label: 'Prix', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

const skills: Skill[] = [
  {
    category: 'Proc\u00e9dure',
    title: 'Assignation juridique',
    desc: "G\u00e9n\u00e9rez des assignations juridiques structur\u00e9es et conformes aux exigences du Code de proc\u00e9dure civile. Le Skill organise automatiquement les mentions obligatoires, l'expos\u00e9 des faits et les demandes.",
    tags: ['Assignation', 'Proc\u00e9dure civile', 'Tribunal'],
    videoId: 'VIDEO_ID_ASSIGNATION',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    category: 'Argumentation',
    title: 'Contre-argumentation judiciaire',
    desc: 'Analysez les conclusions adverses point par point et construisez une contre-argumentation structur\u00e9e avec identification des failles juridiques et logiques, r\u00e9f\u00e9rences aux textes et jurisprudences.',
    tags: ['Contentieux', 'Argumentation', 'Conclusions'],
    videoId: 'VIDEO_ID_CONTRE_ARGUMENTATION',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    category: 'Gestion cabinet',
    title: "Convention d'honoraires",
    desc: "G\u00e9n\u00e9rez des conventions d'honoraires personnalis\u00e9es et conformes \u00e0 la r\u00e9glementation en vigueur, avec les mentions impos\u00e9es par la loi du 31 d\u00e9cembre 1971 et le d\u00e9cret du 12 juillet 2005.",
    tags: ['Honoraires', 'Convention', 'Conformit\u00e9'],
    videoId: 'VIDEO_ID_CONVENTION',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="2" y1="9" x2="22" y2="9" />
        <line x1="9" y1="3" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    category: 'Proc\u00e9dure',
    title: 'Bordereau de pi\u00e8ces',
    desc: 'Constituez un bordereau de pi\u00e8ces organis\u00e9 et conforme aux standards des juridictions. Le Skill num\u00e9rote, classe et r\u00e9f\u00e9rence chaque pi\u00e8ce avec pr\u00e9cision.',
    tags: ['Bordereau', 'Pi\u00e8ces', 'Organisation'],
    videoId: 'VIDEO_ID_BORDEREAU',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 1L1 7l11 6 11-6-11-6z" />
        <path d="M1 17l11 6 11-6" />
        <path d="M1 12l11 6 11-6" />
      </svg>
    ),
  },
  {
    category: 'Conseil',
    title: 'Consultation juridique',
    desc: "R\u00e9digez des consultations juridiques structur\u00e9es \u00e0 partir des \u00e9l\u00e9ments du dossier. Le Skill analyse les faits, identifie les r\u00e8gles applicables et formule un avis motiv\u00e9.",
    tags: ['Consultation', 'Analyse', 'Avis'],
    videoId: 'VIDEO_ID_CONSULTATION',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  {
    category: null,
    title: 'V\u00e9rificateur de sources',
    desc: "V\u00e9rifiez la fiabilit\u00e9 de vos r\u00e9f\u00e9rences juridiques. Le Skill contr\u00f4le l'existence et l'actualit\u00e9 des articles de loi, des d\u00e9cisions de justice et des r\u00e9f\u00e9rences doctrinales cit\u00e9es.",
    tags: ['V\u00e9rification', 'Sources', 'Anti-hallucination'],
    videoId: 'VIDEO_ID_VERIFICATEUR',
    bonus: true,
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="11" y1="8" x2="11" y2="14" />
      </svg>
    ),
  },
]

export default function Skills() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    document.title = 'LawIA : Les 6 Skills du Pack'
  }, [])

  const handleCardClick = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null)
    } else {
      setOpenIndex(index)
    }
  }

  return (
    <>
      <Navbar
        links={navLinks}
        cta={{ label: 'Obtenir le pack (150\u00a0\u20ac)', href: '#pricing' }}
      />

      {/* HERO */}
      <section className="skills-hero">
        <div className="container">
          <div className="skills-hero-inner">
            <AnimateIn animation="anim-slide-up" className="skills-hero-left">
              <h1>Les Skills du Pack</h1>
              <p className="hero-subtitle">
                Des instructions pr&ecirc;tes &agrave; l'emploi pour transformer la pratique juridique de votre cabinet.
              </p>
            </AnimateIn>
            <AnimateIn animation="anim-fade-in" className="skills-hero-right" delay={300}>

              <svg className="orbit-visual" viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg" fill="none">
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                  </filter>
                </defs>

                {/* Connection lines (dashed, flowing) */}
                <line className="orbit-line" x1="190" y1="160" x2="315" y2="42" stroke="rgba(106,155,204,0.2)" strokeWidth="1.5" strokeDasharray="6 4" />
                <line className="orbit-line" x1="190" y1="160" x2="62" y2="55" stroke="rgba(106,155,204,0.2)" strokeWidth="1.5" strokeDasharray="6 4" />
                <line className="orbit-line" x1="190" y1="160" x2="320" y2="275" stroke="rgba(106,155,204,0.2)" strokeWidth="1.5" strokeDasharray="6 4" />
                <line className="orbit-line" x1="190" y1="160" x2="65" y2="268" stroke="rgba(106,155,204,0.2)" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Outward pulse dots (Claude -> Tools) */}
                <circle r="3.5" fill="#6A9BCC">
                  <animateMotion dur="2.8s" repeatCount="indefinite" path="M190,160 L315,42" />
                  <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.08;0.85;1" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle r="3.5" fill="#6A9BCC">
                  <animateMotion dur="3.2s" begin="0.7s" repeatCount="indefinite" path="M190,160 L62,55" />
                  <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.08;0.85;1" dur="3.2s" begin="0.7s" repeatCount="indefinite" />
                </circle>
                <circle r="3.5" fill="#6A9BCC">
                  <animateMotion dur="3.0s" begin="1.4s" repeatCount="indefinite" path="M190,160 L320,275" />
                  <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.08;0.85;1" dur="3.0s" begin="1.4s" repeatCount="indefinite" />
                </circle>
                <circle r="3.5" fill="#6A9BCC">
                  <animateMotion dur="3.4s" begin="2.1s" repeatCount="indefinite" path="M190,160 L65,268" />
                  <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.08;0.85;1" dur="3.4s" begin="2.1s" repeatCount="indefinite" />
                </circle>

                {/* Inward pulse dots (Tools -> Claude) */}
                <circle r="3" fill="#4E7FAF">
                  <animateMotion dur="3.0s" begin="1.4s" repeatCount="indefinite" path="M315,42 L190,160" />
                  <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.85;1" dur="3.0s" begin="1.4s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#4E7FAF">
                  <animateMotion dur="3.4s" begin="2.0s" repeatCount="indefinite" path="M62,55 L190,160" />
                  <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.85;1" dur="3.4s" begin="2.0s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#4E7FAF">
                  <animateMotion dur="2.8s" begin="2.5s" repeatCount="indefinite" path="M320,275 L190,160" />
                  <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.85;1" dur="2.8s" begin="2.5s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#4E7FAF">
                  <animateMotion dur="3.2s" begin="3.0s" repeatCount="indefinite" path="M65,268 L190,160" />
                  <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.08;0.85;1" dur="3.2s" begin="3.0s" repeatCount="indefinite" />
                </circle>

                {/* Tool Nodes */}

                {/* Word (top-right) */}
                <circle cx="315" cy="42" r="26" fill="white" stroke="rgba(43,87,154,0.25)" strokeWidth="1.5" />
                <text x="315" y="40" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter,sans-serif" fontSize="13" fontWeight="700" fill="#2B579A">W</text>
                <text x="315" y="78" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9.5" fontWeight="600" fill="#8A8A82">Word</text>

                {/* Lexbase (top-left) */}
                <circle cx="62" cy="55" r="26" fill="white" stroke="rgba(26,143,110,0.25)" strokeWidth="1.5" />
                <text x="62" y="53" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="700" fill="#1A8F6E">Lx</text>
                <text x="62" y="91" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9.5" fontWeight="600" fill="#8A8A82">Lexbase</text>

                {/* Doctrine (bottom-right) */}
                <circle cx="320" cy="275" r="26" fill="white" stroke="rgba(123,63,160,0.25)" strokeWidth="1.5" />
                <text x="320" y="273" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="700" fill="#7B3FA0">Dc</text>
                <text x="320" y="311" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9.5" fontWeight="600" fill="#8A8A82">Doctrine</text>

                {/* Legifrance (bottom-left) */}
                <circle cx="65" cy="268" r="26" fill="white" stroke="rgba(207,69,32,0.25)" strokeWidth="1.5" />
                <text x="65" y="266" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill="#CF4520">Lf</text>
                <text x="65" y="304" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9.5" fontWeight="600" fill="#8A8A82">L&eacute;gifrance</text>

                {/* Claude Center */}

                {/* Breathing glow halo */}
                <circle cx="190" cy="160" r="44" fill="#6A9BCC" opacity="0.15" filter="url(#glow)">
                  <animate attributeName="r" values="44;52;44" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                  <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                </circle>

                {/* Second subtle ring */}
                <circle cx="190" cy="160" r="50" fill="none" stroke="rgba(106,155,204,0.08)" strokeWidth="1">
                  <animate attributeName="r" values="50;56;50" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                </circle>

                {/* Main circle */}
                <circle cx="190" cy="160" r="38" fill="#6A9BCC" />

                {/* Highlight gradient overlay */}
                <circle cx="190" cy="160" r="38" fill="url(#none)" opacity="0" />

                {/* Text */}
                <text x="190" y="155" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter,sans-serif" fontSize="14" fontWeight="700" fill="white" letterSpacing="-0.02em">Claude</text>
                <text x="190" y="172" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="500" fill="rgba(255,255,255,0.65)">AI</text>
              </svg>

            </AnimateIn>
          </div>
        </div>
      </section>

      {/* SKILLS GRID */}
      <section className="skills-section">
        <div className="container">
          <div className="skills-grid stagger">

            {skills.map((skill, index) => (
              <AnimateIn
                key={index}
                animation="anim-scale-in"
                className={`skill-item${openIndex === index ? ' is-open' : ''}`}
              >
                <div
                  className={`skill-card${skill.bonus ? ' skill-card--bonus' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="skill-card-header">
                    {skill.bonus ? (
                      <span className="skill-card-bonus-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Bonus
                      </span>
                    ) : (
                      <span className="skill-card-category">{skill.category}</span>
                    )}
                    <div className="skill-card-icon">
                      {skill.icon}
                    </div>
                  </div>
                  <h3 className="skill-card-title">{skill.title}</h3>
                  <p className="skill-card-desc">{skill.desc}</p>
                  <div className="skill-card-tags">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="skill-card-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="skill-card-play">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    Voir la d&eacute;mo
                  </div>
                </div>
                <div className="skill-video">
                  <div className="skill-video-inner">
                    {openIndex === index && (
                      <iframe
                        src={`https://www.youtube.com/embed/${skill.videoId}?autoplay=1&rel=0`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={skill.title}
                      />
                    )}
                  </div>
                </div>
              </AnimateIn>
            ))}

          </div>
        </div>
      </section>

      <Footer navLinks={footerNavLinks} />
    </>
  )
}
