"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, TrendingUp, Target, ExternalLink, IndianRupee } from "lucide-react"
import { getCurrentUser } from "@/lib/storage"
import { generateJobMatches, type JobMatch } from "@/lib/ai-features"

export function JobRecommendations() {
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)

    if (user) {
      // Simulate AI processing delay
      setTimeout(() => {
        const matches = generateJobMatches(user)
        setJobMatches(matches)
        setLoading(false)
      }, 1500)
    } else {
      setLoading(false)
    }
  }, [])

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">AI Job Matching</h3>
          <p className="text-muted-foreground">Create a profile to get personalized job recommendations</p>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
            AI Job Recommendations
          </CardTitle>
          <CardDescription>Finding the perfect matches for your skills...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-500 animate-spin" />
              <span className="text-sm">Analyzing your profile...</span>
            </div>
            <Progress value={33} className="h-2" />
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Matching with opportunities...</span>
            </div>
            <Progress value={66} className="h-2" />
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm">Ranking best matches...</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
          AI Job Recommendations
        </CardTitle>
        <CardDescription>Personalized job matches based on your skills and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobMatches.length > 0 ? (
          jobMatches.map((job) => (
            <div key={job.jobId} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <p className="text-sm font-medium text-green-600 mt-1">{job.budget}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="text-2xl font-bold text-purple-600">{job.matchScore}%</span>
                    <span className="text-xs text-muted-foreground">match</span>
                  </div>
                  <Progress value={job.matchScore} className="w-16 h-2" />
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <h4 className="text-sm font-medium">Why this matches:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {job.matchReasons.map((reason, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  Apply Now
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground">
              Complete your profile and add more skills to get better job recommendations
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
