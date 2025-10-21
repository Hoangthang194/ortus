import { Phone, MapPin, Clock } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Visit Us</h2>
          <p className="text-lg text-muted-foreground font-sans">We'd love to welcome you to Ortus Bistro & Beers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Phone */}
          <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-2">Call Us</h3>
            <a
              href="tel:+84946188848"
              className="text-lg text-primary hover:text-primary/80 transition-colors font-sans"
            >
              +84 94 618 88 48
            </a>
          </div>

          {/* Location */}
          <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-2">Location</h3>
            <p className="text-muted-foreground font-sans">
              Bãi Tắm, Tân Trà, Đà Nẵng, Vietnam 50000
            </p>
          </div>

          {/* Hours */}
          <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-2">Hours</h3>
            <p className="text-muted-foreground font-sans">
              Open Daily
              <br />
              8:00 AM - Late
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="tel:+84946188848"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-sans font-bold text-lg"
          >
            Reserve Your Table Now
          </a>
        </div>
      </div>
    </section>
  )
}
