export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">About Ortus</h2>
            <p className="text-lg text-muted-foreground font-sans mb-4 leading-relaxed">
              Ortus Bistro & Beers is a premier Vietnamese restaurant dedicated to bringing authentic flavors and modern
              culinary techniques together. Our name, Ortus, means "rising" or "beginning" in Latin—symbolizing our
              commitment to elevating Vietnamese cuisine.
            </p>
            <p className="text-lg text-muted-foreground font-sans mb-4 leading-relaxed">
              We specialize in grilled specialties, fresh seafood, and traditional Vietnamese dishes, all complemented
              by our carefully selected craft beer collection. Every dish is prepared with premium ingredients and
              attention to detail.
            </p>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              Whether you're looking for a casual meal or a special dining experience, Ortus welcomes you to join us for
              an unforgettable culinary journey.
            </p>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden">
            <img
              src="/2024-10-12.webp"
              alt="Ortus Bistro & Beers interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
