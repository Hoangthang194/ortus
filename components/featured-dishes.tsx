"use client"

import { useState, useEffect, useRef } from "react"

export default function FeaturedDishes() {
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

  const dishes = [
    {
      name: "Big Breakfast",
      price: "215.000",
      image: "/breakfast.jpg",
    },
    {
      name: "Spaghetti Bolognese",
      price: "160.000",
      image: "/spagesty.jpg",
    },
    {
      name: "BEEF BURGER",
      price: "185.000",
      image: "/hamberger2.webp",
    },
  ]

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-4 text-center">Explore Our Dishes</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover our signature dishes crafted with premium ingredients and authentic Vietnamese flavors
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el }}
              className={`bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                animatedItems.has(index) ? (index === 1 ? 'animate-slide-up' : (index === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right')) : 'opacity-0'
              }`}
              style={{ 
                animationDelay: animatedItems.has(index) ? `${index * 0.2}s` : '0s'
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">{dish.name}</h3>
                <p className="text-2xl font-serif font-bold text-primary">{dish.price}đ</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/menu"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-sans font-medium inline-block hover:shadow-lg hover:scale-105"
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  )
}
