// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\components\PredictionForm.tsx
'use client';
import { useState } from 'react';

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (error) {
      setPrediction('Error fetching prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Heart Attack Prediction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="capitalize text-sm font-semibold mb-1">{key}</label>
            <input
              id={key}
              name={key}
              type="text"
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {prediction && (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-100 text-lg">
          <strong>Prediction:</strong> {prediction}
        </div>
      )}
    </div>
  );
}
