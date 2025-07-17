"use client"

import { useState } from "react"
import Navigation from "./components/navigation"
import HomePage from "./home-page"
import LifebeatApp from "./lifebeat-app"
import PrecautionsPage from "./precautions-page"
import PrivacyPolicy from "./privacy-policy"
import PredictionForm from "./prediction-form"
import HealthCalculator from "./health-calculator"
import FeedbackPage from "./feedback-page"
import ContactMePage from "./contact-me-page"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPageChange={setCurrentPage} />
      case "lifebeat":
        return <LifebeatApp />
      case "prediction":
        return <PredictionForm />
      case "calculator":
        return <HealthCalculator />
      case "precautions":
        return <PrecautionsPage />
      case "feedback":
        return <FeedbackPage />
      case "contact":
        return <ContactMePage />
      case "privacy":
        return <PrivacyPolicy />
      default:
        return <HomePage onPageChange={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  )
}
