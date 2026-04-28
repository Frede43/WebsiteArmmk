"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { HandHeart, Users, Package, GraduationCap, CheckCircle2, Smartphone, Landmark, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"

const amounts = [5, 10, 25, 50, 100]





export default function SoutenirPage() {
  const [selected, setSelected] = useState<number | null>(25)
  const [custom, setCustom] = useState("")
  const [sent, setSent] = useState(false)
  const [supports, setSupports] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isMonthly, setIsMonthly] = useState(false)

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
  }, [])
  
  const iconMap: Record<string, any> = { HandHeart, Users, GraduationCap, Package, Smartphone, Landmark, Globe }

  return (
    <>
      <Navbar />
      <PageShell
        title="Nous Soutenir"
        subtitle="Votre soutien permet à l'ARMMK de poursuivre son travail de mémoire, de réconciliation et d'accompagnement des rescapés et orphelins de Makobola."
        image="/images/orphans-support.jpg"
        breadcrumbs={[{ label: "Nous soutenir" }]}
      />

      {/* Formes de soutien */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              Agissez concrètement
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">
              Comment nous soutenir
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {supports.map((s: any) => {
              const Icon = iconMap[s.iconName] || HandHeart
              return (
                <div key={s.title} className="bg-[#F8F6F2] rounded-lg border border-border p-7 hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 rounded-full bg-[#002D62] flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-[#002D62] text-base mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{s.description}</p>
                </div>
              )
            })}
          </div>

          {/* Formulaire de don */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border-2 border-[#002D62] rounded-lg overflow-hidden shadow-xl">
              <div className="bg-[#002D62] px-8 py-6">
                <h3 className="font-serif text-xl font-bold text-white">Faire un don en ligne</h3>
                <p className="text-white/65 text-sm mt-1">Choisissez un montant ou saisissez le vôtre</p>
              </div>
              {sent ? (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#002D62] mb-2">Merci pour votre générosité</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Votre demande a été enregistrée. L&apos;équipe de l&apos;ARMMK vous contactera
                    avec les instructions de paiement adaptées à votre localisation.
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
                      Montant (USD)
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
                      placeholder="Autre montant…"
                      value={custom}
                      onChange={(e) => { setCustom(e.target.value); setSelected(null) }}
                      className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-3">
                      Fréquence
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 border border-border rounded px-4 py-3 cursor-pointer hover:border-[#002D62] transition-colors">
                        <input type="radio" name="frequency" checked={!isMonthly} onChange={() => setIsMonthly(false)} className="accent-[#D32F2F]" />
                        <span className="text-sm font-medium">Don unique</span>
                      </label>
                      <label className="flex items-center gap-2 border border-border rounded px-4 py-3 cursor-pointer hover:border-[#002D62] transition-colors">
                        <input type="radio" name="frequency" checked={isMonthly} onChange={() => setIsMonthly(true)} className="accent-[#D32F2F]" />
                        <span className="text-sm font-medium">Mensuel</span>
                      </label>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                        Prénom et nom <span className="text-[#D32F2F]">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom"
                        className="w-full border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
                      />
                    </div>
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
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider py-4 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <HandHeart size={18} />
                    Confirmer mon don {selected ? `de $${selected}` : custom ? `de $${custom}` : ""}
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
            <h3 className="font-serif text-2xl font-bold text-[#002D62]">Moyens de paiement disponibles</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paymentMethods.map((m: any) => {
              const Icon = iconMap[m.iconName] || Landmark
              return (
                <div key={m.label} className="flex items-center gap-4 bg-white border border-border rounded-lg px-6 py-4">
                  <div className="w-10 h-10 rounded-full bg-[#002D62]/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#002D62]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#002D62]">{m.label}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{m.detail}</p>
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
            <h3 className="font-serif text-2xl font-bold text-white">L&apos;impact de votre don</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { amount: "$10", impact: "Fournitures scolaires pour un orphelin pendant un mois" },
              { amount: "$50", impact: "Financement d'une session de groupe de parole pour rescapés" },
              { amount: "$100", impact: "Soutien à l'organisation d'un atelier de dialogue inter-communautaire" },
            ].map((i) => (
              <div key={i.amount} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="font-serif text-3xl font-bold text-[#D32F2F] mb-2">{i.amount}</p>
                <p className="text-white/70 text-sm leading-relaxed">{i.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
