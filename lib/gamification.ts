export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "profile" | "hiring" | "social" | "milestone"
  points: number
  unlocked: boolean
  unlockedAt?: string
}

export interface UserLevel {
  level: number
  title: string
  minPoints: number
  maxPoints: number
  benefits: string[]
}

export interface UserStats {
  totalPoints: number
  level: number
  achievements: Achievement[]
  profileViews: number
  projectsCompleted: number
  successfulHires: number
  responseRate: number
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "profile_complete",
    title: "Profile Master",
    description: "Complete your professional profile",
    icon: "👤",
    category: "profile",
    points: 100,
    unlocked: false,
  },
  {
    id: "first_hire",
    title: "First Success",
    description: "Get hired for your first project",
    icon: "🎉",
    category: "hiring",
    points: 200,
    unlocked: false,
  },
  {
    id: "skill_master",
    title: "Skill Collector",
    description: "Add 10+ skills to your profile",
    icon: "🛠️",
    category: "profile",
    points: 150,
    unlocked: false,
  },
  {
    id: "fast_responder",
    title: "Lightning Fast",
    description: "Respond to 5 hire requests within 1 hour",
    icon: "⚡",
    category: "social",
    points: 250,
    unlocked: false,
  },
  {
    id: "top_rated",
    title: "Five Star Pro",
    description: "Maintain a 5.0 rating with 10+ reviews",
    icon: "⭐",
    category: "milestone",
    points: 500,
    unlocked: false,
  },
  {
    id: "networking_pro",
    title: "Network Builder",
    description: "Connect with 25+ professionals",
    icon: "🤝",
    category: "social",
    points: 300,
    unlocked: false,
  },
]

export const USER_LEVELS: UserLevel[] = [
  {
    level: 1,
    title: "Newcomer",
    minPoints: 0,
    maxPoints: 499,
    benefits: ["Basic profile features", "Apply to jobs"],
  },
  {
    level: 2,
    title: "Rising Talent",
    minPoints: 500,
    maxPoints: 1499,
    benefits: ["Featured in search results", "Priority support", "Custom portfolio"],
  },
  {
    level: 3,
    title: "Skilled Professional",
    minPoints: 1500,
    maxPoints: 3499,
    benefits: ["Top talent badge", "Advanced analytics", "Direct client contact"],
  },
  {
    level: 4,
    title: "Expert",
    minPoints: 3500,
    maxPoints: 7499,
    benefits: ["Expert verification", "Premium placement", "Exclusive opportunities"],
  },
  {
    level: 5,
    title: "Master",
    minPoints: 7500,
    maxPoints: Number.POSITIVE_INFINITY,
    benefits: ["Master badge", "VIP support", "Revenue sharing program"],
  },
]

export const getUserStats = (userId: string): UserStats => {
  if (typeof window === "undefined") {
    return {
      totalPoints: 0,
      level: 1,
      achievements: ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false })),
      profileViews: 0,
      projectsCompleted: 0,
      successfulHires: 0,
      responseRate: 0,
    }
  }

  const stats = localStorage.getItem(`userStats_${userId}`)
  if (stats) {
    return JSON.parse(stats)
  }

  return {
    totalPoints: 0,
    level: 1,
    achievements: ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false })),
    profileViews: Math.floor(Math.random() * 100) + 20,
    projectsCompleted: Math.floor(Math.random() * 5),
    successfulHires: Math.floor(Math.random() * 3),
    responseRate: Math.floor(Math.random() * 40) + 60,
  }
}

export const updateUserStats = (userId: string, stats: UserStats) => {
  localStorage.setItem(`userStats_${userId}`, JSON.stringify(stats))
}

export const unlockAchievement = (userId: string, achievementId: string) => {
  const stats = getUserStats(userId)
  const achievement = stats.achievements.find((a) => a.id === achievementId)

  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true
    achievement.unlockedAt = new Date().toISOString()
    stats.totalPoints += achievement.points

    // Update level
    const newLevel = USER_LEVELS.find((l) => stats.totalPoints >= l.minPoints && stats.totalPoints <= l.maxPoints)
    if (newLevel) {
      stats.level = newLevel.level
    }

    updateUserStats(userId, stats)
    return true
  }
  return false
}

export const getCurrentLevel = (points: number): UserLevel => {
  return USER_LEVELS.find((l) => points >= l.minPoints && points <= l.maxPoints) || USER_LEVELS[0]
}
