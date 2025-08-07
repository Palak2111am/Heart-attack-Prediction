"use client"

import { useState } from "react"
import { Key, ExternalLink, Copy, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function ApiKeySetup() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const steps = [
    {
      step: 1,
      title: "Visit Google AI Studio",
      description: "Go to Google AI Studio to get your API key",
      action: (
        <Button
          variant="outline"
          onClick={() => window.open('https://makersuite.google.com/app/apikey', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open Google AI Studio
        </Button>
      )
    },
    {
      step: 2,
      title: "Create API Key",
      description: "Click 'Create API Key' and select your Google Cloud project",
      action: null
    },
    {
      step: 3,
      title: "Copy Your API Key",
      description: "Copy the generated API key (starts with 'AIza')",
      action: null
    },
    {
      step: 4,
      title: "Add to Environment Variables",
      description: "Create a .env.local file in your project root and add:",
      action: (
        <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
          <div className="flex items-center justify-between">
            <span>GEMINI_API_KEY=your_api_key_here</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard('GEMINI_API_KEY=your_api_key_here')}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )
    },
    {
      step: 5,
      title: "Restart Your Development Server",
      description: "Stop and restart your Next.js development server to load the new environment variable",
      action: (
        <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
          <div>npm run dev</div>
          <div className="text-gray-600"># or</div>
          <div>yarn dev</div>
        </div>
      )
    }
  ]

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-600">
          <Key className="h-6 w-6" />
          Gemini API Key Setup
        </CardTitle>
        <p className="text-gray-600">
          Follow these steps to configure your Gemini API key for the chatbot
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription className="text-blue-800">
            <strong>Note:</strong> The Gemini API is free to use with generous limits. 
            You'll need a Google account to get started.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                  {step.step}
                </Badge>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                {step.action}
              </div>
            </div>
          ))}
        </div>

        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            <strong>Security Tip:</strong> Never commit your API key to version control. 
            Always use environment variables and add .env.local to your .gitignore file.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
