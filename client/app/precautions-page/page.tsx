// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\app\precautions-page\page.tsx
"use client"

import {
  Heart,
  Activity,
  Apple,
  Scale,
  Cigarette,
  Wine,
  Brain,
  Stethoscope,
  Users,
  ExternalLink,
  Shield,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const precautions = [
  {
    id: 1,
    title: "Regular Exercise",
    description:
      "Engage in regular physical activity such as brisk walking, jogging, swimming, or cycling. Aim for at least 150 minutes of moderate-intensity aerobic exercise every week.",
    icon: Activity,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Balanced Diet",
    description:
      "Consume a diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit your intake of saturated and trans fats, cholesterol, salt, and added sugars.",
    icon: Apple,
    color: "bg-green-50 border-green-200 text-green-700",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Healthy Weight",
    description:
      "Maintain a healthy weight through a combination of a balanced diet and regular exercise. Being overweight or obese increases the risk of heart disease.",
    icon: Scale,
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconColor: "text-purple-600",
  },
  {
    id: 4,
    title: "No Smoking",
    description:
      "If you smoke, quit as soon as possible. Smoking is a major risk factor for heart disease. Seek support from healthcare professionals to help you quit.",
    icon: Cigarette,
    color: "bg-red-50 border-red-200 text-red-700",
    iconColor: "text-red-600",
  },
  {
    id: 5,
    title: "Moderate Alcohol Consumption",
    description:
      "If you consume alcohol, do so in moderation. For men, this means up to two drinks per day, and for women, up to one drink per day.",
    icon: Wine,
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconColor: "text-amber-600",
  },
  {
    id: 6,
    title: "Stress Management",
    description:
      "Practice stress-reduction techniques such as meditation, deep breathing, yoga, or spending time on hobbies. Chronic stress can contribute to heart problems.",
    icon: Brain,
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    iconColor: "text-indigo-600",
  },
  {
    id: 7,
    title: "Regular Health Check-ups",
    description:
      "Schedule regular check-ups with your healthcare provider. Monitoring your blood pressure, cholesterol levels, and overall health is essential for early detection and management of heart issues.",
    icon: Stethoscope,
    color: "bg-teal-50 border-teal-200 text-teal-700",
    iconColor: "text-teal-600",
  },
  {
    id: 8,
    title: "Know Your Family History",
    description:
      "Understand your family's history of heart diseases. This information can help your healthcare provider assess your risk and recommend appropriate preventive measures.",
    icon: Users,
    color: "bg-pink-50 border-pink-200 text-pink-700",
    iconColor: "text-pink-600",
  },
]

const resources = [
  {
    name: "American Heart Association",
    url: "https://www.heart.org",
    description: "Leading source for heart health information",
  },
  {
    name: "Centers for Disease Control and Prevention - Heart Disease",
    url: "https://www.cdc.gov/heartdisease",
    description: "Official CDC heart disease resources",
  },
  {
    name: "World Heart Federation",
    url: "https://www.world-heart-federation.org",
    description: "Global heart health advocacy",
  },
]

export default function PrecautionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-10 w-10 text-red-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Precautions for Heart Attack
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Taking care of your heart health is crucial to prevent heart diseases. Here are some effective precautions
            and lifestyle changes you can make:
          </p>
          <Badge variant="outline" className="mt-4 text-green-700 border-green-300 bg-green-50">
            <CheckCircle className="h-4 w-4 mr-1" />
            Prevention is the key to a healthy heart
          </Badge>
        </div>

        {/* Precautions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-12">
          {precautions.map((precaution, index) => {
            const IconComponent = precaution.icon
            return (
              <Card
                key={precaution.id}
                className={`${precaution.color} hover:shadow-lg transition-all duration-300 hover:scale-105 border-2`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className={`p-2 rounded-full bg-white/50`}>
                      <IconComponent className={`h-6 w-6 ${precaution.iconColor}`} />
                    </div>
                    <span className="flex items-center gap-2">
                      {index + 1}. {precaution.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{precaution.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Key Message */}
        <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white mb-12 border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold mb-4">Remember: Prevention is Key!</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              By adopting these precautions, you can significantly reduce your risk of heart disease. Start with small
              changes and build healthy habits over time.
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl mb-8">
          <CardContent className="p-8 text-center">
            <Stethoscope className="h-10 w-10 mx-auto mb-4 text-blue-600" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personalized Healthcare Guidance</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              For more detailed and personalized information, consult your doctor and perform annual health check-ups.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Schedule Health Check-up
            </Button>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800 flex items-center justify-center gap-2">
              <ExternalLink className="h-6 w-6" />
              Official Resources
            </CardTitle>
            <p className="text-center text-gray-600">
              For official and up-to-date information, you can refer to these trusted sources:
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {resources.map((resource, index) => (
                <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{resource.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => window.open(resource.url, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit Site
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
