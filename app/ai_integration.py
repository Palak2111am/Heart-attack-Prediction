# C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\app\ai_integration.py

import os
import httpx
import logging
from dotenv import load_dotenv

# Load the API key
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GEMINI_API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

headers = {
    "Content-Type": "application/json",
    "x-goog-api-key": GEMINI_API_KEY
}

async def generate_response(prompt: str, temperature: float = 0.7) -> str:
    logger.info(f"Sending prompt to Gemini: {prompt}")

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "temperature": temperature,
            "topK": 40,
            "topP": 0.95,
            "maxOutputTokens": 150
        }
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(GEMINI_API_ENDPOINT, headers=headers, json=payload)
            response.raise_for_status()
            result = response.json()
            logger.info(f"Gemini Response: {result}")
            return result['candidates'][0]['content']['parts'][0]['text']

    except httpx.HTTPStatusError as http_err:
        logger.error(f"HTTP error occurred: {http_err} - Response content: {http_err.response.text}")
        return f"HTTP error: {http_err.response.status_code} - {http_err.response.text}"
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return f"Unexpected error: {str(e)}"
