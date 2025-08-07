// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\app\home-page\page.tsx
"use client"

import { Heart, Shield, Activity, ArrowRight, Github, Mail, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HomePageProps {
  onPageChange: (page: string) => void
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const features = [
    {
      icon: Heart,
      title: "Heart Health Assessment",
      description: "Advanced ML-powered heart attack risk prediction with 90% accuracy",
      color: "text-red-500",
      bgColor: "bg-red-50 border-red-200",
    },
    {
      icon: Shield,
      title: "Prevention Guidelines",
      description: "Comprehensive precautions and lifestyle recommendations",
      color: "text-green-500",
      bgColor: "bg-green-50 border-green-200",
    },
    {
      icon: Activity,
      title: "Real-time Analysis",
      description: "Instant health data processing without storing personal information",
      color: "text-blue-500",
      bgColor: "bg-blue-50 border-blue-200",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center flex items-center justify-center gap-3 mb-6">
            <Heart className="h-16 w-16 text-red-500 animate-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Lifebeat
            </h1>
          </div>
          <p className="text-2xl text-gray-600 mb-4 text-center font-semibold">For every heartbeat that matters</p>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-8 leading-relaxed">
            Empowering you to assess your heart health and risk of heart attack using advanced machine learning
            technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={() => onPageChange("lifebeat")}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => onPageChange("precautions")}
              className="border-red-300 text-red-600 hover:bg-red-50 px-8 py-4 text-lg"
            >
              View Precautions
              <Shield className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <Badge className="border-green-300 text-green-700 bg-green-50">
              <Star className="h-3 w-3 mr-1" />
              90% Accuracy
            </Badge>
            <Badge className="border-blue-300 text-blue-700 bg-blue-50">
              No Data Storage
            </Badge>
            <Badge className="border-purple-300 text-purple-700 bg-purple-50">
              Open Source
            </Badge>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Lifebeat?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with medical expertise to provide you with reliable heart
            health insights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className={`${feature.bgColor} border-2 hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-white rounded-full w-fit">
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">90%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">18+</div>
            <div className="text-gray-600">Age Requirement</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">0</div>
            <div className="text-gray-600">Data Stored</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">100%</div>
            <div className="text-gray-600">Open Source</div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-xl">
          <CardContent className="p-12 text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-4">Ready to Check Your Heart Health?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Take the first step towards a healthier heart. Our ML-powered assessment takes just a few minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onPageChange("lifebeat")}
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg"
              >
                Start Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => onPageChange("privacy")}
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Privacy Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">Lifebeat</span>
              </div>
              <p className="text-gray-400">Empowering heart health through technology and education.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => onPageChange("lifebeat")} className="block text-gray-400 hover:text-white">
                  Heart Assessment
                </button>
                <button onClick={() => onPageChange("precautions")} className="block text-gray-400 hover:text-white">
                  Precautions
                </button>
                <button onClick={() => onPageChange("privacy")} className="block text-gray-400 hover:text-white">
                  Privacy Policy
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <a
                  href="mailto:palakpatel2111am@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  palakpatel2111am@gmail.com
                </a>
                <a href="https://github.com/Palak2111am/Heart-attack-Prediction.git" className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <Github className="h-4 w-4" />
                  GitHub Project
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Lifebeat. Open source project for heart health awareness.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
