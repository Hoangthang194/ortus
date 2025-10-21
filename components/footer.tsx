import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">Ortus</h3>
            <p className="text-sm opacity-90 font-sans">Premium Vietnamese Bistro & Craft Beers</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <Link href="#menu" className="hover:opacity-80 transition-opacity">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:opacity-80 transition-opacity">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:opacity-80 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold mb-4">Contact</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <a href="tel:0975643330" className="hover:opacity-80 transition-opacity">
                  0975643330
                </a>
              </li>
              <li>Bãi Tắm, Tân Trà, Đà Nẵng</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm opacity-75 font-sans">
            © {currentYear} Ortus Bistro & Beers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
