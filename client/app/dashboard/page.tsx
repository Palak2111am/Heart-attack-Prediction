"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, TrendingUp, Activity, Heart } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ModelMetrics {
  accuracy?: number
  precision?: number
  recall?: number
  f1_score?: number
  error?: string
}

// Sample data for visualizations
const sampleData = [
  { age: 63, sex: 1, cp: 3, chol: 233, target: 1 },
  { age: 37, sex: 1, cp: 2, chol: 250, target: 0 },
  { age: 41, sex: 0, cp: 1, chol: 204, target: 0 },
  { age: 68, sex: 1, cp: 0, chol: 193, target: 1 },
  { age: 57, sex: 1, cp: 0, chol: 131, target: 1 },
  { age: 57, sex: 0, cp: 1, chol: 236, target: 0 },
  { age: 45, sex: 1, cp: 2, chol: 280, target: 1 },
  { age: 52, sex: 0, cp: 0, chol: 190, target: 0 },
]

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics')
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      setMetrics({ error: 'Failed to fetch model metrics' })
    } finally {
      setLoading(false)
    }
  }

  // Calculate statistics from sample data
  const avgAge = sampleData.reduce((sum, item) => sum + item.age, 0) / sampleData.length
  const avgChol = sampleData.reduce((sum, item) => sum + item.chol, 0) / sampleData.length
  const maleCount = sampleData.filter(item => item.sex === 1).length
  const femaleCount = sampleData.filter(item => item.sex === 0).length
  const positiveCount = sampleData.filter(item => item.target === 1).length
  const negativeCount = sampleData.filter(item => item.target === 0).length

  // Age distribution
  const ageGroups = {
    '30-40': sampleData.filter(item => item.age >= 30 && item.age < 40).length,
    '40-50': sampleData.filter(item => item.age >= 40 && item.age < 50).length,
    '50-60': sampleData.filter(item => item.age >= 50 && item.age < 60).length,
    '60+': sampleData.filter(item => item.age >= 60).length,
  }

  // Chest pain type distribution
  const cpTypes = {
    'Typical Angina': sampleData.filter(item => item.cp === 0).length,
    'Atypical Angina': sampleData.filter(item => item.cp === 1).length,
    'Non-Anginal': sampleData.filter(item => item.cp === 2).length,
    'Asymptomatic': sampleData.filter(item => item.cp === 3).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart className="h-10 w-10 text-red-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Model performance metrics and data insights
          </p>
        </div>

        {/* Model Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {loading ? '...' : metrics?.accuracy ? `${(metrics.accuracy * 100).toFixed(1)}%` : 'N/A'}
              </div>
              <p className="text-xs text-gray-500">Model prediction accuracy</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Precision</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {loading ? '...' : metrics?.precision ? `${(metrics.precision * 100).toFixed(1)}%` : 'N/A'}
              </div>
              <p className="text-xs text-gray-500">True positive rate</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Recall</CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {loading ? '...' : metrics?.recall ? `${(metrics.recall * 100).toFixed(1)}%` : 'N/A'}
              </div>
              <p className="text-xs text-gray-500">Sensitivity measure</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">F1 Score</CardTitle>
              <BarChart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {loading ? '...' : metrics?.f1_score ? `${(metrics.f1_score * 100).toFixed(1)}%` : 'N/A'}
              </div>
              <p className="text-xs text-gray-500">Harmonic mean</p>
            </CardContent>
          </Card>
        </div>

        {metrics?.error && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>{metrics.error}</AlertDescription>
          </Alert>
        )}

        {/* Data Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-red-600">Dataset Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{sampleData.length}</div>
                  <div className="text-sm text-gray-600">Total Samples</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{avgAge.toFixed(0)}</div>
                  <div className="text-sm text-gray-600">Avg Age</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{avgChol.toFixed(0)}</div>
                  <div className="text-sm text-gray-600">Avg Cholesterol</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{((positiveCount / sampleData.length) * 100).toFixed(0)}%</div>
                  <div className="text-sm text-gray-600">Risk Cases</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-red-600">Gender Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Male</span>
                  <span className="text-sm text-gray-600">{maleCount} ({((maleCount / sampleData.length) * 100).toFixed(0)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(maleCount / sampleData.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Female</span>
                  <span className="text-sm text-gray-600">{femaleCount} ({((femaleCount / sampleData.length) * 100).toFixed(0)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-pink-600 h-2 rounded-full"
                    style={{ width: `${(femaleCount / sampleData.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Age Groups and Chest Pain Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-red-600">Age Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(ageGroups).map(([group, count]) => (
                  <div key={group} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{group}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${(count / sampleData.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-red-600">Chest Pain Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(cpTypes).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{type}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(count / sampleData.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
