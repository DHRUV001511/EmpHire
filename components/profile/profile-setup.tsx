"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase } from "lucide-react"
import { EmployeeProfileForm } from "./employee-profile-form"
import { EmployerProfileForm } from "./employer-profile-form"

export function ProfileSetup() {
  const [userType, setUserType] = useState<"employee" | "employer" | null>(null)

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-primary/5 p-4">
        <Card className="w-full max-w-2xl backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Choose Your Path
            </CardTitle>
            <CardDescription className="text-lg">Select how you want to use EmpHire to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary/50"
                onClick={() => setUserType("employee")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">I'm looking for work</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Create a profile to showcase your skills and find amazing opportunities
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge variant="secondary" className="text-xs">
                      Find Jobs
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Build Portfolio
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Get Hired
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary/50"
                onClick={() => setUserType("employer")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">I want to hire talent</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Post projects and connect with skilled professionals
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge variant="secondary" className="text-xs">
                      Post Jobs
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Find Talent
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Manage Projects
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {userType === "employee" ? <EmployeeProfileForm /> : <EmployerProfileForm />}
    </div>
  )
}
