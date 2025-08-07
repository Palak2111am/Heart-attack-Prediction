// C:\Users\Home\com.lang.practice\Heart_Attack_Prediction\client\app\dashboard\page.tsx
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { Scatter, Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Legend } from "chart.js";
import "chartjs-chart-box-and-violin-plot";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Legend); // Register BoxPlot components

const sampleData = [
    { age: 63, sex: 1, cp: 3, chol: 233 },
    { age: 37, sex: 1, cp: 2, chol: 250 },
    { age: 41, sex: 0, cp: 1, chol: 204 },
    { age: 68, sex: 1, cp: 0, chol: 193 },
    { age: 57, sex: 1, cp: 0, chol: 131 },
    { age: 57, sex: 0, cp: 1, chol: 236 },
];

// Chart data
const scatterData = {
    datasets: [
        {
            label: "Age vs Cholesterol",
            data: sampleData.map((d) => ({ x: d.age, y: d.chol })),
            backgroundColor: "rgba(34,197,94,0.6)",
        },
    ],
};

const barData = {
    labels: [...new Set(sampleData.map((d) => d.cp))],
    datasets: [
        {
            label: "Chest Pain Types",
            data: [...new Set(sampleData.map((d) => d.cp))].map((cp) =>
                sampleData.filter((d) => d.cp === cp).length
            ),
            backgroundColor: "rgba(59,130,246,0.6)",
        },
    ],
};

const histData = {
    labels: sampleData.map((d) => d.age),
    datasets: [
        {
            label: "Age Distribution",
            data: sampleData.map((d) => d.age),
            backgroundColor: "rgba(239,68,68,0.6)",
        },
    ],
};

// BoxPlot data for Age vs Cholesterol by Gender
const boxPlotData = {
    labels: ["Male", "Female"],
    datasets: [
        {
            label: "Cholesterol by Gender",
            backgroundColor: "rgba(59,130,246,0.6)",
            borderColor: "rgba(59,130,246,1)",
            borderWidth: 1,
            outlierColor: "#999999",
            padding: 10,
            itemRadius: 0,
            data: [
                sampleData.filter((d) => d.sex === 1).map((d) => d.chol),
                sampleData.filter((d) => d.sex === 0).map((d) => d.chol),
            ],
        },
    ],
};

// Example model accuracy (you can replace this with actual model accuracy)
const modelAccuracy = 0.85; // 85% accuracy

// Confusion matrix sample data as a simple table
const confusionMatrix = [
    [50, 10],
    [5, 35],
];

const confusionMatrixLabels = ["Negative", "Positive"];

// Correlation heatmap sample data
const correlationData = [
    [1, 0.2, -0.3, 0.5],
    [0.2, 1, -0.1, 0.4],
    [-0.3, -0.1, 1, -0.2],
    [0.5, 0.4, -0.2, 1],
];

const correlationLabels = ["Age", "Sex", "CP", "Chol"];

export default function DashboardPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">
                Data Visualization Dashboard
            </h1>

            {/* Model Accuracy Section */}
            <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-green-600">
                        Model Accuracy
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-lg font-semibold">
                        The model's accuracy is: <span className="text-green-600">{(modelAccuracy * 100).toFixed(2)}%</span>
                    </p>
                </CardContent>
            </Card>

            {/* Data Visualization Dashboard Section */}
            <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl text-green-600">
                        <BarChart className="h-6 w-6" />
                        Data Visualization Dashboard
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 text-center">
                            <h4 className="font-semibold text-gray-800 mb-2">
                                Scatter Plot: Age vs Cholesterol
                            </h4>
                            <Scatter data={scatterData} />
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 text-center">
                            <h4 className="font-semibold text-gray-800 mb-2">
                                Histogram: Age Distribution
                            </h4>
                            <Bar data={histData} />
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 text-center">
                            <h4 className="font-semibold text-gray-800 mb-2">
                                Bar Chart: Chest Pain Types
                            </h4>
                            <Bar data={barData} />
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 text-center">
                            <h4 className="font-semibold text-gray-800 mb-2">
                                Box Plot: Cholesterol by Gender
                            </h4>
                            <div className="bg-white rounded-md flex items-center justify-center">
                                <Bar
                                    data={boxPlotData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { display: true },
                                            title: { display: true, text: "Cholesterol Levels by Gender" },
                                        },
                                    }}
                                    width={400}
                                    height={200}
                                />
                            </div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 text-center">
                            <h4 className="font-semibold text-gray-800 mb-2">
                                Confusion Matrix
                            </h4>
                            <table className="mx-auto border border-gray-300">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {confusionMatrixLabels.map((label) => (
                                            <th key={label} className="border border-gray-300 px-4 py-2">{label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {confusionMatrix.map((row, i) => (
                                        <tr key={i}>
                                            <th className="border border-gray-300 px-4 py-2">{confusionMatrixLabels[i]}</th>
                                            {row.map((value, j) => (
                                                <td key={j} className="border border-gray-300 px-4 py-2">{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 text-center md:col-span-2">
                            <h4 className="font-semibold text-gray-800 mb-2">
                                Correlation Heatmap
                            </h4>
                            <div className="grid grid-cols-4 gap-2 mx-auto w-max">
                                {correlationLabels.map((rowLabel, rowIndex) =>
                                    correlationLabels.map((colLabel, colIndex) => {
                                        const value = correlationData[rowIndex][colIndex];
                                        const bgColor = value > 0 ? `rgba(34,197,94,${Math.abs(value)})` : `rgba(239,68,68,${Math.abs(value)})`;
                                        return (
                                            <div
                                                key={`${rowIndex}-${colIndex}`}
                                                className="w-12 h-12 flex items-center justify-center text-white font-semibold rounded"
                                                style={{ backgroundColor: bgColor }}
                                                title={`Correlation between ${rowLabel} and ${colLabel}: ${value.toFixed(2)}`}
                                            >
                                                {value.toFixed(2)}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
