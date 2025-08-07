# C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\app\ai_integration.py
import os
import httpx
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")  # Default to a modern model

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
GEMINI_API_ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
SYSTEM_PROMPT = """
You are LifeBeat, a friendly and knowledgeable AI Health Assistant.
Your goal is to provide clear, helpful, and safe information about heart health,
preventive care, and general wellness.

**Your instructions are:**
- **Be encouraging and empathetic.** Health topics can be sensitive.
- **Provide general educational information.** Do not give medical advice, diagnoses, or treatment plans.
- **Always include a disclaimer.** Remind users to consult a qualified healthcare professional for medical concerns.
- **Keep responses concise and easy to understand.** Avoid overly technical jargon.
- **If you don't know the answer, say so.** Do not make up information.
"""

headers = {
    "Content-Type": "application/json",
    "x-goog-api-key": GEMINI_API_KEY
}

async def generate_response(prompt: str, temperature: float = 0.7) -> str:
    """
    Generates a response from the Gemini API using a system prompt and user prompt.

    Args:
        prompt: The user's input prompt.
        temperature: The creativity of the response.

    Returns:
        The generated text response from Gemini.
    """
    if not GEMINI_API_KEY:
        logger.error("GEMINI_API_KEY is not set. Please check your .env file.")
        return "API key for Gemini is not configured. Please contact support."

    logger.info(f"Sending prompt to Gemini model '{GEMINI_MODEL}': {prompt}")

    payload = {
        "contents": [
            {"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
            {"role": "model", "parts": [{"text": "Understood. I am LifeBeat, your AI Health Assistant. How can I help you today?"}]},
            {"role": "user", "parts": [{"text": prompt}]}
        ],
        "generationConfig": {
            "temperature": temperature,
            "topK": 40,
            "topP": 0.95,
            "maxOutputTokens": 1024, # Increased for more detailed responses
        },
        "safetySettings": [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ]
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(GEMINI_API_ENDPOINT, headers=headers, json=payload)
            response.raise_for_status()
            result = response.json()

            # Handle cases where the response might be empty or lack candidates
            if not result.get('candidates'):
                logger.warning("Gemini API returned no candidates. Full response: %s", result)
                return "I'm sorry, I couldn't generate a response. Please try again."

            # Safely access the response content
            content = result['candidates'][0].get('content', {}).get('parts', [{}])[0].get('text', '')
            logger.info("Successfully received response from Gemini.")
            return content

    except httpx.HTTPStatusError as http_err:
        logger.error(f"HTTP error occurred: {http_err} - Response: {http_err.response.text}")
        return f"I'm sorry, but I'm facing a technical issue (HTTP {http_err.response.status_code}). Please try again later."
    except httpx.RequestError as req_err:
        logger.error(f"Request error occurred: {req_err}")
        return "I'm sorry, but I'm having trouble connecting to the server. Please check your network and try again."
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        return "An unexpected error occurred. Please try again later."
