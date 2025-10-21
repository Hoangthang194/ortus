"use client"

import { useState, useEffect, useRef } from "react"

export default function Features() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const features = [
  {
    image: "/hamberger.webp",
    title: "Ortus Breakfast",
    description:
      "Start your day right with our signature breakfast — a hearty mix of juicy sausage, tender beef steak, crispy bacon, grilled tomatoes, baked beans, and sunny-side-up eggs. Perfect by the beach!",
  },
  {
    image: "/ca.webp",
    title: "Ortus Lunch",
    description:
      "Enjoy a delicious lunch by the beach with our signature pastas — from rich Bolognese and creamy bacon to fresh basil pesto seafood. A perfect mid-day escape!",
  },
  {
    image: "/unnamed (9).webp",
    title: "Ortus Dinner",
    description:
      "Treat yourself to a seaside feast — crispy, juicy, and full of flavor. Paradise Dinner brings the best of seafood, meat, and local favorites to your table.",
  },
  ];

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => new Set([...prev, index]))
            } else {
              setVisibleItems(prev => {
                const newSet = new Set(prev)
                newSet.delete(index)
                return newSet
              })
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={(el) => { itemRefs.current[index] = el }}
              className={`bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${
                visibleItems.has(index) 
                  ? (index === 1 ? 'animate-slide-up' : (index === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'))
                  : 'opacity-0'
              }`} 
              style={{ 
                animationDelay: visibleItems.has(index) ? `${index * 0.2}s` : '0s'
              }}>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground font-sans leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
