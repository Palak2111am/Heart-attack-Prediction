// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\app\privacy-policy\page.tsx
"use client"

import { Shield, Users, Database, BarChart3, Share2, Mail, Github, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

const dataCollected = [
  "Age",
  "Sex",
  "Nature of Chest Pain",
  "Resting Blood Pressure",
  "Cholesterol Level",
  "Fasting Blood Sugar",
  "Resting Electrocardiographic Results",
  "Maximum Heart Rate Achieved",
  "Exercise Induced Angina",
  "ST Depression Induced by Exercise",
  "Peak Exercise ST Segment Slope",
  "Number of Major Vessels Colored by Fluoroscopy",
  "Status of Thalassemia",
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. We value your trust and are committed to protecting and safeguarding any
            personal information you give us.
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Important:</strong> We may make changes to this privacy policy to comply with legal requirements at
            any time. Since we are not collecting any personal or communication information, we request you to check
            this privacy page before proceeding further.
          </AlertDescription>
        </Alert>

        {/* Age Restriction */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-blue-600">
              <Users className="h-6 w-6" />
              Who Can Use This Website
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Badge className="text-lg px-4 py-2 border-green-300 bg-green-50 text-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                18+ Age Requirement
              </Badge>
              <p className="text-gray-700 leading-relaxed">
                Anyone above 18+ years of age is allowed to access this page. This website makes use of an ML model with
                synthetic data to train and predict results.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Disclaimer</h4>
                <p className="text-yellow-700 text-sm">
                  Our maximum accuracy reached is 90%. However, it can make mistakes and nothing can beat a doctor's
                  expertise.
                  <strong> Always consult a doctor and rely on professional medical records.</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-blue-600">
              <Database className="h-6 w-6" />
              Data Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We collect the following information from you when you use our service:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dataCollected.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Why This Data is Collected</h4>
                <p className="text-blue-700 text-sm">
                  For the prediction to work, it needs this data. The data will be available in the system until you hit
                  the refresh button or close it.
                  <strong>
                    {" "}
                    We are not storing any of your data, so avoid refreshing and switching between pages.
                  </strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-blue-600">
              <BarChart3 className="h-6 w-6" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We use analytics to improve our application's performance. The same data mentioned above is collected
                for analytics purposes.
              </p>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Why Analytics is Required</h4>
                <p className="text-green-700 text-sm mb-2">
                  By default, analytics is enabled which helps us in quick troubleshooting and understanding what data
                  is sent and received. This helps validate that ML is working fine.
                </p>
                <p className="text-green-700 text-sm">
                  <strong>Current Status:</strong> We are not storing analytics data currently, but planning to store in
                  a 3rd party public cloud provider for 30 days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3rd Party Data Usage */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-blue-600">
              <Share2 className="h-6 w-6" />
              3rd Party Data Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">ChatGPT Integration</h4>
              <p className="text-purple-700 text-sm">
                If you have selected ChatGPT for prediction, you are agreeing to ChatGPT's Privacy Policy. Please review
                their terms before using this feature.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Mail className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg opacity-90 mb-6">
              If you have any questions or concerns about your personal information, you can contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open("mailto:palakpatel2111am@gmail.com", "_blank")}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Mail className="h-4 w-4 mr-2" />
                palakpatel2111am@gmail.com
              </Button>
              <Button
                onClick={() => window.open("https://github.com/Palak2111am/Heart-attack-Prediction.git", "_blank")}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Github className="h-4 w-4 mr-2" />
                Open Source Project
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">This is an open source project committed to transparency and user privacy.</p>
        </div>
      </div>
    </div>
  )
}
