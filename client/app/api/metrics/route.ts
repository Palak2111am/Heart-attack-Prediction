import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock metrics - replace with actual model metrics
    const mockMetrics = {
      accuracy: 0.85,
      precision: 0.82,
      recall: 0.88,
      f1_score: 0.85,
      auc_score: 0.91,
      confusion_matrix: [[45, 5], [8, 42]],
      feature_importance: {
        'chest_pain_type': 0.23,
        'max_heart_rate': 0.19,
        'st_depression': 0.16,
        'age': 0.14,
        'cholesterol': 0.12,
        'exercise_angina': 0.10,
        'blood_pressure': 0.06
      }
    }

    return NextResponse.json(mockMetrics)
  } catch (error) {
    console.error('Metrics Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch model metrics' },
      { status: 500 }
    )
  }
}
