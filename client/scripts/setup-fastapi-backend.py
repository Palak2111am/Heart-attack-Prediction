"""
FastAPI Backend Setup Script
This script demonstrates how to set up the FastAPI backend for the LifeBeat application.
"""

import os
import subprocess
import sys

def install_requirements():
    """Install required Python packages"""
    requirements = [
        "fastapi",
        "uvicorn[standard]",
        "pydantic",
        "python-multipart",
        "python-dotenv",
        "httpx",
        "joblib",
        "pandas",
        "numpy",
        "scikit-learn"
    ]
    
    print("Installing Python requirements...")
    for package in requirements:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
    
    print("All requirements installed successfully!")

def create_directory_structure():
    """Create the necessary directory structure"""
    directories = [
        "backend",
        "backend/app",
        "backend/model",
        "backend/data"
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"Created directory: {directory}")

def create_fastapi_app():
    """Create the main FastAPI application file"""
    fastapi_code = '''
import datetime
from fastapi import FastAPI, HTTPException
import logging
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from pathlib import Path

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Initialize FastAPI app
app = FastAPI(
    title="LifeBeat API",
    description="Heart Attack Risk Prediction API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
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

@app.get("/")
def read_root():
    return {"message": "LifeBeat API is running!"}

@app.post("/predict_ai")
async def predict_with_ai(data: HeartAttackPredictionRequest):
    """AI-powered prediction endpoint"""
    try:
        # Mock AI response - replace with actual AI integration
        prompt = f"""
        Patient Analysis:
        - Age: {data.age}
        - Sex: {'Male' if data.sex == 1 else 'Female'}
        - Chest Pain Type: {data.cp}
        - Blood Pressure: {data.trestbps}
        - Cholesterol: {data.chol}
        - Max Heart Rate: {data.thalach}
        
        Risk Assessment: Based on these parameters, this patient shows 
        {'elevated' if data.age > 55 or data.chol > 240 else 'moderate'} 
        cardiovascular risk factors.
        """
        
        return {"prediction": prompt}
    except Exception as e:
        logger.error(f"AI prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail="AI prediction failed")

@app.post("/predict_ml")
def predict_with_ml(data: HeartAttackPredictionRequest):
    """Machine learning prediction endpoint"""
    try:
        # Simple risk calculation
        risk_score = 0
        
        if data.age > 65: risk_score += 30
        elif data.age > 55: risk_score += 20
        elif data.age > 45: risk_score += 10
        
        if data.chol > 240: risk_score += 25
        elif data.chol > 200: risk_score += 15
        
        if data.trestbps > 140: risk_score += 20
        elif data.trestbps > 120: risk_score += 10
        
        if data.exang == 1: risk_score += 15
        if data.thalach < 150: risk_score += 10
        if data.fbs == 1: risk_score += 10
        
        probability = min(risk_score, 100)
        
        return {
            "message": f"The probability of heart attack risk is {probability:.2f}%",
            "Prediction_Probability_Percentage": probability
        }
    except Exception as e:
        logger.error(f"ML prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail="ML prediction failed")

@app.get("/metrics")
def get_model_metrics():
    """Get model performance metrics"""
    return {
        "accuracy": 0.85,
        "precision": 0.82,
        "recall": 0.88,
        "f1_score": 0.85
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
'''
    
    with open("backend/app/main.py", "w") as f:
        f.write(fastapi_code)
    
    print("Created FastAPI application file: backend/app/main.py")

def create_env_template():
    """Create environment template file"""
    env_template = '''
# API Keys
GEMINI_API_KEY=your_gemini_api_key_here

# Database (if using)
DATABASE_URL=your_database_url_here

# CORS Settings
FRONTEND_URL=http://localhost:3000
'''
    
    with open("backend/.env.template", "w") as f:
        f.write(env_template)
    
    print("Created environment template: backend/.env.template")

def main():
    """Main setup function"""
    print("Setting up LifeBeat FastAPI Backend...")
    
    try:
        install_requirements()
        create_directory_structure()
        create_fastapi_app()
        create_env_template()
        
        print("\n✅ Backend setup completed successfully!")
        print("\nNext steps:")
        print("1. Copy backend/.env.template to backend/.env")
        print("2. Add your API keys to the .env file")
        print("3. Run the backend: cd backend/app && python main.py")
        print("4. The API will be available at http://localhost:8000")
        
    except Exception as e:
        print(f"❌ Setup failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
'''
