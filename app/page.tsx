import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Briefcase, User, Search, IndianRupee } from "lucide-react"
import Link from "next/link"
import { HeroBackground } from "@/components/3d/hero-background"
import { CareerTree } from "@/components/3d/career-tree"
import { ProfileCard3D } from "@/components/3d/profile-card-3d"
import { ScrollReveal, ParallaxSection, FloatingCard } from "@/components/ui/scroll-reveal"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <HeroBackground />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="relative">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl -z-10" />

            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Hire Smarter. Work Better.
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">With EmpHire.</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with top talent or find your dream job on the most innovative hiring platform. Experience the
                future of work with our AI-powered matching system.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="rounded-full hover:scale-105 transition-transform">
                  <Link href="/jobs">Explore Jobs</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-full hover:scale-105 transition-transform bg-transparent"
                >
                  <Link href="/profile">Create Profile</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ParallaxSection offset={30}>
        <CareerTree />
      </ParallaxSection>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <FloatingCard>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                    <p className="text-muted-foreground">
                      Build a comprehensive profile showcasing your skills, experience, and portfolio.
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <FloatingCard>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Browse or Post Projects</h3>
                    <p className="text-muted-foreground">
                      Discover exciting opportunities or post your project to find the perfect talent.
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <FloatingCard>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Connect & Hire</h3>
                    <p className="text-muted-foreground">
                      Connect with the right people and start working on amazing projects together.
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12">Featured Talent</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                title: "Full Stack Developer",
                rating: 4.9,
                rate: "₹6,800/hr",
                location: "Mumbai, India",
                skills: ["React", "Node.js", "TypeScript"],
                avatar: "/professional-woman-developer.png",
              },
              {
                name: "Marcus Johnson",
                title: "UI/UX Designer",
                rating: 4.8,
                rate: "₹5,600/hr",
                location: "Bangalore, India",
                skills: ["Figma", "Adobe XD", "Prototyping"],
                avatar: "/professional-man-designer.png",
              },
              {
                name: "Elena Rodriguez",
                title: "Data Scientist",
                rating: 5.0,
                rate: "₹7,600/hr",
                location: "Delhi, India",
                skills: ["Python", "Machine Learning", "SQL"],
                avatar: "/professional-woman-data-scientist.png",
              },
            ].map((profile, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <ProfileCard3D profile={profile} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Job Postings */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12">Latest Job Opportunities</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                company: "TechCorp",
                role: "Senior React Developer",
                budget: "₹4,00,000 - ₹6,40,000",
                duration: "3 months",
                description: "Looking for an experienced React developer to build a modern e-commerce platform.",
                skills: ["React", "TypeScript", "Next.js"],
                logo: "/abstract-tech-logo.png",
              },
              {
                company: "DesignStudio",
                role: "Product Designer",
                budget: "₹2,40,000 - ₹4,00,000",
                duration: "2 months",
                description: "Seeking a creative product designer for a mobile app redesign project.",
                skills: ["Figma", "User Research", "Prototyping"],
                logo: "/design-studio-logo.png",
              },
              {
                company: "DataFlow",
                role: "Machine Learning Engineer",
                budget: "₹6,40,000 - ₹9,60,000",
                duration: "6 months",
                description: "Build and deploy ML models for our recommendation system.",
                skills: ["Python", "TensorFlow", "AWS"],
                logo: "/data-company-logo.png",
              },
              {
                company: "StartupXYZ",
                role: "Full Stack Developer",
                budget: "₹3,20,000 - ₹5,60,000",
                duration: "4 months",
                description: "Join our team to build a revolutionary fintech application from scratch.",
                skills: ["Node.js", "React", "PostgreSQL"],
                logo: "/abstract-startup-logo.png",
              },
            ].map((job, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <FloatingCard>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={job.logo || "/placeholder.svg"}
                          alt={job.company}
                          className="w-10 h-10 rounded mr-3"
                        />
                        <div>
                          <h3 className="font-semibold">{job.role}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

                      <div className="flex items-center justify-between mb-4 text-sm">
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1 text-green-600" />
                          {job.budget}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-blue-600" />
                          {job.duration}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full">Apply Now</Button>
                    </CardContent>
                  </Card>
                </FloatingCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <ParallaxSection offset={20}>
        <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      EmpHire
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    The future of hiring is here. Connect, collaborate, and create amazing things together.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">For Job Seekers</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <Link href="/jobs" className="hover:text-primary transition-colors">
                        Browse Jobs
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile" className="hover:text-primary transition-colors">
                        Create Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/resources" className="hover:text-primary transition-colors">
                        Career Resources
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">For Employers</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <Link href="/hire" className="hover:text-primary transition-colors">
                        Post a Job
                      </Link>
                    </li>
                    <li>
                      <Link href="/talent" className="hover:text-primary transition-colors">
                        Browse Talent
                      </Link>
                    </li>
                    <li>
                      <Link href="/enterprise" className="hover:text-primary transition-colors">
                        Enterprise
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <Link href="/about" className="hover:text-primary transition-colors">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-primary transition-colors">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="hover:text-primary transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; 2024 EmpHire. All rights reserved.</p>
              </div>
            </ScrollReveal>
          </div>
        </footer>
      </ParallaxSection>
    </div>
  )
}
