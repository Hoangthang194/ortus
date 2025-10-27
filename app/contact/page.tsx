import Header from "@/components/header"
import Footer from "@/components/footer"
import { createClient } from '@supabase/supabase-js'

export const metadata = {
  title: "Contact Us - Ortus Bistro & Beers",
  description: "Get in touch with Ortus Bistro & Beers. Visit us or call for reservations.",
}

export default async function ContactPage() {
  // Server-side fetch site info (type = 'ortus') to avoid marking this page as a client component
  let phoneNumber: string | undefined = undefined
  let address: string | undefined = undefined
  try {
    const supabaseUrl = process.env.SUPABASE_URL || ''
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || ''
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data } = await supabase
      .from(process.env.SUPABASE_INFO_TABLE || 'info_db')
      .select('*')
      .eq('type', 'ortus')
      .limit(1)

    if (data && Array.isArray(data) && data.length > 0) {
      const first = data[0] as any
      phoneNumber = first.phone_number || undefined
      address = first.address || undefined
    }
  } catch (err) {
    console.error('Error fetching site info in contact page:', err)
  }

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
                <a href={phoneNumber ? `tel:${phoneNumber}` : "tel:0975643330"} className="text-foreground hover:text-primary transition-colors">
                  {phoneNumber || '0975643330'}
                </a>
              </div>
              <div>
                <h3 className="font-serif font-bold text-primary mb-2">Location</h3>
                <p className="text-foreground">{address || 'Bãi Tắm, Tân Trà, Đà Nẵng, Vietnam 50000'}</p>
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
              href={phoneNumber ? `tel:${phoneNumber}` : "tel:0975643330"}
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
