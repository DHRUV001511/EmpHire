"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar"
import { MessageSquare, Send, Search } from "lucide-react"
import {
  getMessages,
  saveMessage,
  getCurrentUser,
  getUserProfiles,
  type Message,
  type UserProfile,
} from "@/lib/storage"

export function MessageCenter() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [allUsers, setAllUsers] = useState<UserProfile[]>([])

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)

    if (user) {
      const allMessages = getMessages()
      const userMessages = allMessages.filter((m) => m.fromUserId === user.id || m.toUserId === user.id)
      setMessages(userMessages)

      // Group messages by conversation
      const convos = new Map()
      userMessages.forEach((msg) => {
        const otherUserId = msg.fromUserId === user.id ? msg.toUserId : msg.fromUserId
        const otherUserName = msg.fromUserId === user.id ? msg.toUserId : msg.fromUserName

        if (!convos.has(otherUserId)) {
          convos.set(otherUserId, {
            userId: otherUserId,
            userName: otherUserName,
            lastMessage: msg,
            unreadCount: 0,
          })
        } else {
          const existing = convos.get(otherUserId)
          if (new Date(msg.timestamp) > new Date(existing.lastMessage.timestamp)) {
            existing.lastMessage = msg
          }
        }

        if (msg.toUserId === user.id && !msg.read) {
          const existing = convos.get(otherUserId)
          existing.unreadCount++
        }
      })

      setConversations(Array.from(convos.values()))
      setAllUsers(getUserProfiles())
    }
  }, [])

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !currentUser) return

    const message: Message = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      toUserId: selectedConversation,
      fromUserName: `${currentUser.firstName} ${currentUser.lastName}`,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    }

    saveMessage(message)
    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const getConversationMessages = (userId: string) => {
    if (!currentUser) return []
    return messages
      .filter(
        (m) =>
          (m.fromUserId === currentUser.id && m.toUserId === userId) ||
          (m.fromUserId === userId && m.toUserId === currentUser.id),
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-muted-foreground">Communicate with clients and employers</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 h-[600px]">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search messages..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((conv) => (
                      <div
                        key={conv.userId}
                        className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedConversation === conv.userId ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedConversation(conv.userId)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {conv.userName
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm truncate">{conv.userName}</h4>
                              {conv.unreadCount > 0 && (
                                <Badge variant="default" className="text-xs">
                                  {conv.unreadCount}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{conv.lastMessage.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3">
              <Card className="h-full flex flex-col">
                {selectedConversation ? (
                  <>
                    <CardHeader className="border-b">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {conversations
                              .find((c) => c.userId === selectedConversation)
                              ?.userName.split(" ")
                              .map((n: string) => n[0])
                              .join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">
                            {conversations.find((c) => c.userId === selectedConversation)?.userName}
                          </h3>
                          <p className="text-sm text-muted-foreground">Online</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        {getConversationMessages(selectedConversation).map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.fromUserId === currentUser?.id ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                msg.fromUserId === currentUser?.id ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className="text-xs opacity-70 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={sendMessage}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                      <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
