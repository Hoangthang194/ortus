import Header from "@/components/header"
import Footer from "@/components/footer"
import Gallery from "@/components/gallery"

export const metadata = {
  title: "About Us - Ortus Bistro & Beers",
  description: "Learn about Ortus Bistro & Beers and our commitment to quality dining.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="max-w-4xl mx-auto px-4 pt-16 md:pt-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-balance">
          About Ortus Bistro & Beers
        </h1>
        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <p>
            Welcome to Ortus Bistro & Beers, where culinary excellence meets a vibrant atmosphere. Our restaurant
            celebrates the art of grilling and the finest craft beers from around the world.
          </p>
          <p>
            We specialize in authentic Vietnamese cuisine with a modern twist, featuring premium skewers, succulent
            seafood, and innovative pasta dishes. Every dish is prepared with the freshest ingredients and served with
            our signature dipping sauces.
          </p>
          <p>
            Our carefully curated beer selection complements our menu perfectly, offering both local Vietnamese brews
            and international favorites. Whether you're looking for a casual dinner or a special celebration, Ortus is
            your destination for unforgettable dining.
          </p>
        </div>
      </section>
      <Gallery />
      <Footer />
    </main>
  )
}
