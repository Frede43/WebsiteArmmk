"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { 
  Menu, X, ChevronDown, MoreHorizontal, 
  Search, Youtube, Twitter, Instagram, 
  Facebook, MapPin, ExternalLink 
} from "lucide-react"
import { fetchAPI, getMediaUrl } from "@/lib/api"

interface NavChild {
  label: string
  href: string
  description?: string
}

interface NavLink {
  label: string
  href: string
  is_overflow?: boolean
  children?: NavChild[]
}

export default function Navbar({ lang, dict }: { lang: string; dict: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [config, setConfig] = useState<any>(null)
  const [dynamicLinks, setDynamicLinks] = useState<NavLink[]>([])
  
  const pathname = usePathname()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const primaryLinks: NavLink[] = [
    { label: dict.home, href: "/" },
    { label: dict.about, href: "/a-propos" },
    { label: dict.massacre, href: "/massacre" },
    {
      label: dict.activities,
      href: "/activites",
      children: [
        { label: dict.all_activities, href: "/activites", description: "" },
        { label: dict.upcoming, href: "/activites?tab=a-venir", description: "" },
        { label: dict.calendar, href: "/activites?tab=calendrier", description: "" },
        { label: dict.dialogue, href: "/activites/dialogue-reconciliation", description: "" },
      ],
    },
    { label: dict.commemorations, href: "/commemorations" },
    { label: dict.testimonials, href: "/temoignages" },
    { label: dict.news, href: "/actualites" },
  ]

  const overflowLinks: NavLink[] = [
    { label: dict.gallery, href: "/galerie" },
    { label: dict.documents, href: "/documents" },
    { label: dict.partners, href: "/partenaires" },
    { label: dict.contact, href: "/contact" },
  ]

  useEffect(() => {
    fetchAPI('/config/').then(cfg => { if(cfg && cfg.site_name) setConfig(cfg) })
    
    // For now, prioritize static translated links over dynamic ones to ensure i18n
    setDynamicLinks([...primaryLinks, ...overflowLinks])

    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [lang]) // Re-run when language changes

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  const isActive = (link: NavLink) => {
    const localizedHref = `/${lang}${link.href}`
    if (link.href === "/") return pathname === `/${lang}` || pathname === `/${lang}/`
    return pathname.startsWith(localizedHref)
  }

  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/"
    const segments = pathname.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  const currentPrimaryLinks = dynamicLinks.filter(l => !l.is_overflow)
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out`}>
      {/* 1. TOP BAR (Socials & CTA) */}
      <div className={`border-b border-white/5 transition-all duration-500 overflow-hidden ${scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100 bg-black/20 backdrop-blur-md'}`}>
        <div className="max-w-[1440px] mx-auto px-6 h-12 flex justify-between items-center">
          {/* Social Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { icon: Facebook, href: config?.facebook_url },
              { icon: Twitter, href: config?.twitter_url || "#" },
              { icon: Instagram, href: "#" },
              { icon: Youtube, href: config?.youtube_url },
            ].map((social, i) => (
              <Link 
                key={i} 
                href={social.href || "#"} 
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <social.icon size={13} />
              </Link>
            ))}
          </div>

          {/* Quick Links / CTA & Language Switcher */}
          <div className="flex items-center gap-6">
            <Link 
              href={`/${lang}/massacre#memorial`}
              className="flex items-center gap-2 bg-[#D32F2F] sm:bg-white text-white sm:text-black px-3 sm:px-4 py-1.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:bg-red-700 sm:hover:bg-gray-200 transition-colors group shadow-sm"
            >
              <MapPin size={13} className="group-hover:animate-bounce" />
              <span className="hidden xs:inline">{dict.visit_memorial}</span>
              <span className="xs:hidden">{dict.memorial}</span>
            </Link>
            
            {/* Language Switcher */}
            <div className="hidden md:flex items-center gap-3 border-l border-white/10 ml-4 pl-4">
               {['fr', 'en', 'es'].map((l) => (
                 <Link 
                    key={l}
                    href={redirectedPathName(l)}
                    className={`text-[10px] font-bold transition-colors uppercase ${lang === l ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                 >
                   {l}
                 </Link>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className={`transition-all duration-500 ${scrolled ? 'h-20 bg-black/80 backdrop-blur-xl shadow-2xl border-b border-white/10' : 'h-24 bg-black/10 backdrop-blur-sm'}`}>
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between gap-10">
          
          {/* Logo Section */}
          <Link href={`/${lang}`} className="flex items-center gap-4 shrink-0 group mr-4">
            <div className={`relative transition-all duration-500 flex items-center ${scrolled ? 'w-32 lg:w-40 xl:w-48 h-10' : 'w-40 lg:w-48 xl:w-60 h-12 xl:h-14'}`}>
              {config?.site_logo ? (
                <Image 
                  src={getMediaUrl(config.site_logo)} 
                  alt={config?.site_name || "ARMMK"} 
                  fill 
                  className="object-contain object-left"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D32F2F] to-[#801010] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-white font-serif font-extrabold text-2xl">A</span>
                </div>
              )}
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center flex-1">
            <div className="flex items-center gap-1">
              {currentPrimaryLinks.map((link) => (
                <div 
                  key={link.href} 
                  className="relative h-full py-4"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={`/${lang}${link.href}`}
                    className={`px-2 xl:px-3 py-2 text-[11px] xl:text-[12px] whitespace-nowrap font-semibold tracking-wide transition-all duration-300 rounded-md
                      ${isActive(link) ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} className={`inline ml-1 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Glass Submenu */}
                  {link.children && openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 animate-slide-up">
                      <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-2 rounded-xl shadow-2xl">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={`/${lang}${child.href}`}
                            className="block p-3 hover:bg-white/5 rounded-lg transition-all group"
                          >
                            <div className="text-white/90 text-xs font-bold uppercase tracking-widest group-hover:text-[#D32F2F]">{child.label}</div>
                            {child.description && <div className="text-white/40 text-[10px] mt-1">{child.description}</div>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Mobile (next to burger) */}
            <div className="flex lg:hidden items-center gap-2 mr-1 border-r border-white/10 pr-3">
               {['fr', 'en', 'es'].map((l) => (
                 <Link 
                    key={l}
                    href={redirectedPathName(l)}
                    className={`text-[11px] font-bold transition-colors uppercase ${lang === l ? 'text-[#D32F2F]' : 'text-white/40 hover:text-white/70'}`}
                 >
                   {l}
                 </Link>
               ))}
            </div>

            <button 
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label={dict.search_placeholder}
            >
              <Search size={18} />
            </button>
            <button 
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-all"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${mobileOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />
        
        <div className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-black border-l border-white/10 flex flex-col transition-transform duration-500 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex justify-between items-center border-b border-white/5">
            <div className="font-serif font-bold text-white text-xl">ARMMK</div>
            <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-1">
              {dynamicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${lang}${link.href}`}
                  className={`block py-4 text-lg font-medium border-b border-white/5 transition-colors ${isActive(link) ? 'text-[#D32F2F]' : 'text-white/70'}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="mt-10 flex justify-center gap-4">
                {['fr', 'en', 'es'].map((l) => (
                  <Link 
                    key={l}
                    href={redirectedPathName(l)}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2 rounded border border-white/10 text-sm font-bold uppercase transition-all ${lang === l ? 'bg-white text-black' : 'text-white/40'}`}
                  >
                    {l}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. SEARCH OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl animate-fade-in flex flex-col">
          <div className="p-8 flex justify-end">
             <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-all">
               <X size={32} />
             </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6 pb-40">
             <div className="w-full max-w-3xl">
                <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4 focus-within:border-[#D32F2F] transition-colors">
                  <Search size={40} className="text-white/40" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={dict.search_placeholder} 
                    className="bg-transparent border-none text-white text-3xl sm:text-5xl font-light focus:ring-0 w-full placeholder:text-white/10 outline-none"
                    autoFocus
                  />
                </div>
                
                {searchQuery.trim() !== "" && (
                  <div className="mt-8 flex flex-col gap-4">
                     <span className="text-white/30 text-sm uppercase tracking-widest block w-full mb-2">{dict.search_results}</span>
                     {dynamicLinks.filter(l => l.label.toLowerCase().includes(searchQuery.toLowerCase())).map(link => (
                       <Link 
                         key={link.href} 
                         href={`/${lang}${link.href}`}
                         onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                         className="text-white text-2xl md:text-3xl font-serif hover:text-[#D32F2F] transition-colors"
                       >
                         {link.label}
                       </Link>
                     ))}
                  </div>
                )}
             </div>
          </div>
        </div>
      )}
    </header>
  )
}
