"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar"
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  Users,
  Briefcase,
  Calendar,
  Share2,
  Heart,
  Flag,
  Building,
} from "lucide-react"

interface JobDetailProps {
  jobId: string
}

export function JobDetail({ jobId }: JobDetailProps) {
  // In a real app, you'd fetch job data based on jobId
  const job = {
    id: jobId,
    title: "Senior React Developer",
    company: "TechCorp",
    logo: "/abstract-tech-logo.png",
    location: "Remote",
    type: "Full-time",
    budget: "$5,000 - $8,000",
    duration: "3 months",
    postedDate: "2 days ago",
    description: `We are looking for an experienced React developer to join our team and help build a modern e-commerce platform. This is an exciting opportunity to work with cutting-edge technologies and make a significant impact on our product.

Key Responsibilities:
• Develop and maintain React-based web applications
• Collaborate with designers and backend developers
• Implement responsive and accessible user interfaces
• Write clean, maintainable, and well-tested code
• Participate in code reviews and technical discussions

What We Offer:
• Competitive compensation
• Flexible working hours
• Remote-first culture
• Professional development opportunities
• Health and wellness benefits`,
    requirements: `• 5+ years of experience with React and JavaScript
• Strong knowledge of TypeScript
• Experience with Next.js and modern build tools
• Familiarity with state management libraries (Redux, Zustand)
• Understanding of RESTful APIs and GraphQL
• Experience with testing frameworks (Jest, React Testing Library)
• Strong communication skills and ability to work in a team`,
    skills: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL", "Jest"],
    applicants: 12,
    rating: 4.8,
    verified: true,
    companyInfo: {
      name: "TechCorp",
      size: "51-200 employees",
      industry: "Technology",
      founded: "2018",
      description: "A leading technology company focused on building innovative solutions for modern businesses.",
    },
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h1 className="text-2xl font-bold">{job.title}</h1>
                          {job.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-lg text-muted-foreground font-medium mb-2">{job.company}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Posted {job.postedDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center text-green-600 font-semibold">
                      <DollarSign className="w-5 h-5 mr-1" />
                      {job.budget}
                    </div>
                    <div className="flex items-center text-blue-600">
                      <Clock className="w-5 h-5 mr-1" />
                      {job.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{job.rating}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-5 h-5 mr-1" />
                      {job.applicants} applicants
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-muted-foreground">{job.description}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-muted-foreground">{job.requirements}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card>
                <CardContent className="p-6">
                  <Button className="w-full mb-4" size="lg">
                    Apply for this Job
                  </Button>
                  <Button variant="outline" className="w-full mb-4 bg-transparent">
                    Save Job
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Application deadline: March 15, 2024</p>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    About {job.company}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={job.logo || "/placeholder.svg"} />
                      <AvatarFallback>TC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{job.companyInfo.name}</h3>
                      <p className="text-sm text-muted-foreground">{job.companyInfo.industry}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company size:</span>
                      <span>{job.companyInfo.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Founded:</span>
                      <span>{job.companyInfo.founded}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{job.companyInfo.description}</p>

                  <Button variant="outline" className="w-full bg-transparent">
                    View Company Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Similar Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Frontend Developer", company: "StartupXYZ", budget: "$4,000" },
                    { title: "React Native Developer", company: "MobileFirst", budget: "$6,000" },
                    { title: "Full Stack Engineer", company: "WebCorp", budget: "$7,500" },
                  ].map((similarJob, index) => (
                    <div key={index} className="border-b border-border pb-3 last:border-b-0">
                      <h4 className="font-medium text-sm hover:text-primary cursor-pointer">{similarJob.title}</h4>
                      <p className="text-xs text-muted-foreground">{similarJob.company}</p>
                      <p className="text-xs text-green-600 font-medium">{similarJob.budget}</p>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View More Jobs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
