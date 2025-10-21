import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const lora = Lora({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL('https://ortus-chi.vercel.app'),
  title: "Ortus Bistro & Beers | Premium Vietnamese Restaurant & Craft Beers in Da Nang",
  description:
    "Experience authentic Vietnamese cuisine at Ortus Bistro & Beers. Famous for grilled skewers, fresh seafood, and craft beers. Beachfront dining at 270 Vo Nguyen Giap, Da Nang. Open daily 8AM-11PM.",
  keywords: [
    "Vietnamese restaurant Da Nang",
    "Ortus Bistro",
    "craft beers Da Nang",
    "grilled skewers",
    "seafood restaurant",
    "beachfront dining",
    "Vietnamese cuisine",
    "Vo Nguyen Giap restaurant",
    "best restaurant Da Nang",
    "bistro and beer"
  ],
  authors: [{ name: "Ortus Bistro & Beers" }],
  creator: "Ortus Bistro & Beers",
  publisher: "Ortus Bistro & Beers",
  openGraph: {
    title: "Ortus Bistro & Beers | Premium Vietnamese Restaurant & Craft Beers",
    description: "Authentic Vietnamese cuisine with beachfront views, grilled specialties, and craft beers in Da Nang",
    url: "https://ortus-chi.vercel.app",
    siteName: "Ortus Bistro & Beers",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ortus Bistro & Beers - Beachfront Restaurant in Da Nang"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ortus Bistro & Beers | Premium Vietnamese Restaurant",
    description: "Authentic Vietnamese cuisine & craft beers with ocean views in Da Nang",
    images: ["/twitter-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: "https://ortus-chi.vercel.app",
    languages: {
      "en-US": "https://ortus-chi.vercel.app/en-US",
      "vi-VN": "https://ortus-chi.vercel.app/vi-VN"
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="yt6VALY6yO0njTMkbFHhqm45MttnNlKJEzBc98mwOAE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Ortus Bistro & Beers",
              image: "https://ortus-chi.vercel.app/og-image.jpg",
              description: "Premium Vietnamese bistro with craft beers and grilled specialties, featuring beachfront dining experience",
              url: "https://ortus-chi.vercel.app",
              address: {
                "@type": "PostalAddress",
                streetAddress: "270 Vo Nguyen Giap",
                addressLocality: "Da Nang",
                addressRegion: "Da Nang",
                addressCountry: "VN",
                postalCode: "550000"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "16.0544",
                longitude: "108.2478"
              },
              telephone: "+84946188848",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "08:00",
                closes: "23:00"
              },
              servesCuisine: ["Vietnamese", "Asian Fusion"],
              priceRange: "$$",
              paymentAccepted: "Cash, Credit Card",
              currenciesAccepted: "VND",
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", "name": "Beachfront View" },
                { "@type": "LocationFeatureSpecification", "name": "Outdoor Seating" },
                { "@type": "LocationFeatureSpecification", "name": "Air Conditioned" }
              ],
              menu: "https://ortus-chi.vercel.app/menu"
            }),
          }}
        />
      </head>
      <body className={`${playfair.variable} ${lora.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}
