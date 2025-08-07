// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\app\api\chatbot\route.ts
import { NextRequest, NextResponse } from 'next/server'

// Define the structure of a chat message for type safety
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// Define the expected structure of the request body from the frontend
interface ChatRequest {
  message: string
  history?: ChatMessage[]
}

// Environment variable for the FastAPI backend URL
const FASTAPI_BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000';

/**
 * POST handler for the chatbot API route.
 * This function receives a message from the client, forwards it to the Python
 * FastAPI backend, and streams the response back to the client.
 */
export async function POST(request: NextRequest) {
  try {
    const { message, history = [] }: ChatRequest = await request.json()

    // Validate that the message is not empty
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // The API key check is now handled by the Python backend.
    // We no longer need to check for process.env.GEMINI_API_KEY here.

    console.log(`Forwarding message to FastAPI backend at ${FASTAPI_BACKEND_URL}`);

    // Make a POST request to the new /chat endpoint in the FastAPI backend
    const response = await fetch(`${FASTAPI_BACKEND_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        history: history // Forwarding history for context
      }),
    });

    // Handle non-successful responses from the backend
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ detail: 'Unknown error from backend.' }));
      console.error(`FastAPI backend error: ${response.status}`, errorBody);
      // Forward the specific error message from the backend if available
      const errorMessage = errorBody.detail || `The AI service returned an error (Status: ${response.status}).`;
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const data = await response.json();

    // Return the response from the FastAPI backend to the client
    return NextResponse.json({
      response: data.response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot API route error:', error);
    // Handle network errors or other unexpected issues
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
        return NextResponse.json(
            { error: `Could not connect to the backend service at ${FASTAPI_BACKEND_URL}. Please ensure it's running.` },
            { status: 503 } // Service Unavailable
        );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    )
  }
}
