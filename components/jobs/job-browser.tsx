"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Search, Filter, MapPin, Clock, DollarSign, Briefcase, Star, Users } from "lucide-react"
import Link from "next/link"

const jobListings = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp",
    logo: "/abstract-tech-logo.png",
    location: "Remote",
    type: "Full-time",
    budget: "$5,000 - $8,000",
    duration: "3 months",
    postedDate: "2 days ago",
    description:
      "Looking for an experienced React developer to build a modern e-commerce platform with cutting-edge features.",
    skills: ["React", "TypeScript", "Next.js", "Node.js"],
    applicants: 12,
    rating: 4.8,
    verified: true,
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "DesignStudio",
    logo: "/design-studio-logo.png",
    location: "New York, NY",
    type: "Contract",
    budget: "$3,000 - $5,000",
    duration: "2 months",
    postedDate: "1 week ago",
    description:
      "Seeking a creative product designer for a mobile app redesign project. Must have experience with user research.",
    skills: ["Figma", "User Research", "Prototyping", "Adobe XD"],
    applicants: 8,
    rating: 4.6,
    verified: true,
  },
  {
    id: "3",
    title: "Machine Learning Engineer",
    company: "DataFlow",
    logo: "/data-company-logo.png",
    location: "San Francisco, CA",
    type: "Full-time",
    budget: "$8,000 - $12,000",
    duration: "6 months",
    postedDate: "3 days ago",
    description:
      "Build and deploy ML models for our recommendation system. Experience with TensorFlow and AWS required.",
    skills: ["Python", "TensorFlow", "AWS", "Machine Learning"],
    applicants: 15,
    rating: 4.9,
    verified: true,
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    logo: "/abstract-startup-logo.png",
    location: "Austin, TX",
    type: "Contract",
    budget: "$4,000 - $7,000",
    duration: "4 months",
    postedDate: "5 days ago",
    description:
      "Join our team to build a revolutionary fintech application from scratch. Startup experience preferred.",
    skills: ["Node.js", "React", "PostgreSQL", "Docker"],
    applicants: 6,
    rating: 4.3,
    verified: false,
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudTech",
    logo: "/abstract-tech-logo.png",
    location: "Remote",
    type: "Full-time",
    budget: "$6,000 - $9,000",
    duration: "5 months",
    postedDate: "1 day ago",
    description: "Looking for a DevOps engineer to help scale our infrastructure and implement CI/CD pipelines.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    applicants: 9,
    rating: 4.7,
    verified: true,
  },
  {
    id: "6",
    title: "Mobile App Developer",
    company: "MobileFirst",
    logo: "/design-studio-logo.png",
    location: "Los Angeles, CA",
    type: "Contract",
    budget: "$4,500 - $6,500",
    duration: "3 months",
    postedDate: "4 days ago",
    description: "Develop a cross-platform mobile app using React Native. Experience with native modules required.",
    skills: ["React Native", "JavaScript", "iOS", "Android"],
    applicants: 11,
    rating: 4.5,
    verified: true,
  },
]

export function JobBrowser() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [locationFilter, setLocationFilter] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const allSkills = Array.from(new Set(jobListings.flatMap((job) => job.skills)))

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSkills = selectedSkills.length === 0 || selectedSkills.some((skill) => job.skills.includes(skill))

    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())

    const matchesType = !jobTypeFilter || job.type === jobTypeFilter

    return matchesSearch && matchesSkills && matchesLocation && matchesType
  })

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Next Opportunity</h1>
            <p className="text-muted-foreground">Discover amazing projects from top companies</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs, companies, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button asChild>
                  <Link href="/jobs/post">Post a Job</Link>
                </Button>
              </div>

              {showFilters && (
                <div className="mt-6 pt-6 border-t border-border space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Location</label>
                      <Input
                        placeholder="Enter location"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Job Type</label>
                      <select
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                        value={jobTypeFilter}
                        onChange={(e) => setJobTypeFilter(e.target.value)}
                      >
                        <option value="">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Part-time">Part-time</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {allSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={selectedSkills.includes(skill) ? "default" : "outline"}
                          className="cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {filteredJobs.length} of {jobListings.length} jobs
            </p>
            <select className="px-3 py-2 border border-input bg-background rounded-md text-sm">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="budget-high">Highest Budget</option>
              <option value="budget-low">Lowest Budget</option>
            </select>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold hover:text-primary cursor-pointer">
                            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                          </h3>
                          {job.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground font-medium">{job.company}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.postedDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{job.rating}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-1" />
                        {job.applicants} applicants
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center text-green-600 font-medium">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.budget}
                      </div>
                      <div className="flex items-center text-blue-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Save
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/jobs/${job.id}`}>Apply Now</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedSkills([])
                    setLocationFilter("")
                    setJobTypeFilter("")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
