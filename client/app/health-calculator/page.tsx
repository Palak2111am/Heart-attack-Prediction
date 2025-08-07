// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\app\health-calculator\page.tsx
"use client"

import { useState } from "react"
import { Calculator, Heart, Scale, Activity, Droplets } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export default function HealthCalculator() {
  // BMI Calculator State
  const [bmiData, setBmiData] = useState({
    weight: 70,
    height: 1.75,
    result: null as { bmi: number; category: string; color: string } | null,
  })

  // BMR Calculator State
  const [bmrData, setBmrData] = useState({
    weight: 70,
    height: 175,
    age: 30,
    gender: "male",
    result: null as number | null,
  })

  // Blood Pressure Calculator State
  const [bpData, setBpData] = useState({
    age: 30,
    heartRate: 70,
    result: null as { systolic: number; diastolic: number; category: string; color: string } | null,
  })

  // Cholesterol Calculator State
  const [cholesterolData, setCholesterolData] = useState({
    age: 30,
    gender: "male",
    result: null as { total: number; category: string; color: string } | null,
  })

  // BMI Calculation
  const calculateBMI = () => {
    const bmi = bmiData.weight / (bmiData.height * bmiData.height)
    let category = ""
    let color = ""

    if (bmi < 18.5) {
      category = "Underweight"
      color = "text-blue-600"
    } else if (bmi < 25) {
      category = "Normal weight"
      color = "text-green-600"
    } else if (bmi < 30) {
      category = "Overweight"
      color = "text-yellow-600"
    } else {
      category = "Obese"
      color = "text-red-600"
    }

    setBmiData({ ...bmiData, result: { bmi: Math.round(bmi * 10) / 10, category, color } })
  }

  // BMR Calculation
  const calculateBMR = () => {
    let bmr = 0
    if (bmrData.gender === "male") {
      bmr = 88.362 + 13.397 * bmrData.weight + 4.799 * bmrData.height - 5.677 * bmrData.age
    } else {
      bmr = 447.593 + 9.247 * bmrData.weight + 3.098 * bmrData.height - 4.33 * bmrData.age
    }
    setBmrData({ ...bmrData, result: Math.round(bmr) })
  }

  // Blood Pressure Calculation
  const calculateBP = () => {
    // Simplified estimation based on age and heart rate
    const baseSystolic = 120 + (bpData.age - 30) * 0.5
    const baseDiastolic = 80 + (bpData.age - 30) * 0.3
    const hrAdjustment = (bpData.heartRate - 70) * 0.2

    const systolic = Math.round(baseSystolic + hrAdjustment)
    const diastolic = Math.round(baseDiastolic + hrAdjustment * 0.5)

    let category = ""
    let color = ""

    if (systolic < 120 && diastolic < 80) {
      category = "Normal"
      color = "text-green-600"
    } else if (systolic < 130 && diastolic < 80) {
      category = "Elevated"
      color = "text-yellow-600"
    } else if (systolic < 140 || diastolic < 90) {
      category = "High Blood Pressure Stage 1"
      color = "text-orange-600"
    } else {
      category = "High Blood Pressure Stage 2"
      color = "text-red-600"
    }

    setBpData({ ...bpData, result: { systolic, diastolic, category, color } })
  }

  // Cholesterol Calculation
  const calculateCholesterol = () => {
    // Simplified estimation based on age and gender
    let baseTotal = 180
    if (cholesterolData.gender === "male") {
      baseTotal += cholesterolData.age * 0.8
    } else {
      baseTotal += cholesterolData.age * 0.6
    }

    const total = Math.round(baseTotal)
    let category = ""
    let color = ""

    if (total < 200) {
      category = "Desirable"
      color = "text-green-600"
    } else if (total < 240) {
      category = "Borderline High"
      color = "text-yellow-600"
    } else {
      category = "High"
      color = "text-red-600"
    }

    setCholesterolData({ ...cholesterolData, result: { total, category, color } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calculator className="h-10 w-10 text-green-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Health Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Use the following calculators to assess your health parameters.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-4xl mx-auto text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-blue-500" />
              <span>BMI Calculator helps you assess your Body Mass Index</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span>BMR Calculator estimates your Basal Metabolic Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Resting Blood Pressure Calculator</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-purple-500" />
              <span>Total Cholesterol Calculator</span>
            </div>
          </div>
        </div>

        {/* Calculators Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* BMI Calculator */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-blue-600">
                <Scale className="h-6 w-6" />
                BMI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Weight (kg): {bmiData.weight}</Label>
                  <Slider
                    value={[bmiData.weight]}
                    onValueChange={(value) => setBmiData({ ...bmiData, weight: value[0], result: null })}
                    min={30}
                    max={200}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold">Height (m): {bmiData.height}</Label>
                  <Slider
                    value={[bmiData.height]}
                    onValueChange={(value) => setBmiData({ ...bmiData, height: value[0], result: null })}
                    min={1.0}
                    max={2.5}
                    step={0.01}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button onClick={calculateBMI} className="w-full bg-blue-500 hover:bg-blue-600">
                <Scale className="h-4 w-4 mr-2" />
                Calculate BMI
              </Button>

              {bmiData.result && (
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className={`text-3xl font-bold ${bmiData.result.color}`}>{bmiData.result.bmi}</div>
                  <Badge
                    className={`mt-2 ${bmiData.result.color.replace("text-", "bg-").replace("-600", "-500")} text-white`}
                  >
                    {bmiData.result.category}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* BMR Calculator */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-green-600">
                <Activity className="h-6 w-6" />
                BMR Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Weight (kg): {bmrData.weight}</Label>
                  <Slider
                    value={[bmrData.weight]}
                    onValueChange={(value) => setBmrData({ ...bmrData, weight: value[0], result: null })}
                    min={30}
                    max={200}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold">Height (cm): {bmrData.height}</Label>
                  <Slider
                    value={[bmrData.height]}
                    onValueChange={(value) => setBmrData({ ...bmrData, height: value[0], result: null })}
                    min={100}
                    max={250}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold">Age: {bmrData.age}</Label>
                  <Slider
                    value={[bmrData.age]}
                    onValueChange={(value) => setBmrData({ ...bmrData, age: value[0], result: null })}
                    min={1}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold">Gender</Label>
                  <Select
                    value={bmrData.gender}
                    onValueChange={(value) => setBmrData({ ...bmrData, gender: value, result: null })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateBMR} className="w-full bg-green-500 hover:bg-green-600">
                <Activity className="h-4 w-4 mr-2" />
                Calculate BMR
              </Button>

              {bmrData.result && (
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600">{bmrData.result}</div>
                  <p className="text-sm text-green-700 mt-2">Calories per day</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Blood Pressure Calculator */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-red-600">
                <Heart className="h-6 w-6" />
                Resting Blood Pressure Calculator
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Enter your age and heart rate to calculate your Resting Blood Pressure [mm Hg].
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Age: {bpData.age}</Label>
                  <Slider
                    value={[bpData.age]}
                    onValueChange={(value) => setBpData({ ...bpData, age: value[0], result: null })}
                    min={18}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold">Heart Rate: {bpData.heartRate}</Label>
                  <Slider
                    value={[bpData.heartRate]}
                    onValueChange={(value) => setBpData({ ...bpData, heartRate: value[0], result: null })}
                    min={40}
                    max={200}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button onClick={calculateBP} className="w-full bg-red-500 hover:bg-red-600">
                <Heart className="h-4 w-4 mr-2" />
                Calculate Blood Pressure
              </Button>

              {bpData.result && (
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">
                    {bpData.result.systolic}/{bpData.result.diastolic}
                  </div>
                  <p className="text-sm text-gray-600">mm Hg</p>
                  <Badge
                    className={`mt-2 ${bpData.result.color.replace("text-", "bg-").replace("-600", "-500")} text-white`}
                  >
                    {bpData.result.category}
                  </Badge>
                </div>
              )}

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Best Practices to Follow:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Measure BP at the same time daily</li>
                  <li>• Rest for 5 minutes before measuring</li>
                  <li>• Avoid caffeine 30 minutes before</li>
                  <li>• Sit with feet flat on floor</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cholesterol Calculator */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-purple-600">
                <Droplets className="h-6 w-6" />
                Total Cholesterol Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Age: {cholesterolData.age}</Label>
                  <Slider
                    value={[cholesterolData.age]}
                    onValueChange={(value) => setCholesterolData({ ...cholesterolData, age: value[0], result: null })}
                    min={18}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold">Gender</Label>
                  <Select
                    value={cholesterolData.gender}
                    onValueChange={(value) => setCholesterolData({ ...cholesterolData, gender: value, result: null })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateCholesterol} className="w-full bg-purple-500 hover:bg-purple-600">
                <Droplets className="h-4 w-4 mr-2" />
                Calculate Total Cholesterol
              </Button>

              {cholesterolData.result && (
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600">{cholesterolData.result.total}</div>
                  <p className="text-sm text-gray-600">mg/dL</p>
                  <Badge
                    className={`mt-2 ${cholesterolData.result.color.replace("text-", "bg-").replace("-600", "-500")} text-white`}
                  >
                    {cholesterolData.result.category}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer Information */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-lg shadow-xl">
            <Calculator className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Health Assessment Complete</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              These calculators provide estimates based on standard formulas. For accurate health assessment and
              personalized advice, always consult with healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
