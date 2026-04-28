import HeroSlider from "@/components/hero-slider"
import StatsBanner from "@/components/stats-banner"
import HomeActivities from "@/components/home-activities"
import HomeCommemoration from "@/components/home-commemoration"
import HomeTestimonies from "@/components/home-testimonies"
import HomeNews from "@/components/home-news"
import HomeCta from "@/components/home-cta"
import Footer from "@/components/footer"
import { getHeroSlides } from "@/lib/api"
import { getDictionary } from "@/lib/get-dictionary"

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const activeLang = lang as 'fr' | 'en' | 'es'
  const dict = await getDictionary(activeLang)
  const slides = await getHeroSlides()

  return (
    <main>
      <HeroSlider slides={slides} lang={lang} />
      <StatsBanner lang={lang} />
      <HomeActivities lang={lang} />
      <HomeCommemoration lang={lang} />
      <HomeTestimonies lang={lang} />
      <HomeNews lang={lang} />
      <HomeCta lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}
