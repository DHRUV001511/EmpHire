"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Briefcase, Trophy, MessageSquare, User } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-primary/10 border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EmpHire
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/jobs" className="text-foreground hover:text-primary transition-colors">
              Explore Jobs
            </Link>
            <Link href="/profile" className="text-foreground hover:text-primary transition-colors">
              Create Profile
            </Link>
            <Link href="/hire" className="text-foreground hover:text-primary transition-colors">
              Hire Talent
            </Link>
            <Link href="/my-profile" className="text-foreground hover:text-primary transition-colors flex items-center">
              <User className="w-4 h-4 mr-1" />
              My Profile
            </Link>
            <Link
              href="/achievements"
              className="text-foreground hover:text-primary transition-colors flex items-center"
            >
              <Trophy className="w-4 h-4 mr-1" />
              Achievements
            </Link>
            <Link href="/messages" className="text-foreground hover:text-primary transition-colors flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              Messages
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild className="rounded-full hover:scale-105 transition-transform">
              <Link href="/profile">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/80 backdrop-blur-sm rounded-lg mt-2 border border-border/20">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/jobs"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Explore Jobs
              </Link>
              <Link
                href="/profile"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Create Profile
              </Link>
              <Link
                href="/hire"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Hire Talent
              </Link>
              <Link
                href="/my-profile"
                className="flex items-center px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4 mr-2" />
                My Profile
              </Link>
              <Link
                href="/achievements"
                className="flex items-center px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Achievements
              </Link>
              <Link
                href="/messages"
                className="flex items-center px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/20">
                <Button variant="ghost" asChild>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
