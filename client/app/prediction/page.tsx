"use client"

import { useState } from "react"
import { Heart, Brain, Activity, Loader2, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PredictionData {
  age: number
  sex: number
  cp: number
  trestbps: number
  chol: number
  fbs: number
  restecg: number
  thalach: number
  exang: number
  oldpeak: number
  slope: number
  ca: number
  thal: number
}

interface MLResult {
  message?: string
  Prediction_Probability_Percentage?: number
  risk_level?: string
  risk_color?: string
  risk_factors?: string[]
  recommendation?: string
  model_source?: string
  accuracy_note?: string
  error?: string
}

interface AIResult {
  prediction?: string
  analysis_type?: string
  model_used?: string
  error?: string
}

export default function PredictionPage() {
  const [formData, setFormData] = useState<PredictionData>({
    age: 50,
    sex: 1,
    cp: 0,
    trestbps: 120,
    chol: 200,
    fbs: 0,
    restecg: 0,
    thalach: 150,
    exang: 0,
    oldpeak: 0,
    slope: 1,
    ca: 0,
    thal: 2
  })

  const [aiResult, setAiResult] = useState<AIResult | null>(null)
  const [mlResult, setMlResult] = useState<MLResult | null>(null)
  const [loading, setLoading] = useState({ ai: false, ml: false })

  const handleInputChange = (field: keyof PredictionData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
    }))
  }

  const predictWithAI = async () => {
    setLoading(prev => ({ ...prev, ai: true }))
    setAiResult(null)
    try {
      const response = await fetch('/api/predict-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await response.json()
      setAiResult(result)
    } catch (error) {
      setAiResult({ error: 'Failed to get AI analysis. Please check your internet connection and try again.' })
    } finally {
      setLoading(prev => ({ ...prev, ai: false }))
    }
  }

  const predictWithML = async () => {
    setLoading(prev => ({ ...prev, ml: true }))
    setMlResult(null)
    try {
      const response = await fetch('/api/predict-ml', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await response.json()
      setMlResult(result)
    } catch (error) {
      setMlResult({ error: 'Failed to get ML prediction. Please try again.' })
    } finally {
      setLoading(prev => ({ ...prev, ml: false }))
    }
  }

  const getRiskColor = (riskLevel?: string) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'very high': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getProgressColor = (percentage?: number) => {
    if (!percentage) return 'bg-gray-400'
    if (percentage < 30) return 'bg-green-500'
    if (percentage < 50) return 'bg-yellow-500'
    if (percentage < 70) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-10 w-10 text-red-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Heart Attack Risk Prediction
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Enter your health parameters to get comprehensive risk assessments
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
              <Brain className="h-4 w-4 mr-1" />
              AI Analysis via Gemini
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              <Activity className="h-4 w-4 mr-1" />
              ML Prediction via Backend
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">Health Parameters</CardTitle>
              <p className="text-sm text-gray-600">Enter accurate information for better predictions</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    min="1"
                    max="120"
                  />
                </div>
                <div>
                  <Label htmlFor="sex">Sex</Label>
                  <Select value={formData.sex.toString()} onValueChange={(value) => handleInputChange('sex', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Male</SelectItem>
                      <SelectItem value="0">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cp">Chest Pain Type</Label>
                  <Select value={formData.cp.toString()} onValueChange={(value) => handleInputChange('cp', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Typical Angina</SelectItem>
                      <SelectItem value="1">Atypical Angina</SelectItem>
                      <SelectItem value="2">Non-Anginal Pain</SelectItem>
                      <SelectItem value="3">Asymptomatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="trestbps">Resting Blood Pressure (mmHg)</Label>
                  <Input
                    id="trestbps"
                    type="number"
                    value={formData.trestbps}
                    onChange={(e) => handleInputChange('trestbps', e.target.value)}
                    min="80"
                    max="200"
                  />
                </div>
                <div>
                  <Label htmlFor="chol">Cholesterol (mg/dl)</Label>
                  <Input
                    id="chol"
                    type="number"
                    value={formData.chol}
                    onChange={(e) => handleInputChange('chol', e.target.value)}
                    min="100"
                    max="600"
                  />
                </div>
                <div>
                  <Label htmlFor="fbs">Fasting Blood Sugar {'>'} 120 mg/dl</Label>
                  <Select value={formData.fbs.toString()} onValueChange={(value) => handleInputChange('fbs', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No</SelectItem>
                      <SelectItem value="1">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="restecg">Resting ECG</Label>
                  <Select value={formData.restecg.toString()} onValueChange={(value) => handleInputChange('restecg', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Normal</SelectItem>
                      <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                      <SelectItem value="2">Left Ventricular Hypertrophy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="thalach">Max Heart Rate Achieved (bpm)</Label>
                  <Input
                    id="thalach"
                    type="number"
                    value={formData.thalach}
                    onChange={(e) => handleInputChange('thalach', e.target.value)}
                    min="60"
                    max="220"
                  />
                </div>
                <div>
                  <Label htmlFor="exang">Exercise Induced Angina</Label>
                  <Select value={formData.exang.toString()} onValueChange={(value) => handleInputChange('exang', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No</SelectItem>
                      <SelectItem value="1">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="oldpeak">ST Depression</Label>
                  <Input
                    id="oldpeak"
                    type="number"
                    step="0.1"
                    value={formData.oldpeak}
                    onChange={(e) => handleInputChange('oldpeak', e.target.value)}
                    min="0"
                    max="10"
                  />
                </div>
                <div>
                  <Label htmlFor="slope">Slope of Peak Exercise ST</Label>
                  <Select value={formData.slope.toString()} onValueChange={(value) => handleInputChange('slope', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Downsloping</SelectItem>
                      <SelectItem value="1">Flat</SelectItem>
                      <SelectItem value="2">Upsloping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ca">Number of Major Vessels</Label>
                  <Select value={formData.ca.toString()} onValueChange={(value) => handleInputChange('ca', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="thal">Thalassemia</Label>
                  <Select value={formData.thal.toString()} onValueChange={(value) => handleInputChange('thal', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Fixed Defect</SelectItem>
                      <SelectItem value="2">Normal</SelectItem>
                      <SelectItem value="3">Reversible Defect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={predictWithAI} 
                  disabled={loading.ai || loading.ml}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading.ai ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Brain className="mr-2 h-4 w-4" />}
                  AI Analysis (Gemini)
                </Button>
                <Button 
                  onClick={predictWithML} 
                  disabled={loading.ml || loading.ai}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {loading.ml ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Activity className="mr-2 h-4 w-4" />}
                  ML Prediction (Backend)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">Prediction Results</CardTitle>
              <p className="text-sm text-gray-600">Compare AI analysis with ML prediction</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ml" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ml" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    ML Prediction
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Analysis
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="ml" className="space-y-4">
                  {mlResult ? (
                    <div>
                      {mlResult.error ? (
                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>{mlResult.error}</AlertDescription>
                        </Alert>
                      ) : (
                        <div className="space-y-4">
                          {/* Risk Level Display */}
                          {mlResult.risk_level && (
                            <div className={`p-4 rounded-lg border-2 ${getRiskColor(mlResult.risk_level)}`}>
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-lg">Risk Level: {mlResult.risk_level}</h3>
                                <Badge className={getRiskColor(mlResult.risk_level)}>
                                  {mlResult.Prediction_Probability_Percentage?.toFixed(1)}%
                                </Badge>
                              </div>
                              {mlResult.Prediction_Probability_Percentage && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Risk Probability</span>
                                    <span>{mlResult.Prediction_Probability_Percentage.toFixed(1)}%</span>
                                  </div>
                                  <Progress 
                                    value={mlResult.Prediction_Probability_Percentage} 
                                    className="h-3"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Risk Factors */}
                          {mlResult.risk_factors && mlResult.risk_factors.length > 0 && (
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                              <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Identified Risk Factors
                              </h4>
                              <ul className="text-sm text-orange-700 space-y-1">
                                {mlResult.risk_factors.map((factor, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-orange-500 mt-1">•</span>
                                    <span>{factor}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Recommendation */}
                          {mlResult.recommendation && (
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Recommendation
                              </h4>
                              <p className="text-blue-700 text-sm">{mlResult.recommendation}</p>
                            </div>
                          )}

                          {/* Model Info */}
                          {mlResult.model_source && (
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>Model: {mlResult.model_source}</span>
                                <TrendingUp className="h-4 w-4" />
                              </div>
                              {mlResult.accuracy_note && (
                                <p className="text-xs text-gray-500 mt-1">{mlResult.accuracy_note}</p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>Click "ML Prediction" to get a probability-based risk assessment using machine learning.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="ai" className="space-y-4">
                  {aiResult ? (
                    <div>
                      {aiResult.error ? (
                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>{aiResult.error}</AlertDescription>
                        </Alert>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold text-blue-800">AI Medical Analysis</h3>
                              {aiResult.model_used && (
                                <Badge variant="outline" className="text-blue-600 border-blue-300">
                                  {aiResult.model_used}
                                </Badge>
                              )}
                            </div>
                            <div className="prose prose-sm max-w-none">
                              <div className="text-blue-700 whitespace-pre-wrap leading-relaxed">
                                {aiResult.prediction}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>Click "AI Analysis" to get detailed insights about your heart health risk factors using Gemini AI.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Medical Disclaimer */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-800 text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Important Medical Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  These predictions are for educational and informational purposes only. They should not be used as a substitute for 
                  professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding 
                  any medical concerns or before making any changes to your health regimen. If you experience chest pain or other 
                  cardiac symptoms, seek immediate medical attention.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}