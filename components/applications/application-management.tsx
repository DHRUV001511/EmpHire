"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  MapPin,
  Clock,
  DollarSign,
  MessageSquare,
  Eye,
  Check,
  X,
  Calendar,
  FileText,
  Download,
} from "lucide-react"

interface Application {
  id: string
  applicant: {
    name: string
    title: string
    avatar: string
    rating: number
    location: string
    hourlyRate: string
  }
  job: {
    title: string
    id: string
  }
  proposal: {
    coverLetter: string
    proposedRate: number
    estimatedHours: number
    timeline: string
  }
  appliedDate: string
  status: "new" | "reviewed" | "shortlisted" | "interview" | "hired" | "rejected"
  attachments: string[]
}

const mockApplications: Application[] = [
  {
    id: "1",
    applicant: {
      name: "Sarah Chen",
      title: "Full Stack Developer",
      avatar: "/professional-woman-developer.png",
      rating: 4.9,
      location: "San Francisco, CA",
      hourlyRate: "$85/hr",
    },
    job: {
      title: "Senior React Developer",
      id: "1",
    },
    proposal: {
      coverLetter: "I am excited to apply for this position. With 5+ years of React experience...",
      proposedRate: 85,
      estimatedHours: 320,
      timeline: "I can complete this project in 3 months with weekly milestones.",
    },
    appliedDate: "2024-01-22",
    status: "new",
    attachments: ["portfolio.pdf", "resume.pdf"],
  },
  {
    id: "2",
    applicant: {
      name: "Marcus Johnson",
      title: "UI/UX Designer",
      avatar: "/professional-man-designer.png",
      rating: 4.8,
      location: "New York, NY",
      hourlyRate: "$70/hr",
    },
    job: {
      title: "UI/UX Designer",
      id: "2",
    },
    proposal: {
      coverLetter: "Your project aligns perfectly with my design philosophy...",
      proposedRate: 70,
      estimatedHours: 160,
      timeline: "2 months with design iterations and user testing phases.",
    },
    appliedDate: "2024-01-21",
    status: "shortlisted",
    attachments: ["design_portfolio.pdf"],
  },
  {
    id: "3",
    applicant: {
      name: "Elena Rodriguez",
      title: "Data Scientist",
      avatar: "/professional-woman-data-scientist.png",
      rating: 5.0,
      location: "Austin, TX",
      hourlyRate: "$95/hr",
    },
    job: {
      title: "Machine Learning Engineer",
      id: "3",
    },
    proposal: {
      coverLetter: "I have extensive experience in ML model development and deployment...",
      proposedRate: 95,
      estimatedHours: 480,
      timeline: "6 months including model training, testing, and deployment.",
    },
    appliedDate: "2024-01-20",
    status: "interview",
    attachments: ["ml_portfolio.pdf", "research_papers.zip"],
  },
]

export function ApplicationManagement() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredApplications = mockApplications.filter((app) => {
    if (filter === "all") return true
    return app.status === filter
  })

  const updateApplicationStatus = (applicationId: string, newStatus: Application["status"]) => {
    // In real app, this would update the database
    console.log(`Updating application ${applicationId} to ${newStatus}`)
  }

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "reviewed":
        return "bg-gray-100 text-gray-800"
      case "shortlisted":
        return "bg-yellow-100 text-yellow-800"
      case "interview":
        return "bg-purple-100 text-purple-800"
      case "hired":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Application Management</h1>
        <p className="text-muted-foreground">Review and manage job applications</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Applications List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Applications</CardTitle>
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                  All ({mockApplications.length})
                </Button>
                <Button variant={filter === "new" ? "default" : "outline"} size="sm" onClick={() => setFilter("new")}>
                  New ({mockApplications.filter((a) => a.status === "new").length})
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedApplication?.id === application.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={application.applicant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {application.applicant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-sm">{application.applicant.name}</h3>
                        <p className="text-xs text-muted-foreground">{application.applicant.title}</p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(application.status)}`}>{application.status}</Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      {application.applicant.rating}
                    </div>
                    <span>{application.appliedDate}</span>
                  </div>

                  <div className="mt-2 text-xs">
                    <span className="font-medium text-green-600">${application.proposal.proposedRate}/hr</span>
                    <span className="text-muted-foreground ml-2">• {application.proposal.estimatedHours}h</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Application Detail */}
        <div className="lg:col-span-2">
          {selectedApplication ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedApplication.applicant.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedApplication.applicant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold">{selectedApplication.applicant.name}</h2>
                      <p className="text-muted-foreground">{selectedApplication.applicant.title}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          {selectedApplication.applicant.rating}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedApplication.applicant.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {selectedApplication.applicant.hourlyRate}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="proposal" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="proposal">Proposal</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="attachments">Attachments</TabsTrigger>
                  </TabsList>

                  <TabsContent value="proposal" className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Cover Letter</h3>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm whitespace-pre-line">{selectedApplication.proposal.coverLetter}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                          <span className="font-semibold">Proposed Rate</span>
                        </div>
                        <p className="text-lg font-bold text-green-600">
                          ${selectedApplication.proposal.proposedRate}/hr
                        </p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Clock className="w-4 h-4 text-blue-600 mr-1" />
                          <span className="font-semibold">Estimated Hours</span>
                        </div>
                        <p className="text-lg font-bold text-blue-600">
                          {selectedApplication.proposal.estimatedHours}h
                        </p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-purple-600 mr-1" />
                          <span className="font-semibold">Total Cost</span>
                        </div>
                        <p className="text-lg font-bold text-purple-600">
                          $
                          {(
                            selectedApplication.proposal.proposedRate * selectedApplication.proposal.estimatedHours
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Timeline</h3>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm">{selectedApplication.proposal.timeline}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="profile" className="space-y-4">
                    <div className="text-center">
                      <p className="text-muted-foreground">View full profile details, work history, and reviews.</p>
                      <Button className="mt-4">View Full Profile</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="attachments" className="space-y-4">
                    <div className="space-y-2">
                      {selectedApplication.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{attachment}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <Button
                    onClick={() => updateApplicationStatus(selectedApplication.id, "shortlisted")}
                    className="flex-1"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Shortlist
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateApplicationStatus(selectedApplication.id, "interview")}
                    className="flex-1 bg-transparent"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Interview
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateApplicationStatus(selectedApplication.id, "rejected")}
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select an Application</h3>
                  <p className="text-muted-foreground">Choose an application from the list to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
