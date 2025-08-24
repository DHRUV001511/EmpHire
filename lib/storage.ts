export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  title: string
  location: string
  bio: string
  skills: string[]
  hourlyRate: number
  availability: string
  profileImage: string | null
  rating: number
  completedProjects: number
  userType: "employee" | "employer"
  createdAt: string
}

export interface HireRequest {
  id: string
  fromUserId: string
  toUserId: string
  fromUserName: string
  toUserName: string
  message: string
  projectTitle: string
  budget: number
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export interface Message {
  id: string
  fromUserId: string
  toUserId: string
  fromUserName: string
  content: string
  timestamp: string
  read: boolean
}

// Profile storage functions
export const saveUserProfile = (profile: UserProfile) => {
  const profiles = getUserProfiles()
  const existingIndex = profiles.findIndex((p) => p.id === profile.id)

  if (existingIndex >= 0) {
    profiles[existingIndex] = profile
  } else {
    profiles.push(profile)
  }

  localStorage.setItem("userProfiles", JSON.stringify(profiles))
}

export const getUserProfiles = (): UserProfile[] => {
  if (typeof window === "undefined") return []
  const profiles = localStorage.getItem("userProfiles")
  return profiles ? JSON.parse(profiles) : []
}

export const getCurrentUser = (): UserProfile | null => {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

export const setCurrentUser = (user: UserProfile) => {
  localStorage.setItem("currentUser", JSON.stringify(user))
}

// Hire request functions
export const saveHireRequest = (request: HireRequest) => {
  const requests = getHireRequests()
  requests.push(request)
  localStorage.setItem("hireRequests", JSON.stringify(requests))
}

export const getHireRequests = (): HireRequest[] => {
  if (typeof window === "undefined") return []
  const requests = localStorage.getItem("hireRequests")
  return requests ? JSON.parse(requests) : []
}

export const updateHireRequestStatus = (requestId: string, status: "accepted" | "rejected") => {
  const requests = getHireRequests()
  const requestIndex = requests.findIndex((r) => r.id === requestId)

  if (requestIndex >= 0) {
    requests[requestIndex].status = status
    localStorage.setItem("hireRequests", JSON.stringify(requests))
  }
}

// Message functions
export const saveMessage = (message: Message) => {
  const messages = getMessages()
  messages.push(message)
  localStorage.setItem("messages", JSON.stringify(messages))
}

export const getMessages = (): Message[] => {
  if (typeof window === "undefined") return []
  const messages = localStorage.getItem("messages")
  return messages ? JSON.parse(messages) : []
}

export const getConversation = (userId1: string, userId2: string): Message[] => {
  const messages = getMessages()
  return messages
    .filter(
      (m) =>
        (m.fromUserId === userId1 && m.toUserId === userId2) || (m.fromUserId === userId2 && m.toUserId === userId1),
    )
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

export const getStoredProfiles = getUserProfiles
export const getStoredHireRequests = getHireRequests
