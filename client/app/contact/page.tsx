"use client"

import { User, Mail, Linkedin, Github, Heart, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const contactInfo = {
    name: "Palak Patel",
    email: "palakpatel2111am@gmail.com",
    linkedin: "https://www.linkedin.com/in/dte-gecbh-com-palak-patel",
    github: "https://github.com/Palak2111am",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <User className="h-10 w-10 text-red-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Contact Me
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Feel free to reach out if you have any questions, collaboration ideas, or just want to connect!
          </p>
        </div>

        {/* Main Contact Card */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-red-600">
              <User className="h-6 w-6" />
              Developer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                <User className="h-6 w-6 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-red-800">{contactInfo.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                <Mail className="h-6 w-6 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a 
                    href={`mailto:${contactInfo.email}`} 
                    className="font-semibold text-red-800 hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                <Linkedin className="h-6 w-6 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">LinkedIn</p>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-red-800 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                <Github className="h-6 w-6 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">GitHub</p>
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-red-800 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={() => window.open(`mailto:${contactInfo.email}`, '_blank')}
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                onClick={() => window.open(contactInfo.linkedin, '_blank')}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                Connect on LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Project Information */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-red-600">
              <Heart className="h-6 w-6" />
              About LifeBeat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              LifeBeat is an advanced heart attack risk prediction system that combines machine learning 
              and AI-powered analysis to provide comprehensive cardiovascular health insights. This project 
              demonstrates the integration of modern web technologies with healthcare applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-1">Technologies Used</h4>
                <p className="text-sm text-blue-700">Next.js, FastAPI, Python, Machine Learning, AI Integration</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-1">Features</h4>
                <p className="text-sm text-green-700">AI Analysis, ML Predictions, Data Visualization, Real-time Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
            <CardContent className="p-6">
              <MessageCircle className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Let's Connect!</h3>
              <p className="mb-4">
                I'm always interested in discussing new opportunities, collaborations, or just chatting about technology and healthcare innovation.
              </p>
              <Button 
                variant="secondary" 
                className="bg-white text-red-600 hover:bg-gray-100"
                onClick={() => window.open(`mailto:${contactInfo.email}?subject=Hello from LifeBeat`, '_blank')}
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
