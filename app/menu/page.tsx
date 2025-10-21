import Header from "@/components/header"
import Footer from "@/components/footer"
import MenuGallery from "@/components/menu-gallery"

export const metadata = {
  title: "Menu - Ortus Bistro & Beers",
  description: "Browse our complete menu featuring skewers, burgers, seafood, pasta, and more.",
}

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <MenuGallery />
      <Footer />
    </main>
  )
}
