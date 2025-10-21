import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import FeaturedDishes from "@/components/featured-dishes"
import MenuHighlights from "@/components/menu-highlights"
import Gallery from "@/components/gallery"
import News from "@/components/news"
import Testimonials from "@/components/testimonials"
import LocationMap from "@/components/location-map"
import SocialMedia from "@/components/social-media"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export const metadata = {
  title: "Ortus Bistro & Beers - Premium Vietnamese Dining",
  description:
    "Discover authentic Vietnamese cuisine and craft beers at Ortus Bistro & Beers. Located at 270 Vo Nguyen Giap. Specializing in grilled specialties and fresh seafood.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <FeaturedDishes />
      <MenuHighlights />
      <Gallery />
      <News />
      <Testimonials />
      <LocationMap />
      <Contact />
      <Footer />
    </main>
  )
}
