import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Badge } from "@/components/ui/badge";
import GalleryGrid from "@/components/ui/gallery-grid";
import { getGalleryItems } from "@/lib/gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - Stone Projects & Installations",
  description: "Browse our stunning portfolio of granite and quartz installations. Kitchen countertops, bathroom vanities, commercial projects and custom stone work from Calgary's premier stone fabricators.",
  keywords: [
    "granite gallery",
    "quartz projects", 
    "stone installation portfolio",
    "kitchen countertop gallery",
    "bathroom vanity projects",
    "Calgary stone work",
    "granite countertop examples",
    "quartz installation photos"
  ],
  openGraph: {
    title: "Gallery - Stone Projects & Installations | New Crescent Granite & Quartz",
    description: "Browse our stunning portfolio of granite and quartz installations. Kitchen countertops, bathroom vanities, and custom stone work.",
    images: [
      {
        url: "/granite-showroom-with-stone-samples.png",
        width: 1200,
        height: 630,
        alt: "Stone Installation Gallery",
      },
    ],
  },
};

export default async function GalleryPage() {
  const items = await getGalleryItems();
  
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with enhanced animations */}
      <Hero
        title="Our Gallery"
        subtitle="Explore our portfolio of stunning granite and quartz installations"
        backgroundImage="/granite-showroom-with-stone-samples.png"
        className="h-[60vh]"
      />

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 animate-in fade-in slide-in-from-top duration-500">
              Our Work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-in fade-in slide-in-from-top duration-500 delay-100">
              Featured Projects
            </h2>
          </div>
          <GalleryGrid items={items} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Inspired by Our Work?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Let's create something beautiful for your space. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="hover:scale-105 transition-transform duration-200">
                Get Free Quote
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="hover:scale-105 transition-transform duration-200 bg-transparent"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
