"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import useSiteInfo from "@/hooks/use-site-info"

interface MenuImage {
  id: string
  src: string
  alt: string
  title?: string
}

export default function MenuGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [menuImages, setMenuImages] = useState<MenuImage[]>([])
  const [loading, setLoading] = useState(true)
  const { phoneNumber } = useSiteInfo()

  // Load menu images from API
  useEffect(() => {
    const loadMenuImages = async () => {
      try {
        const response = await fetch("/api/menu-images")
        if (response.ok) {
          const data = await response.json()
          const images = data.images.map((img: MenuImage) => ({
            ...img,
            title: img.alt.includes("Dinner") ? "Skewers & Dinner Menu" : "Breakfast & Lunch Menu"
          }))
          setMenuImages(images)
        } else {
          // Fallback to default images if API fails
          setMenuImages([
            {
              id: "default-1",
              src: "/menu_ortus_1.jpg",
              alt: "Ortus Bistro Menu - Skewers and Dinner",
              title: "Skewers & Dinner Menu",
            },
            {
              id: "default-2",
              src: "/menu_ortus_2.jpg",
              alt: "Ortus Bistro Menu - Breakfast and Lunch",
              title: "Breakfast & Lunch Menu",
            },
          ])
        }
      } catch (error) {
        console.error("Error loading menu images:", error)
        // Fallback to default images
        setMenuImages([
          {
            id: "default-1",
            src: "/menu_ortus_1.jpg",
            alt: "Ortus Bistro Menu - Skewers and Dinner",
            title: "Skewers & Dinner Menu",
          },
          {
            id: "default-2",
            src: "/menu_ortus_2.jpg",
            alt: "Ortus Bistro Menu - Breakfast and Lunch",
            title: "Breakfast & Lunch Menu",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadMenuImages()
  }, [])

  // Don't render if loading or no images
  if (loading) {
    return (
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 text-center text-balance">
            Our Menu
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Loading menu...
          </p>
        </div>
      </section>
    )
  }

  if (menuImages.length === 0) {
    return (
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 text-center text-balance">
            Our Menu
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Menu is being updated...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 text-center text-balance">
          Our Menu
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore our carefully crafted menu featuring authentic Vietnamese cuisine, premium skewers, fresh seafood, and
          innovative pasta dishes.
        </p>

        {/* Menu Images Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {menuImages.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-sans font-medium">
                  Click to enlarge
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Highlights */}
        <div className="bg-card rounded-lg p-8 md:p-12 border border-border">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-8 text-center">Menu Highlights</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold text-primary mb-4">Skewers</h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex justify-between">
                  <span>150g Pork</span>
                  <span className="font-medium">55.000đ</span>
                </li>
                <li className="flex justify-between">
                  <span>150g Beef</span>
                  <span className="font-medium">65.000đ</span>
                </li>
                <li className="flex justify-between">
                  <span>150g Prawn</span>
                  <span className="font-medium">80.000đ</span>
                </li>
                <li className="flex justify-between">
                  <span>150g Mushroom</span>
                  <span className="font-medium">50.000đ</span>
                </li>
                <li className="flex justify-between">
                  <span>150g Chicken</span>
                  <span className="font-medium">45.000đ</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-primary mb-4">Signature Dishes</h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex justify-between">
                  <span>Beef Burger (Regular)</span>
                  <span className="font-medium">130.000đ</span>
                </li>
                <li className="flex justify-between">
                  <span>Beef Burger (Jumbo)</span>
                  <span className="font-medium">185.000đ</span>
                </li>
                <li className="flex justify-between">
                  <span>Seafood Fried Rice</span>
                  <span className="font-medium">160.000đ</span>
                </li>
                <li className="flex justify-between">
                  <span>Pepper Spicy Beef</span>
                  <span className="font-medium">325.000đ</span>
                </li>
                <li className="flex justify-between">
                  <span>French Beef w/ Mushroom</span>
                  <span className="font-medium">430.000đ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-foreground mb-6">Ready to experience our cuisine?</p>
          <a
            href={phoneNumber ? `tel:${phoneNumber}` : 'tel:+84946188848'}
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-sans font-medium"
          >
            Call to Reserve
          </a>
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={menuImages[selectedImage].src || "/placeholder.svg"}
              alt={menuImages[selectedImage].alt}
              width={1200}
              height={1600}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  )
}
