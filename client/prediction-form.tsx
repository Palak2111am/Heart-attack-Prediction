"use client"

import { useState } from "react"
import { Heart, Brain, BarChart3, AlertTriangle, Activity, Stethoscope } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { predictCustomModelBackend, predictChatGPTBackend } from "@/app/actions/predict" // Import Server Actions

interface PredictionData {
  modelType: "custom" | "chatgpt"
  age: number
  sex: "male" | "female"
  chestPain: "asymptomatic" | "typical" | "atypical" | "non-anginal"
  restingBP: number
  cholesterol: number
  fastingBS: "no" | "yes"
  restingECG: "normal" | "st-t-abnormal" | "lv-hypertrophy"
  maxHeartRate: number
  exerciseAngina: "no" | "yes"
  stDepression: number
  stSlope: "upsloping" | "flat" | "downsloping"
  majorVessels: number
  thalassemia: "normal" | "fixed-defect" | "reversible-defect"
  analyticsEnabled: boolean
}

export default function PredictionForm() {
  const [formData, setFormData] = useState<PredictionData>({
    modelType: "custom",
    age: 50,
    sex: "male",
    chestPain: "asymptomatic",
    restingBP: 120,
    cholesterol: 200,
    fastingBS: "no",
    restingECG: "normal",
    maxHeartRate: 150,
    exerciseAngina: "no",
    stDepression: 0,
    stSlope: "upsloping",
    majorVessels: 0,
    thalassemia: "normal",
    analyticsEnabled: true,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<{
    risk: "low" | "moderate" | "high" | "unknown" | "error"
    percentage: number
    message: string
  } | null>(null)

  const handlePredict = async () => {
    setIsLoading(true)
    setPrediction(null) // Clear previous prediction

    // Map frontend values to backend expected integers
    const mappedData = {
      age: formData.age,
      sex: formData.sex === "male" ? 1 : 0,
      cp:
        formData.chestPain === "typical"
          ? 1
          : formData.chestPain === "atypical"
            ? 2
            : formData.chestPain === "non-anginal"
              ? 3
              : 0, // 0 for asymptomatic
      trestbps: formData.restingBP,
      chol: formData.cholesterol,
      fbs: formData.fastingBS === "yes" ? 1 : 0,
      restecg: formData.restingECG === "st-t-abnormal" ? 1 : formData.restingECG === "lv-hypertrophy" ? 2 : 0, // 0 for normal
      thalach: formData.maxHeartRate,
      exang: formData.exerciseAngina === "yes" ? 1 : 0,
      oldpeak: formData.stDepression,
      slope: formData.stSlope === "flat" ? 1 : formData.stSlope === "downsloping" ? 2 : 0, // 0 for upsloping
      ca: formData.majorVessels,
      thal: formData.thalassemia === "fixed-defect" ? 1 : formData.thalassemia === "reversible-defect" ? 2 : 0, // 0 for normal
    }

    try {
      if (formData.modelType === "custom") {
        const result = await predictCustomModelBackend(mappedData)
        setPrediction(result)
      } else {
        const result = await predictChatGPTBackend(mappedData)
        setPrediction(result)
      }
    } catch (error) {
      console.error("Prediction failed:", error)
      setPrediction({
        risk: "error",
        percentage: 0,
        message: "An error occurred during prediction. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof PredictionData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setPrediction(null) // Clear previous prediction
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Activity className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Heart Attack Prediction
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            This app predicts the likelihood of a heart attack based on your inputs.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="text-left">
                <h3 className="font-semibold text-amber-800 mb-2">How to Use:</h3>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Choose the prediction model type: Custom Model or ChatGPT</li>
                  <li>• Adjust the input fields according to your personal information</li>
                  <li>• Enable analytics to collect data for ML model accuracy</li>
                  <li>• Click the 'Predict' button to get the prediction result</li>
                  <li>• The result will be displayed based on the selected model</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-blue-600">
                  <Stethoscope className="h-6 w-6" />
                  Health Assessment Form
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Model Type */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Model Type</Label>
                  <RadioGroup
                    value={formData.modelType}
                    onValueChange={(value) => updateFormData("modelType", value as "custom" | "chatgpt")}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        Custom Model
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chatgpt" id="chatgpt" />
                      <Label htmlFor="chatgpt" className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-green-500" />
                        ChatGPT
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Age */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Age: {formData.age}</Label>
                  <Slider
                    value={[formData.age]}
                    onValueChange={(value) => updateFormData("age", value[0])}
                    min={18}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>18</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Sex */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Sex</Label>
                  <Select
                    value={formData.sex}
                    onValueChange={(value) => updateFormData("sex", value as "male" | "female")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Nature of Chest Pain */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Nature of Chest Pain</Label>
                  <Select
                    value={formData.chestPain}
                    onValueChange={(value) =>
                      updateFormData("chestPain", value as "asymptomatic" | "typical" | "atypical" | "non-anginal")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asymptomatic">No Pain (Asymptomatic)</SelectItem>
                      <SelectItem value="typical">Typical Angina</SelectItem>
                      <SelectItem value="atypical">Atypical Angina</SelectItem>
                      <SelectItem value="non-anginal">Non-Anginal Pain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Resting Blood Pressure */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Resting Blood Pressure [mm Hg]: {formData.restingBP}
                  </Label>
                  <Slider
                    value={[formData.restingBP]}
                    onValueChange={(value) => updateFormData("restingBP", value[0])}
                    min={80}
                    max={200}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>80</span>
                    <span>200</span>
                  </div>
                </div>

                {/* Cholesterol */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Cholesterol [mg/dl]: {formData.cholesterol}</Label>
                  <Slider
                    value={[formData.cholesterol]}
                    onValueChange={(value) => updateFormData("cholesterol", value[0])}
                    min={120}
                    max={570}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>120</span>
                    <span>570</span>
                  </div>
                </div>

                {/* Fasting Blood Sugar */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Is Fasting Blood Sugar {">"} 120 mg/dl?</Label>
                  <Select
                    value={formData.fastingBS}
                    onValueChange={(value) => updateFormData("fastingBS", value as "no" | "yes")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No ({"<="} 120 mg/dl)</SelectItem>
                      <SelectItem value="yes">Yes ({">"} 120 mg/dl)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Resting ECG */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Resting Electrocardiographic Results</Label>
                  <Select
                    value={formData.restingECG}
                    onValueChange={(value) =>
                      updateFormData("restingECG", value as "normal" | "st-t-abnormal" | "lv-hypertrophy")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="st-t-abnormal">ST-T Wave Abnormality</SelectItem>
                      <SelectItem value="lv-hypertrophy">Left Ventricular Hypertrophy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Maximum Heart Rate */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Maximum Heart Rate Achieved: {formData.maxHeartRate}
                  </Label>
                  <Slider
                    value={[formData.maxHeartRate]}
                    onValueChange={(value) => updateFormData("maxHeartRate", value[0])}
                    min={60}
                    max={250}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>60</span>
                    <span>250</span>
                  </div>
                </div>

                {/* Exercise Induced Angina */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Experience of Exercise Induced Angina</Label>
                  <Select
                    value={formData.exerciseAngina}
                    onValueChange={(value) => updateFormData("exerciseAngina", value as "no" | "yes")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* ST Depression */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    ST Depression Induced by Exercise: {formData.stDepression.toFixed(1)}
                  </Label>
                  <Slider
                    value={[formData.stDepression]}
                    onValueChange={(value) => updateFormData("stDepression", value[0])}
                    min={0}
                    max={10}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0.0</span>
                    <span>10.0</span>
                  </div>
                </div>

                {/* ST Slope */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Peak Exercise ST Segment slope direction</Label>
                  <Select
                    value={formData.stSlope}
                    onValueChange={(value) => updateFormData("stSlope", value as "upsloping" | "flat" | "downsloping")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upsloping">Upwards (Upsloping)</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                      <SelectItem value="downsloping">Downwards (Downsloping)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Major Vessels */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Number of Major Vessels Colored by fluoroscopy in test: {formData.majorVessels}
                  </Label>
                  <Slider
                    value={[formData.majorVessels]}
                    onValueChange={(value) => updateFormData("majorVessels", value[0])}
                    min={0}
                    max={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0</span>
                    <span>4</span>
                  </div>
                </div>

                {/* Thalassemia */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Status of Thalassemia</Label>
                  <Select
                    value={formData.thalassemia}
                    onValueChange={(value) =>
                      updateFormData("thalassemia", value as "normal" | "fixed-defect" | "reversible-defect")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="fixed-defect">Fixed Defect</SelectItem>
                      <SelectItem value="reversible-defect">Reversible Defect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Analytics Toggle */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <div>
                      <Label className="text-base font-semibold text-blue-800">Enable Analytics</Label>
                      <p className="text-sm text-blue-600">Collect data for ML model accuracy improvement</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.analyticsEnabled}
                    onCheckedChange={(checked) => updateFormData("analyticsEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prediction Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-purple-600">
                  <Activity className="h-5 w-5" />
                  Prediction Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {prediction && (
                  <div className="space-y-4">
                    {prediction.risk !== "unknown" && prediction.risk !== "error" && (
                      <div className="text-center">
                        <div
                          className={`text-4xl font-bold mb-2 ${
                            prediction.risk === "low"
                              ? "text-green-500"
                              : prediction.risk === "moderate"
                                ? "text-yellow-500"
                                : "text-red-500"
                          }`}
                        >
                          {prediction.percentage}%
                        </div>
                        <Badge
                          variant={prediction.risk === "low" ? "default" : "destructive"}
                          className={`text-sm px-3 py-1 ${
                            prediction.risk === "low"
                              ? "bg-green-500"
                              : prediction.risk === "moderate"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        >
                          {prediction.risk.toUpperCase()} RISK
                        </Badge>
                      </div>
                    )}

                    <Alert
                      className={`${
                        prediction.risk === "low"
                          ? "border-green-200 bg-green-50"
                          : prediction.risk === "moderate"
                            ? "border-yellow-200 bg-yellow-50"
                            : prediction.risk === "high"
                              ? "border-red-200 bg-red-50"
                              : "border-gray-200 bg-gray-50" // For unknown/error
                      }`}
                    >
                      <AlertTriangle
                        className={`h-4 w-4 ${
                          prediction.risk === "low"
                            ? "text-green-600"
                            : prediction.risk === "moderate"
                              ? "text-yellow-600"
                              : prediction.risk === "high"
                                ? "text-red-600"
                                : "text-gray-600" // For unknown/error
                        }`}
                      />
                      <AlertDescription
                        className={`${
                          prediction.risk === "low"
                            ? "text-green-800"
                            : prediction.risk === "moderate"
                              ? "text-yellow-800"
                              : prediction.risk === "high"
                                ? "text-red-800"
                                : "text-gray-800" // For unknown/error
                        }`}
                      >
                        {prediction.message}
                      </AlertDescription>
                    </Alert>

                    <div className="text-xs text-gray-500 text-center">
                      Model: {formData.modelType === "custom" ? "Custom ML Model" : "ChatGPT Analysis"}
                      <br />
                      Analytics: {formData.analyticsEnabled ? "Enabled" : "Disabled"}
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 text-center mt-4">
                  <p className="mb-2">⚠️ This is for educational purposes only</p>
                  <p>Always consult with healthcare professionals for medical advice</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Predict Button - Moved to Bottom */}
        <div className="mt-8 text-center">
          <Button
            onClick={handlePredict}
            disabled={isLoading}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-4 text-xl"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing Your Heart Health...
              </div>
            ) : (
              <>
                <Heart className="h-6 w-6 mr-3" />
                Predict Heart Attack Risk
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
