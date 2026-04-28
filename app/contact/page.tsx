"use client"

import { useState, useEffect } from "react"
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [config, setConfig] = useState<any>(null)
  
  // States for form
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchAPI('/config/').then(cfg => {
      if (cfg && cfg.site_name) setConfig(cfg)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetchAPI('/contact/', {
      method: 'POST',
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        subject: subject,
        message: message,
      })
    })
    if (res) {
      setSent(true)
    }
  }

  return (
    <>
      <Navbar />
      <PageShell
        title="Nous Contacter"
        subtitle="Une question, une demande de partenariat, un témoignage à partager ? L'équipe de l'ARMMK vous répondra dans les meilleurs délais."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* Infos de contact */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
                Où nous trouver
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#002D62] mb-6">
                Coordonnées de l&apos;ARMMK
              </h2>
            </div>

            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#002D62]/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#002D62]" />
                </div>
                <div>
                  <p className="font-semibold text-[#002D62] text-sm mb-0.5">Adresse</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {config?.address || "Bangwe-Makobola, Territoire de Fizi, Sud-Kivu, RDC"}
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#002D62]/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#002D62]" />
                </div>
                <div>
                  <p className="font-semibold text-[#002D62] text-sm mb-0.5">Email</p>
                  <a
                    href={`mailto:${config?.contact_email || "info@armmk.org"}`}
                    className="text-[#D32F2F] hover:text-[#002D62] text-sm transition-colors"
                  >
                    {config?.contact_email || "info@armmk.org"}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#002D62]/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#002D62]" />
                </div>
                <div>
                  <p className="font-semibold text-[#002D62] text-sm mb-0.5">Téléphone</p>
                  <p className="text-muted-foreground text-sm">{config?.contact_phone || "+243 XXX XXX XXX"}</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#002D62]/10 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-[#002D62]" />
                </div>
                <div>
                  <p className="font-semibold text-[#002D62] text-sm mb-0.5">Horaires du bureau</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Lundi – Vendredi : 8h00 – 17h00<br />
                    Samedi : 9h00 – 12h00 (sur rendez-vous)
                  </p>
                </div>
              </li>
            </ul>

            {/* Carte stylisée */}
            <div className="rounded-lg overflow-hidden border border-border h-48 bg-[#F8F6F2] flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-[#D32F2F] mx-auto mb-2" />
                <p className="text-[#002D62] font-semibold text-sm">Makobola, Fizi</p>
                <p className="text-muted-foreground text-xs mt-0.5">Sud-Kivu, RDC</p>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              Écrivez-nous
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#002D62] mb-8">
              Formulaire de contact
            </h2>

            {sent ? (
              <div className="bg-[#F8F6F2] border border-border rounded-lg p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#002D62] mb-2">
                  Message envoyé
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Merci de nous avoir contactés. L&apos;équipe de l&apos;ARMMK vous répondra
                  dans un délai de 48 à 72 heures ouvrables.
                </p>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                      Prénom <span className="text-[#D32F2F]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Votre prénom"
                      className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                      Nom <span className="text-[#D32F2F]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Votre nom"
                      className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                      Email <span className="text-[#D32F2F]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      placeholder="+243 …"
                      className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                    Objet <span className="text-[#D32F2F]">*</span>
                  </label>
                  <select
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                  >
                    <option value="">Sélectionnez un objet…</option>
                    <option>Informations générales</option>
                    <option>Partenariat ou collaboration</option>
                    <option>Faire un don</option>
                    <option>Devenir volontaire</option>
                    <option>Partager un témoignage</option>
                    <option>Demande de presse / médias</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                    Message <span className="text-[#D32F2F]">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Votre message…"
                    className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#002D62] hover:bg-[#001a3d] text-white font-bold text-sm uppercase tracking-wider py-4 rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
