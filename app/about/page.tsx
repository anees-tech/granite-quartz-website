"use client"

import { AnimatedHero } from "@/components/animated-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCompanyInfo } from "@/hooks/use-company-info"
import { Users, Award, Globe, Heart, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutPage() {
  const { companyInfo, loading: companyLoading } = useCompanyInfo()

  const stats = [
    { icon: Award, number: "Best Price", label: "Competitive Pricing" },
    { icon: Heart, number: "100%", label: "Customer Satisfaction" },
    { icon: Globe, number: companyLoading ? "Loading..." : companyInfo?.address || "Calgary, AB", label: "Serving Area" },
    { icon: Users, number: "Expert Team", label: "Skilled Fabricators" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <AnimatedHero
        title="About New Crescent Granite & Quartz"
        subtitle="Calgary’s reputable source for high quality granite and quartz countertops. Best price, good quality, and customer-first service."
        backgroundImage="/granite-quarry-with-natural-stone-formations.png"
        className="h-[70vh]"
      />

      {/* Company Info Section */}
      <AnimatedSection animation="fadeIn" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="secondary" className="mb-4">
                About Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">New Crescent Granite and Quartz Corporation</h2>
              <p className="text-muted-foreground mb-6">
                {companyLoading ? "Loading..." : companyInfo?.about || "New Crescent Granite and Quartz Corporation is a highly reputable company based in Calgary, AB, specializing in the supply and installation of premium granite and quartz products. We offer a full range of services for granite and quartz kitchen countertops, from expert fabrication to professional installation."}
              </p>
              <p className="text-muted-foreground mb-6">
                Founded by Faisal Shahzad—a skilled fabricator and installer—our company is dedicated to customer satisfaction, quality craftsmanship, and competitive pricing. Whether you’re upgrading your kitchen or starting a new project, we deliver the best price and top quality for granite and quartz countertops in Calgary.
              </p>
              <p className="text-muted-foreground mb-8">
                Contact us online or call Faisal Shahzad at <a href={`tel:${companyLoading ? "5872275003" : companyInfo?.phone?.replace(/[^\d]/g, '') || "5872275003"}`} className="text-primary underline">{companyLoading ? "587-227-5003" : companyInfo?.phone || "587-227-5003"}</a> to get started. Your satisfaction is our priority.
              </p>
              <Link href="/contact">
                <Button className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  Get a Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.img
                src="/modern-granite-fabrication-facility-with-workers.png"
                alt="Our Facility"
                className="rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    </motion.div>
                    <motion.div
                      className="text-3xl font-bold text-foreground mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
    </AnimatedSection>

    {/* Our Services Section */}
    <AnimatedSection animation="slideUp" className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Our Services</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What We Offer</h2>
          <p className="text-muted-foreground mb-8">We supply, fabricate, and install premium granite and quartz kitchen countertops for homes and businesses in Calgary and surrounding areas. Our services include free consultation, custom design, precise fabrication, and professional installation.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Card className="w-64"><CardContent className="p-6"><div className="font-bold mb-2">Granite Countertops</div><div className="text-muted-foreground text-sm">Durable, natural stone surfaces in a variety of colors and finishes.</div></CardContent></Card>
            <Card className="w-64"><CardContent className="p-6"><div className="font-bold mb-2">Quartz Countertops</div><div className="text-muted-foreground text-sm">Engineered stone for a modern, low-maintenance look.</div></CardContent></Card>
            <Card className="w-64"><CardContent className="p-6"><div className="font-bold mb-2">Custom Fabrication</div><div className="text-muted-foreground text-sm">Precision cutting and edge profiles to fit your space perfectly.</div></CardContent></Card>
            <Card className="w-64"><CardContent className="p-6"><div className="font-bold mb-2">Installation & Removal</div><div className="text-muted-foreground text-sm">Professional installation and removal of old countertops.</div></CardContent></Card>
          </div>
        </div>
      </AnimatedSection>

    {/* Why Choose Us Section */}
    <AnimatedSection animation="slideLeft" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Reputable, locally owned company in Calgary, AB</li>
                <li>Direct owner involvement on every project</li>
                <li>Best price and quality guarantee</li>
                <li>Skilled, experienced fabricators and installers</li>
                <li>Customer-first approach and clear communication</li>
                <li>Wide selection of granite and quartz materials</li>
              </ul>
            </div>
            <div>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Free consultation and estimates</li>
                <li>Fast turnaround and on-time installation</li>
                <li>Attention to detail and clean job sites</li>
                <li>Fully insured and safety-focused</li>
                <li>Excellent customer reviews and referrals</li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

    {/* Our Process Section */}
    <AnimatedSection animation="stagger" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Our Process</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
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

    {/* Meet the Founder Section */}
    <AnimatedSection animation="slideRight" className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Meet the Founder</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Faisal Shahzad</h2>
          <div className="flex flex-col items-center">
            <img src="/professional-founder-portrait-in-granite-workshop.png" alt="Faisal Shahzad" className="w-32 h-32 rounded-full mb-4 object-cover shadow-lg" />
            <p className="text-muted-foreground mb-4">Faisal Shahzad is the founder, fabricator, and lead installer at New Crescent Granite and Quartz Corporation. With years of hands-on experience and a passion for quality, Faisal personally oversees every project to ensure the highest standards of craftsmanship and customer satisfaction.</p>
            <p className="text-muted-foreground">“I believe every customer deserves the best quality and service. My goal is to make your dream kitchen a reality.”</p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
