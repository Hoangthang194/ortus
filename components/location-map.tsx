"use client"

export default function LocationMap() {
  return (
    <section className="py-16 bg-background animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">📍 Ortus Bistro & Beers</h2>
          <p className="text-muted-foreground text-lg">Find us at Bãi Tắm, Tân Trà, Đà Nẵng 50000</p>
        </div>

        {/* Map Container */}
        <div
          className="rounded-lg overflow-hidden shadow-lg h-96 md:h-[500px] animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.4742017249546!2d108.27682329999999!3d15.988811699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421135f5aabb6d%3A0x43b243d30d5caf0!2sOrtus%20Bistro%20%26%20Beers!5e0!3m2!1svi!2s!4v1761069956877!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ortus Bistro & Beers Location"
          />
        </div>

        {/* Location Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div
            className="bg-card rounded-lg p-6 text-center shadow-md animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">Address</h3>
            <p className="text-muted-foreground">
              Bãi Tắm, Tân Trà, Đà Nẵng
            </p>
          </div>

          <div
            className="bg-card rounded-lg p-6 text-center shadow-md animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">Phone</h3>
            <a href="tel:0975643330" className="text-primary hover:text-primary/80 transition-colors font-semibold">
              0975643330
            </a>
          </div>

          <div
            className="bg-card rounded-lg p-6 text-center shadow-md animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">Opening Hours</h3>
            <p className="text-muted-foreground">
              Monday - Sunday
              <br />
              08:00 - 23:00
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
