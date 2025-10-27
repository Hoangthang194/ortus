"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import useSiteInfo from "@/hooks/use-site-info"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const { language } = useLanguage()
  const t = translations[language]
  const { phoneNumber } = useSiteInfo()

  // Handle scroll detection for animated sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      
      // Hide header when scrolling down, show when scrolling up
      if (scrollTop > lastScrollY && scrollTop > 100) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      
      setLastScrollY(scrollTop)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <>
      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="text-2xl font-serif font-bold text-primary">Ortus</div>
          <span className="text-sm font-sans text-muted-foreground">Bistro & Beers</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/menu"
            className={`font-sans transition-all duration-300 ${
              isActive("/menu")
                ? "text-primary font-semibold border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            {t.menu}
          </Link>
          <Link
            href="/about"
            className={`font-sans transition-all duration-300 ${
              isActive("/about")
                ? "text-primary font-semibold border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            {t.about}
          </Link>
          <Link
            href="/contact"
            className={`font-sans transition-all duration-300 ${
              isActive("/contact")
                ? "text-primary font-semibold border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            {t.contact}
          </Link>
          <a
            href={phoneNumber ? `tel:${phoneNumber}` : "tel:+84946188848"}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-sans font-medium hover:shadow-lg hover:scale-105"
          >
            {t.reserve}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur border-b border-border md:hidden animate-in slide-in-from-top-2 duration-300 shadow-lg">
            <div className="flex flex-col gap-4 p-4">
              <Link
                href="/menu"
                className={`font-sans transition-all duration-300 ${
                  isActive("/menu")
                    ? "text-primary font-semibold pl-2 border-l-2 border-primary"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.menu}
              </Link>
              <Link
                href="/about"
                className={`font-sans transition-all duration-300 ${
                  isActive("/about")
                    ? "text-primary font-semibold pl-2 border-l-2 border-primary"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.about}
              </Link>
              <Link
                href="/contact"
                className={`font-sans transition-all duration-300 ${
                  isActive("/contact")
                    ? "text-primary font-semibold pl-2 border-l-2 border-primary"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.contact}
              </Link>
              <a
                href={phoneNumber ? `tel:${phoneNumber}` : "tel:+84946188848"}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-center font-medium hover:shadow-lg"
              >
                {t.reserve}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>

    {/* Mini Sticky Header - appears when main header is hidden */}
    <header className={`fixed top-0 left-0 right-0 z-40 bg-background/98 backdrop-blur-md border-b border-border transition-all duration-300 ${
      !isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="text-lg font-serif font-bold text-primary">Ortus</div>
          <span className="text-xs font-sans text-muted-foreground">Bistro & Beers</span>
        </Link>

        {/* Desktop Navigation - Mini */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/menu"
            className={`text-sm font-sans transition-all duration-300 ${
              isActive("/menu")
                ? "text-primary font-semibold border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            {t.menu}
          </Link>
          <Link
            href="/about"
            className={`text-sm font-sans transition-all duration-300 ${
              isActive("/about")
                ? "text-primary font-semibold border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            {t.about}
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-sans transition-all duration-300 ${
              isActive("/contact")
                ? "text-primary font-semibold border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
          >
            {t.contact}
          </Link>
          <a
            href={phoneNumber ? `tel:${phoneNumber}` : "tel:+84946188848"}
            className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm font-medium hover:shadow-lg"
          >
            {t.reserve}
          </a>
        </div>

        {/* Mobile Menu Button - Mini */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>

        {/* Mobile Navigation - Mini */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border md:hidden animate-in slide-in-from-top-2 duration-300 shadow-lg">
            <div className="flex flex-col gap-3 p-4">
              <Link
                href="/menu"
                className={`text-sm font-sans transition-all duration-300 ${
                  isActive("/menu")
                    ? "text-primary font-semibold pl-2 border-l-2 border-primary"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.menu}
              </Link>
              <Link
                href="/about"
                className={`text-sm font-sans transition-all duration-300 ${
                  isActive("/about")
                    ? "text-primary font-semibold pl-2 border-l-2 border-primary"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.about}
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-sans transition-all duration-300 ${
                  isActive("/contact")
                    ? "text-primary font-semibold pl-2 border-l-2 border-primary"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.contact}
              </Link>
              <a
                href={phoneNumber ? `tel:${phoneNumber}` : "tel:+84946188848"}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm text-center font-medium hover:shadow-lg"
              >
                {t.reserve}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  )
}
