// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\app\contact\page.tsx

"use client"

import { User, Mail, Linkedin, Github } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactMePage() {
  const contactInfo = {
    name: "Palak Patel",
    email: "palakpatel2111am@gmail.com",
    linkedin: "https://www.linkedin.com/in/dte-gecbh-com-palak-patel",
    github: "https://github.com/Palak2111am",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50 p-4">
      <div className="max-w-3xl mx-auto">
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

        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
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
                  <a href={`mailto:${contactInfo.email}`} className="font-semibold text-red-800 hover:underline">
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
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Looking forward to connecting!</p>
        </div>
      </div>
    </div>
  )
}
