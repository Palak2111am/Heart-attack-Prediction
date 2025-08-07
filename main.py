from fastapi import FastAPI, HTTPException
import os
from dotenv import load_dotenv
from langchain_community.llms import HuggingFaceHub

# Load environment variables from .env file
load_dotenv()

# Get your Hugging Face API token
HUGGINGFACEHUB_API_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")
if not HUGGINGFACEHUB_API_TOKEN:
    raise ValueError("HUGGINGFACEHUB_API_TOKEN is missing in environment")

# Set up the LLM
llm = HuggingFaceHub(
    repo_id="google/flan-t5-large",
    model_kwargs={"temperature": 0.5, "max_length": 128},
    huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
)

# Initialize FastAPI
app = FastAPI()


@app.post("/predict_heart_attack")
async def predict_heart_attack(data: dict):
    try:
        # Construct the prompt from input
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

        # Use Hugging Face model to generate prediction
        prediction = llm.invoke(prompt)

        return {
            "prediction": prediction.strip()
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Run with: uvicorn app.fastapi_app:app --reload
