import { NextRequest, NextResponse } from 'next/server'
import { AbortSignal } from 'abort-controller'

interface PredictionRequest {
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

export async function POST(request: NextRequest) {
  try {
    const data: PredictionRequest = await request.json()
    
    // First, try to connect to your FastAPI backend
    const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL || 'http://localhost:8000'
    
    try {
      console.log('Attempting to connect to FastAPI backend at:', FASTAPI_URL)
      
      const response = await fetch(`${FASTAPI_URL}/predict_ml`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })

      if (response.ok) {
        const result = await response.json()
        console.log('FastAPI response:', result)
        return NextResponse.json(result)
      } else {
        console.error('FastAPI error:', response.status, await response.text())
        throw new Error(`FastAPI returned status ${response.status}`)
      }
    } catch (fetchError) {
      console.log('FastAPI backend not available, using fallback ML prediction')
      console.error('FastAPI connection error:', fetchError)
      
      // Fallback to local ML prediction logic
      return await fallbackMLPrediction(data)
    }
  } catch (error) {
    console.error('ML Prediction Error:', error)
    return NextResponse.json(
      { error: 'Failed to process ML prediction request' },
      { status: 500 }
    )
  }
}

// Fallback ML prediction when FastAPI is not available
async function fallbackMLPrediction(data: PredictionRequest) {
  try {
    // Enhanced risk calculation based on medical research
    let riskScore = 0
    let riskFactors: string[] = []
    
    // Age factor (major risk factor)
    if (data.age > 65) {
      riskScore += 30
      riskFactors.push(`Age over 65 (${data.age} years) - High risk factor`)
    } else if (data.age > 55) {
      riskScore += 20
      riskFactors.push(`Age over 55 (${data.age} years) - Moderate risk factor`)
    } else if (data.age > 45) {
      riskScore += 10
      riskFactors.push(`Age over 45 (${data.age} years) - Mild risk factor`)
    }
    
    // Gender factor
    if (data.sex === 1 && data.age > 45) {
      riskScore += 5
      riskFactors.push('Male gender with age over 45')
    } else if (data.sex === 0 && data.age > 55) {
      riskScore += 5
      riskFactors.push('Female gender with age over 55')
    }
    
    // Chest pain type (very important indicator)
    if (data.cp === 0) {
      riskScore += 25
      riskFactors.push('Typical angina chest pain - High risk')
    } else if (data.cp === 1) {
      riskScore += 15
      riskFactors.push('Atypical angina chest pain - Moderate risk')
    } else if (data.cp === 2) {
      riskScore += 8
      riskFactors.push('Non-anginal chest pain - Low risk')
    }
    
    // Cholesterol factor
    if (data.chol > 240) {
      riskScore += 25
      riskFactors.push(`High cholesterol (${data.chol} mg/dl) - High risk`)
    } else if (data.chol > 200) {
      riskScore += 15
      riskFactors.push(`Borderline high cholesterol (${data.chol} mg/dl) - Moderate risk`)
    }
    
    // Blood pressure factor
    if (data.trestbps > 140) {
      riskScore += 20
      riskFactors.push(`High blood pressure (${data.trestbps} mmHg) - High risk`)
    } else if (data.trestbps > 120) {
      riskScore += 10
      riskFactors.push(`Elevated blood pressure (${data.trestbps} mmHg) - Moderate risk`)
    }
    
    // Exercise factors
    if (data.exang === 1) {
      riskScore += 15
      riskFactors.push('Exercise-induced angina - High risk factor')
    }
    
    // Maximum heart rate
    const expectedMaxHR = 220 - data.age
    if (data.thalach < expectedMaxHR * 0.7) {
      riskScore += 10
      riskFactors.push(`Low maximum heart rate (${data.thalach}) - Risk factor`)
    }
    
    // Fasting blood sugar
    if (data.fbs === 1) {
      riskScore += 10
      riskFactors.push('Elevated fasting blood sugar - Risk factor')
    }
    
    // ST depression
    if (data.oldpeak > 2) {
      riskScore += 15
      riskFactors.push(`Significant ST depression (${data.oldpeak}) - High risk`)
    } else if (data.oldpeak > 1) {
      riskScore += 8
      riskFactors.push(`Moderate ST depression (${data.oldpeak}) - Moderate risk`)
    }
    
    // Number of major vessels
    if (data.ca > 0) {
      riskScore += data.ca * 12
      riskFactors.push(`${data.ca} major vessel(s) with significant narrowing - High risk`)
    }
    
    // Thalassemia
    if (data.thal === 3) {
      riskScore += 15
      riskFactors.push('Reversible thalassemia defect - Risk factor')
    } else if (data.thal === 1) {
      riskScore += 8
      riskFactors.push('Fixed thalassemia defect - Moderate risk factor')
    }
    
    // Cap at 100%
    const probability = Math.min(riskScore, 100)
    
    // Determine risk level
    let riskLevel = 'Low'
    let riskColor = 'green'
    if (probability > 70) {
      riskLevel = 'Very High'
      riskColor = 'red'
    } else if (probability > 50) {
      riskLevel = 'High'
      riskColor = 'orange'
    } else if (probability > 30) {
      riskLevel = 'Moderate'
      riskColor = 'yellow'
    }
    
    const response = {
      message: `Heart attack risk assessment completed. Risk probability: ${probability.toFixed(1)}%`,
      Prediction_Probability_Percentage: probability,
      risk_level: riskLevel,
      risk_color: riskColor,
      risk_factors: riskFactors,
      recommendation: probability > 50 
        ? "High risk detected. Please consult a cardiologist immediately for comprehensive evaluation."
        : probability > 30
        ? "Moderate risk detected. Consider lifestyle modifications and regular check-ups with your healthcare provider."
        : "Low risk detected. Continue maintaining a healthy lifestyle and regular health monitoring.",
      model_source: "Fallback ML Model",
      accuracy_note: "This is a simplified risk assessment. For accurate diagnosis, please consult a healthcare professional."
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Fallback ML prediction error:', error)
    return NextResponse.json(
      { error: 'Failed to process prediction' },
      { status: 500 }
    )
  }
}
