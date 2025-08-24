import type { UserProfile } from "./storage"

export interface JobMatch {
  jobId: string
  title: string
  company: string
  matchScore: number
  matchReasons: string[]
  budget: string
  skills: string[]
}

export interface ProfileSuggestion {
  id: string
  type: "skill" | "bio" | "rate" | "portfolio"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  action: string
}

export const generateJobMatches = (userProfile: UserProfile): JobMatch[] => {
  // Simulated AI job matching based on user skills and preferences
  const mockJobs: JobMatch[] = [
    {
      jobId: "1",
      title: "Senior React Developer",
      company: "TechCorp India",
      matchScore: 95,
      matchReasons: ["Perfect match for React skills", "Experience level aligns", "Rate within budget range"],
      budget: "₹2,00,000 - ₹3,50,000",
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      jobId: "2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      matchScore: 87,
      matchReasons: ["Strong match for full-stack skills", "Startup experience preferred", "Remote work available"],
      budget: "₹1,80,000 - ₹2,80,000",
      skills: ["JavaScript", "Python", "MongoDB"],
    },
    {
      jobId: "3",
      title: "Frontend Architect",
      company: "DesignHub",
      matchScore: 82,
      matchReasons: [
        "Advanced frontend skills match",
        "Architecture experience valued",
        "Portfolio demonstrates expertise",
      ],
      budget: "₹2,50,000 - ₹4,00,000",
      skills: ["React", "Vue.js", "CSS", "Design Systems"],
    },
  ]

  // Filter and sort based on user skills
  return mockJobs
    .filter((job) =>
      job.skills.some((skill) =>
        userProfile.skills.some((userSkill) => userSkill.toLowerCase().includes(skill.toLowerCase())),
      ),
    )
    .sort((a, b) => b.matchScore - a.matchScore)
}

export const generateProfileSuggestions = (userProfile: UserProfile): ProfileSuggestion[] => {
  const suggestions: ProfileSuggestion[] = []

  // Bio optimization
  if (!userProfile.bio || userProfile.bio.length < 100) {
    suggestions.push({
      id: "bio_expand",
      type: "bio",
      title: "Expand Your Bio",
      description: "A detailed bio increases profile views by 40%. Add more about your experience and achievements.",
      impact: "high",
      action: "Write a compelling 150+ word bio highlighting your expertise",
    })
  }

  // Skills optimization
  if (userProfile.skills.length < 8) {
    suggestions.push({
      id: "add_skills",
      type: "skill",
      title: "Add More Skills",
      description: "Profiles with 8+ skills get 60% more job matches. Consider adding complementary technologies.",
      impact: "high",
      action: "Add relevant skills like Git, AWS, Docker, or design tools",
    })
  }

  // Rate optimization
  if (userProfile.hourlyRate < 1000) {
    suggestions.push({
      id: "rate_increase",
      type: "rate",
      title: "Consider Rate Adjustment",
      description: "Your rate seems below market average for your skills. Higher rates often attract better clients.",
      impact: "medium",
      action: "Research market rates and consider increasing to ₹1,500-2,500/hr",
    })
  }

  // Portfolio suggestion
  suggestions.push({
    id: "portfolio_add",
    type: "portfolio",
    title: "Showcase Your Work",
    description: "Profiles with portfolios get 3x more hire requests. Add your best projects.",
    impact: "high",
    action: "Upload 3-5 of your best projects with descriptions and technologies used",
  })

  return suggestions
}

export const getSkillRecommendations = (currentSkills: string[]): string[] => {
  const skillSuggestions: Record<string, string[]> = {
    React: ["Next.js", "Redux", "TypeScript", "Jest", "React Native"],
    JavaScript: ["TypeScript", "Node.js", "Express", "MongoDB", "React"],
    Python: ["Django", "Flask", "FastAPI", "PostgreSQL", "Docker"],
    "Node.js": ["Express", "MongoDB", "PostgreSQL", "Redis", "AWS"],
    TypeScript: ["React", "Angular", "Node.js", "GraphQL", "Jest"],
    CSS: ["Sass", "Tailwind CSS", "Styled Components", "Figma", "Adobe XD"],
    HTML: ["CSS", "JavaScript", "React", "Accessibility", "SEO"],
  }

  const recommendations = new Set<string>()

  currentSkills.forEach((skill) => {
    const suggestions = skillSuggestions[skill] || []
    suggestions.forEach((suggestion) => {
      if (!currentSkills.includes(suggestion)) {
        recommendations.add(suggestion)
      }
    })
  })

  return Array.from(recommendations).slice(0, 8)
}
