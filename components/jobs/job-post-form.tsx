"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Plus, X, DollarSign, MapPin } from "lucide-react"

export function JobPostForm() {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [jobType, setJobType] = useState("full-time")
  const [budgetType, setBudgetType] = useState("fixed")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle job posting logic here
    console.log("Job posted!")
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
            <p className="text-muted-foreground">Find the perfect talent for your project</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Provide the basic information about your job posting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input id="jobTitle" placeholder="e.g., Senior React Developer" required />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="development">Development</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="writing">Writing</option>
                      <option value="data">Data Science</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <select
                      id="experience"
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      required
                    >
                      <option value="">Select level</option>
                      <option value="entry">Entry Level</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the project, requirements, and what you're looking for in detail..."
                    rows={6}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills and Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Requirements</CardTitle>
                <CardDescription>Specify the skills and qualifications needed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Required Skills *</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-destructive"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a required skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="requirements">Additional Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Any additional requirements, qualifications, or preferences..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Budget and Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Budget & Timeline</CardTitle>
                <CardDescription>Set your budget and project timeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Budget Type</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="budgetType"
                        value="fixed"
                        checked={budgetType === "fixed"}
                        onChange={(e) => setBudgetType(e.target.value)}
                        className="mr-2"
                      />
                      Fixed Price
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="budgetType"
                        value="hourly"
                        checked={budgetType === "hourly"}
                        onChange={(e) => setBudgetType(e.target.value)}
                        className="mr-2"
                      />
                      Hourly Rate
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budgetMin">
                      {budgetType === "fixed" ? "Minimum Budget" : "Minimum Hourly Rate"} (USD) *
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="budgetMin"
                        type="number"
                        placeholder={budgetType === "fixed" ? "5000" : "50"}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="budgetMax">
                      {budgetType === "fixed" ? "Maximum Budget" : "Maximum Hourly Rate"} (USD) *
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="budgetMax"
                        type="number"
                        placeholder={budgetType === "fixed" ? "8000" : "85"}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Project Duration</Label>
                    <select
                      id="duration"
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      required
                    >
                      <option value="">Select duration</option>
                      <option value="under-1-month">Under 1 month</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="12-months+">12+ months</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="startDate">Expected Start Date</Label>
                    <Input id="startDate" type="date" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location and Work Type */}
            <Card>
              <CardHeader>
                <CardTitle>Work Details</CardTitle>
                <CardDescription>Specify location and work arrangement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Work Type</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="remote"
                        checked={jobType === "remote"}
                        onChange={(e) => setJobType(e.target.value)}
                        className="mr-2"
                      />
                      Remote
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="onsite"
                        checked={jobType === "onsite"}
                        onChange={(e) => setJobType(e.target.value)}
                        className="mr-2"
                      />
                      On-site
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="hybrid"
                        checked={jobType === "hybrid"}
                        onChange={(e) => setJobType(e.target.value)}
                        className="mr-2"
                      />
                      Hybrid
                    </label>
                  </div>
                </div>

                {jobType !== "remote" && (
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="location" placeholder="e.g., San Francisco, CA" className="pl-10" required />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="timezone">Preferred Timezone (Optional)</Label>
                  <select
                    id="timezone"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="">Any timezone</option>
                    <option value="pst">Pacific Time (PST)</option>
                    <option value="mst">Mountain Time (MST)</option>
                    <option value="cst">Central Time (CST)</option>
                    <option value="est">Eastern Time (EST)</option>
                    <option value="utc">UTC</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Preview and Submit */}
            <Card>
              <CardHeader>
                <CardTitle>Review & Post</CardTitle>
                <CardDescription>Review your job posting before publishing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-lg mb-2">Job Preview</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Your job will be visible to thousands of qualified professionals</p>
                    <p>• You'll receive applications within 24 hours</p>
                    <p>• You can edit or pause your job posting anytime</p>
                    <p>• No upfront fees - only pay when you hire</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Post Job
                  </Button>
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </>
  )
}
