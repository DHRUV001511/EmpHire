"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, BarChart3, Megaphone, Shield, Wrench } from "lucide-react"

const careerCategories = [
  {
    id: "developer",
    title: "Developer",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    jobs: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Developer"],
    skills: ["React", "Node.js", "Python", "TypeScript"],
  },
  {
    id: "designer",
    title: "Designer",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    jobs: ["UI/UX Designer", "Product Designer", "Graphic Designer", "Brand Designer"],
    skills: ["Figma", "Adobe XD", "Photoshop", "Prototyping"],
  },
  {
    id: "data",
    title: "Data Scientist",
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
    jobs: ["Data Analyst", "ML Engineer", "Data Engineer", "Research Scientist"],
    skills: ["Python", "R", "SQL", "Machine Learning"],
  },
  {
    id: "marketing",
    title: "Marketing",
    icon: Megaphone,
    color: "from-orange-500 to-amber-500",
    jobs: ["Digital Marketer", "Content Creator", "SEO Specialist", "Social Media Manager"],
    skills: ["Google Ads", "Analytics", "Content Strategy", "SEO"],
  },
  {
    id: "security",
    title: "Cybersecurity",
    icon: Shield,
    color: "from-red-500 to-pink-500",
    jobs: ["Security Analyst", "Penetration Tester", "Security Engineer", "Compliance Officer"],
    skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance"],
  },
  {
    id: "devops",
    title: "DevOps",
    icon: Wrench,
    color: "from-purple-500 to-indigo-500",
    jobs: ["DevOps Engineer", "Cloud Architect", "Site Reliability Engineer", "Infrastructure Engineer"],
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
]

export function CareerTree() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/10 to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Career Paths</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Navigate through different career branches and discover opportunities that match your skills and interests.
          </p>
        </div>

        <div className="relative">
          {/* Career Tree Visualization */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {careerCategories.map((category, index) => {
              const Icon = category.icon
              const isHovered = hoveredCategory === category.id
              const isSelected = selectedCategory === category.id

              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isSelected ? "ring-2 ring-primary shadow-lg" : ""
                  } ${isHovered ? "shadow-xl" : "hover:shadow-lg"}`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{
                    transform: isHovered ? "translateY(-8px) rotateY(5deg)" : "translateY(0) rotateY(0)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 ${
                        isHovered ? "scale-110 rotate-12" : ""
                      }`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm">{category.title}</h3>
                    <div className="mt-2 text-xs text-muted-foreground">{category.jobs.length} roles</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Selected Category Details */}
          {selectedCategory && (
            <Card className="mt-8 animate-in slide-in-from-bottom-4 duration-300">
              <CardContent className="p-8">
                {(() => {
                  const category = careerCategories.find((c) => c.id === selectedCategory)
                  if (!category) return null
                  const Icon = category.icon

                  return (
                    <div>
                      <div className="flex items-center mb-6">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{category.title}</h3>
                          <p className="text-muted-foreground">
                            Explore opportunities in {category.title.toLowerCase()}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-4">Popular Roles</h4>
                          <div className="space-y-2">
                            {category.jobs.map((job, index) => (
                              <div
                                key={index}
                                className="flex items-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                                <span className="text-sm">{job}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-4">Key Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-6">
                            <button className="text-primary hover:underline text-sm font-medium">
                              View all {category.title.toLowerCase()} opportunities →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
