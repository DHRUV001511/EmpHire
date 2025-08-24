"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Trophy, Star, Target, TrendingUp, Award, Lock } from "lucide-react"
import { getCurrentUser } from "@/lib/storage"
import { getUserStats, getCurrentLevel, type UserStats } from "@/lib/gamification"

export function AchievementDashboard() {
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)

    if (user) {
      const stats = getUserStats(user.id)
      setUserStats(stats)
    }
  }, [])

  if (!userStats || !currentUser) {
    return (
      <>
        <Navbar />
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Achievement Dashboard</h1>
            <p className="text-muted-foreground">Please create a profile to view your achievements</p>
          </div>
        </div>
      </>
    )
  }

  const currentLevel = getCurrentLevel(userStats.totalPoints)
  const nextLevel = currentLevel.level < 5 ? getCurrentLevel(currentLevel.maxPoints + 1) : null
  const progressToNext = nextLevel
    ? ((userStats.totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100

  const unlockedAchievements = userStats.achievements.filter((a) => a.unlocked)
  const lockedAchievements = userStats.achievements.filter((a) => !a.unlocked)

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Achievement Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and unlock rewards as you grow your career</p>
          </div>

          {/* Level Progress */}
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{currentLevel.title}</h2>
                    <p className="text-muted-foreground">Level {currentLevel.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">{userStats.totalPoints}</p>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
              </div>

              {nextLevel && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to {nextLevel.title}</span>
                    <span>{Math.round(progressToNext)}%</span>
                  </div>
                  <Progress value={progressToNext} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {nextLevel.minPoints - userStats.totalPoints} points to next level
                  </p>
                </div>
              )}

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Current Benefits:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentLevel.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userStats.profileViews}</p>
                <p className="text-sm text-muted-foreground">Profile Views</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userStats.projectsCompleted}</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userStats.successfulHires}</p>
                <p className="text-sm text-muted-foreground">Successful Hires</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userStats.responseRate}%</p>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Unlocked Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Unlocked Achievements ({unlockedAchievements.length})
                </CardTitle>
                <CardDescription>Your earned achievements and rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {unlockedAchievements.length > 0 ? (
                  unlockedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center space-x-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-800">{achievement.title}</h3>
                        <p className="text-sm text-green-600">{achievement.description}</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                            +{achievement.points} points
                          </Badge>
                          {achievement.unlockedAt && (
                            <span className="text-xs text-muted-foreground ml-2">
                              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No achievements unlocked yet</p>
                    <p className="text-sm text-muted-foreground">
                      Complete your profile to earn your first achievement!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Locked Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-muted-foreground" />
                  Available Achievements ({lockedAchievements.length})
                </CardTitle>
                <CardDescription>Achievements you can unlock</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {lockedAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-4 p-3 border rounded-lg opacity-75">
                    <div className="text-2xl grayscale">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        +{achievement.points} points
                      </Badge>
                    </div>
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
