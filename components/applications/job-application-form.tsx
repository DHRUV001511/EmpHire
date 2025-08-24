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
import { Upload, X, DollarSign, Clock, FileText, Star } from "lucide-react"

interface JobApplicationFormProps {
  jobId: string
}

export function JobApplicationForm({ jobId }: JobApplicationFormProps) {
  const [coverLetter, setCoverLetter] = useState("")
  const [proposedRate, setProposedRate] = useState("")
  const [estimatedHours, setEstimatedHours] = useState("")
  const [portfolio, setPortfolio] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock job data - in real app, fetch based on jobId
  const job = {
    id: jobId,
    title: "Senior React Developer",
    company: "TechCorp",
    budget: "$5,000 - $8,000",
    duration: "3 months",
    skills: ["React", "TypeScript", "Next.js", "Node.js"],
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setPortfolio((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setPortfolio((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    // Redirect to success page or show success message
    alert("Application submitted successfully!")
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Apply for Position</h1>
            <p className="text-muted-foreground">Submit your proposal for this opportunity</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <div className="flex items-center text-green-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.budget}
                      </div>
                      <div className="flex items-center text-blue-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cover Letter */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cover Letter</CardTitle>
                    <CardDescription>Introduce yourself and explain why you're the perfect fit</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Dear Hiring Manager,

I am excited to apply for the Senior React Developer position at TechCorp. With over 5 years of experience in React development, I have successfully delivered numerous e-commerce platforms and web applications.

My expertise includes:
• Advanced React and TypeScript development
• Modern state management with Redux and Zustand
• Performance optimization and testing
• Collaborative development with cross-functional teams

I am particularly drawn to this project because of the opportunity to work with cutting-edge technologies and contribute to a modern e-commerce platform. I am confident that my skills and experience make me an ideal candidate for this role.

I look forward to discussing how I can contribute to your team's success.

Best regards,
[Your Name]"
                      rows={12}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-2">{coverLetter.length}/2000 characters</p>
                  </CardContent>
                </Card>

                {/* Proposal Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Proposal Details</CardTitle>
                    <CardDescription>Provide your rate and timeline estimates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="proposedRate">Your Hourly Rate (USD)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="proposedRate"
                            type="number"
                            placeholder="85"
                            className="pl-10"
                            value={proposedRate}
                            onChange={(e) => setProposedRate(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="estimatedHours">Estimated Hours</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="estimatedHours"
                            type="number"
                            placeholder="320"
                            className="pl-10"
                            value={estimatedHours}
                            onChange={(e) => setEstimatedHours(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="timeline">Project Timeline</Label>
                      <Textarea
                        id="timeline"
                        placeholder="Describe your proposed timeline and milestones for this project..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Portfolio & Attachments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio & Attachments</CardTitle>
                    <CardDescription>Upload relevant work samples or documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mb-4">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <Label htmlFor="portfolio" className="cursor-pointer">
                        <Button variant="outline" asChild>
                          <span>Upload Files</span>
                        </Button>
                      </Label>
                      <Input
                        id="portfolio"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.png,.zip"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        PDF, DOC, images, or ZIP files up to 10MB each
                      </p>
                    </div>

                    {portfolio.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Uploaded Files:</h4>
                        {portfolio.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Submit */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Ready to submit?</h3>
                        <p className="text-sm text-muted-foreground">Review your application before sending</p>
                      </div>
                      <div className="flex gap-4">
                        <Button type="button" variant="outline">
                          Save Draft
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Application Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Application Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">Personalize Your Cover Letter</h4>
                    <p className="text-muted-foreground text-xs">
                      Mention specific details from the job posting to show you've read it carefully.
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">Competitive Pricing</h4>
                    <p className="text-muted-foreground text-xs">
                      Research market rates and price competitively while valuing your expertise.
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">Showcase Relevant Work</h4>
                    <p className="text-muted-foreground text-xs">
                      Include portfolio pieces that directly relate to the job requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Your Profile Strength */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile Strength</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Overall Score</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">4.9</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                        Complete profile
                      </div>
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                        Portfolio uploaded
                      </div>
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                        Skills verified
                      </div>
                    </div>
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
