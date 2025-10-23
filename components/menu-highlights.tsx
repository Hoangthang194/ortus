"use client"

import { useState, useEffect } from "react"
import ImageLightbox from "./image-lightbox"

interface MenuImage {
  id: string
  src: string
  alt: string
}

export default function MenuHighlights() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    image: { src: "", alt: "" }
  })
  const [menuImages, setMenuImages] = useState<MenuImage[]>([])
  const [loading, setLoading] = useState(true)
  
  // Load menu images from API
  useEffect(() => {
    const loadMenuImages = async () => {
      try {
        const response = await fetch("/api/menu-images")
        if (response.ok) {
          const data = await response.json()
          setMenuImages(data.images || [])
        } else {
          // Fallback to default images if API fails
          setMenuImages([
            {
              id: "default-1",
              src: "/menu_ortus_1.jpg",
              alt: "Ortus Menu Page 1"
            },
            {
              id: "default-2", 
              src: "/menu_ortus_2.jpg",
              alt: "Ortus Menu Page 2"
            }
          ])
        }
      } catch (error) {
        console.error("Error loading menu images:", error)
        // Fallback to default images
        setMenuImages([
          {
            id: "default-1",
            src: "/menu_ortus_1.jpg",
            alt: "Ortus Menu Page 1"
          },
          {
            id: "default-2", 
            src: "/menu_ortus_2.jpg",
            alt: "Ortus Menu Page 2"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadMenuImages()
  }, [])

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % menuImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [menuImages.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Don't render if loading or no images
  if (loading) {
    return (
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Menu Highlights</h2>
            <p className="text-lg opacity-90">Explore our delicious menu</p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-lg opacity-70">Đang tải menu...</div>
          </div>
        </div>
      </section>
    )
  }

  if (menuImages.length === 0) {
    return (
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Menu Highlights</h2>
            <p className="text-lg opacity-90">Explore our delicious menu</p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-lg opacity-70">Menu đang được cập nhật...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">Menu Highlights</h2>
          <p className="text-lg opacity-90">Explore our delicious menu</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Slider Container */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {menuImages.map((image, index) => (
                <div key={image.id} className="w-full flex-shrink-0">
                  <div className="relative w-full pb-[60%] sm:pb-[70%] md:pb-[60%]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setLightbox({ isOpen: true, image })}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide(currentSlide === 0 ? menuImages.length - 1 : currentSlide - 1)}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setCurrentSlide(currentSlide === menuImages.length - 1 ? 0 : currentSlide + 1)}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {menuImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary-foreground' 
                    : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox({ isOpen: false, image: { src: "", alt: "" } })}
        imageSrc={lightbox.image.src}
        imageAlt={lightbox.image.alt}
      />
    </section>
  )
}
