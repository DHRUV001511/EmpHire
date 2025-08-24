"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

interface Profile3DProps {
  profile: {
    name: string
    title: string
    rating: number
    rate: string
    location: string
    skills: string[]
    avatar: string
  }
  index: number
}

export function ProfileCard3D({ profile, index }: Profile3DProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="perspective-1000" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Card
        className={`transition-all duration-500 hover:shadow-2xl cursor-pointer transform-gpu ${
          isHovered ? "scale-105" : ""
        }`}
        style={{
          transform: isHovered
            ? `rotateY(${index % 2 === 0 ? "8deg" : "-8deg"}) rotateX(5deg) translateZ(20px)`
            : "rotateY(0deg) rotateX(0deg) translateZ(0px)",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        <CardContent className="p-6 relative overflow-hidden">
          {/* Animated background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Floating particles effect */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 10}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "2s",
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="relative">
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                  className={`w-12 h-12 rounded-full mr-3 transition-transform duration-300 ${
                    isHovered ? "scale-110 rotate-6" : ""
                  }`}
                />
                {isHovered && <div className="absolute inset-0 w-12 h-12 rounded-full bg-primary/20 animate-ping" />}
              </div>
              <div>
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.title}</p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star
                  className={`w-4 h-4 text-yellow-400 fill-current transition-transform duration-300 ${
                    isHovered ? "scale-125 rotate-12" : ""
                  }`}
                />
                <span className="ml-1 text-sm font-medium">{profile.rating}</span>
              </div>
              <span
                className={`ml-auto text-sm font-semibold text-primary transition-all duration-300 ${
                  isHovered ? "scale-110" : ""
                }`}
              >
                {profile.rate}
              </span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <MapPin className={`w-4 h-4 mr-1 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`} />
              {profile.location}
            </div>

            <div className="flex flex-wrap gap-1">
              {profile.skills.map((skill, skillIndex) => (
                <Badge
                  key={skillIndex}
                  variant="secondary"
                  className={`text-xs transition-all duration-300 ${
                    isHovered ? "scale-105 bg-primary/10 border-primary/20" : ""
                  }`}
                  style={{
                    animationDelay: `${skillIndex * 0.1}s`,
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Hover overlay with additional info */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end p-6 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="text-white text-sm">
                <p className="font-medium">Available for hire</p>
                <p className="text-xs opacity-90">Click to view full profile</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
