import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Contact Us - Ortus Bistro & Beers",
  description: "Get in touch with Ortus Bistro & Beers. Visit us or call for reservations.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-balance">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-primary mb-2">Phone</h3>
                <a href="tel:0975643330" className="text-foreground hover:text-primary transition-colors">
                  0975643330
                </a>
              </div>
              <div>
                <h3 className="font-serif font-bold text-primary mb-2">Location</h3>
                <p className="text-foreground">Bãi Tắm, Tân Trà, Đà Nẵng, Vietnam 50000</p>
              </div>
              <div>
                <h3 className="font-serif font-bold text-primary mb-2">Hours</h3>
                <p className="text-foreground">Open from 08:00 AM until late</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Reservations</h2>
            <p className="text-foreground mb-6">
              Call us to make a reservation or for any inquiries about our menu and services.
            </p>
            <a
              href="tel:0975643330"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-sans font-medium"
            >
              Call to Reserve
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
