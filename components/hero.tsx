export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(/banner.webp)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance">Ortus Bistro & Beers</h1>
        <p className="text-xl md:text-2xl font-sans mb-8 text-balance">Premium Vietnamese Cuisine & Craft Beers</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/menu"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-sans font-medium"
          >
            Explore Menu
          </a>
          <a
            href="tel:+84946188848"
            className="px-8 py-3 bg-white/20 text-white border border-white rounded-lg hover:bg-white/30 transition-colors font-sans font-medium"
          >
            Call to Reserve
          </a>
        </div>
      </div>
    </section>
  )
}
