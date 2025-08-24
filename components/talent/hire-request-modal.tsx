"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IndianRupee, Send } from "lucide-react"
import { saveHireRequest, saveMessage, type UserProfile, type HireRequest, type Message } from "@/lib/storage"

interface HireRequestModalProps {
  talent: UserProfile
  employer: UserProfile
  onClose: () => void
}

export function HireRequestModal({ talent, employer, onClose }: HireRequestModalProps) {
  const [formData, setFormData] = useState({
    projectTitle: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.projectTitle || !formData.budget || !formData.message) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    const hireRequest: HireRequest = {
      id: Date.now().toString(),
      fromUserId: employer.id,
      toUserId: talent.id,
      fromUserName: `${employer.firstName} ${employer.lastName}`,
      toUserName: `${talent.firstName} ${talent.lastName}`,
      message: formData.message,
      projectTitle: formData.projectTitle,
      budget: Number.parseInt(formData.budget),
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    const message: Message = {
      id: Date.now().toString() + "_msg",
      fromUserId: employer.id,
      toUserId: talent.id,
      fromUserName: `${employer.firstName} ${employer.lastName}`,
      content: `Hi ${talent.firstName}! I'd like to hire you for "${formData.projectTitle}". Budget: ₹${formData.budget}. ${formData.message}`,
      timestamp: new Date().toISOString(),
      read: false,
    }

    try {
      saveHireRequest(hireRequest)
      saveMessage(message)

      alert("Hire request sent successfully! The talent will be notified.")
      onClose()
    } catch (error) {
      alert("Failed to send hire request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send Hire Request</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Talent Info */}
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarImage src={talent.profileImage || undefined} />
              <AvatarFallback>
                {talent.firstName[0]}
                {talent.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">
                {talent.firstName} {talent.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{talent.title}</p>
              <p className="text-sm font-medium text-primary">₹{talent.hourlyRate}/hr</p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectTitle">Project Title *</Label>
              <Input
                id="projectTitle"
                placeholder="e.g., E-commerce Website Development"
                value={formData.projectTitle}
                onChange={(e) => handleInputChange("projectTitle", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="budget">Budget (INR) *</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="budget"
                  type="number"
                  placeholder="50000"
                  className="pl-10"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Describe your project requirements and timeline..."
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
