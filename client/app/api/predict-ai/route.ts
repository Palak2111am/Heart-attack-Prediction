import { NextRequest, NextResponse } from 'next/server'

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
    
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured')
      return NextResponse.json(
        { error: 'AI service is not configured. Please add your Gemini API key to environment variables.' },
        { status: 500 }
      )
    }

    // Validate API key format
    if (!apiKey.startsWith('AIza')) {
      console.error('Invalid API key format')
      return NextResponse.json(
        { error: 'Invalid API key format. Please check your Gemini API key.' },
        { status: 500 }
      )
    }

    // Create detailed medical analysis prompt
    const medicalPrompt = `As a medical AI assistant, analyze the following cardiovascular health parameters and provide a comprehensive risk assessment:

Patient Data:
- Age: ${data.age} years
- Sex: ${data.sex === 1 ? 'Male' : 'Female'}
- Chest Pain Type: ${getChestPainType(data.cp)}
- Resting Blood Pressure: ${data.trestbps} mmHg
- Cholesterol Level: ${data.chol} mg/dl
- Fasting Blood Sugar > 120 mg/dl: ${data.fbs === 1 ? 'Yes' : 'No'}
- Resting ECG: ${getECGType(data.restecg)}
- Maximum Heart Rate: ${data.thalach} bpm
- Exercise Induced Angina: ${data.exang === 1 ? 'Yes' : 'No'}
- ST Depression: ${data.oldpeak}
- ST Slope: ${getSlopeType(data.slope)}
- Major Vessels (0-3): ${data.ca}
- Thalassemia: ${getThalType(data.thal)}

Please provide:
1. **Risk Assessment**: Overall cardiovascular risk level (Low/Moderate/High/Very High)
2. **Key Risk Factors**: Identify the most concerning parameters
3. **Protective Factors**: Identify any positive health indicators
4. **Lifestyle Recommendations**: Specific actionable advice
5. **Medical Follow-up**: When to see a healthcare provider
6. **Emergency Signs**: Warning signs that require immediate attention

Keep the analysis professional, evidence-based, and include appropriate medical disclaimers.`

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: medicalPrompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3, // Lower temperature for more consistent medical advice
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1500,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    }

    console.log('Making request to Gemini API for medical analysis...')
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    )

    const responseText = await response.text()
    console.log('Gemini API response status:', response.status)
    
    if (!response.ok) {
      console.error('Gemini API error:', response.status, responseText)
      
      let errorMessage = 'AI analysis service is temporarily unavailable.'
      
      try {
        const errorData = JSON.parse(responseText)
        if (errorData.error?.message) {
          if (errorData.error.message.includes('API key not valid')) {
            errorMessage = 'Invalid API key. Please check your Gemini API key configuration.'
          } else if (errorData.error.message.includes('quota')) {
            errorMessage = 'API quota exceeded. Please try again later.'
          }
        }
      } catch (parseError) {
        console.error('Error parsing error response:', parseError)
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      )
    }

    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Error parsing response:', parseError)
      return NextResponse.json(
        { error: 'Invalid response from AI service.' },
        { status: 500 }
      )
    }
    
    if (!responseData.candidates || responseData.candidates.length === 0) {
      console.error('No candidates in response:', responseData)
      return NextResponse.json(
        { error: 'No analysis generated. Please try again.' },
        { status: 500 }
      )
    }

    const candidate = responseData.candidates[0]
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      console.error('Invalid candidate structure:', candidate)
      return NextResponse.json(
        { error: 'Invalid response structure from AI service.' },
        { status: 500 }
      )
    }

    const aiAnalysis = candidate.content.parts[0].text

    if (!aiAnalysis || aiAnalysis.trim().length === 0) {
      return NextResponse.json(
        { error: 'Empty response from AI service. Please try again.' },
        { status: 500 }
      )
    }

    // Add medical disclaimer
    const analysisWithDisclaimer = aiAnalysis + 
      "\n\n⚠️ **IMPORTANT MEDICAL DISCLAIMER**: This AI analysis is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for personalized medical guidance."

    return NextResponse.json({
      prediction: analysisWithDisclaimer,
      analysis_type: "AI-Powered Medical Analysis",
      model_used: "Gemini 1.5 Flash",
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('AI Prediction Error:', error)
    return NextResponse.json(
      { error: 'Failed to process AI analysis request' },
      { status: 500 }
    )
  }
}

// Helper functions to convert numeric codes to readable text
function getChestPainType(cp: number): string {
  switch (cp) {
    case 0: return 'Typical Angina'
    case 1: return 'Atypical Angina'
    case 2: return 'Non-Anginal Pain'
    case 3: return 'Asymptomatic'
    default: return 'Unknown'
  }
}

function getECGType(restecg: number): string {
  switch (restecg) {
    case 0: return 'Normal'
    case 1: return 'ST-T Wave Abnormality'
    case 2: return 'Left Ventricular Hypertrophy'
    default: return 'Unknown'
  }
}

function getSlopeType(slope: number): string {
  switch (slope) {
    case 0: return 'Downsloping'
    case 1: return 'Flat'
    case 2: return 'Upsloping'
    default: return 'Unknown'
  }
}

function getThalType(thal: number): string {
  switch (thal) {
    case 1: return 'Fixed Defect'
    case 2: return 'Normal'
    case 3: return 'Reversible Defect'
    default: return 'Unknown'
  }
}
