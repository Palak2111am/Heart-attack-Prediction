// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\components\chatbot-widget.tsx
// This file contains the chatbot widget component for the heart health assistant.
"use client"

import dynamic from "next/dynamic"
import { useState, useEffect, useRef } from "react"
import { Heart, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils" // Assuming you have a cn utility

interface Message {
  id: number
  text: string
  isUser: boolean
}

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const API_BASE_URL = "http://localhost:8000" // Your FastAPI backend URL

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial bot messages when the chat opens for the first time
      setMessages([
        {
          id: 1,
          text: "Hello! I'm your heart health assistant. You can ask me questions about heart attack risk factors, prevention tips, or use the prediction form on the main site.",
          isUser: false,
        },
        {
          id: 2,
          text: "<strong>Note:</strong> This is for educational purposes only. Always consult a healthcare professional for medical advice.",
          isUser: false,
        },
        {
          id: 3,
          text: '<strong>Try asking:</strong><br>• "What are the main risk factors for heart attacks?"<br>• "How does exercise affect heart health?"<br>• "What should I do if I have chest pain?"',
          isUser: false,
        },
      ])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (typeof window !== "undefined") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const sendMessage = async () => {
    const trimmedMessage = inputMessage.trim()
    if (!trimmedMessage) return

    const newUserMessage: Message = { id: Date.now(), text: trimmedMessage, isUser: true }
    setMessages((prev) => [...prev, newUserMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/agent/chat`, {  // Updated to call agent chat endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedMessage }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const botResponse: Message = { id: Date.now() + 1, text: data.response, isUser: false }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error sending message to chatbot:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default" // Reverted from "ghost"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-red-500 hover:bg-red-600 text-white animate-bounce-slow z-50" // Reverted className
          aria-label="Open Chatbot"
        >
          <Heart className="h-7 w-7" /> {/* Reverted icon size */}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-red-600">
            <Heart className="h-6 w-6" />
            Lifebeat Chatbot
          </SheetTitle>
          <p className="text-sm text-gray-500">Your AI heart health assistant</p>
        </SheetHeader>

        <ScrollArea className="flex-1 p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "p-3 rounded-lg max-w-[80%]",
                msg.isUser
                  ? "bg-red-500 text-white ml-auto rounded-br-none"
                  : "bg-gray-100 text-gray-800 mr-auto rounded-bl-none",
              )}
            >
              <p dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
          ))}
          {isLoading && (
            <div className="p-3 rounded-lg bg-gray-100 text-gray-800 mr-auto rounded-bl-none flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="flex p-4 border-t gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isLoading) {
                sendMessage()
              }
            }}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={isLoading} size="icon">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default dynamic(() => Promise.resolve(ChatbotWidget), { ssr: false })
