"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar"
import { Building, Users, MapPin, Globe } from "lucide-react"

export function EmployerProfileForm() {
  const [companyLogo, setCompanyLogo] = useState<string | null>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCompanyLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your Company Profile</h1>
            <p className="text-muted-foreground">Set up your company profile to attract top talent</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Company Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Tell us about your company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={companyLogo || undefined} />
                      <AvatarFallback>
                        <Building className="w-8 h-8 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Label htmlFor="company-logo" className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>Upload Logo</span>
                        </Button>
                      </Label>
                      <Input
                        id="company-logo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="Acme Corporation" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <select className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm">
                        <option value="">Select industry</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="companySize">Company Size</Label>
                      <select className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm">
                        <option value="">Select size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Headquarters Location</Label>
                    <Input id="location" placeholder="San Francisco, CA" />
                  </div>

                  <div>
                    <Label htmlFor="website">Company Website</Label>
                    <Input id="website" type="url" placeholder="https://acme.com" />
                  </div>

                  <div>
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your company, mission, and what makes it a great place to work..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>How can talent reach you?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Person</Label>
                      <Input id="contactName" placeholder="Jane Smith" />
                    </div>
                    <div>
                      <Label htmlFor="contactTitle">Title</Label>
                      <Input id="contactTitle" placeholder="HR Manager" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input id="contactEmail" type="email" placeholder="jane@acme.com" />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Phone (Optional)</Label>
                      <Input id="contactPhone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hiring Preferences</CardTitle>
                  <CardDescription>What type of talent are you looking for?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="hiringFor">Typically hiring for</Label>
                    <Textarea
                      id="hiringFor"
                      placeholder="e.g., Full-stack developers, UI/UX designers, project managers..."
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budgetRange">Typical project budget</Label>
                      <select className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm">
                        <option value="">Select range</option>
                        <option value="under-1k">Under $1,000</option>
                        <option value="1k-5k">$1,000 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k+">$50,000+</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="projectDuration">Typical project duration</Label>
                      <select className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm">
                        <option value="">Select duration</option>
                        <option value="under-1-month">Under 1 month</option>
                        <option value="1-3-months">1-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="6-12-months">6-12 months</option>
                        <option value="12-months+">12+ months</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button className="flex-1">Save Profile</Button>
                <Button variant="outline">Preview</Button>
              </div>
            </div>

            {/* Company Preview */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Company Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={companyLogo || undefined} />
                      <AvatarFallback>
                        <Building className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">Acme Corporation</h3>
                    <p className="text-sm text-muted-foreground">Technology</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                      51-200 employees
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                      acme.com
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">About</h4>
                    <p className="text-xs text-muted-foreground">
                      A leading technology company focused on innovation and creating amazing products.
                    </p>
                  </div>

                  <Button className="w-full" size="sm">
                    View Company Profile
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
