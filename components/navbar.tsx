"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  const { user, logout, loading } = useAuth();

  console.log("useAuth:", user);
  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-background/95 backdrop-blur-md shadow-lg"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between transition-all duration-500"
          animate={{ height: isScrolled ? "60px" : "80px" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-8 h-8 bg-gradient-to-tr from-primary to-gray-400 rounded-md flex items-center justify-center shadow-sm border border-primary/40"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-primary-foreground font-extrabold text-base tracking-tight">NC</span>
            </motion.div>
            <motion.span
              className={cn("ml-1 flex flex-col leading-tight font-semibold text-base md:text-lg tracking-tight transition-colors", isScrolled ? "text-foreground" : "text-black")}
              whileHover={{ scale: 1.05 }}
            >
              <span className="block">new crescent</span>
              <span className="block text-primary font-bold">Granite &amp; Quartz</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "font-medium transition-all duration-300 hover:text-primary relative group",
                    "text-foreground",
                  )}
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
            {!loading && user ? (
                <div className="flex items-center">
                <div className="flex flex-col items-start bg-muted/60 border border-border rounded-lg px-4 py-2 mr-4 shadow-sm">
                  <Link href="/dashboard">
                  <span className="font-medium text-sm text-primary-foreground bg-primary px-3 py-1 rounded-full cursor-pointer hover:bg-primary/80 transition mb-1">
                    Dashboard
                  </span>
                  </Link>
                  <span className="font-medium text-xs text-foreground">
                  {user.displayName ? user.displayName : user.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-100 hover:text-red-600 border-red-200"
                  onClick={logout}
                >
                  Logout
                </Button>
                </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/auth/login">
                  <Button
                    variant="default"
                    size="sm"
                    className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                  >
                    Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className={cn("w-6 h-6", "text-foreground")} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className={cn("w-6 h-6", "text-foreground")} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-border/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4 pt-4 pb-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "font-medium transition-colors hover:text-primary block py-2",
                        "text-foreground",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                {!loading && user ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Link href="/dashboard">
                        <span className="font-medium text-sm text-primary-foreground bg-primary px-3 py-1 rounded-full cursor-pointer hover:bg-primary/80 transition">
                          {user.displayName ? user.displayName : user.email}
                        </span>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-red-100 hover:text-red-600 border-red-200"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="default" size="sm" className="w-fit">
                        Login
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
