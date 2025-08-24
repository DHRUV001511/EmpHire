"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  Briefcase,
  IndianRupee,
  TrendingUp,
  MessageSquare,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { TalentShowcase } from "@/components/talent/talent-showcase"

export function EmployerDashboard() {
  const stats = [
    {
      title: "Active Jobs",
      value: "5",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Applications",
      value: "47",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Hired This Month",
      value: "3",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Spent",
      value: "₹8,24,500",
      icon: IndianRupee,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ]

  const activeJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      budget: "₹1,50,000 - ₹2,40,000",
      applications: 12,
      posted: "2 days ago",
      status: "Active",
      views: 156,
    },
    {
      id: 2,
      title: "UI/UX Designer",
      budget: "₹90,000 - ₹1,50,000",
      applications: 8,
      posted: "1 week ago",
      status: "Active",
      views: 89,
    },
    {
      id: 3,
      title: "DevOps Engineer",
      budget: "₹1,80,000 - ₹2,70,000",
      applications: 15,
      posted: "3 days ago",
      status: "Active",
      views: 203,
    },
  ]

  const recentApplications = [
    {
      id: 1,
      applicant: "Sarah Chen",
      job: "Senior React Developer",
      appliedDate: "2024-01-22",
      status: "Under Review",
      rating: 4.9,
    },
    {
      id: 2,
      applicant: "Marcus Johnson",
      job: "UI/UX Designer",
      appliedDate: "2024-01-21",
      status: "Shortlisted",
      rating: 4.8,
    },
    {
      id: 3,
      applicant: "Elena Rodriguez",
      job: "DevOps Engineer",
      appliedDate: "2024-01-20",
      status: "Interview Scheduled",
      rating: 5.0,
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
              <h1 className="text-3xl font-bold">Employer Dashboard</h1>
              <p className="text-muted-foreground">Manage your job postings and hire talented professionals</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Button>
              <Button asChild>
                <Link href="/jobs/post">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Link>
              </Button>
            </div>
          </div>

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

          {/* Talent Showcase Section */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Available Talents</CardTitle>
                <CardDescription>Browse and hire talented professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <TalentShowcase />
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Jobs */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Job Postings</CardTitle>
                  <CardDescription>Manage your current job listings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">Posted {job.posted}</p>
                        </div>
                        <Badge variant="default">{job.status}</Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="font-medium text-green-600">{job.budget}</span>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.applications} applications
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {job.views} views
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/jobs/${job.id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="w-4 h-4 mr-1" />
                          Applications
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive bg-transparent"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
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
                          <h4 className="font-medium text-sm">{application.applicant}</h4>
                          <p className="text-xs text-muted-foreground">{application.job}</p>
                        </div>
                        <Badge
                          variant={
                            application.status === "Interview Scheduled"
                              ? "default"
                              : application.status === "Shortlisted"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {application.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Applied {application.appliedDate}</span>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1">{application.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    View All Applications
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Browse Talent
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Interviews
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* Hiring Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hiring Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">Write Clear Job Descriptions</h4>
                    <p className="text-muted-foreground text-xs">
                      Detailed job descriptions get 30% more qualified applications.
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">Respond Quickly</h4>
                    <p className="text-muted-foreground text-xs">Fast responses increase your hire rate by 50%.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
