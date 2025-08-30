import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary to-gray-400 rounded-md flex items-center justify-center shadow-sm border border-primary/40">
                <span className="text-primary-foreground font-extrabold text-base tracking-tight">NC</span>
              </div>
              <span className="ml-1 flex flex-col leading-tight font-semibold text-base md:text-lg tracking-tight">
                <span className="block">new crescent</span>
                <span className="block text-primary font-bold">Granite &amp; Quartz</span>
              </span>
            </div>
            <p className="text-muted-foreground">
              Elevating spaces with premium granite &amp; quartz. Crafting excellence for modern living.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/gallery" className="block text-muted-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground">Kitchen Countertops</p>
              <p className="text-muted-foreground">Bathroom Vanities</p>
              <p className="text-muted-foreground">Flooring</p>
              <p className="text-muted-foreground">Custom Fabrication</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">info@stoneworks.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">123 Stone Ave, City, ST 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-base md:text-lg font-semibold">
            © {new Date().getFullYear()} new crescent Granite &amp; Quartz Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
