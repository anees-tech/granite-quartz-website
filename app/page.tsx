"use client"

import { useEffect, useState } from "react"
import { AnimatedHero } from "@/components/animated-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getGalleryItems, type GalleryItem } from "@/lib/gallery"
import { Hammer, Shield, Award, Clock, Star, ArrowRight, CheckCircle, MessageCircle } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HomePage() {
  const [featuredGallery, setFeaturedGallery] = useState<GalleryItem[]>([])
  const [galleryLoading, setGalleryLoading] = useState(true)

  // Fetch featured gallery items from Firebase
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setGalleryLoading(true)
        const items = await getGalleryItems()
        // Get the first 3 items as featured, or all if less than 3
        const featured = items.slice(0, 3)
        setFeaturedGallery(featured)
      } catch (error) {
        console.error('Error fetching gallery items:', error)
      } finally {
        setGalleryLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const services = [
    {
      icon: Hammer,
      title: "Custom Fabrication",
      description: "Precision-cut granite and quartz tailored to your exact specifications.",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "25-year warranty on all installations with luxury materials.",
    },
    {
      icon: Award,
      title: "Expert Installation",
      description: "Certified professionals with over 20 years of experience.",
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "Most projects completed within 7-10 business days.",
    },
  ]

  const whyChooseUs = [
    "Luxury quality materials sourced globally",
    "Expert craftsmanship with attention to detail",
    "Competitive pricing with transparent quotes",
    "Exceptional customer service and support",
    "Eco-friendly practices and sustainable sourcing",
    "Complete project management from design to installation",
  ]

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <AnimatedHero
        title="New Crescent Granite & Quartz"
        subtitle="Transform your space with our exquisite collection of natural stone materials. Quality craftsmanship meets timeless elegance."
        backgroundImage="/luxury-granite-kitchen-countertop-installation.png"
        showCTA
        ctaPrimary="View Gallery"
        ctaSecondary="Get Quote"
        onPrimaryClick={() => (window.location.href = "/gallery")}
        onSecondaryClick={() => (window.location.href = "/contact")}
      />

      {/* Services Section */}
      <AnimatedSection animation="fadeIn" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                Our Services
              </Badge>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              What We Offer
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From custom fabrication to expert installation, we provide comprehensive stone solutions for your project.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Gallery Section */}
      <AnimatedSection animation="stagger" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Featured Work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Latest Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the beauty and craftsmanship of our recent installations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {galleryLoading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <Card key={index} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-muted"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-24"></div>
                  </CardContent>
                </Card>
              ))
            ) : featuredGallery.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No gallery items found.</p>
              </div>
            ) : (
              featuredGallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 group">
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={item.mainImageUrl || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge>{item.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <Link href={`/gallery/${item.id}`} className="text-primary hover:underline flex items-center group">
                        View Details
                        <motion.div whileHover={{ x: 5 }}>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </motion.div>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/gallery">
              <Button size="lg" className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                View Full Gallery <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection animation="slideLeft" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="secondary" className="mb-4">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Excellence in Every Detail</h2>
              <p className="text-muted-foreground mb-8">
                With over two decades of experience, we've built our reputation on quality, reliability, and exceptional
                customer service.
              </p>

              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.img
                src="/granite-fabrication-workshop-with-craftsman.png"
                alt="Our Workshop"
                className="rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <p className="text-sm opacity-90">Based on 500+ reviews</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection animation="stagger" className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold mb-2">1. Consultation</div>
              <div className="text-muted-foreground text-sm">We discuss your needs, style, and budget, and provide a free estimate.</div>
            </div>
            <div>
              <div className="font-bold mb-2">2. Measurement</div>
              <div className="text-muted-foreground text-sm">We take precise measurements to ensure a perfect fit for your space.</div>
            </div>
            <div>
              <div className="font-bold mb-2">3. Fabrication</div>
              <div className="text-muted-foreground text-sm">Your countertops are custom fabricated by our skilled team.</div>
            </div>
            <div>
              <div className="font-bold mb-2">4. Installation</div>
              <div className="text-muted-foreground text-sm">We install your new countertops quickly and professionally.</div>
            </div>
          </div>
        </div>
      </AnimatedSection>


      {/* Reviews Slider Section */}
      <AnimatedSection animation="slideUp" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Customer Reviews</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Customers Say</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={60}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="max-w-4xl mx-auto"
            style={{ paddingBottom: 64, paddingTop: 40 }}
          >
            {[
              {
                userName: "Sarah M.",
                rating: 5,
                comment: "Absolutely thrilled with my new granite countertops! The team was professional and the installation was flawless.",
                createdAt: "2025-08-01T10:00:00Z"
              },
              {
                userName: "James T.",
                rating: 5,
                comment: "Great price and excellent quality. Highly recommend New Crescent Granite for any kitchen project.",
                createdAt: "2025-07-20T15:30:00Z"
              },
              {
                userName: "Linda K.",
                rating: 4,
                comment: "Very satisfied with the quartz installation. The process was smooth and the result looks amazing!",
                createdAt: "2025-07-10T09:15:00Z"
              },
              {
                userName: "Omar S.",
                rating: 5,
                comment: "Faisal and his team were fantastic from start to finish. True professionals!",
                createdAt: "2025-06-28T13:45:00Z"
              }
            ].map((review, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex justify-center">
                  <Card className="w-full max-w-2xl mx-auto shadow-2xl border-4 border-primary/40 bg-background/90 backdrop-blur-lg rounded-3xl">
                    <CardContent className="py-16 px-12 flex flex-col items-center min-h-[380px]">
                      <div className="flex items-center gap-4 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={i < review.rating ? "text-primary fill-current w-9 h-9" : "text-muted-foreground w-9 h-9"} />
                        ))}
                        <span className="text-3xl font-extrabold">{review.rating}.0</span>
                      </div>
                      <h4 className="font-semibold text-3xl mb-6 text-primary drop-shadow">{review.userName}</h4>
                      <p className="text-2xl text-foreground mb-8 italic max-w-2xl leading-relaxed">“{review.comment}”</p>
                      <span className="text-base text-muted-foreground flex items-center gap-2"><MessageCircle className="w-5 h-5" /> {new Date(review.createdAt).toLocaleDateString()}</span>
                    </CardContent>
                  </Card>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-primary text-primary-foreground relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Get a free consultation and quote for your granite or quartz project today.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                Get Free Quote
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                View Our Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
