"use client"

import { useState, useEffect, Suspense, use } from "react"
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"

function ContactContent({ lang }: { lang: string }) {
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

  const t = {
    title: lang === 'en' ? 'Contact Us' : lang === 'es' ? 'Contáctenos' : 'Nous Contacter',
    subtitle: lang === 'en' 
      ? 'A question, a partnership request, a testimony to share? The ARMMK team will answer you as soon as possible.'
      : lang === 'es'
      ? '¿Una pregunta, una solicitud de asociación, un testimonio para compartir? El equipo de ARMMK le responderá lo antes posible.'
      : 'Une question, une demande de partenariat, un témoignage à partager ? L\'équipe de l\'ARMMK vous répondra dans les meilleurs délais.',
    findUs: lang === 'en' ? 'Where to find us' : lang === 'es' ? 'Dónde encontrarnos' : 'Où nous trouver',
    coordinates: lang === 'en' ? 'ARMMK contact details' : lang === 'es' ? 'Coordenadas de ARMMK' : 'Coordonnées de l\'ARMMK',
    address: lang === 'en' ? 'Address' : lang === 'es' ? 'Dirección' : 'Adresse',
    phone: lang === 'en' ? 'Phone' : lang === 'es' ? 'Teléfono' : 'Téléphone',
    officeHours: lang === 'en' ? 'Office hours' : lang === 'es' ? 'Horario de oficina' : 'Horaires du bureau',
    hoursText: lang === 'en'
      ? 'Monday – Friday: 8:00 AM – 5:00 PM\nSaturday: 9:00 AM – 12:00 PM (by appointment)'
      : lang === 'es'
      ? 'Lunes – Viernes: 8:00 AM – 5:00 PM\nSábado: 9:00 AM – 12:00 PM (con cita previa)'
      : 'Lundi – Vendredi : 8h00 – 17h00\nSamedi : 9h00 – 12h00 (sur rendez-vous)',
    writeUs: lang === 'en' ? 'Write to us' : lang === 'es' ? 'Escríbanos' : 'Écrivez-nous',
    formTitle: lang === 'en' ? 'Contact form' : lang === 'es' ? 'Formulario de contacto' : 'Formulaire de contact',
    sentTitle: lang === 'en' ? 'Message sent' : lang === 'es' ? 'Mensaje enviado' : 'Message envoyé',
    sentText: lang === 'en'
      ? 'Thank you for contacting us. The ARMMK team will answer you within 48 to 72 business hours.'
      : lang === 'es'
      ? 'Gracias por contactarnos. El equipo de ARMMK le responderá en un plazo de 48 a 72 horas hábiles.'
      : 'Merci de nous avoir contactés. L\'équipe de l\'ARMMK vous répondra dans un délai de 48 à 72 heures ouvrables.',
    firstName: lang === 'en' ? 'First Name' : lang === 'es' ? 'Nombre' : 'Prénom',
    lastName: lang === 'en' ? 'Last Name' : lang === 'es' ? 'Apellido' : 'Nom',
    email: 'Email',
    subject: lang === 'en' ? 'Subject' : lang === 'es' ? 'Asunto' : 'Objet',
    message: lang === 'en' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message',
    send: lang === 'en' ? 'Send message' : lang === 'es' ? 'Enviar message' : 'Envoyer le message',
    placeholders: {
      firstName: lang === 'en' ? 'Your first name' : lang === 'es' ? 'Su nombre' : 'Votre prénom',
      lastName: lang === 'en' ? 'Your last name' : lang === 'es' ? 'Su apellido' : 'Votre nom',
      message: lang === 'en' ? 'Your message...' : lang === 'es' ? 'Su mensaje...' : 'Votre message...',
      subject: lang === 'en' ? 'Select a subject...' : lang === 'es' ? 'Seleccione un asunto...' : 'Sélectionnez un objet…',
    },
    subjects: [
      lang === 'en' ? 'General information' : lang === 'es' ? 'Información general' : 'Informations générales',
      lang === 'en' ? 'Partnership or collaboration' : lang === 'es' ? 'Asociación o colaboración' : 'Partenariat ou collaboration',
      lang === 'en' ? 'Make a donation' : lang === 'es' ? 'Hacer una donación' : 'Faire un don',
      lang === 'en' ? 'Become a volunteer' : lang === 'es' ? 'Ser voluntario' : 'Devenir volontaire',
      lang === 'en' ? 'Share a testimony' : lang === 'es' ? 'Compartir un testimonio' : 'Partager un témoignage',
      lang === 'en' ? 'Press / media request' : lang === 'es' ? 'Solicitud de prensa / medios' : 'Demande de presse / médias',
      lang === 'en' ? 'Other' : lang === 'es' ? 'Otro' : 'Autre',
    ]
  }

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={t.subtitle}
        breadcrumbs={[{ label: lang === 'en' ? 'Contact' : lang === 'es' ? 'Contacto' : 'Contact' }]}
        lang={lang}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* Infos de contact */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
                {t.findUs}
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#002D62] mb-6">
                {t.coordinates}
              </h2>
            </div>

            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#002D62]/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#002D62]" />
                </div>
                <div>
                  <p className="font-semibold text-[#002D62] text-sm mb-0.5">{t.address}</p>
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
                  <p className="font-semibold text-[#002D62] text-sm mb-0.5">{t.email}</p>
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
                  <p className="font-semibold text-[#002D62] text-sm mb-0.5">{t.phone}</p>
                  <p className="text-muted-foreground text-sm">{config?.contact_phone || "+243 XXX XXX XXX"}</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#002D62]/10 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-[#002D62]" />
                </div>
                <div>
                  <p className="font-semibold text-[#002D62] text-sm mb-0.5">{t.officeHours}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {t.hoursText}
                  </p>
                </div>
              </li>
            </ul>

            {/* Carte stylisée */}
            <div className="rounded-lg overflow-hidden border border-border h-48 bg-[#F8F6F2] flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-[#D32F2F] mx-auto mb-2" />
                <p className="text-[#002D62] font-semibold text-sm">Makobola, Fizi</p>
                <p className="text-muted-foreground text-xs mt-0.5">{lang === 'en' ? 'South Kivu, DRC' : lang === 'es' ? 'Kivu del Sur, RDC' : 'Sud-Kivu, RDC'}</p>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              {t.writeUs}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#002D62] mb-8">
              {t.formTitle}
            </h2>

            {sent ? (
              <div className="bg-[#F8F6F2] border border-border rounded-lg p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#002D62] mb-2">
                  {t.sentTitle}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.sentText}
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
                      {t.firstName} <span className="text-[#D32F2F]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={t.placeholders.firstName}
                      className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                      {t.lastName} <span className="text-[#D32F2F]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={t.placeholders.lastName}
                      className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                      {t.email} <span className="text-[#D32F2F]">*</span>
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
                      {t.phone}
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
                    {t.subject} <span className="text-[#D32F2F]">*</span>
                  </label>
                  <select
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                  >
                    <option value="">{t.placeholders.subject}</option>
                    {t.subjects.map((s, i) => (
                      <option key={i} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                    {t.message} <span className="text-[#D32F2F]">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.placeholders.message}
                    className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#002D62] hover:bg-[#001a3d] text-white font-bold text-sm uppercase tracking-wider py-4 rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}

export default function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const t_loading = lang === 'en' ? 'Loading...' : lang === 'es' ? 'Cargando...' : 'Chargement...'

  return (
    <Suspense fallback={<div>{t_loading}</div>}>
      <ContactContent lang={lang} />
    </Suspense>
  )
}
