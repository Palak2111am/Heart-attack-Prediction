"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Define the input structure for the prediction
interface HeartAttackPredictionRequest {
  age: number
  sex: number // 0 for female, 1 for male
  cp: number // Chest Pain Type (0-3)
  trestbps: number // Resting Blood Pressure
  chol: number // Cholesterol
  fbs: number // Fasting Blood Sugar (0 for <=120, 1 for >120)
  restecg: number // Resting Electrocardiographic Results (0-2)
  thalach: number // Maximum Heart Rate Achieved
  exang: number // Exercise Induced Angina (0 for No, 1 for Yes)
  oldpeak: number // ST Depression Induced by Exercise
  slope: number // Peak Exercise ST Segment Slope (0-2)
  ca: number // Number of Major Vessels Colored by Fluoroscopy (0-4)
  thal: number // Status of Thalassemia (0-2)
}

/**
 * Calls the backend FastAPI custom model prediction endpoint.
 */
export async function predictCustomModelBackend(data: HeartAttackPredictionRequest) {
  try {
    const response = await fetch("http://localhost:8000/predict_custom_model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return {
      risk: result.Prediction_Probability_Percentage > 60 ? "high" : result.Prediction_Probability_Percentage > 30 ? "moderate" : "low",
      percentage: Math.round(result.Prediction_Probability_Percentage),
      message: result.message,
    }
  } catch (error) {
    console.error("Error calling backend custom model:", error)
    return {
      risk: "error",
      percentage: 0,
      message: "Failed to get prediction from backend custom model. Please try again later.",
    }
  }
}

/**
 * Calls the backend FastAPI ChatGPT prediction endpoint.
 */
export async function predictChatGPTBackend(data: HeartAttackPredictionRequest) {
  try {
    const response = await fetch("http://localhost:8000/predict_chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return {
      risk: "unknown", // ChatGPT response is text, so risk is unknown
      percentage: 0,
      message: result.prediction || "No prediction message received.",
    }
  } catch (error) {
    console.error("Error calling backend ChatGPT model:", error)
    return {
      risk: "error",
      percentage: 0,
      message: "Failed to get prediction from backend ChatGPT model. Please try again later.",
    }
  }
}

// Existing mocked predictCustomModel function
export async function predictCustomModel(data: HeartAttackPredictionRequest) {
  // Simulate a delay for the prediction
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // --- START: Mocked ML Prediction Logic (replace with actual API call in production) ---
  const riskFactors = [
    data.age > 60 ? 1 : 0,
    data.sex === 1 ? 0.5 : 0,
    data.cp > 0 ? 1 : 0,
    data.trestbps > 140 ? 1 : 0,
    data.chol > 240 ? 1 : 0,
    data.fbs === 1 ? 0.5 : 0,
    data.exang === 1 ? 1 : 0,
    data.oldpeak > 2 ? 1 : 0,
    data.ca > 1 ? 1 : 0,
    data.thal > 0 ? 1 : 0,
  ]

  const totalRiskScore = riskFactors.reduce((sum, factor) => sum + factor, 0)
  const maxPossibleScore = 7.5
  const percentage = Math.min(Math.max((totalRiskScore / maxPossibleScore) * 100, 5), 95)

  let risk: "low" | "moderate" | "high"
  let message: string

  if (percentage < 30) {
    risk = "low"
    message = `Based on our custom model's analysis, your estimated heart attack risk is low (${percentage.toFixed(
      2,
    )}%). Continue maintaining a healthy lifestyle.`
  } else if (percentage < 60) {
    risk = "moderate"
    message = `Based on our custom model's analysis, your estimated heart attack risk is moderate (${percentage.toFixed(
      2,
    )}%). We recommend consulting with a healthcare provider for personalized advice.`
  } else {
    risk = "high"
    message = `Based on our custom model's analysis, your estimated heart attack risk is elevated (${percentage.toFixed(
      2,
    )}%). We strongly recommend consulting with a healthcare provider immediately.`
  }
  // --- END: Mocked ML Prediction Logic ---

  return {
    risk,
    percentage: Math.round(percentage),
    message,
  }
}

// Existing predictChatGPT function unchanged
export async function predictChatGPT(data: HeartAttackPredictionRequest) {
  const prompt = `Predict the probability of a heart attack with the following input. Provide a concise summary of the risk and any relevant advice.
  Age: ${data.age}
  Sex: ${data.sex === 1 ? "Male" : "Female"}
  Chest Pain Type: ${data.cp} (0=No Pain, 1=Typical Angina, 2=Atypical Angina, 3=Non-Anginal Pain)
  Resting Blood Pressure: ${data.trestbps} mm Hg
  Cholesterol: ${data.chol} mg/dl
  Fasting Blood Sugar > 120 mg/dl: ${data.fbs === 1 ? "Yes" : "No"}
  Resting Electrocardiographic Results: ${data.restecg} (0=Normal, 1=ST-T Abnormality, 2=LV Hypertrophy)
  Maximum Heart Rate Achieved: ${data.thalach} bpm
  Exercise Induced Angina: ${data.exang === 1 ? "Yes" : "No"}
  ST Depression Induced by Exercise: ${data.oldpeak}
  Peak Exercise ST Segment Slope: ${data.slope} (0=Upsloping, 1=Flat, 2=Downsloping)
  Number of Major Vessels Colored by Fluoroscopy: ${data.ca}
  Status of Thalassemia: ${data.thal} (0=Normal, 1=Fixed Defect, 2=Reversible Defect)

  Risk factors for heart attack are: smoking, high blood pressure, high cholesterol, obesity, diabetes, sedentary lifestyle, and family history.
  Provide a prediction of low, moderate, or high risk, and a brief explanation.
  `

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 200,
    })
    return {
      risk: "unknown",
      percentage: 0,
      message: text,
    }
  } catch (error) {
    console.error("Error calling ChatGPT:", error)
    return {
      risk: "error",
      percentage: 0,
      message: "Failed to get prediction from ChatGPT. Please try again later.",
    }
  }
}
