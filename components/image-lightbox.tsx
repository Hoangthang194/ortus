"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
}

export default function ImageLightbox({ isOpen, onClose, imageSrc, imageAlt }: ImageLightboxProps) {
  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full max-h-[75vh] sm:max-w-4xl sm:max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors z-10"
          aria-label="Close lightbox"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}