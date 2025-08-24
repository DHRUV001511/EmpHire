"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollReveal, FloatingCard } from "@/components/ui/scroll-reveal"
import {
  Briefcase,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  IndianRupee,
  Users,
  TrendingUp,
} from "lucide-react"
import { getStoredProfiles, getStoredHireRequests, updateHireRequestStatus } from "@/lib/storage"

export default function MyProfilePage() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [hiredTalents, setHiredTalents] = useState<any[]>([])
  const [receivedRequests, setReceivedRequests] = useState<any[]>([])
  const [sentRequests, setSentRequests] = useState<any[]>([])

  useEffect(() => {
    // Get current user profile (in real app, this would come from auth)
    const profiles = getStoredProfiles()
    const currentUser = profiles[0] // Simulate current user
    setUserProfile(currentUser)

    // Get hire requests
    const requests = getStoredHireRequests()

    if (currentUser?.role === "employer") {
      // Show sent requests and hired talents
      const sent = requests.filter((req) => req.employerId === currentUser.id)
      setSentRequests(sent)
      setHiredTalents(sent.filter((req) => req.status === "accepted"))
    } else {
      // Show received requests
      const received = requests.filter((req) => req.talentId === currentUser?.id)
      setReceivedRequests(received)
    }
  }, [])

  const handleRequestResponse = (requestId: string, status: "accepted" | "rejected") => {
    updateHireRequestStatus(requestId, status)
    setReceivedRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status } : req)))
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Profile Found</h2>
          <p className="text-muted-foreground mb-4">Please create your profile first</p>
          <Button onClick={() => (window.location.href = "/profile")}>Create Profile</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              My Profile
            </h1>
            <p className="text-muted-foreground">Manage your profile, talents, and requests</p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <ScrollReveal direction="left" delay={0.1}>
            <FloatingCard>
              <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={userProfile.profileImage || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">{userProfile.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                  <CardDescription className="text-lg">
                    {userProfile.role === "employee" ? userProfile.title : "Employer"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">4.9</span>
                    <span className="text-muted-foreground">(127 reviews)</span>
                  </div>

                  {userProfile.role === "employee" && (
                    <>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-green-500" />
                        <span className="font-medium">₹{userProfile.hourlyRate}/hour</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {userProfile.skills?.slice(0, 3).map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {userProfile.role === "employer" ? hiredTalents.length : "12"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {userProfile.role === "employer" ? "Hired" : "Projects"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">
                        {userProfile.role === "employer" ? sentRequests.length : receivedRequests.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {userProfile.role === "employer" ? "Requests Sent" : "Requests"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FloatingCard>
          </ScrollReveal>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="right" delay={0.2}>
              <Tabs defaultValue={userProfile.role === "employer" ? "hired" : "requests"} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value={userProfile.role === "employer" ? "hired" : "requests"}>
                    {userProfile.role === "employer" ? "Hired Talents" : "Hire Requests"}
                  </TabsTrigger>
                  <TabsTrigger value={userProfile.role === "employer" ? "requests" : "activity"}>
                    {userProfile.role === "employer" ? "My Requests" : "Activity"}
                  </TabsTrigger>
                </TabsList>

                {/* Hired Talents Tab (for employers) */}
                {userProfile.role === "employer" && (
                  <TabsContent value="hired" className="space-y-4">
                    {hiredTalents.length === 0 ? (
                      <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                        <CardContent className="text-center py-12">
                          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">No Hired Talents Yet</h3>
                          <p className="text-muted-foreground mb-4">
                            Start hiring talented professionals for your projects
                          </p>
                          <Button onClick={() => (window.location.href = "/hire")}>Browse Talents</Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {hiredTalents.map((talent, index) => (
                          <ScrollReveal key={talent.id} delay={index * 0.1}>
                            <FloatingCard>
                              <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                                <CardContent className="p-6">
                                  <div className="flex items-start gap-4">
                                    <Avatar className="w-12 h-12">
                                      <AvatarImage src={talent.talentImage || "/placeholder.svg"} />
                                      <AvatarFallback>{talent.talentName?.charAt(0) || "T"}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold">{talent.talentName}</h4>
                                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                          <CheckCircle className="w-3 h-3 mr-1" />
                                          Hired
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground mb-3">{talent.message}</p>
                                      <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                          <IndianRupee className="w-3 h-3" />
                                          <span>₹{talent.budget}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Calendar className="w-3 h-3" />
                                          <span>{new Date(talent.createdAt).toLocaleDateString()}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <Button size="sm" variant="outline">
                                      <MessageSquare className="w-4 h-4 mr-2" />
                                      Message
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </FloatingCard>
                          </ScrollReveal>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )}

                {/* Hire Requests Tab (for talents) */}
                {userProfile.role === "employee" && (
                  <TabsContent value="requests" className="space-y-4">
                    {receivedRequests.length === 0 ? (
                      <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                        <CardContent className="text-center py-12">
                          <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">No Hire Requests</h3>
                          <p className="text-muted-foreground mb-4">
                            Complete your profile to start receiving hire requests
                          </p>
                          <Button onClick={() => (window.location.href = "/profile")}>Update Profile</Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {receivedRequests.map((request, index) => (
                          <ScrollReveal key={request.id} delay={index * 0.1}>
                            <FloatingCard>
                              <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                                <CardContent className="p-6">
                                  <div className="flex items-start gap-4">
                                    <Avatar className="w-12 h-12">
                                      <AvatarImage src={request.employerImage || "/placeholder.svg"} />
                                      <AvatarFallback>{request.employerName?.charAt(0) || "E"}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold">{request.employerName}</h4>
                                        <Badge
                                          variant={
                                            request.status === "accepted"
                                              ? "default"
                                              : request.status === "rejected"
                                                ? "destructive"
                                                : "secondary"
                                          }
                                        >
                                          {request.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                                          {request.status === "accepted" && <CheckCircle className="w-3 h-3 mr-1" />}
                                          {request.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground mb-3">{request.message}</p>
                                      <div className="flex items-center gap-4 text-sm mb-4">
                                        <div className="flex items-center gap-1">
                                          <IndianRupee className="w-3 h-3" />
                                          <span>₹{request.budget}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Calendar className="w-3 h-3" />
                                          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                                        </div>
                                      </div>
                                      {request.status === "pending" && (
                                        <div className="flex gap-2">
                                          <Button
                                            size="sm"
                                            onClick={() => handleRequestResponse(request.id, "accepted")}
                                          >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Accept
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleRequestResponse(request.id, "rejected")}
                                          >
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Decline
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </FloatingCard>
                          </ScrollReveal>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                )}

                {/* Requests Tab (for employers) */}
                {userProfile.role === "employer" && (
                  <TabsContent value="requests" className="space-y-4">
                    <div className="space-y-4">
                      {sentRequests.map((request, index) => (
                        <ScrollReveal key={request.id} delay={index * 0.1}>
                          <FloatingCard>
                            <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                              <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                  <Avatar className="w-12 h-12">
                                    <AvatarImage src={request.talentImage || "/placeholder.svg"} />
                                    <AvatarFallback>{request.talentName?.charAt(0) || "T"}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="font-semibold">{request.talentName}</h4>
                                      <Badge
                                        variant={
                                          request.status === "accepted"
                                            ? "default"
                                            : request.status === "rejected"
                                              ? "destructive"
                                              : "secondary"
                                        }
                                      >
                                        {request.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                                        {request.status === "accepted" && <CheckCircle className="w-3 h-3 mr-1" />}
                                        {request.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{request.message}</p>
                                    <div className="flex items-center gap-4 text-sm">
                                      <div className="flex items-center gap-1">
                                        <IndianRupee className="w-3 h-3" />
                                        <span>₹{request.budget}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </FloatingCard>
                        </ScrollReveal>
                      ))}
                    </div>
                  </TabsContent>
                )}

                {/* Activity Tab (for talents) */}
                {userProfile.role === "employee" && (
                  <TabsContent value="activity" className="space-y-4">
                    <ScrollReveal>
                      <Card className="backdrop-blur-sm bg-card/80 border-border/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Recent Activity
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="font-medium">Profile completed</p>
                              <p className="text-sm text-muted-foreground">2 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <div>
                              <p className="font-medium">Received 5-star review</p>
                              <p className="text-sm text-muted-foreground">1 day ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <Briefcase className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="font-medium">Applied to new project</p>
                              <p className="text-sm text-muted-foreground">3 days ago</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  </TabsContent>
                )}
              </Tabs>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
