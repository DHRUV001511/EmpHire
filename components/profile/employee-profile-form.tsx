"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar"
import { Upload, X, Plus, IndianRupee, Clock, MapPin, Star } from "lucide-react"
import { saveUserProfile, setCurrentUser, type UserProfile } from "@/lib/storage"
import { useRouter } from "next/navigation"

export function EmployeeProfileForm() {
  const router = useRouter()
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"])
  const [newSkill, setNewSkill] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [resume, setResume] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    location: "",
    bio: "",
    hourlyRate: "",
    availability: "full-time",
  })

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setResume(file)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    if (!formData.firstName || !formData.lastName || !formData.title) {
      alert("Please fill in all required fields")
      return
    }

    const profile: UserProfile = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      title: formData.title,
      location: formData.location,
      bio: formData.bio,
      skills,
      hourlyRate: Number.parseInt(formData.hourlyRate) || 0,
      availability: formData.availability,
      profileImage,
      rating: 0,
      completedProjects: 0,
      userType: "employee",
      createdAt: new Date().toISOString(),
    }

    saveUserProfile(profile)
    setCurrentUser(profile)
    alert("Profile saved successfully! You can now be found by employers.")
    router.push("/dashboard")
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your Professional Profile</h1>
            <p className="text-muted-foreground">
              Showcase your skills and experience to attract the best opportunities
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Tell us about yourself</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profileImage || undefined} />
                      <AvatarFallback>
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Label htmlFor="profile-image" className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>Upload Photo</span>
                        </Button>
                      </Label>
                      <Input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      placeholder="Full Stack Developer"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Mumbai, India"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell potential clients about your experience, skills, and what makes you unique..."
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>Add your technical and professional skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
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
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rates & Availability</CardTitle>
                  <CardDescription>Set your pricing and availability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate (INR)</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="hourlyRate"
                          type="number"
                          placeholder="2500"
                          className="pl-10"
                          value={formData.hourlyRate}
                          onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <select
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                        value={formData.availability}
                        onChange={(e) => handleInputChange("availability", e.target.value)}
                      >
                        <option value="full-time">Full-time (40+ hrs/week)</option>
                        <option value="part-time">Part-time (20-40 hrs/week)</option>
                        <option value="project">Project-based</option>
                        <option value="not-available">Not available</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resume</CardTitle>
                  <CardDescription>Upload your resume (PDF format)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {resume ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                          <span className="text-red-600 text-xs font-bold">PDF</span>
                        </div>
                        <span className="text-sm">{resume.name}</span>
                        <Button variant="ghost" size="sm" onClick={() => setResume(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <Label htmlFor="resume" className="cursor-pointer">
                          <Button variant="outline" asChild>
                            <span>Upload Resume</span>
                          </Button>
                        </Label>
                        <Input id="resume" type="file" accept=".pdf" className="hidden" onChange={handleResumeUpload} />
                        <p className="text-xs text-muted-foreground mt-2">PDF up to 10MB</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button className="flex-1" onClick={handleSaveProfile}>
                  Save Profile
                </Button>
                <Button variant="outline">Preview</Button>
              </div>
            </div>

            {/* Profile Preview */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={profileImage || undefined} />
                      <AvatarFallback>
                        {formData.firstName?.[0]}
                        {formData.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">
                      {formData.firstName || "John"} {formData.lastName || "Doe"}
                    </h3>
                    <p className="text-sm text-muted-foreground">{formData.title || "Full Stack Developer"}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>New</span>
                    </div>
                    <span className="font-semibold text-primary">₹{formData.hourlyRate || "2500"}/hr</span>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {formData.location || "Mumbai, India"}
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    Available {formData.availability.replace("-", " ")}
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {skills.slice(0, 6).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {skills.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{skills.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button className="w-full" size="sm">
                    View Full Profile
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
