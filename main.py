from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from pydantic import BaseModel, validator
import os
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Get your Gemini API key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")  # default model

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing in environment")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(GEMINI_MODEL)

# Initialize FastAPI
app = FastAPI()

# Define data model with validation
class HeartAttackData(BaseModel):
    age: int
    sex: str
    chest_pain_type: str
    resting_blood_pressure: int
    cholesterol: int
    fasting_blood_sugar: int
    resting_ecg: str
    max_heart_rate: int
    exercise_induced_angina: str
    st_depression: float
    st_slope: str
    num_major_vessels: int
    thalassemia: str

    @validator('age')
    def age_must_be_positive(cls, value):
        if value <= 0:
            raise ValueError('Age must be a positive integer')
        return value

    @validator('sex', 'chest_pain_type', 'resting_ecg', 'exercise_induced_angina', 'st_slope', 'thalassemia')
    def string_must_not_be_empty(cls, value):
        if not value.strip():
            raise ValueError('String must not be empty')
        return value

@app.post("/predict_heart_attack")
async def predict_heart_attack(data: dict):
    try:
        # Construct prompt
        prompt = (
            f"Predict the chance of a heart attack for the following patient:\n"
            f"Age: {data['age']}\n"
            f"Sex: {data['sex']}\n"
            f"Chest Pain Type: {data['chest_pain_type']}\n"
            f"Resting Blood Pressure: {data['resting_blood_pressure']}\n"
            f"Cholesterol: {data['cholesterol']}\n"
            f"Fasting Blood Sugar: {data['fasting_blood_sugar']}\n"
            f"Resting ECG: {data['resting_ecg']}\n"
            f"Max Heart Rate: {data['max_heart_rate']}\n"
            f"Exercise Induced Angina: {data['exercise_induced_angina']}\n"
            f"ST Depression: {data['st_depression']}\n"
            f"ST Slope: {data['st_slope']}\n"
            f"Num Major Vessels: {data['num_major_vessels']}\n"
            f"Thalassemia: {data['thalassemia']}\n"
            f"Return the result as a percentage."
        )

        # Generate response from Gemini
        response = model.generate_content(prompt)
        prediction = response.text.strip()

        return {"prediction": prediction}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
