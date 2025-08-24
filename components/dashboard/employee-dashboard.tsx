"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import {
  Briefcase,
  IndianRupee,
  Clock,
  Star,
  TrendingUp,
  FileText,
  MessageSquare,
  Calendar,
  Award,
  Bell,
  Check,
  X,
} from "lucide-react"
import { getHireRequests, updateHireRequestStatus, getCurrentUser, type HireRequest } from "@/lib/storage"

export function EmployeeDashboard() {
  const [hireRequests, setHireRequests] = useState<HireRequest[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)

    if (user) {
      const requests = getHireRequests().filter((r) => r.toUserId === user.id && r.status === "pending")
      setHireRequests(requests)
    }
  }, [])

  const handleHireRequestResponse = (requestId: string, status: "accepted" | "rejected") => {
    updateHireRequestStatus(requestId, status)
    setHireRequests((prev) => prev.filter((r) => r.id !== requestId))

    const message =
      status === "accepted" ? "Hire request accepted! The employer will be notified." : "Hire request declined."
    alert(message)
  }

  const stats = [
    {
      title: "Active Projects",
      value: "3",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Earnings",
      value: "₹4,18,500",
      icon: IndianRupee,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Hours This Month",
      value: "127",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Profile Rating",
      value: "4.9",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ]

  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Platform Development",
      client: "TechCorp",
      budget: "₹2,40,000",
      deadline: "2024-02-15",
      progress: 75,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      client: "StartupXYZ",
      budget: "₹1,05,000",
      deadline: "2024-01-30",
      progress: 90,
      status: "Review",
    },
    {
      id: 3,
      title: "API Integration",
      client: "DataFlow",
      budget: "₹66,000",
      deadline: "2024-02-05",
      progress: 45,
      status: "In Progress",
    },
  ]

  const recentApplications = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "InnovateTech",
      appliedDate: "2024-01-20",
      status: "Under Review",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "GrowthCo",
      appliedDate: "2024-01-18",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "DesignHub",
      appliedDate: "2024-01-15",
      status: "Rejected",
    },
  ]

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {currentUser ? currentUser.firstName : "User"}!</h1>
              <p className="text-muted-foreground">Here's what's happening with your projects</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Button>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Browse Jobs
              </Button>
            </div>
          </div>

          {hireRequests.length > 0 && (
            <div className="mb-8">
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-700">
                    <Bell className="w-5 h-5 mr-2" />
                    New Hire Requests ({hireRequests.length})
                  </CardTitle>
                  <CardDescription>You have new hiring opportunities!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hireRequests.map((request) => (
                    <div key={request.id} className="bg-white border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{request.projectTitle}</h3>
                          <p className="text-sm text-muted-foreground">From: {request.fromUserName}</p>
                          <p className="text-sm font-medium text-green-600">
                            Budget: ₹{request.budget.toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">
                          New Request
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{request.message}</p>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleHireRequestResponse(request.id, "accepted")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleHireRequestResponse(request.id, "rejected")}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Projects */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Your current ongoing work</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.client}</p>
                        </div>
                        <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="font-medium text-green-600">{project.budget}</span>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due {project.deadline}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{application.title}</h4>
                          <p className="text-xs text-muted-foreground">{application.company}</p>
                        </div>
                        <Badge
                          variant={
                            application.status === "Interview Scheduled"
                              ? "default"
                              : application.status === "Under Review"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {application.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Applied {application.appliedDate}</p>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    View All Applications
                  </Button>
                </CardContent>
              </Card>

              {/* Profile Completion */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile Strength</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Profile Completion</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }} />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                        Portfolio uploaded
                      </div>
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                        Skills added
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full mr-2" />
                        Add video introduction
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Complete Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Update Availability
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Award className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Invoice
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
