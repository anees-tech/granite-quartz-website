"use client"

import type React from "react"
import type { Metadata } from "next"

import { useState, useRef, useEffect } from "react"
import emailjs from '@emailjs/browser'
import { useCompanyInfo } from "@/hooks/use-company-info"
import { Hero } from "@/components/hero"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Sparkles, MessageSquare, Calendar, Award } from "lucide-react"

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const { companyInfo, loading: companyLoading } = useCompanyInfo()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { toast } = useToast()

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      if (!formRef.current) throw new Error('Form reference not found')

      // Send email using EmailJS
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Your service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Your template ID
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! // Your public key
      )

      setSubmitStatus('success')
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })
      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" })
    } catch (error) {
      console.error('Email sending failed:', error)
      setSubmitStatus('error')
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
      details: companyLoading ? "Loading..." : companyInfo?.phone || "+1 (587) 227-5003",
      subtitle: "Mon-Fri 8AM-6PM",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: companyLoading ? "Loading..." : companyInfo?.email || "newcrescentgranite@gmail.com",
      subtitle: "We respond within 24 hours",
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: MapPin,
      title: "Address",
      details: companyLoading ? "Loading..." : companyInfo?.address || "Edmonton AB",
      subtitle: "Visit our showroom",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 8AM-6PM",
      subtitle: "Sat: 9AM-4PM",
      color: "bg-orange-500/10 text-orange-600",
    },
  ]

  const features = [
    {
      icon: Award,
      title: "Expert Craftsmanship",
      description: "25+ years of experience in stone fabrication"
    },
    {
      icon: CheckCircle,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all projects"
    },
    {
      icon: Calendar,
      title: "Fast Turnaround",
      description: "Most projects completed within 2-3 weeks"
    },
    {
      icon: MessageSquare,
      title: "Free Consultation",
      description: "Complimentary design consultation and quote"
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Contact Us"
        subtitle="Ready to start your project? Get in touch for a free consultation and quote."
        backgroundImage="/granite-showroom-with-stone-samples.png"
        className="h-[70vh]"
      />

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Excellence in Every Detail</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From initial consultation to final installation, we deliver unmatched quality and service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-muted/20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="order-2 lg:order-1 h-full">
              <Badge variant="secondary" className="mb-4">
                <Send className="w-4 h-4 mr-2" />
                Get In Touch
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a detailed quote for your
                project.
              </p>

              <Card className="backdrop-blur-sm bg-background/80 border-0 shadow-xl h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-2 h-12"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-2 h-12"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2 h-12"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectType" className="text-sm font-medium">Project Type</Label>
                        <Input
                          id="projectType"
                          name="projectType"
                          placeholder="e.g., Kitchen Countertops"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="mt-2 h-12"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={8}
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="mt-2 resize-none h-32"
                      />
                    </div>

                    {/* Additional Form Info */}
                    <div className="bg-muted/50 rounded-lg p-4 border">
                      <h4 className="font-semibold text-sm mb-2">What to Include in Your Message:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Project timeline and budget range</li>
                        <li>• Preferred stone material (granite, quartz, marble)</li>
                        <li>• Room dimensions and current setup</li>
                        <li>• Any special requirements or design preferences</li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 text-base font-medium mt-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending Message...
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {submitStatus === 'success' && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <p className="text-green-800 font-medium">Message sent successfully!</p>
                        </div>
                        <p className="text-green-700 text-sm mt-1">We'll get back to you within 24 hours.</p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          <p className="text-red-800 font-medium">Failed to send message</p>
                        </div>
                        <p className="text-red-700 text-sm mt-1">Please try again or contact us directly.</p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 h-full">
              <Badge variant="secondary" className="mb-4">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Information
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions? We're here to help. Reach out to us through any of the following methods.
              </p>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30">
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-foreground mb-1 font-medium">{item.details}</p>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Emergency Contact */}
              <Card className="border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-500/20 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-orange-800">Emergency Service</h3>
                  <p className="text-orange-700 font-medium mb-1">{companyLoading ? "Loading..." : companyInfo?.phone || "+1 (587) 227-5003"}</p>
                  <p className="text-sm text-orange-600">24/7 Emergency Repairs</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Process Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Stats Card */}
            <div>
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-90" />
                    <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
                    <p className="opacity-90 mb-8 text-lg">Join 500+ satisfied customers who chose our expertise</p>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="font-bold text-3xl mb-2">25+</div>
                        <div className="opacity-80 text-sm">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-3xl mb-2">500+</div>
                        <div className="opacity-80 text-sm">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-3xl mb-2">100%</div>
                        <div className="opacity-80 text-sm">Satisfaction Rate</div>
                      </div>
                    </div>

                    <Button size="lg" variant="secondary" className="mt-8 text-white hover:text-primary/80">
                      <Calendar className="w-5 h-5 mr-2" />
                      Get Free Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Process Steps */}
            <div>
              <Badge variant="secondary" className="mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                Our Process
              </Badge>
              <h2 className="text-3xl font-bold mb-6">How We Work</h2>
              <p className="text-muted-foreground mb-8">
                From initial consultation to final installation, we follow a proven process that ensures exceptional results every time.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Free Consultation & Quote</h3>
                    <p className="text-muted-foreground text-sm">We visit your space, discuss your vision, and provide a detailed quote with no hidden costs.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Material Selection & Design</h3>
                    <p className="text-muted-foreground text-sm">Choose from our extensive collection and work with our designers to perfect your layout.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Precision Fabrication</h3>
                    <p className="text-muted-foreground text-sm">Our skilled craftsmen use advanced tools to cut and shape your stone to exact specifications.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Professional Installation</h3>
                    <p className="text-muted-foreground text-sm">Expert installation with minimal disruption, followed by thorough cleanup and final inspection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Visit Our Showroom
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit our showroom to see our extensive collection of granite and quartz materials. Touch, feel, and
              experience the quality that sets us apart.
            </p>
          </div>

          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="relative h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d151746.81728951394!2d-113.51334879750496!3d53.53912822434146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0224580deff23%3A0x411fa00c4af6155d!2sEdmonton%2C%20AB%2C%20Canada!5e0!3m2!1sen!2s!4v1757032540426!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />

              {/* Overlay Info Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">New Crescent Granite & Quartz</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {companyLoading ? "Loading..." : companyInfo?.address || "Edmonton, AB"}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      Mon-Fri: 8AM-6PM, Sat: 9AM-4PM
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Directions
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Location Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center border-0 bg-gradient-to-br from-background to-muted/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Easy to Find</h3>
                <p className="text-sm text-muted-foreground">Conveniently located in Edmonton with easy access</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 bg-gradient-to-br from-background to-muted/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Convenient Hours</h3>
                <p className="text-sm text-muted-foreground">Open 6 days a week to fit your schedule</p>
              </CardContent>
            </Card>
            <Card className="text-center border-0 bg-gradient-to-br from-background to-muted/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Full Showroom</h3>
                <p className="text-sm text-muted-foreground">See hundreds of stone samples in person</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+Cjwvc3ZnPg==')] opacity-20" />

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-6">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-90" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Schedule a free consultation and let us help bring your vision to life with our premium stone solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-white hover:text-primary/100 hover:bg-white/40">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary hover:bg-primary-foreground/10">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: {companyLoading ? "+1 (587) 227-5003" : companyInfo?.phone || "+1 (587) 227-5003"}
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">Free estimates • Licensed & Insured • 25+ Years Experience</p>
        </div>
      </section>
    </div>
  )
}
