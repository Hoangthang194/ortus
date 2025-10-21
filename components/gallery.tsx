"use client"

import { useState, useEffect, useRef } from "react"

export default function Gallery() {
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !animatedItems.has(index)) {
              setAnimatedItems(prev => new Set([...prev, index]))
              observer.unobserve(entry.target)
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
  }, [animatedItems])

  const images = [
    {
      src: "/unnamed.webp",
      alt: "Grilled skewers",
    },
    {
      src: "/unnamed (1).webp",
      alt: "Seafood pasta",
    },
    {
      src: "/unnamed (2).webp",
      alt: "Craft beers",
    },
    {
      src: "/unnamed (3).webp",
      alt: "Restaurant interior",
    },
    {
      src: "/unnamed (4).webp",
      alt: "Fresh ingredients",
    },
    {
      src: "/unnamed (5).webp",
      alt: "Chef's special",
    },
    {
      src: "/unnamed (6).webp",
      alt: "Dining experience",
    },
    {
      src: "/unnamed (7).webp",
      alt: "Kitchen preparation",
    },
    {
      src: "/unnamed (8).webp",
      alt: "Food presentation",
    },
    {
      src: "/unnamed (9).webp",
      alt: "Restaurant atmosphere",
    },
    {
      src: "/unnamed (10).webp",
      alt: "Signature dishes",
    },
    {
      src: "/unnamed (11).webp",
      alt: "Culinary art",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-4 text-center">Gallery</h2>
        <p className="text-center text-muted-foreground mb-12">
          Experience the ambiance and beauty of Ortus Bistro & Beers
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el }}
              className={`relative h-48 sm:h-56 lg:h-48 xl:h-52 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                animatedItems.has(index) ? (index % 4 < 2 ? 'animate-slide-in-left' : 'animate-slide-in-right') : 'opacity-0'
              }`}
              style={{ 
                animationDelay: animatedItems.has(index) ? `${index * 0.1}s` : '0s'
              }}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
