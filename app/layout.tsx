import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const lora = Lora({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Ortus Bistro & Beers | Vietnamese Restaurant & Craft Beers",
  description:
    "Discover Ortus Bistro & Beers - Premium Vietnamese cuisine featuring grilled skewers, fresh seafood, and craft beers. Located at 270 Vo Nguyen Giap. Open daily 8AM-late.",
  keywords: "Vietnamese restaurant, bistro, craft beers, grilled skewers, seafood, Ho Chi Minh City",
  openGraph: {
    title: "Ortus Bistro & Beers | Vietnamese Restaurant & Craft Beers",
    description: "Premium Vietnamese cuisine with grilled specialties and craft beers",
    type: "website",
  },
  robots: "index, follow",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Ortus Bistro & Beers",
              image: "https://images.unsplash.com/photo-1517521271924-fc3ee315471e?w=1200",
              description: "Premium Vietnamese bistro with craft beers and grilled specialties",
              address: {
                "@type": "PostalAddress",
                streetAddress: "270 Vo Nguyen Giap",
                addressLocality: "Ho Chi Minh City",
                addressCountry: "VN",
              },
              telephone: "+84946188848",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "08:00",
                closes: "23:00",
              },
              servesCuisine: "Vietnamese",
              priceRange: "$$",
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
