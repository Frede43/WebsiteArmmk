import Navbar from "@/components/navbar"
import HeroSlider from "@/components/hero-slider"
import StatsBanner from "@/components/stats-banner"
import HomeActivities from "@/components/home-activities"
import HomeCommemoration from "@/components/home-commemoration"
import HomeTestimonies from "@/components/home-testimonies"
import HomeNews from "@/components/home-news"
import HomeCta from "@/components/home-cta"
import Footer from "@/components/footer"
import { getHeroSlides } from "@/lib/api"

export default async function HomePage() {
  const slides = await getHeroSlides();

  return (
    <main>
      <Navbar />
      <HeroSlider slides={slides} />
      <StatsBanner />
      <HomeActivities />
      <HomeCommemoration />
      <HomeTestimonies />
      <HomeNews />
      <HomeCta />
      <Footer />
    </main>
  )
}
