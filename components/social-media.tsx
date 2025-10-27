"use client"

import { Facebook, Instagram, Phone } from "lucide-react"
import useSiteInfo from "@/hooks/use-site-info"

export default function SocialMedia() {
  const { phoneNumber } = useSiteInfo()
  return (
    <section className="py-16 bg-card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Connect With Us</h2>
          <p className="text-muted-foreground text-lg">
            Follow us on social media for the latest news and updates
          </p>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Facebook Section */}
          <div className="bg-background rounded-lg p-8 shadow-md animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-6">
              <Facebook size={32} className="text-blue-600" />
              <h3 className="text-2xl font-semibold text-foreground">Facebook</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Follow our Facebook page to see new food photos, special promotions and restaurant events.
            </p>
            <a
              href="https://facebook.com/ortusbistrobeers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Facebook size={20} />
              Follow on Facebook
            </a>
          </div>

          {/* Other Social Media */}
          <div className="space-y-6">
            {/* Instagram */}
            <div
              className="bg-background rounded-lg p-8 shadow-md animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Instagram size={32} className="text-pink-600" />
                <h3 className="text-2xl font-semibold text-foreground">Instagram</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Discover beautiful photos of our dishes and restaurant atmosphere.
              </p>
              <a
                href="https://instagram.com/ortusbistrobeers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
              >
                <Instagram size={20} />
                Follow on Instagram
              </a>
            </div>

            {/* WhatsApp/Phone */}
            <div
              className="bg-background rounded-lg p-8 shadow-md animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Phone size={32} className="text-green-600" />
                <h3 className="text-2xl font-semibold text-foreground">Direct Contact</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Call or message us to make a reservation or ask for more information.
              </p>
              <a
                href={phoneNumber ? `tel:${phoneNumber}` : "tel:+84946188848"}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <Phone size={20} />
                {phoneNumber || '+84 94 618 88 48'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
