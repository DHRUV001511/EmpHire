"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle, Sparkles } from "lucide-react"
import { getCurrentUser } from "@/lib/storage"
import { generateProfileSuggestions, getSkillRecommendations, type ProfileSuggestion } from "@/lib/ai-features"

export function ProfileOptimizer() {
  const [suggestions, setSuggestions] = useState<ProfileSuggestion[]>([])
  const [skillRecommendations, setSkillRecommendations] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)

    if (user) {
      setTimeout(() => {
        const profileSuggestions = generateProfileSuggestions(user)
        const skillSuggestions = getSkillRecommendations(user.skills)
        setSuggestions(profileSuggestions)
        setSkillRecommendations(skillSuggestions)
        setLoading(false)
      }, 1000)
    } else {
      setLoading(false)
    }
  }, [])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high":
        return <AlertCircle className="w-4 h-4" />
      case "medium":
        return <TrendingUp className="w-4 h-4" />
      case "low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Lightbulb className="w-4 h-4" />
    }
  }

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">AI Profile Optimizer</h3>
          <p className="text-muted-foreground">Create a profile to get personalized optimization suggestions</p>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-500 animate-spin" />
            AI Profile Optimizer
          </CardTitle>
          <CardDescription>Analyzing your profile for optimization opportunities...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
            Profile Optimization Suggestions
          </CardTitle>
          <CardDescription>
            AI-powered recommendations to improve your profile visibility and attract better opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getImpactColor(suggestion.impact)}`}>
                    {getImpactIcon(suggestion.impact)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{suggestion.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getImpactColor(suggestion.impact)}>
                  {suggestion.impact} impact
                </Badge>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 mb-3">
                <h4 className="font-medium text-sm mb-1">Recommended Action:</h4>
                <p className="text-sm">{suggestion.action}</p>
              </div>

              <Button size="sm" variant="outline">
                Apply Suggestion
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skill Recommendations */}
      {skillRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
              Recommended Skills
            </CardTitle>
            <CardDescription>Skills that complement your current expertise and are in high demand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Based on your current skills, these additions could increase your job matches by up to 40%:
              </p>
              <div className="flex flex-wrap gap-2">
                {skillRecommendations.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    + {skill}
                  </Badge>
                ))}
              </div>
              <Button size="sm" className="mt-4">
                Add Recommended Skills
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
