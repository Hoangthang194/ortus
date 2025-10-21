export default function News() {
  const articles = [
    {
      title: "Where Peace Meets the Sea: The Summer's Most Stunning Beach View!",
      date: "February 1, 2025",
      image: "/2024-09-13 (1).webp",
      content: "If you're looking for a place to recharge and forget the hustle, this is it. 🌴☀️ The brick pathways, lush green trees, and the sprawling coastline—it all creates the perfect backdrop for a relaxing stroll and breathing in that fresh ocean air. Capture this beautiful moment and savor the absolute tranquility!",
      tags: ["#BeachVibes", "#StunningView", "#Relaxation", "#SummerTime", "#OceanEscape"]
    },
    {
      title: "Vibrant Skies: Enjoy These Perfectly Windy Days!",
      date: "February 1, 2025",
      image: "/2025-04-30.webp",
      content: "The beach isn't just for swimming; it's the ultimate spot for kite flying! 🪁 Taking advantage of the ideal breezes, gather your family and friends and bring out those colorful kites. The feeling of watching your kite soar high in the blue sky is an unforgettable experience. Haven't tried it yet? Tag your kite-loving crew!",
      tags: ["#KiteFlying", "#SeaBreeze", "#OutdoorFun", "#VietnamBeach", "#WindyDays"]
    },
    {
      title: "A Feast of Flavors: Discover a World of Diverse Cuisine!",
      date: "February 1, 2025",
      image: "/unnamed (4).webp",
      content: "A magnificent banquet featuring everything from local specialties to meticulously prepared dishes. 🍲🥩 From fresh seafood and crisp greens to savory grilled meats, everything is ready to satisfy every diner. Let us bring you a diverse and memorable culinary experience!",
      tags: ["#FoodLovers", "#VietnameseCuisine", "#FoodFeast", "#DeliciousFood", "#Gourmet"]
    },
  ]

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-4 text-center">Latest News</h2>
        <p className="text-center text-muted-foreground mb-12">Stay updated with our latest events and menu updates</p>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.content}</p>
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
