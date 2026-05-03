"use client"

import { useState, useEffect, Suspense, use } from "react"
import Link from "next/link"
import { HandHeart, Users, Package, GraduationCap, CheckCircle2, Smartphone, Landmark, Globe } from "lucide-react"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"

const amounts = [5, 10, 25, 50, 100]

function SoutenirContent({ lang }: { lang: string }) {
  const [selected, setSelected] = useState<number | null>(25)
  const [custom, setCustom] = useState("")
  const [sent, setSent] = useState(false)
  const [supports, setSupports] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [impacts, setImpacts] = useState<any[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isMonthly, setIsMonthly] = useState(false)

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const finalAmount = selected ? selected : Number(custom)
    const res = await fetchAPI('/donation/', {
      method: 'POST',
      body: JSON.stringify({
        first_name: name,
        email: email,
        amount: finalAmount || 0,
        is_monthly: isMonthly
      })
    })
    if (res) {
      setSent(true)
    }
  }

  useEffect(() => {
    fetchAPI('/supports/').then(data => {
      if(data) setSupports(data)
    })
    fetchAPI('/payment-methods/').then(data => {
      if(data) setPaymentMethods(data)
    })
    fetchAPI('/donation-impacts/').then(data => {
      if(data && data.length > 0) setImpacts(data)
    })
  }, [])
  
  const iconMap: Record<string, any> = { HandHeart, Users, GraduationCap, Package, Smartphone, Landmark, Globe }

  const t = {
    title: lang === 'en' ? 'Support Us' : lang === 'es' ? 'Apóyenos' : 'Nous Soutenir',
    subtitle: lang === 'en'
      ? 'Your support allows ARMMK to continue its work of memory, reconciliation and support for survivors and orphans of Makobola.'
      : lang === 'es'
      ? 'Su apoyo permite a ARMMK continuar su trabajo de memoria, reconciliación y apoyo a los sobrevivientes y huérfanos de Makobola.'
      : 'Votre soutien permet à l\'ARMMK de poursuivre son travail de mémoire, de réconciliation et d\'accompagnement des rescapés et orphelins de Makobola.',
    breadcrumb: lang === 'en' ? 'Support us' : lang === 'es' ? 'Apóyenos' : 'Nous soutenir',
    actBadge: lang === 'en' ? 'Take action' : lang === 'es' ? 'Actúa ahora' : 'Agissez concrètement',
    howToSupport: lang === 'en' ? 'How to support us' : lang === 'es' ? 'Cómo apoyarnos' : 'Comment nous soutenir',
    onlineDonation: lang === 'en' ? 'Make an online donation' : lang === 'es' ? 'Hacer una donación en línea' : 'Faire un don en ligne',
    chooseAmount: lang === 'en' ? 'Choose an amount or enter yours' : lang === 'es' ? 'Elija un monto o ingrese el suyo' : 'Choisissez un montant ou saisissez le vôtre',
    thanksTitle: lang === 'en' ? 'Thank you for your generosity' : lang === 'es' ? 'Gracias por su generosidad' : 'Merci pour votre générosité',
    thanksText: lang === 'en'
      ? 'Your request has been recorded. The ARMMK team will contact you with payment instructions adapted to your location.'
      : lang === 'es'
      ? 'Su solicitud ha sido registrada. El equipo de ARMMK se pondrá en contacto con usted con las instrucciones de pago adaptadas a su ubicación.'
      : 'Votre demande a été enregistrée. L\'équipe de l\'ARMMK vous contactera avec les instructions de paiement adaptées à votre localisation.',
    amountLabel: lang === 'en' ? 'Amount (USD)' : lang === 'es' ? 'Monto (USD)' : 'Montant (USD)',
    otherAmount: lang === 'en' ? 'Other amount...' : lang === 'es' ? 'Otro monto...' : 'Autre montant…',
    frequency: lang === 'en' ? 'Frequency' : lang === 'es' ? 'Frecuencia' : 'Fréquence',
    oneTime: lang === 'en' ? 'One-time donation' : lang === 'es' ? 'Donación única' : 'Don unique',
    monthly: lang === 'en' ? 'Monthly' : lang === 'es' ? 'Mensual' : 'Mensuel',
    fullName: lang === 'en' ? 'First and Last Name' : lang === 'es' ? 'Nombre y apellido' : 'Prénom et nom',
    email: 'Email',
    confirmDonation: lang === 'en' ? 'Confirm my donation' : lang === 'es' ? 'Confirmar mi donación' : 'Confirmer mon don',
    paymentMethods: lang === 'en' ? 'Available payment methods' : lang === 'es' ? 'Métodos de pago disponibles' : 'Moyens de paiement disponibles',
    impactTitle: lang === 'en' ? 'The impact of your donation' : lang === 'es' ? 'El impacto de su donación' : 'L\'impact de votre don',
    impacts: [
      { amount: "$10", impact: lang === 'en' ? 'School supplies for an orphan for a month' : lang === 'es' ? 'Útiles escolares para un huérfano por un mes' : 'Fournitures scolaires pour un orphelin pendant un mois' },
      { amount: "$50", impact: lang === 'en' ? 'Funding of a talking group session for survivors' : lang === 'es' ? 'Financiación de una sesión de grupo de palabra para sobrevivientes' : 'Financement d\'une session de groupe de parole pour rescapés' },
      { amount: "$100", impact: lang === 'en' ? 'Support for the organization of an inter-community dialogue workshop' : lang === 'es' ? 'Apoyo para la organización de un taller de diálogo intercomunitario' : 'Soutien à l\'organisation d\'un atelier de dialogue inter-communautaire' },
    ]
  }

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={t.subtitle}
        image="/images/orphans-support.jpg"
        breadcrumbs={[{ label: t.breadcrumb }]}
        lang={lang}
      />

      {/* Formes de soutien */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              {t.actBadge}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">
              {t.howToSupport}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {supports.map((s: any) => {
              const Icon = iconMap[s.iconName] || HandHeart
              return (
                <div key={s.id || s.title} className="bg-[#F8F6F2] rounded-lg border border-border p-7 hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 rounded-full bg-[#002D62] flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-[#002D62] text-base mb-2">{getField(s, 'title')}</h3>
                  <div 
                    className="text-muted-foreground text-xs leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: getField(s, 'description') }}
                  />
                </div>
              )
            })}
          </div>

          {/* Formulaire de don */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border-2 border-[#002D62] rounded-lg overflow-hidden shadow-xl">
              <div className="bg-[#002D62] px-8 py-6">
                <h3 className="font-serif text-xl font-bold text-white">{t.onlineDonation}</h3>
                <p className="text-white/65 text-sm mt-1">{t.chooseAmount}</p>
              </div>
              {sent ? (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#002D62] mb-2">{t.thanksTitle}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t.thanksText}
                  </p>
                </div>
              ) : (
                <form
                  className="p-8 space-y-6"
                  onSubmit={handleSubmit}
                >
                  {/* Montants prédéfinis */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-3">
                      {t.amountLabel}
                    </label>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {amounts.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => { setSelected(a); setCustom("") }}
                          className={`py-2.5 rounded text-sm font-bold border-2 transition-colors ${
                            selected === a && !custom
                              ? "bg-[#D32F2F] border-[#D32F2F] text-white"
                              : "border-border text-foreground/70 hover:border-[#002D62]"
                          }`}
                        >
                          ${a}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder={t.otherAmount}
                      value={custom}
                      onChange={(e) => { setCustom(e.target.value); setSelected(null) }}
                      className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-3">
                      {t.frequency}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 border border-border rounded px-4 py-3 cursor-pointer hover:border-[#002D62] transition-colors">
                        <input type="radio" name="frequency" checked={!isMonthly} onChange={() => setIsMonthly(false)} className="accent-[#D32F2F]" />
                        <span className="text-sm font-medium">{t.oneTime}</span>
                      </label>
                      <label className="flex items-center gap-2 border border-border rounded px-4 py-3 cursor-pointer hover:border-[#002D62] transition-colors">
                        <input type="radio" name="frequency" checked={isMonthly} onChange={() => setIsMonthly(true)} className="accent-[#D32F2F]" />
                        <span className="text-sm font-medium">{t.monthly}</span>
                      </label>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                        {t.fullName} <span className="text-[#D32F2F]">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={lang === 'en' ? 'Your name' : lang === 'es' ? 'Su nombre' : 'Votre nom'}
                        className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                      />
                    </div>
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
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider py-4 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <HandHeart size={18} />
                    {t.confirmDonation} {selected ? `de $${selected}` : custom ? `de $${custom}` : ""}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Moyens de paiement */}
      <section className="py-16 bg-[#F8F6F2]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl font-bold text-[#002D62]">{t.paymentMethods}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paymentMethods.map((m: any) => {
              const Icon = iconMap[m.iconName] || Landmark
              return (
                <div key={m.id || m.label} className="flex items-center gap-4 bg-white border border-border rounded-lg px-6 py-4">
                  <div className="w-10 h-10 rounded-full bg-[#002D62]/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#002D62]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#002D62]">{getField(m, 'label')}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{getField(m, 'detail')}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-[#002D62]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl font-bold text-white">{t.impactTitle}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {(impacts.length > 0 ? impacts : t.impacts).map((i: any, index: number) => (
              <div key={i.id || i.amount || index} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="font-serif text-3xl font-bold text-[#D32F2F] mb-2">{i.amount}</p>
                <p className="text-white/70 text-sm leading-relaxed">{getField(i, 'impact') || i.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}

export default function SoutenirPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const t_loading = lang === 'en' ? 'Loading...' : lang === 'es' ? 'Cargando...' : 'Chargement...'

  return (
    <Suspense fallback={<div>{t_loading}</div>}>
      <SoutenirContent lang={lang} />
    </Suspense>
  )
}
