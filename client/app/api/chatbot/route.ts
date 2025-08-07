// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\app\api\chatbot\route.ts
import { NextRequest, NextResponse } from 'next/server'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  message: string
  history?: ChatMessage[]
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] }: ChatRequest = await request.json()

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured')
      return NextResponse.json(
        { error: 'AI service is not configured. Please add your Gemini API key to environment variables.' },
        { status: 500 }
      )
    }

    // Validate API key format (should start with 'AIza')
    if (!apiKey.startsWith('AIza')) {
      console.error('Invalid API key format')
      return NextResponse.json(
        { error: 'Invalid API key format. Please check your Gemini API key.' },
        { status: 500 }
      )
    }

    // Create a comprehensive health-focused prompt
    const systemPrompt = `You are a helpful health assistant for LifeBeat, a heart attack prediction application. 
    Your role is to provide accurate, helpful information about:
    - Heart health and cardiovascular wellness
    - Heart attack symptoms and prevention
    - General health and wellness tips
    - Lifestyle recommendations for heart health
    - Basic medical information (non-diagnostic)

    Guidelines:
    - Always remind users that you're not a replacement for professional medical advice
    - Be encouraging and supportive
    - Provide practical, actionable advice
    - If asked about serious symptoms, advise seeking immediate medical attention
    - Keep responses concise but informative (2-3 paragraphs max)
    - Focus on prevention and healthy lifestyle choices
    - If asked about non-health topics, politely redirect to health-related questions

    Remember: You cannot diagnose conditions or provide specific medical treatment advice.`

    // Prepare the conversation for Gemini API
    const conversationText = `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: conversationText
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
        stopSequences: []
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

    console.log('Making request to Gemini API...')
    
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
      
      let errorMessage = 'AI service is temporarily unavailable. Please try again later.'
      
      try {
        const errorData = JSON.parse(responseText)
        if (errorData.error?.message) {
          if (errorData.error.message.includes('API key not valid')) {
            errorMessage = 'Invalid API key. Please check your Gemini API key configuration.'
          } else if (errorData.error.message.includes('quota')) {
            errorMessage = 'API quota exceeded. Please try again later.'
          } else {
            errorMessage = errorData.error.message
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

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Error parsing response:', parseError)
      return NextResponse.json(
        { error: 'Invalid response from AI service.' },
        { status: 500 }
      )
    }
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error('No candidates in response:', data)
      return NextResponse.json(
        { error: 'No response generated. Please try rephrasing your question.' },
        { status: 500 }
      )
    }

    const candidate = data.candidates[0]
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      console.error('Invalid candidate structure:', candidate)
      return NextResponse.json(
        { error: 'Invalid response structure from AI service.' },
        { status: 500 }
      )
    }

    const aiResponse = candidate.content.parts[0].text

    if (!aiResponse || aiResponse.trim().length === 0) {
      return NextResponse.json(
        { error: 'Empty response from AI service. Please try again.' },
        { status: 500 }
      )
    }

    // Add a disclaimer to medical-related responses
    const responseWithDisclaimer = aiResponse + 
      "\n\n💡 Remember: This information is for educational purposes only. Always consult with a healthcare professional for personalized medical advice."

    return NextResponse.json({
      response: responseWithDisclaimer,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Chatbot API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
