import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    default: "Premium Granite & Quartz | Luxury Stone Materials",
    template: "%s | Premium Granite & Quartz"
  },
  description:
    "Transform your space with our exquisite collection of natural granite and quartz materials. Professional stone fabrication, kitchen countertops, bathroom vanities, and custom installations. Quality craftsmanship meets timeless elegance.",
  keywords: [
    "granite countertops",
    "quartz countertops", 
    "marble installation",
    "stone fabrication",
    "kitchen countertops",
    "bathroom vanities",
    "natural stone",
    "custom stone work",
    "granite installation",
    "quartz installation",
    "stone contractor",
    "luxury stone materials"
  ],
  authors: [{ name: "Premium Granite & Quartz" }],
  creator: "Premium Granite & Quartz",
  publisher: "Premium Granite & Quartz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://your-domain.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Premium Granite & Quartz | Luxury Stone Materials",
    description:
      "Transform your space with our exquisite collection of natural granite and quartz materials. Professional stone fabrication and installation services.",
    url: "https://your-domain.com", // Replace with your actual domain
    siteName: "Premium Granite & Quartz",
    images: [
      {
        url: "/granite-showroom-with-stone-samples.png",
        width: 1200,
        height: 630,
        alt: "Premium Granite & Quartz Showroom",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Granite & Quartz | Luxury Stone Materials",
    description:
      "Transform your space with our exquisite collection of natural granite and quartz materials. Professional stone fabrication and installation services.",
    images: ["/granite-showroom-with-stone-samples.png"],
    creator: "@yourtwitterhandle", // Replace with your Twitter handle
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
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512", 
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  verification: {
    google: "your-google-verification-code", // Replace with your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "construction",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Premium Granite & Quartz",
    "description": "Professional stone fabrication and installation services specializing in granite and quartz countertops, bathroom vanities, and custom stone work.",
    "url": "https://your-domain.com", // Replace with your actual domain
    "telephone": "(555) 123-4567",
    "email": "info@stoneworks.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Stone Avenue",
      "addressLocality": "Calgary",
      "addressRegion": "AB",
      "postalCode": "T2P 2M5",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.0447",
      "longitude": "-114.0719"
    },
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-16:00"
    ],
    "priceRange": "$$",
    "image": [
      "https://your-domain.com/granite-showroom-with-stone-samples.png"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "51.0447",
        "longitude": "-114.0719"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Stone Fabrication Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Granite Countertops",
            "description": "Custom granite countertop fabrication and installation"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Quartz Countertops",
            "description": "Premium quartz countertop installation and fabrication"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Bathroom Vanities",
            "description": "Custom stone bathroom vanity tops and installations"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
