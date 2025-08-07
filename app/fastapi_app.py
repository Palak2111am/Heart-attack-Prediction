# C:\Users\Home\com.lang.practice\LifeBeat\app\fastapi_app.py

import datetime
from fastapi import FastAPI, HTTPException
import logging
from ai_integration import generate_response
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import numpy as np
import os
import json
from pathlib import Path
from typing import List, Optional

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Timestamp for logging
now = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')

# Initialize FastAPI app
app = FastAPI(
    title="LifeBeat API",
    description="API for Heart Attack Prediction and AI Health Assistant",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class HeartAttackPredictionRequest(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = None

# --- ML Model Loading ---
BASE_DIR = Path(__file__).parent.resolve()
MODEL_PATH = BASE_DIR / "model" / "Heart_Attack_model.joblib"
SCALER_PATH = BASE_DIR / "model" / "Heart_Attack_scaler.joblib"
METRICS_PATH = BASE_DIR / "model" / "metrics.json"

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    logger.info("Successfully loaded ML model and scaler.")
except FileNotFoundError:
    model = None
    scaler = None
    logger.error("ML model or scaler not found. Prediction endpoint will be disabled.")

# --- Helper Functions ---
def preprocess_input(data: HeartAttackPredictionRequest):
    if not scaler:
        raise HTTPException(status_code=500, detail="Scaler not loaded. Cannot preprocess data.")
    df = pd.DataFrame(data.dict(), index=[0])
    return scaler.transform(df)

# --- API Endpoints ---

# ✅ Endpoint 1: AI Chatbot
@app.post("/chat")
async def chat_with_assistant(request: ChatRequest):
    """
    Handles chat interactions with the LifeBeat Health Assistant.
    """
    try:
        # The new `generate_response` function handles the full conversation context.
        # We can enhance this later to include history for better context.
        response_text = await generate_response(request.message)
        return {"response": response_text}
    except Exception as e:
        logger.error(f"Error in /chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Failed to get response from AI assistant.")

# ✅ Endpoint 2: AI-based Risk Explanation
@app.post("/predict_ai")
async def predict_heart_attack_ai(data: HeartAttackPredictionRequest):
    """
    Provides an educational, AI-based explanation of heart disease risk.
    """
    try:
        prompt = f"""
        Analyze the following patient data and provide a general educational summary of potential heart health indicators.
        **Do not diagnose or predict.** Explain what each parameter means in simple terms and why it's relevant for heart health.

        - Age: {data.age}
        - Sex (1=male, 0=female): {data.sex}
        - Chest Pain Type (cp): {data.cp}
        - Resting Blood Pressure (trestbps): {data.trestbps}
        - Cholesterol (chol): {data.chol}
        - Fasting Blood Sugar > 120 mg/dl (fbs): {data.fbs}
        - Resting ECG (restecg): {data.restecg}
        - Max Heart Rate (thalach): {data.thalach}
        - Exercise Induced Angina (exang): {data.exang}
        - ST depression (oldpeak): {data.oldpeak}
        - Slope of peak exercise ST segment (slope): {data.slope}
        - Major vessels colored by fluoroscopy (ca): {data.ca}
        - Thalassemia (thal): {data.thal}

        Structure your response clearly. This is for educational purposes only.
        """
        prediction = await generate_response(prompt)
        return {"prediction": prediction}
    except Exception as e:
        logger.error(f"Error in /predict_ai endpoint: {e}")
        raise HTTPException(status_code=500, detail="Failed to get AI-based prediction.")

# ✅ Endpoint 3: ML Model Prediction
@app.post("/predict_ml")
def predict_heart_attack_ml(data: HeartAttackPredictionRequest):
    """
    Predicts the probability of a heart attack using the trained ML model.
    """
    if not model:
        raise HTTPException(status_code=500, detail="ML model not loaded. Cannot make a prediction.")
    try:
        preprocessed_data = preprocess_input(data)
        prediction_proba = model.predict_proba(preprocessed_data)
        probability = prediction_proba[0][1] * 100

        logger.info(f"ML Prediction Probability: {probability:.2f}%")

        return {
            "message": f"The model predicts a {probability:.2f}% probability of the patient having a heart attack.",
            "probability": probability,
        }
    except Exception as e:
        logger.error(f"Error in /predict_ml endpoint: {e}")
        raise HTTPException(status_code=500, detail="Failed to process the request with the ML model.")

# ✅ Endpoint 4: Model Metrics
@app.get("/metrics")
def get_metrics():
    """
    Retrieves the performance metrics of the trained ML model.
    """
    if not METRICS_PATH.exists():
        raise HTTPException(status_code=404, detail="Metrics file not found. Please train the model.")
    try:
        with open(METRICS_PATH, "r") as f:
            metrics = json.load(f)
        return metrics
    except Exception as e:
        logger.error(f"Error reading metrics: {e}")
        raise HTTPException(status_code=500, detail="Failed to read metrics file.")

# ✅ Run the app
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("fastapi_app:app", host="0.0.0.0", port=port, reload=True)
