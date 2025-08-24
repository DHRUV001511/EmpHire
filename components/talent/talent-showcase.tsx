"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, IndianRupee, MessageSquare } from "lucide-react"
import { getUserProfiles, getCurrentUser, type UserProfile } from "@/lib/storage"
import { HireRequestModal } from "./hire-request-modal"

export function TalentShowcase() {
  const [talents, setTalents] = useState<UserProfile[]>([])
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [selectedTalent, setSelectedTalent] = useState<UserProfile | null>(null)
  const [showHireModal, setShowHireModal] = useState(false)

  useEffect(() => {
    const profiles = getUserProfiles()
    const employeeProfiles = profiles.filter((p) => p.userType === "employee")
    setTalents(employeeProfiles)
    setCurrentUser(getCurrentUser())
  }, [])

  const handleHireClick = (talent: UserProfile) => {
    if (!currentUser) {
      alert("Please create a profile first to hire talents")
      return
    }
    setSelectedTalent(talent)
    setShowHireModal(true)
  }

  if (talents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No Talents Available Yet</h3>
        <p className="text-muted-foreground">Be the first to create a profile and showcase your skills!</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talents.map((talent) => (
          <Card key={talent.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarImage src={talent.profileImage || undefined} />
                  <AvatarFallback>
                    {talent.firstName[0]}
                    {talent.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">
                  {talent.firstName} {talent.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{talent.title}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span>{talent.rating > 0 ? talent.rating : "New"}</span>
                  </div>
                  <span className="font-semibold text-primary">₹{talent.hourlyRate}/hr</span>
                </div>

                {talent.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {talent.location}
                  </div>
                )}

                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  Available {talent.availability.replace("-", " ")}
                </div>

                {talent.bio && <p className="text-sm text-muted-foreground line-clamp-2">{talent.bio}</p>}

                <div className="flex flex-wrap gap-1">
                  {talent.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {talent.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{talent.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" size="sm" onClick={() => handleHireClick(talent)}>
                  <IndianRupee className="w-4 h-4 mr-1" />
                  Hire Now
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showHireModal && selectedTalent && currentUser && (
        <HireRequestModal
          talent={selectedTalent}
          employer={currentUser}
          onClose={() => {
            setShowHireModal(false)
            setSelectedTalent(null)
          }}
        />
      )}
    </>
  )
}
