import { getCompanyInfo } from '@/lib/firebase'

export async function CompanyStructuredData() {
  const companyInfo = await getCompanyInfo()
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "New Crescent Granite & Quartz Corporation",
    "description": companyInfo?.about || "Professional stone fabrication and installation services specializing in granite and quartz countertops, bathroom vanities, and custom stone work.",
    "url": "https://your-domain.com", // Replace with your actual domain
    "telephone": companyInfo?.phone || "+1 (587) 227-5003",
    "email": companyInfo?.email || "newcrescentgranite@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": companyInfo?.address || "Edmonton AB",
      "addressLocality": "Edmonton",
      "addressRegion": "AB", 
      "postalCode": "T5T 3V8",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.5461,
      "longitude": -113.4938
    },
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-16:00"
    ],
    "priceRange": "$$",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 53.5461,
        "longitude": -113.4938
      },
      "geoRadius": "50000"
    },
    "makesOffer": [
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
          "description": "Engineered quartz countertop fabrication and installation"
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
