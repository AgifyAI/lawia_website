import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AnimateIn from '../components/AnimateIn'
import { WEBHOOK_URL } from '../lib/constants'
import '../styles/bienvenue.css'

export default function Bienvenue() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const userEmail = searchParams.get('email') || ''
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    document.title = 'Une derni\u00e8re \u00e9tape | LawIA'
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)

    const form = e.currentTarget
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_profile',
          email: userEmail,
          firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
          lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
          jobTitle: (form.elements.namedItem('statut') as HTMLSelectElement).value,
          specialty: (form.elements.namedItem('specialite') as HTMLSelectElement).value,
        }),
      })

      if (!res.ok) throw new Error(String(res.status))
      navigate('/merci')
    } catch {
      setError(true)
      setSubmitting(false)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <>
      <Navbar minimal />

      <main className="bienvenue-page">
        <div className="bienvenue-layout">
          {/* Left: context */}
          <AnimateIn animation="anim-slide-up" className="bienvenue-context">
            <span className="tag">Derni&egrave;re &eacute;tape</span>
            <h1>Dites-nous en un peu plus sur vous</h1>
            <p>
              On utilise ces informations pour vous pr&eacute;parer des{' '}
              <strong>contenus adapt&eacute;s &agrave; votre domaine d'exercice</strong>.
              Un p&eacute;naliste et un civiliste n'ont pas les m&ecirc;mes besoins.
            </p>

            <div className="step-tracker">
              <div className="step-tracker-bar">
                <span className="step-dot done"></span>
                <span className="step-line done"></span>
                <span className="step-dot active"></span>
                <span className="step-line"></span>
                <span className="step-dot"></span>
              </div>
              <div className="step-tracker-labels">
                <span>Email</span>
                <span className="current">Votre profil</span>
                <span>Confirmation</span>
              </div>
            </div>
          </AnimateIn>

          {/* Right: form */}
          <AnimateIn animation="anim-slide-left" className="bienvenue-card">
            <form id="info-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Pr&eacute;nom</label>
                  <input type="text" id="firstName" name="firstName" placeholder="Jean" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Nom</label>
                  <input type="text" id="lastName" name="lastName" placeholder="Dupont" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="statut">Vous &ecirc;tes</label>
                <select id="statut" name="statut" required defaultValue="">
                  <option value="" disabled>S&eacute;lectionnez votre statut</option>
                  <option value="avocat_cabinet">Avocat(e) en cabinet</option>
                  <option value="eleve_avocat">&Eacute;l&egrave;ve avocat(e)</option>
                  <option value="juriste_entreprise">Juriste d'entreprise</option>
                  <option value="etudiant_droit">&Eacute;tudiant(e) en droit</option>
                  <option value="commissaire_justice">Commissaire de justice</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="specialite">Sp&eacute;cialit&eacute;</label>
                <select id="specialite" name="specialite" required defaultValue="">
                  <option value="" disabled>Type de droit</option>
                  <option value="civil">Droit civil</option>
                  <option value="affaires">Droit des affaires</option>
                  <option value="penal">Droit p&eacute;nal</option>
                  <option value="social">Droit social / travail</option>
                  <option value="immobilier">Droit immobilier</option>
                  <option value="famille">Droit de la famille</option>
                  <option value="fiscal">Droit fiscal</option>
                  <option value="propriete_intellectuelle">Propri&eacute;t&eacute; intellectuelle</option>
                  <option value="public">Droit public</option>
                  <option value="numerique">Droit du num&eacute;rique</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={submitting}
                style={error ? { background: 'var(--red)' } : undefined}
              >
                {submitting && !error && 'Envoi\u2026'}
                {error && 'Erreur, r\u00e9essayez'}
                {!submitting && !error && (
                  <>
                    Recevoir mon pack
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </AnimateIn>
        </div>
      </main>
    </>
  )
}
