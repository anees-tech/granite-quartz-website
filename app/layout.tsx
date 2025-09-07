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
import { CompanyStructuredData } from "@/components/company-structured-data"

export const metadata: Metadata = {
  title: {
    default: "New Crescent Granite & Quartz | Calgary's Premier Stone Fabricators",
    template: "%s | New Crescent Granite & Quartz"
  },
  description:
    "Calgary's trusted source for luxury granite and quartz countertops. Expert fabrication and installation with the best prices and quality. Call Faisal Shahzad at 587-227-5003 for your free quote.",
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
  authors: [{ name: "New Crescent Granite & Quartz" }],
  creator: "New Crescent Granite & Quartz",
  publisher: "New Crescent Granite & Quartz",
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
    title: "New Crescent Granite & Quartz | Luxury Stone Materials",
    description:
      "Transform your space with our exquisite collection of natural granite and quartz materials. Professional stone fabrication and installation services.",
    url: "https://your-domain.com", // Replace with your actual domain
    siteName: "New Crescent Granite & Quartz",
    images: [
      {
        url: "/granite-showroom-with-stone-samples.png",
        width: 1200,
        height: 630,
        alt: "New Crescent Granite & Quartz Showroom",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Crescent Granite & Quartz | Luxury Stone Materials",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <CompanyStructuredData />
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
