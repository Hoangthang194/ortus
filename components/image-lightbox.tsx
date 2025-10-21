"use client"

import { X } from "lucide-react"

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
}

export default function ImageLightbox({ isOpen, onClose, imageSrc, imageAlt }: ImageLightboxProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-6xl w-full max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}