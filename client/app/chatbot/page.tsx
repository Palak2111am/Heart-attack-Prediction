// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\app\chatbot\page.tsx

"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, Bot, User, Heart, Loader2, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ApiKeySetup from "@/components/api-key-setup"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "What are the early signs of a heart attack?",
  "How can I improve my heart health?",
  "What foods are good for heart health?",
  "How much exercise should I do for a healthy heart?",
  "What is the difference between heart attack and cardiac arrest?",
  "How does stress affect heart health?",
  "What are normal blood pressure ranges?",
  "How often should I check my cholesterol?",
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your LifeBeat Health Assistant. I'm here to help answer your questions about heart health, prevention, and general wellness. How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (messageContent?: string) => {
    const content = messageContent || input.trim()
    if (!content || isLoading) return

    setError(null)
    setInput("")
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-5) // Send last 5 messages for context
        }),
      })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get response from chatbot')
    }
    
    // Add assistant message
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: data.response,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, assistantMessage])
  } catch (error) {
    console.error('Chatbot error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.'
    setError(errorMessage)
    
    // Add error message
    const errorResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `I apologize, but I'm having trouble right now: ${errorMessage}\n\nPlease try asking your question again, or contact our support team if the issue persists.`,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, errorResponse])
  } finally {
    setIsLoading(false)
    inputRef.current?.focus()
  }
}

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm your LifeBeat Health Assistant. I'm here to help answer your questions about heart health, prevention, and general wellness. How can I assist you today?",
        timestamp: new Date()
      }
    ])
    setError(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageCircle className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LifeBeat Health Assistant
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ask me anything about heart health, prevention, symptoms, and general wellness. I'm here to help!
          </p>
          <Badge className="mt-4 bg-green-100 text-green-800 border-green-300">
            <Heart className="h-4 w-4 mr-1" />
            Powered by Gemini AI
          </Badge>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 space-y-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            
            {(error.includes('API key') || error.includes('not configured')) && (
              <ApiKeySetup />
            )}
          </div>
        )}

        {/* Chat Interface */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl text-blue-600">
              <Bot className="h-6 w-6" />
              Chat with Health Assistant
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="text-gray-600 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Chat
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.role === 'user'
                            ? 'text-blue-100'
                            : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                        <span className="text-sm text-gray-600">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about heart health, symptoms, prevention..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <Card className="mt-6 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">Suggested Questions</CardTitle>
            <p className="text-sm text-gray-600">Click on any question to get started</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-3 text-sm hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => sendMessage(question)}
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-800 text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Medical Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This AI assistant provides general health information for educational purposes only. 
                  It should not be used as a substitute for professional medical advice, diagnosis, or treatment. 
                  Always consult with a qualified healthcare provider regarding any medical concerns or before making 
                  any changes to your health regimen.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
