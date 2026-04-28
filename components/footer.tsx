"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Mail, Phone, Facebook, Twitter, Youtube, ArrowRight } from "lucide-react"
import { fetchAPI, getMediaUrl } from "@/lib/api"

const quickLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Le Massacre de Makobola", href: "/massacre" },
  { label: "Nos Activités", href: "/activites" },
  { label: "Commémorations", href: "/commemorations" },
  { label: "Témoignages", href: "/temoignages" },
]

const moreLinks = [
  { label: "Actualités", href: "/actualites" },
  { label: "Galerie", href: "/galerie" },
  { label: "Documents", href: "/documents" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Nous soutenir", href: "/soutenir" },
  { label: "Contact", href: "/contact" },
  { label: "Mentions légales", href: "/mentions-legales" },
]

export default function Footer() {
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    fetchAPI('/config/').then(cfg => {
      if (cfg && cfg.site_name) setConfig(cfg)
    })
  }, [])

  return (
    <footer className="bg-[#00142d] text-white pt-1">
      {/* CTA band */}
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#a02020] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
              Ensemble, bâtissons un avenir de paix.
            </p>
            <p className="text-white/70 text-sm md:text-base mt-2 max-w-xl">
              Votre engagement permet de perpétuer la mémoire et d&apos;accompagner dignement les rescapés de Makobola.
            </p>
          </div>
          <Link
            href="/soutenir"
            className="shrink-0 bg-white text-[#D32F2F] font-extrabold text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Soutenir l&apos;ARMMK
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-4 mb-8 group">
            <div className="relative w-28 h-28 flex items-center justify-center">
              {config?.site_logo ? (
                <Image 
                  src={getMediaUrl(config.site_logo)} 
                  alt={config?.site_name || "ARMMK"} 
                  fill 
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#D32F2F] to-[#a02020] flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-12">
                  <span className="text-white font-serif font-extrabold text-2xl">A</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-white/40 text-[13px] leading-relaxed mb-8">
            L&apos;Association des Rescapés des Massacres de Makobola (ARMMK) est une organisation apolitique dédiée à la préservation de la mémoire et à la promotion de la réconciliation au Sud-Kivu.
          </p>
          <div className="flex gap-4">
            {[
              { icon: Facebook, href: config?.facebook_url, label: "Facebook" },
              { icon: Twitter, href: config?.twitter_url, label: "Twitter" },
              { icon: Youtube, href: config?.youtube_url, label: "YouTube" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href || "#"}
                aria-label={social.label}
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-[#D32F2F] hover:border-[#D32F2F] hover:-translate-y-1 transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:pl-8">
          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D32F2F] mb-8">
            Navigation
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/50 hover:text-white text-[13px] transition-all flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-[#D32F2F] opacity-0 group-hover:opacity-100 transition-all" />
                  <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More links */}
        <div>
          <h3 className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#D32F2F] mb-8">
            Ressources
          </h3>
          <ul className="space-y-3">
            {moreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/50 hover:text-white text-[13px] transition-all flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-[#D32F2F] opacity-0 group-hover:opacity-100 transition-all" />
                  <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:pl-4">
          <h3 className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#D32F2F] mb-8">
            Nous contacter
          </h3>
          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                <MapPin size={16} className="text-[#D32F2F]" />
              </div>
              <span className="text-white/60 text-[13px] leading-relaxed pt-1">
                {config?.address || "Bangwe-Makobola, Fizi, Sud-Kivu, RDC"}
              </span>
            </li>
            <li className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                <Mail size={16} className="text-[#D32F2F]" />
              </div>
              <a href={`mailto:${config?.contact_email || "info@armmk.org"}`} className="text-white/60 hover:text-white text-[13px] transition-colors break-all">
                {config?.contact_email || "info@armmk.org"}
              </a>
            </li>
            <li className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                <Phone size={16} className="text-[#D32F2F]" />
              </div>
              <span className="text-white/60 text-[13px] font-medium">{config?.contact_phone || "+243 XXX XXX XXX"}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <p className="text-white/20 text-[11px] font-medium">
              &copy; {new Date().getFullYear()} ARMMK. Tous droits réservés.
            </p>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <p className="text-white/20 text-[11px] font-medium">
              Association Sans But Lucratif
            </p>
          </div>
          <div className="text-white/20 text-[11px] font-medium flex items-center gap-1">
            Fait avec mémoire à Makobola, Sud-Kivu <span className="text-[#D32F2F] ml-1">♥</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
