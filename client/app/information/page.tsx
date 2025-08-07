// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\app\information\page.tsx
"use client"

import { useState, useEffect } from "react"
import { Heart, Activity, Target, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const heartHealthTips = [
  "Stay active with at least 30 minutes of exercise daily.",
  "Maintain a balanced diet rich in fruits and vegetables.",
  "Avoid smoking and limit alcohol consumption.",
  "Manage stress through mindfulness and relaxation techniques.",
  "Regularly monitor your blood pressure and cholesterol levels.",
]

export default function LifebeatApp() {
  const [currentTip, setCurrentTip] = useState("")
  const [activeTab, setActiveTab] = useState("importance")

  useEffect(() => {
    const randomTip = heartHealthTips[Math.floor(Math.random() * heartHealthTips.length)]
    setCurrentTip(randomTip)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-red-500 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Lifebeat
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">For every heartbeat that matters</p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Empowering you to assess your heart health and risk of heart attack using machine learning.
          </p>
        </div>

        {/* Flipping Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/50 backdrop-blur-sm border border-white/20">
            <TabsTrigger
              value="importance"
              className="flex items-center gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white transition-all duration-300"
            >
              <Heart className="h-4 w-4" />
              Heart Health
            </TabsTrigger>
            <TabsTrigger
              value="understanding"
              className="flex items-center gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white transition-all duration-300"
            >
              <Activity className="h-4 w-4" />
              Heart Attacks
            </TabsTrigger>
            <TabsTrigger
              value="motive"
              className="flex items-center gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white transition-all duration-300"
            >
              <Target className="h-4 w-4" />
              Our Mission
            </TabsTrigger>
          </TabsList>

          {/* Tab Content with Flip Animation */}
          <div className="relative">
            <TabsContent
              value="importance"
              className="animate-in slide-in-from-right-5 duration-500 data-[state=inactive]:animate-out data-[state=inactive]:slide-out-to-left-5"
            >
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-red-600">
                    <Heart className="h-6 w-6" />
                    The Importance of Heart Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2 space-y-4">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Your heart is the engine of your body, pumping life-giving blood to every corner. Nurturing your
                        heart health is essential for a vibrant and active life.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                          <h4 className="font-semibold text-red-800 mb-2">Daily Exercise</h4>
                          <p className="text-sm text-red-700">30 minutes of activity keeps your heart strong</p>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                          <h4 className="font-semibold text-pink-800 mb-2">Healthy Diet</h4>
                          <p className="text-sm text-pink-700">Fruits and vegetables fuel your heart</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="relative">
                        <Image
                          src="/placeholder.jpg"
                          alt="Healthy Heart"
                          width={300}
                          height={300}
                          className="rounded-full shadow-lg border-4 border-white"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="understanding"
              className="animate-in slide-in-from-right-5 duration-500 data-[state=inactive]:animate-out data-[state=inactive]:slide-out-to-left-5"
            >
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-red-600">
                    <Activity className="h-6 w-6" />
                    Understanding Heart Attacks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                          A heart attack, or myocardial infarction, occurs when a part of the heart muscle is deprived
                          of blood flow. This can lead to severe damage and life-threatening complications.
                        </p>
                        <div className="space-y-3">
                          <Badge variant="destructive" className="text-sm">
                            Emergency Condition
                          </Badge>
                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <h4 className="font-semibold text-orange-800 mb-2">Warning Signs</h4>
                            <ul className="text-sm text-orange-700 space-y-1">
                              <li>• Chest pain or discomfort</li>
                              <li>• Shortness of breath</li>
                              <li>• Pain in arms, neck, or jaw</li>
                              <li>• Nausea or lightheadedness</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Image
                          src="/placeholder.jpg"
                          alt="Heart Attack Illustration"
                          width={300}
                          height={250}
                          className="rounded-lg shadow-lg border border-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="motive"
              className="animate-in slide-in-from-right-5 duration-500 data-[state=inactive]:animate-out data-[state=inactive]:slide-out-to-left-5"
            >
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-red-600">
                    <Target className="h-6 w-6" />
                    Our Motive and Aim
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Lifebeat is designed to provide you with a simple tool to gauge your heart attack risk. By
                      leveraging advanced machine learning, we aspire to raise awareness about heart health and promote
                      proactive care.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-gray-800">Our Goals</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                            <p className="text-gray-700">Early detection and prevention</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                            <p className="text-gray-700">Accessible health assessment</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                            <p className="text-gray-700">Empowering informed decisions</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-800">Heart Health Tip of the Day</h4>
                        </div>
                        <p className="text-blue-700 text-sm leading-relaxed">{currentTip}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
