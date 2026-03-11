import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimateIn from '../components/AnimateIn';
import WindowMockup from '../components/WindowMockup';
import CheckIcon from '../components/CheckIcon';
import '../styles/home.css';

export default function Home() {
  const heroCardsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const skillTransformRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = 'LawIA : Pack de 5 Skills Claude pour Avocats';
  }, []);

  /* ---- Hero: Skill cards staggered entrance ---- */
  useEffect(() => {
    const orbit = heroCardsRef.current;
    if (!orbit) return;
    const cards = orbit.querySelectorAll('.v3-skill-card');
    const timers: ReturnType<typeof setTimeout>[] = [];
    cards.forEach((card, i) => {
      timers.push(
        setTimeout(
          () => {
            card.classList.add('is-visible');
          },
          400 + i * 300,
        ),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  /* ---- Problem: Timeline day-by-day entrance + animated line ---- */
  useEffect(() => {
    const timeline = timelineRef.current;
    const line = timelineLineRef.current;
    if (!timeline || !line) return;

    const days = timeline.querySelectorAll('.timeline-day');
    const dots = timeline.querySelectorAll('.timeline-dot');
    if (!days.length || !dots.length) return;

    const DAY_INTERVAL = 600;
    let triggered = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function getDotCenter(dot: Element) {
      const tRect = timeline!.getBoundingClientRect();
      const dRect = dot.getBoundingClientRect();
      return {
        x: dRect.left + dRect.width / 2 - tRect.left,
        y: dRect.top + dRect.height / 2 - tRect.top - 1,
      };
    }

    function growLineToDay(dayIndex: number) {
      if (!line) return;
      const first = getDotCenter(dots[0]);
      const target = getDotCenter(dots[dayIndex]);
      line.style.top = first.y + 'px';
      line.style.left = first.x + 'px';
      line.style.width = target.x - first.x + 'px';
      line.style.transition = 'width 0.45s ease-out';
    }

    function initLine() {
      if (!line) return;
      const first = getDotCenter(dots[0]);
      line.style.top = first.y + 'px';
      line.style.left = first.x + 'px';
      line.style.width = '0px';
      line.style.transition = 'none';
    }

    requestAnimationFrame(initLine);

    const handleResize = () => {
      const visibleDays = timeline.querySelectorAll('.timeline-day.day-visible');
      if (visibleDays.length > 1) {
        line.style.transition = 'none';
        growLineToDay(visibleDays.length - 1);
      } else {
        initLine();
      }
    };
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            days.forEach((day, i) => {
              timers.push(
                setTimeout(() => {
                  day.classList.add('day-visible');
                  if (i > 0) growLineToDay(i);
                }, i * DAY_INTERVAL),
              );
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(timeline);

    /* ---- Problem: Animate frustration bars on scroll ---- */
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.frustration-bar') as HTMLElement | null;
            if (bar) {
              const targetWidth = bar.style.width;
              bar.style.width = '0%';
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  bar.style.width = targetWidth;
                });
              });
            }
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    days.forEach((day) => barObserver.observe(day));

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      barObserver.disconnect();
    };
  }, []);

  /* ---- Skill Transform: lines appear one by one ---- */
  useEffect(() => {
    const section = skillTransformRef.current;
    if (!section) return;

    const leftLines = section.querySelectorAll('.v1-panel-bad .v1-line');
    const rightLines = section.querySelectorAll('.v1-panel-good .v1-line');
    const allLines: Element[] = [];
    const max = Math.max(leftLines.length, rightLines.length);
    for (let i = 0; i < max; i++) {
      if (leftLines[i]) allLines.push(leftLines[i]);
      if (rightLines[i]) allLines.push(rightLines[i]);
    }

    let triggered = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            allLines.forEach((line, i) => {
              timers.push(
                setTimeout(() => {
                  line.classList.add('line-visible');
                }, i * 250),
              );
            });
            const bars = section.querySelectorAll('.v1-mockup-bar');
            const barsDelay = allLines.length * 250;
            bars.forEach((bar, i) => {
              timers.push(
                setTimeout(
                  () => {
                    bar.classList.add('bar-visible');
                  },
                  barsDelay + i * 150,
                ),
              );
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(section);

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar
        links={[
          { label: 'Les 5 Skills', href: '#features' },
          { label: 'Comment \u00e7a marche', href: '#skill-steps' },
          { label: 'Prix', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Obtenir le pack (150\u00a0\u20ac)', href: '#pricing' }}
      />

      {/* ============================================================
          HERO : Floating Skill Cards (V3)
          ============================================================ */}
      <section className="page-section" id="hero">
        <div className="v3-inner">
          {/* Floating cards */}
          <div className="v3-cards-orbit" ref={heroCardsRef}>
            <div className="v3-skill-card">
              <span className="v3-card-dot"></span>
              <span style={{ color: 'var(--accent)' }}>SKILL : </span>R&eacute;dacteur assignation
            </div>
            <div className="v3-skill-card">
              <span className="v3-card-dot"></span>
              <span style={{ color: 'var(--accent)' }}>SKILL : </span>Contre-argumentation judiciaire
            </div>
            <div className="v3-skill-card">
              <span className="v3-card-dot"></span>
              <span style={{ color: 'var(--accent)' }}>SKILL : </span>Convention honoraires
            </div>
            <div className="v3-skill-card">
              <span className="v3-card-dot"></span>
              <span style={{ color: 'var(--accent)' }}>SKILL : </span>Bordereau de pi&egrave;ces
            </div>
            <div className="v3-skill-card">
              <span className="v3-card-dot"></span>
              <span style={{ color: 'var(--accent)' }}>SKILL : </span>Consultation juridique
            </div>
            <div className="v3-skill-card">
              <span className="v3-card-dot"></span>
              <span style={{ color: 'var(--accent)' }}>SKILL : </span>V&eacute;rificateur sources
            </div>
          </div>

          {/* Central content */}
          <AnimateIn animation="anim-fade-in" as="span" className="tag">
            5 Skills Claude pour avocats
          </AnimateIn>

          <AnimateIn animation="anim-slide-up" as="h1" className="v3-headline mt-xl font-bold">
            Nos meilleurs <span style={{ color: 'var(--accent)' }}>SKILLS</span> pour transformer <span style={{ color: '#D97757' }}>Claude AI</span>{' '}
            en votre collaborateur juridique
          </AnimateIn>

          <AnimateIn animation="anim-slide-up" as="p" className="v3-subtitle">
            5 Skills pour combler les manques de Claude. Installez-les en 3 minutes, Claude devient un r&eacute;dacteur juridique fiable.
          </AnimateIn>

          <AnimateIn animation="anim-scale-in" className="v3-cta-area">
            <a href="#pricing" className="btn-primary">
              T&eacute;l&eacute;charger les 5 Skills
            </a>
            <div style={{ marginTop: 'var(--space-md)' }}>
              <Link to="/pack-gratuit" className="btn-secondary">
                Testez gratuitement
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ============================================================
          PROBLEM : Timeline Narrative (V1)
          ============================================================ */}
      <section className="page-section" id="problem">
        <div className="container">
          <AnimateIn animation="anim-slide-up" className="text-center">
            <span className="problem-tag">Le probl&egrave;me</span>
            <h2 className="problem-heading mt-lg">Chaque jour, le m&ecirc;me recommencement</h2>
            <p className="mt-md" style={{ maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
              Lundi, mardi, mercredi, jeudi, vendredi : cinq jours, cinq fois tout reprendre &agrave; z&eacute;ro avec Claude. Voici &agrave; quoi
              ressemble votre semaine.
            </p>
          </AnimateIn>

          <div className="timeline mt-lg stagger" ref={timelineRef}>
            <div className="timeline-line" ref={timelineLineRef}></div>
            <div className="timeline-day">
              <span className="timeline-label">Lundi</span>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-icon">&#128172;</span>
                <h4>Nouvelle conversation</h4>
                <p>Vous ouvrez Claude, vous expliquez votre m&eacute;thodologie, vos standards de r&eacute;daction, le contexte du dossier...</p>
                <div className="timeline-frustration">
                  <span>Frustration</span>
                  <div className="frustration-bar" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>

            <div className="timeline-day">
              <span className="timeline-label">Mardi</span>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-icon">&#128260;</span>
                <h4>On recommence</h4>
                <p>
                  M&ecirc;me dossier, nouvelle conversation. Claude a tout oubli&eacute;. Vous r&eacute;expliquez. Le format a chang&eacute;, la
                  logique aussi.
                </p>
                <div className="timeline-frustration">
                  <span>Frustration</span>
                  <div className="frustration-bar" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>

            <div className="timeline-day">
              <span className="timeline-label">Mercredi</span>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-icon">&#9888;&#65039;</span>
                <h4>Premi&egrave;re hallucination</h4>
                <p>
                  Claude cite un arr&ecirc;t qui n'existe pas. Vous perdez 30 minutes &agrave; v&eacute;rifier. Le doute s'installe sur tout le reste.
                </p>
                <div className="timeline-frustration">
                  <span>Frustration</span>
                  <div className="frustration-bar" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>

            <div className="timeline-day">
              <span className="timeline-label">Jeudi</span>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-icon">&#127468;&#127463;</span>
                <h4>Common Law</h4>
                <p>
                  Vous demandez une analyse en droit fran&ccedil;ais. Claude vous sort du Common Law. Vous plaidez &agrave; Marseille, pas &agrave;
                  Londres.
                </p>
                <div className="timeline-frustration">
                  <span>Frustration</span>
                  <div className="frustration-bar" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            <div className="timeline-day">
              <span className="timeline-label">Vendredi</span>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-icon">&#128548;</span>
                <h4>Abandon</h4>
                <p>
                  Vous renoncez. Tout r&eacute;diger vous-m&ecirc;me prend moins de temps que de corriger les erreurs de l'IA. La promesse de
                  productivit&eacute; s'est envol&eacute;e.
                </p>
                <div className="timeline-frustration">
                  <span>Frustration</span>
                  <div className="frustration-bar" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <AnimateIn animation="anim-fade-in" className="timeline-cta">
            <h3>Et si vous pouviez arr&ecirc;ter ce cycle ?</h3>
            <p className="mt-sm text-secondary">Il existe un moyen de ne plus jamais repartir de z&eacute;ro.</p>
          </AnimateIn>
        </div>
      </section>

      {/* ============================================================
          SKILL EXPLAINER V1 : Transformation Visual
          ============================================================ */}
      <section className="page-section" id="skill-transform" ref={skillTransformRef}>
        <div className="container">
          <div className="text-center">
            <AnimateIn animation="anim-fade-in" as="span" className="tag">
              La solution
            </AnimateIn>
            <AnimateIn animation="anim-slide-up" as="h2" className="mt-lg">
              M&#234;me IA. R&#233;sultats compl&#232;tement diff&#233;rents.
            </AnimateIn>
            <AnimateIn animation="anim-slide-up" as="p" className="mt-md" style={{ maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
              La diff&#233;rence entre un Claude g&#233;n&#233;rique et un Claude &#233;quip&#233; des Skills de Me&nbsp;Humbert ? 20 ans d'expertise
              juridique, activ&#233;s automatiquement &#224; chaque conversation.
            </AnimateIn>
          </div>

          <div className="v1-split">
            {/* Panel: sans Skills */}
            <AnimateIn animation="anim-slide-right" className="v1-panel v1-panel-bad">
              <span className="v1-panel-label">Claude sans Skills</span>
              <h4>R&#233;sultats al&#233;atoires et risqu&#233;s</h4>
              <div className="v1-line">
                <span className="v1-line-icon">&#10005;</span>
                <span>R&#233;f&#233;rences au Common Law dans les analyses</span>
              </div>
              <div className="v1-line">
                <span className="v1-line-icon">&#10005;</span>
                <span>Articles de loi cit&#233;s partiellement ou invent&#233;s</span>
              </div>
              <div className="v1-line">
                <span className="v1-line-icon">&#10005;</span>
                <span>Aucune structure m&#233;thodologique coh&#233;rente</span>
              </div>
              <div className="v1-line">
                <span className="v1-line-icon">&#10005;</span>
                <span>Re-prompting n&#233;cessaire &#224; chaque session</span>
              </div>
              <div className="v1-line">
                <span className="v1-line-icon">&#10005;</span>
                <span>Hallucinations fr&#233;quentes sur la jurisprudence</span>
              </div>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <div className="v1-mockup-bar" style={{ width: '90%', background: 'rgba(196,92,92,0.18)' }}></div>
                <div className="v1-mockup-bar" style={{ width: '55%', background: 'rgba(196,92,92,0.12)' }}></div>
                <div className="v1-mockup-bar" style={{ width: '75%', background: 'rgba(196,92,92,0.18)' }}></div>
                <div className="v1-mockup-bar" style={{ width: '40%', background: 'rgba(196,92,92,0.12)' }}></div>
              </div>
            </AnimateIn>

            {/* VS */}
            <AnimateIn animation="anim-scale-in" className="v1-vs">
              <div className="v1-vs-circle">VS</div>
            </AnimateIn>

            {/* Panel: avec Skills */}
            <AnimateIn animation="anim-slide-left" className="v1-panel v1-panel-good">
              <span className="v1-panel-label">Claude avec les Skills</span>
              <h4>R&#233;sultats pr&#233;cis et s&#233;curis&#233;s</h4>
              <div className="v1-line">
                <span className="v1-line-icon">&#10003;</span>
                <span>Exclusivement du droit fran&#231;ais, conforme &#224; votre pratique</span>
              </div>
              <div className="v1-line">
                <span className="v1-line-icon">&#10003;</span>
                <span>Articles cit&#233;s in extenso avec les bons fondements</span>
              </div>
              <div className="v1-line">
                <span className="v1-line-icon">&#10003;</span>
                <span>M&#233;thodologie structur&#233;e (visas, moyens, demandes)</span>
              </div>
              <div className="v1-line">
                <span className="v1-line-icon">&#10003;</span>
                <span>Z&#233;ro configuration : vous ouvrez Claude et travaillez</span>
              </div>
              <div className="v1-line">
                <span className="v1-line-icon">&#10003;</span>
                <span>Garde-fous int&#233;gr&#233;s contre les hallucinations</span>
              </div>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <div className="v1-mockup-bar" style={{ width: '100%', background: 'rgba(106,155,204,0.28)' }}></div>
                <div className="v1-mockup-bar" style={{ width: '80%', background: 'rgba(106,155,204,0.18)' }}></div>
                <div className="v1-mockup-bar" style={{ width: '95%', background: 'rgba(106,155,204,0.28)' }}></div>
                <div className="v1-mockup-bar" style={{ width: '65%', background: 'rgba(106,155,204,0.18)' }}></div>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn animation="anim-slide-up" as="p" className="v1-bottom-line mt-2xl">
            La m&#234;me IA. La m&#234;me question. Mais avec 20 ans d'expertise en plus.
          </AnimateIn>
        </div>
      </section>

      {/* ============================================================
          SKILL EXPLAINER V7 : How It Works
          ============================================================ */}
      <section className="page-section" id="skill-steps">
        <div className="container">
          <AnimateIn animation="anim-slide-up" className="skill-steps-intro">
            <AnimateIn animation="anim-fade-in" as="span" className="tag">
              Simple comme bonjour
            </AnimateIn>
            <h2 className="mt-lg">
              Comment installer nos <span style={{ color: 'var(--accent)' }}>SKILLS</span> dans <span style={{ color: '#D97757' }}>Claude AI</span>
            </h2>
            <p className="mt-md" style={{ fontSize: '1.15rem', fontWeight: '600' }}>
              Trois &eacute;tapes. Z&eacute;ro complication.
            </p>
            <p className="mt-md" style={{ color: 'var(--text-secondary)' }}>
              Pas de configuration. Pas de param&eacute;trage. Vous travaillez, Claude applique l'expertise de Me&nbsp;Humbert.
            </p>
          </AnimateIn>

          <div className="v7-steps stagger">
            <AnimateIn animation="anim-slide-up" className="v7-step">
              <span className="v7-step-number">1</span>
              <span className="v7-step-icon">&#128229;</span>
              <h4>Installez le pack en un clic</h4>
              <p>Vous recevez les 5 Skills pr&#234;ts &#224; l'emploi. Un simple glisser-d&#233;poser dans Claude Desktop suffit.</p>
            </AnimateIn>

            <AnimateIn animation="anim-fade-in" className="v7-arrow">
              <svg viewBox="0 0 36 36">
                <polyline points="6,18 30,18" />
                <polyline points="22,10 30,18 22,26" />
              </svg>
            </AnimateIn>

            <AnimateIn animation="anim-slide-up" className="v7-step">
              <span className="v7-step-number">2</span>
              <span className="v7-step-icon">&#128172;</span>
              <h4>Ouvrez Claude et travaillez</h4>
              <p>
                Rien &#224; configurer. D&#232;s la premi&#232;re conversation, Claude conna&#238;t votre m&#233;thodologie. Posez vos questions comme
                d'habitude.
              </p>
            </AnimateIn>

            <AnimateIn animation="anim-fade-in" className="v7-arrow">
              <svg viewBox="0 0 36 36">
                <polyline points="6,18 30,18" />
                <polyline points="22,10 30,18 22,26" />
              </svg>
            </AnimateIn>

            <AnimateIn animation="anim-slide-up" className="v7-step">
              <span className="v7-step-number">3</span>
              <span className="v7-step-icon">&#9989;</span>
              <h4>Obtenez des r&#233;sultats conformes</h4>
              <p>
                Chaque r&#233;ponse respecte la m&#233;thodologie de Me&nbsp;Humbert : structure, fondements textuels, garde-fous. &#192; chaque fois.
              </p>
            </AnimateIn>
          </div>

          <AnimateIn animation="anim-slide-up" className="v7-reassurance">
            <p className="mt-xl">Pas de comp&#233;tence technique requise. Si vous savez utiliser Claude, vous savez utiliser les Skills.</p>
            {/* TODO: Ajouter ici une animation d'import d'un PDF */}
            <a href="#pricing" className="btn-primary" style={{ marginTop: 'var(--space-md)' }}>
              Obtenir le pack (150&nbsp;&#8364;)
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,4 16,10 6,16" />
              </svg>
            </a>
            <p className="mt-lg" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.82rem', color: 'var(--text-tertiary)', fontStyle: 'normal' }}>
              Paiement unique. Acc&#232;s permanent. 5&nbsp;Skills inclus.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ============================================================
          FEATURES : Tabbed Interface (V4)
          ============================================================ */}
      <section className="page-section" id="features">
        <div className="container">
          <AnimateIn animation="anim-slide-up" className="text-center mb-xl">
            <span className="tag mb-md" style={{ display: 'inline-block' }}>
              Pack Droit Civil
            </span>
            <h2 className="mt-md">D&eacute;couvrez chaque Skill en d&eacute;tail</h2>
            <p className="mt-md" style={{ maxWidth: '600px', margin: 'var(--space-md) auto 0' }}>
              S&eacute;lectionnez un Skill pour voir comment il fonctionne, ce qu'il produit et pourquoi vous pouvez lui faire confiance.
            </p>
          </AnimateIn>

          <AnimateIn animation="anim-fade-in" className="v4-tabs">
            <input type="radio" name="v4-tabs" id="v4-tab1" className="v4-radio" defaultChecked />
            <input type="radio" name="v4-tabs" id="v4-tab2" className="v4-radio" />
            <input type="radio" name="v4-tabs" id="v4-tab3" className="v4-radio" />
            <input type="radio" name="v4-tabs" id="v4-tab4" className="v4-radio" />
            <input type="radio" name="v4-tabs" id="v4-tab5" className="v4-radio" />

            <div className="v4-tab-bar">
              <label htmlFor="v4-tab1" className="v4-tab-label">
                <svg viewBox="0 0 24 24">
                  {/* Search / loupe consultation */}
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Consultation juridique
              </label>
              <label htmlFor="v4-tab2" className="v4-tab-label">
                <svg viewBox="0 0 24 24">
                  {/* Gavel / marteau */}
                  <path d="M14.5 3.5L20.5 9.5" />
                  <path d="M11 6l3-3 6 6-3 3" />
                  <path d="M8 9l-5 5 3 3 5-5" />
                  <line x1="3" y1="21" x2="10" y2="21" />
                </svg>
                R&eacute;dacteur d'assignation
              </label>
              <label htmlFor="v4-tab3" className="v4-tab-label">
                <svg viewBox="0 0 24 24">
                  {/* Shield / bouclier */}
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Contre-argumentation
              </label>
              <label htmlFor="v4-tab4" className="v4-tab-label">
                <svg viewBox="0 0 24 24">
                  {/* List / bordereau */}
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                Bordereau de pi&egrave;ces
              </label>
              <label htmlFor="v4-tab5" className="v4-tab-label">
                <svg viewBox="0 0 24 24">
                  {/* Euro / honoraires */}
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Convention honoraires
              </label>
            </div>

            <div className="v4-panels">
              {/* Panel 1 : Consultation juridique */}
              <div className="v4-panel">
                <div className="v4-panel-inner">
                  <div className="v4-panel-text">
                    <h3>Consultation juridique</h3>
                    <p>
                      Produisez des consultations juridiques structur&eacute;es et argument&eacute;es. Le Skill organise l'analyse (rappel des faits,
                      questions pos&eacute;es, r&egrave;gles applicables, application au cas d'esp&egrave;ce, recommandations) en s'appuyant
                      exclusivement sur le droit fran&ccedil;ais.
                    </p>
                    <div className="v4-benefits">
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Structure m&eacute;thodologique rigoureuse</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Fondements l&eacute;gaux cit&eacute;s et v&eacute;rifi&eacute;s</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Recommandations op&eacute;rationnelles pour le client</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>1h30 gagn&eacute;es par consultation r&eacute;dig&eacute;e</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <WindowMockup title="consultation_juridique.md">
                      <div style={{ color: 'var(--accent-dark)', fontWeight: '600', marginBottom: '8px' }}>CONSULTATION JURIDIQUE</div>
                      <div style={{ marginBottom: '8px', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Objet : responsabilit&eacute; contractuelle (inexecution)
                      </div>
                      <div style={{ marginBottom: '6px' }}>
                        <strong>I. FAITS</strong>
                      </div>
                      <div style={{ marginBottom: '6px', paddingLeft: '12px', color: 'var(--text-secondary)' }}>
                        Votre client a conclu un contrat de prestation le 15/01/2024...
                      </div>
                      <div style={{ marginBottom: '6px' }}>
                        <strong>II. QUESTIONS POS&Eacute;ES</strong>
                      </div>
                      <div style={{ marginBottom: '6px', paddingLeft: '12px', color: 'var(--text-secondary)' }}>
                        Le prestataire peut-il &ecirc;tre tenu responsable au titre de l'art. 1231-1 C. civ. ?
                      </div>
                      <div style={{ marginBottom: '6px' }}>
                        <strong>III. RECOMMANDATIONS</strong>
                      </div>
                      <div style={{ paddingLeft: '12px', color: 'var(--text-secondary)' }}>Engager une mise en demeure pr&eacute;alable puis...</div>
                    </WindowMockup>
                    <p
                      style={{
                        marginTop: '12px',
                        padding: '8px 12px',
                        background: '#FFF3CD',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#856404',
                      }}>
                      &#128249; Vid&eacute;o de d&eacute;monstration &agrave; tourner pour ce Skill
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel 2 : R&eacute;dacteur d'assignation */}
              <div className="v4-panel">
                <div className="v4-panel-inner">
                  <div className="v4-panel-text">
                    <h3>R&eacute;dacteur d'assignation</h3>
                    <p>
                      R&eacute;digez des assignations compl&egrave;tes et conformes au Code de proc&eacute;dure civile. Le Skill structure
                      automatiquement l'acte (mentions obligatoires, expos&eacute; des faits, fondements juridiques, dispositif) et adapte le format
                      selon la juridiction saisie.
                    </p>
                    <div className="v4-benefits">
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Mentions obligatoires conformes au CPC</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Adaptation au type de proc&eacute;dure et juridiction</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Fondements juridiques cit&eacute;s in extenso</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>2h gagn&eacute;es par assignation r&eacute;dig&eacute;e</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <WindowMockup title="assignation_juridique.md">
                      <div style={{ color: 'var(--accent-dark)', fontWeight: '600', marginBottom: '8px' }}>
                        ASSIGNATION DEVANT LE TRIBUNAL JUDICIAIRE
                      </div>
                      <div style={{ marginBottom: '6px', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Tribunal judiciaire de Marseille, p&ocirc;le civil
                      </div>
                      <div style={{ marginBottom: '6px' }}>
                        <strong>Demandeur :</strong> M. Martin, demeurant &agrave;...
                      </div>
                      <div style={{ marginBottom: '6px' }}>
                        <strong>D&eacute;fendeur :</strong> Soci&eacute;t&eacute; ABC, sise &agrave;...
                      </div>
                      <div style={{ marginBottom: '12px', paddingTop: '8px', borderTop: '1px dashed var(--border)' }}>
                        <strong>I. FAITS ET PROC&Eacute;DURE</strong>
                        <br />
                        <span style={{ color: 'var(--text-secondary)' }}>Attendu que par acte du 12 janvier 2025...</span>
                      </div>
                      <div style={{ color: 'var(--green)', fontSize: '0.75rem' }}>Toutes les mentions de l'art. 56 CPC sont pr&eacute;sentes.</div>
                    </WindowMockup>
                    <p
                      style={{
                        marginTop: '12px',
                        padding: '8px 12px',
                        background: '#FFF3CD',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#856404',
                      }}>
                      &#128249; Vid&eacute;o de d&eacute;monstration &agrave; tourner pour ce Skill
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel 3 : Contre-argumentation judiciaire */}
              <div className="v4-panel">
                <div className="v4-panel-inner">
                  <div className="v4-panel-text">
                    <h3>Contre-argumentation judiciaire</h3>
                    <p>
                      Soumettez les conclusions ou arguments adverses et obtenez une contre-argumentation structur&eacute;e point par point. Le Skill
                      analyse chaque moyen soulev&eacute;, identifie les failles juridiques et logiques, puis construit une r&eacute;ponse
                      argument&eacute;e avec les textes et la jurisprudence appropri&eacute;e.
                    </p>
                    <div className="v4-benefits">
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Analyse point par point des arguments adverses</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Identification des failles logiques et juridiques</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>R&eacute;f&eacute;rences aux textes et jurisprudences v&eacute;rifi&eacute;es</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>2 heures gagn&eacute;es par dossier contentieux</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <WindowMockup title="contre_argumentation.md">
                      <div style={{ color: 'var(--accent-dark)', fontWeight: '600', marginBottom: '8px' }}>ANALYSE DES ARGUMENTS ADVERSES</div>
                      <div style={{ marginBottom: '6px' }}>
                        <span style={{ color: 'var(--red)' }}>Argument 1 :</span> &laquo; Le contrat est nul pour vice de consentement &raquo;
                      </div>
                      <div style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: '2px solid var(--accent)' }}>
                        <strong>R&eacute;ponse :</strong> L'article 1130 du Code civil exige la preuve d'un vice d&eacute;terminant. Or, la partie
                        adverse ne d&eacute;montre aucun &eacute;l&eacute;ment...
                        <br />
                        <span style={{ color: 'var(--green)', fontSize: '0.75rem' }}>Cass. civ. 1re, 3 mai 2018, n. 17-11.132</span>
                      </div>
                      <div style={{ marginBottom: '6px' }}>
                        <span style={{ color: 'var(--red)' }}>Argument 2 :</span> &laquo; Prescription de l'action &raquo;
                      </div>
                      <div style={{ paddingLeft: '12px', borderLeft: '2px solid var(--accent)' }}>
                        <strong>R&eacute;ponse :</strong> Le point de d&eacute;part de la prescription quinquennale (art. 2224 C. civ.) se situe...
                      </div>
                    </WindowMockup>
                    <p
                      style={{
                        marginTop: '12px',
                        padding: '8px 12px',
                        background: '#FFF3CD',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#856404',
                      }}>
                      &#128249; Vid&eacute;o de d&eacute;monstration &agrave; tourner pour ce Skill
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel 4 : Bordereau de pi&egrave;ces */}
              <div className="v4-panel">
                <div className="v4-panel-inner">
                  <div className="v4-panel-text">
                    <h3>Bordereau de pi&egrave;ces</h3>
                    <p>
                      G&eacute;n&eacute;rez un bordereau de pi&egrave;ces num&eacute;rot&eacute; et structur&eacute; &agrave; partir de la liste de
                      vos documents. Le Skill organise les pi&egrave;ces par cat&eacute;gorie, v&eacute;rifie la coh&eacute;rence de la
                      num&eacute;rotation et produit un bordereau conforme aux usages judiciaires.
                    </p>
                    <div className="v4-benefits">
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Num&eacute;rotation automatique et coh&eacute;rente</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Classement par cat&eacute;gorie de pi&egrave;ces</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Format conforme aux usages judiciaires</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>20 min gagn&eacute;es par bordereau</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <WindowMockup title="bordereau_pieces.md">
                      <div style={{ color: 'var(--accent-dark)', fontWeight: '600', marginBottom: '8px' }}>
                        BORDEREAU DE PI&Egrave;CES COMMUNIQU&Eacute;ES
                      </div>
                      <div style={{ marginBottom: '8px', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        Affaire Martin c/ Soci&eacute;t&eacute; ABC
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>Pi&egrave;ce n&deg;1</strong> : Contrat du 15/01/2024
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>Pi&egrave;ce n&deg;2</strong> : Mise en demeure du 03/03/2024
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>Pi&egrave;ce n&deg;3</strong> : Courriels &eacute;chang&eacute;s (12 au 28/02/2024)
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>Pi&egrave;ce n&deg;4</strong> : Factures impay&eacute;es (3)
                      </div>
                      <div style={{ marginTop: '8px', color: 'var(--green)', fontSize: '0.75rem' }}>
                        4 pi&egrave;ces class&eacute;es et num&eacute;rot&eacute;es.
                      </div>
                    </WindowMockup>
                    <p
                      style={{
                        marginTop: '12px',
                        padding: '8px 12px',
                        background: '#FFF3CD',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#856404',
                      }}>
                      &#128249; Vid&eacute;o de d&eacute;monstration &agrave; tourner pour ce Skill
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel 5 : Convention honoraires */}
              <div className="v4-panel">
                <div className="v4-panel-inner">
                  <div className="v4-panel-text">
                    <h3>Convention honoraires</h3>
                    <p>
                      G&eacute;n&eacute;rez des conventions d'honoraires personnalis&eacute;es et conformes &agrave; la r&eacute;glementation en
                      vigueur. Le Skill int&egrave;gre automatiquement les mentions impos&eacute;es par la loi du 31 d&eacute;cembre 1971 et le
                      d&eacute;cret du 12 juillet 2005, adapte les clauses &agrave; votre domaine de sp&eacute;cialit&eacute; et propose des options
                      de facturation (forfait, taux horaire, honoraires de r&eacute;sultat).
                    </p>
                    <div className="v4-benefits">
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Mentions obligatoires int&eacute;gr&eacute;es automatiquement</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>Personnalisation par domaine d'exercice</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>D&eacute;tection des clauses potentiellement abusives</span>
                      </div>
                      <div className="v4-benefit">
                        <span className="v4-benefit-check">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>45 min gagn&eacute;es par convention g&eacute;n&eacute;r&eacute;e</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <WindowMockup title="convention_honoraires.md">
                      <div style={{ color: 'var(--accent-dark)', fontWeight: '600', marginBottom: '8px' }}>CONVENTION D'HONORAIRES</div>
                      <div style={{ marginBottom: '6px' }}>Entre : Me Dupont, Avocat au Barreau de Paris</div>
                      <div style={{ marginBottom: '6px' }}>Et : Soci&eacute;t&eacute; XYZ, repr&eacute;sent&eacute;e par...</div>
                      <div style={{ marginBottom: '12px', paddingTop: '8px', borderTop: '1px dashed var(--border)' }}>
                        <span style={{ color: 'var(--accent-dark)' }}>Art. 1</span> Objet de la mission
                        <br />
                        <span style={{ color: 'var(--accent-dark)' }}>Art. 2</span> Honoraires (forfait : 2 500 EUR HT)
                        <br />
                        <span style={{ color: 'var(--accent-dark)' }}>Art. 3</span> Modalit&eacute;s de r&egrave;glement
                        <br />
                        <span style={{ color: 'var(--accent-dark)' }}>Art. 4</span> Information du client (art. 10 loi 71-1130)
                      </div>
                      <div style={{ color: 'var(--green)', fontSize: '0.75rem' }}>Toutes les mentions obligatoires sont pr&eacute;sentes.</div>
                    </WindowMockup>
                    <p
                      style={{
                        marginTop: '12px',
                        padding: '8px 12px',
                        background: '#FFF3CD',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#856404',
                      }}>
                      &#128249; Vid&eacute;o de d&eacute;monstration &agrave; tourner pour ce Skill
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ============================================================
          SOCIAL PROOF : Magazine / Article Style (V5)
          ============================================================ */}
      <section className="page-section" id="social-proof">
        <div className="container">
          <div className="v5-article">
            {/* Photo side */}
            <AnimateIn animation="anim-slide-right">
              <div className="v5-photo">
                <span className="v5-photo-initials">PH</span>
              </div>
              <div style={{ marginTop: 'var(--space-md)', textAlign: 'center' }}>
                <span className="tag">Portrait</span>
              </div>
            </AnimateIn>

            {/* Article body */}
            <AnimateIn animation="anim-slide-up" className="v5-article-body">
              <h3>Me Patrice Humbert : l'avocat qui transforme la pratique juridique par l'IA</h3>
              <p className="v5-subtitle">Cabinet LEXVOX &bull; Barreau d'Aix-en-Provence &bull; Depuis 2006</p>

              <div className="divider"></div>

              <p className="v5-text">
                Pr&ecirc;t&eacute; serment le 4 janvier 2006 au barreau d'Aix-en-Provence, Me Patrice Humbert n'est pas un avocat ordinaire. Titulaire
                d'un Master en Droit de la Sant&eacute;, d'un DU en Sciences P&eacute;nales, et dipl&ocirc;m&eacute; de la Facult&eacute; de
                M&eacute;decine de Montpellier (DU Traumatisme Cr&acirc;nien), il incarne une double expertise unique au croisement du droit et de la
                m&eacute;decine.
              </p>

              <div className="v5-pullquote">
                &laquo; Pionnier de l'IA appliqu&eacute;e au droit en France, il a form&eacute; pr&egrave;s de 1 000 avocats &agrave; l'IA
                g&eacute;n&eacute;rative et a &eacute;t&eacute; finaliste du concours officiel du CNB sur l'innovation. &raquo;
              </div>

              <p className="v5-text">
                Certifi&eacute; sp&eacute;cialiste en dommage corporel par le Conseil National des Barreaux, cofondateur du r&eacute;seau Provence
                Avocats, Me Humbert intervient r&eacute;guli&egrave;rement dans les &eacute;coles d'avocats. Son site personnel attire plus de 150 000
                visites mensuelles, t&eacute;moignant de l'ampleur de son rayonnement dans la profession. Avec le Pack Skills juridiques, il rend
                accessible &agrave; tous les avocats le fruit de ses 20 ann&eacute;es d'expertise et de son exploration avanc&eacute;e de
                l'intelligence artificielle.
              </p>

              <div
                style={{
                  marginTop: 'var(--space-lg)',
                  padding: 'var(--space-md)',
                  background: 'var(--bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                }}>
                <p style={{ fontWeight: '700', marginBottom: 'var(--space-sm)', color: 'var(--accent-dark)' }}>
                  &#127897; Conf&eacute;rencier TEDx sur l'IA en tant qu'avocat
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }}>
                  Me Humbert a partag&eacute; sa vision de l'intelligence artificielle au service du droit lors d'un TEDx.
                </p>
                <p
                  style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    background: '#FFF3CD',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    color: '#856404',
                  }}>
                  &#128247; Mettre ici une photo du TEDx directement
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <p style={{ fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--accent)' }}>&#127942; Premier avocat certifi&eacute; en IA &eacute;thique en France</strong>
                </p>
                <p style={{ fontSize: '0.9rem' }}>
                  <strong>&#128101; Cr&eacute;ateur de la premi&egrave;re communaut&eacute; juridique IA :</strong>{' '}
                  <a
                    href="https://www.skool.com/ia-avocats"
                    target="_blank"
                    rel="noopener"
                    style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    Rejoindre sur Skool
                  </a>
                </p>
                <p style={{ fontSize: '0.9rem' }}>
                  <a
                    href="https://www.linkedin.com/in/patricehumbert/"
                    target="_blank"
                    rel="noopener"
                    style={{ color: '#0A66C2', textDecoration: 'underline', fontWeight: '600' }}>
                    Profil LinkedIn de Me Humbert
                  </a>
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Testimonials */}
          <div className="v5-testimonials stagger">
            <AnimateIn animation="anim-slide-up" className="v5-testi-box">
              <p className="v5-testi-label">T&eacute;moignage</p>
              <p className="v5-testi-text">
                &laquo; Ces Skills ont transform&eacute; ma pratique quotidienne. Ce qui me prenait des heures de prompting se fait d&eacute;sormais
                en quelques minutes, avec une constance que je n'aurais jamais obtenue autrement. &raquo;
              </p>
              <p className="v5-testi-author">Me Patrice Humbert</p>
              <p className="v5-testi-role">Cabinet LEXVOX, Salon-de-Provence</p>
            </AnimateIn>
            <AnimateIn animation="anim-slide-up" className="v5-testi-box">
              <p className="v5-testi-label">T&eacute;moignage</p>
              <p className="v5-testi-text">
                &laquo; Patrice est mon associ&eacute; et c'est une chance d'avoir pu acc&eacute;der &agrave; ses Skills depuis leur cr&eacute;ation.
                &Ccedil;a a v&eacute;ritablement chang&eacute; ma fa&ccedil;on de travailler. &raquo;
              </p>
              <p className="v5-testi-author">Me C&eacute;drine Raybaud</p>
              <p className="v5-testi-role">Avocate au barreau de Tarascon, associ&eacute;e au cabinet LEXVOX</p>
            </AnimateIn>
            <AnimateIn animation="anim-slide-up" className="v5-testi-box">
              <p className="v5-testi-label">T&eacute;moignage</p>
              <p className="v5-testi-text">&laquo; T&eacute;moignage &agrave; compl&eacute;ter &raquo;</p>
              <p className="v5-testi-author">Me Julien Ayoun</p>
              <p className="v5-testi-role">Avocat, associ&eacute; de Me Humbert</p>
            </AnimateIn>
            <AnimateIn animation="anim-slide-up" className="v5-testi-box">
              <p className="v5-testi-label">T&eacute;moignage</p>
              <p className="v5-testi-text">&laquo; T&eacute;moignage &agrave; compl&eacute;ter &raquo;</p>
              <p className="v5-testi-author">Me Benjamin Ayoun</p>
              <p className="v5-testi-role">Avocat, associ&eacute; de Me Humbert</p>
            </AnimateIn>
            <AnimateIn animation="anim-slide-up" className="v5-testi-box">
              <p className="v5-testi-label">T&eacute;moignage</p>
              <p className="v5-testi-text">&laquo; T&eacute;moignage &agrave; compl&eacute;ter &raquo;</p>
              <p className="v5-testi-author">Rachid</p>
              <p className="v5-testi-role"></p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ============================================================
          PRICING : Value Comparison Split (V2)
          ============================================================ */}
      <section className="page-section" id="pricing">
        <div className="container">
          <AnimateIn animation="anim-slide-up" className="text-center mb-xl">
            <h2>
              5 <span style={{ color: 'var(--accent)' }}>SKILLS</span> pour le prix d'une consultation
            </h2>
            <p className="mt-md" style={{ maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
              Pour le prix d'une seule consultation, offrez-vous 5 Skills ultra-optimis&eacute;s qui transforment Claude en collaborateur juridique
              fiable.
            </p>
          </AnimateIn>

          <div className="comparison-grid relative">
            {/* Left: Cost of an hour */}
            <AnimateIn animation="anim-slide-up" className="comparison-col faded">
              <div className="comparison-label">Valeur r&eacute;elle du pack</div>
              <div className="comparison-amount" style={{ textDecoration: 'line-through' }}>
                800 &euro;
              </div>
              <div className="comparison-detail">5 Skills + formation + acc&egrave;s communaut&eacute;</div>
            </AnimateIn>

            <div className="vs-badge">VS</div>

            {/* Right: Pack cost */}
            <AnimateIn animation="anim-slide-up" className="comparison-col highlight" delay={150}>
              <div className="comparison-label">Le pack complet (5 Skills)</div>
              <div className="comparison-amount">150 &euro; HT</div>
              <div className="comparison-detail">Paiement unique (TVA en sus), tout inclus</div>
              <ul className="comparison-includes">
                <li>
                  <CheckIcon />5 Skills pr&ecirc;ts &agrave; l'emploi
                </li>
                <li>
                  <CheckIcon />
                  Vid&eacute;os de formation incluses
                </li>
                <li>
                  <CheckIcon />
                  Con&ccedil;u par un avocat pour des avocats
                </li>
                <li>
                  <CheckIcon />
                  Disponibles &agrave; vie
                </li>
                <li>
                  <CheckIcon />
                  Acc&egrave;s gratuit &agrave; la 1&egrave;re communaut&eacute; juridique IA de France
                </li>
              </ul>
            </AnimateIn>
          </div>

          <AnimateIn animation="anim-fade-in" className="comparison-verdict">
            <p>Le prix d'une consultation pour gagner des centaines d'heures.</p>
            <a href="#" className="btn-primary">
              Acc&eacute;der aux Skills
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </AnimateIn>
        </div>
      </section>

      {/* ============================================================
          FAQ
          ============================================================ */}
      <section className="page-section" id="faq">
        <div className="container">
          <AnimateIn animation="anim-slide-up" className="text-center mb-xl">
            <span className="tag">Questions fr&eacute;quentes</span>
            <h2 className="mt-lg">Tout ce que vous devez savoir</h2>
          </AnimateIn>

          <div className="faq-list stagger">
            <AnimateIn animation="anim-slide-up" as="details" className="faq-item">
              <summary className="faq-summary">
                <span>Qu'est-ce qu'un Skill Claude exactement ?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-body">
                Un Skill est un ensemble d'instructions r&eacute;dig&eacute;es en langage naturel, enregistr&eacute;es dans un fichier texte. Pas de
                code, pas de plugin : Claude les lit et les applique automatiquement &agrave; chaque conversation. C'est comme donner &agrave; Claude
                une m&eacute;moire permanente de votre m&eacute;thodologie de travail.
              </div>
            </AnimateIn>

            <AnimateIn animation="anim-slide-up" as="details" className="faq-item">
              <summary className="faq-summary">
                <span>Ai-je besoin de comp&eacute;tences techniques ?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-body">
                Absolument pas. L'installation se fait par un simple glisser-d&eacute;poser dans Claude Desktop. Une vid&eacute;o de formation pas
                &agrave; pas est incluse dans le pack. Si vous savez utiliser Claude, vous savez utiliser les Skills.
              </div>
            </AnimateIn>

            <AnimateIn animation="anim-slide-up" as="details" className="faq-item">
              <summary className="faq-summary">
                <span>Comment se passe l'installation ?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-body">
                Vous recevez 5 fichiers Skills apr&egrave;s le paiement. Il suffit de les placer dans le dossier d&eacute;di&eacute; de Claude Desktop
                (la vid&eacute;o de formation vous montre exactement comment faire). L'ensemble prend moins de 3 minutes.
              </div>
            </AnimateIn>

            <AnimateIn animation="anim-slide-up" as="details" className="faq-item">
              <summary className="faq-summary">
                <span>Est-ce compatible avec ma sp&eacute;cialit&eacute; ?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-body">
                Les Skills couvrent des t&acirc;ches transversales (conclusions, contre-argumentation, conventions d'honoraires, mises en demeure,
                analyse jurisprudentielle) utiles quelle que soit votre sp&eacute;cialit&eacute;. Chaque Skill est accompagn&eacute; d'une
                vid&eacute;o expliquant comment l'adapter &agrave; votre domaine d'exercice.
              </div>
            </AnimateIn>

            <AnimateIn animation="anim-slide-up" as="details" className="faq-item">
              <summary className="faq-summary">
                <span>Mes donn&eacute;es client sont-elles en s&eacute;curit&eacute; ?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-body">
                Les Skills sont de simples fichiers texte stock&eacute;s localement sur votre ordinateur. Ils ne transmettent aucune donn&eacute;e
                &agrave; des tiers. La confidentialit&eacute; de vos &eacute;changes avec Claude d&eacute;pend de votre abonnement Anthropic (Claude
                Pro ou Team), et non des Skills eux-m&ecirc;mes.
              </div>
            </AnimateIn>

            <AnimateIn animation="anim-slide-up" as="details" className="faq-item">
              <summary className="faq-summary">
                <span>Faut-il un abonnement Claude ?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-body">
                Oui, un abonnement Claude Pro ou Claude Team est n&eacute;cessaire pour utiliser Claude Desktop. Les Skills fonctionnent avec ces deux
                formules. L'abonnement se souscrit directement aupr&egrave;s d'Anthropic (le cr&eacute;ateur de Claude).
              </div>
            </AnimateIn>

            <AnimateIn animation="anim-slide-up" as="details" className="faq-item">
              <summary className="faq-summary">
                <span>Puis-je personnaliser les Skills ?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-body">
                Oui. Les Skills sont des fichiers texte modifiables. Chaque Skill est accompagn&eacute; d'une vid&eacute;o d&eacute;di&eacute;e
                expliquant comment le personnaliser et l'adapter &agrave; votre pratique. Vous pouvez ajuster les instructions, ajouter des
                r&egrave;gles sp&eacute;cifiques &agrave; votre cabinet ou &agrave; votre sp&eacute;cialit&eacute;.
              </div>
            </AnimateIn>

            <AnimateIn animation="anim-slide-up" as="details" className="faq-item">
              <summary className="faq-summary">
                <span>Y a-t-il un support si j'ai des questions ?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-body">
                Le pack inclut 6 vid&eacute;os de support : une vid&eacute;o g&eacute;n&eacute;rale d'installation et 5 vid&eacute;os
                d&eacute;di&eacute;es (une par Skill) pour l'utilisation optimale et la personnalisation. En cas de question suppl&eacute;mentaire,
                vous pouvez nous contacter directement par email.
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA FREE TRIAL
          ============================================================ */}
      <section className="cta-free-trial" id="cta-gratuit">
        <AnimateIn animation="anim-scale-in" className="container cta-free-inner">
          <span className="cta-free-tag">100 % gratuit</span>
          <h2>Testez les Skills avant d'acheter</h2>
          <p>D&eacute;couvrez par vous-m&ecirc;me la puissance des Skills juridiques de Me&nbsp;Humbert. Sans engagement, sans carte bancaire.</p>
          <Link to="/pack-gratuit" className="btn-free">
            Testez gratuitement
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 10h10m0 0l-4-4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="cta-free-note">Acc&egrave;s imm&eacute;diat. Aucune information de paiement requise.</p>
        </AnimateIn>
      </section>

      <Footer
        navLinks={[
          { label: 'Les 5 Skills', href: '#features' },
          { label: 'Comment \u00e7a marche', href: '#skill-steps' },
          { label: 'Me Humbert', href: '#social-proof' },
          { label: 'Prix', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
        ]}
      />
    </>
  );
}
