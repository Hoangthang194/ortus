"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Thompson",
    role: "Beach Explorer",
    content: "A well hidden gem! Found it by accident while trying to find a quiet beach. It's a must if you're looking for a lovely evening.",
    rating: 5,
    image: "/customer-avatar-1.jpg",
  },
  {
    name: "Maria Santos",
    role: "International Visitor",
    content: "Delicious food, friendly staff 😘🤩🥰 The Happy Hour program is amazing! Nice view, delicious food - highly recommended!",
    rating: 5,
    image: "/customer-avatar-2.jpg",
  },
  {
    name: "James Wilson",
    role: "Luxury Traveler",
    content: "Quiet and super amazing beach. You can enjoy the luxury beach view on the comfortable couch while having some great foods (seafood fried rice is highly recommended) and cocktails. Price also is very reasonable!",
    rating: 5,
    image: "/customer-avatar-3.jpg",
  },
  {
    name: "Sophie Müller",
    role: "German Tourist",
    content: "A great place to relax and enjoy the view of the sea and beach. We had two beers 🍻 and fried noodles, and it was delicious. 💯 100% recommended!",
    rating: 5,
    image: "/customer-avatar-4.jpg",
  },
  {
    name: "David Park",
    role: "Beach Enthusiast",
    content: "Wonderful beach place. Beautiful view. Good drinks and food. Friendly staff. Recommend for anyone visiting between Danang and Hoi An.",
    rating: 5,
    image: "/customer-avatar-5.jpg",
  },
  {
    name: "Carlos Rodriguez",
    role: "International Guest",
    content: "Excellent place with ocean view. Perfect spot to unwind and enjoy the beautiful scenery while having delicious meals.",
    rating: 5,
    image: "/customer-avatar-6.jpg",
  },
]

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [slidesPerView, setSlidesPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1)
      } else if (window.innerWidth < 768) {
        setSlidesPerView(2)
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(3)
      } else {
        setSlidesPerView(4)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (testimonials.length - (slidesPerView - 1)))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - slidesPerView : prev - 1))
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % (testimonials.length - (slidesPerView - 1)))
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-16 bg-card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Customer Reviews</h2>
          <p className="text-muted-foreground text-lg">
            What our valued customers say about Ortus Bistro & Beers
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100/slidesPerView)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`${
                  slidesPerView === 1 ? 'w-full' : 
                  slidesPerView === 2 ? 'w-1/2' : 
                  slidesPerView === 3 ? 'w-1/3' : 'w-1/4'
                } flex-shrink-0 px-2 sm:px-3`}>
                  <div className="bg-background rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 h-full min-h-[200px] flex flex-col justify-between">
                    {/* Customer Info */}
                    <div className="flex flex-col items-center gap-3 mb-4">
                      <div className="text-center">
                        <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4 justify-center">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={16} className="fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-foreground italic text-center text-sm leading-relaxed">"{testimonial.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-primary/80 hover:bg-primary text-primary-foreground p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-primary/80 hover:bg-primary text-primary-foreground p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: testimonials.length - (slidesPerView - 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary scale-125' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonials ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
