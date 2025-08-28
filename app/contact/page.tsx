"use client"

import type React from "react"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement form submission (EmailJS or Firebase)
    console.log("Form submitted:", formData)

    setTimeout(() => {
      setIsSubmitting(false)
      alert("Thank you! We'll get back to you soon.")
      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" })
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "(555) 123-4567",
      subtitle: "Mon-Fri 8AM-6PM",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@stoneworks.com",
      subtitle: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Stone Avenue",
      subtitle: "City, ST 12345",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 8AM-6PM",
      subtitle: "Sat: 9AM-4PM",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Contact Us"
        subtitle="Ready to start your project? Get in touch for a free consultation and quote."
        backgroundImage="/granite-showroom-with-stone-samples.png"
        className="h-[60vh]"
      />

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Badge variant="secondary" className="mb-4">
                Get In Touch
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a detailed quote for your
                project.
              </p>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div>
                        <Label htmlFor="projectType">Project Type</Label>
                        <Input
                          id="projectType"
                          name="projectType"
                          placeholder="e.g., Kitchen Countertops"
                          value={formData.projectType}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <Badge variant="secondary" className="mb-4">
                Contact Information
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions? We're here to help. Reach out to us through any of the following methods.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                          <p className="text-foreground mb-1">{item.details}</p>
                          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Visit Our Showroom
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-muted-foreground">
              Visit our showroom to see our extensive collection of granite and quartz materials.
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="h-96 bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                <p className="text-sm text-muted-foreground mt-2">123 Stone Avenue, City, ST 12345</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a free consultation and let us help bring your vision to life.
          </p>
          <Button size="lg" variant="secondary">
            Schedule Consultation
          </Button>
        </div>
      </section>
    </div>
  )
}
