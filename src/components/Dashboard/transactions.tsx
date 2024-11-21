"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TransactionDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"Day" | "Week" | "Month">("Week");
  interface ChartData {
    time: string;
    amount: number;
  }

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateData = (period: "Day" | "Week" | "Month") => {
    if (period === "Day") {
      return Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        amount: Math.floor(Math.random() * 1000) + 100,
      }));
    }
    if (period === "Week") {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => ({
        time: day,
        amount: Math.floor(Math.random() * 7000) + 2000,
      }));
    }
    if (period === "Month") {
      return Array.from({ length: 30 }, (_, i) => ({
        time: `Day ${i + 1}`,
        amount: Math.floor(Math.random() * 20000) + 5000,
      }));
    }
    return [];
  };

  const handlePeriodChange = (period: "Day" | "Week" | "Month") => {
    setIsLoading(true);
    setSelectedPeriod(period);

    setTimeout(() => {
      const data = generateData(period);
      setChartData(data);
      setIsLoading(false);
    }, 500);
  };

  const getLineChartData = () => ({
    labels: chartData.map((data) => data.time),
    datasets: [
      {
        label: `Transactions (${selectedPeriod})`,
        data: chartData.map((data) => data.amount),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 0.8)",
        tension: 0.3, // For a smooth line
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          font: {
            size: 12, // Adjusted for smaller screens
          },
          color: "#4B5563", // Neutral gray for text
        },
      },
      title: {
        display: true,
        text: `Transaction Overview (${selectedPeriod})`,
        font: {
          size: 14,
        },
        color: "#1F2937",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6B7280",
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#6B7280",
          font: {
            size: 10,
          },
        },
        grid: {
          color: "rgba(229, 231, 235, 0.4)",
        },
      },
    },
  };

  useEffect(() => {
    handlePeriodChange(selectedPeriod);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 sm:p-6">
      {/* Chart Card */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-xl">
            Transaction Line Chart ({selectedPeriod})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Time Period Selector */}
          <div className="flex flex-wrap space-x-2 mb-6">
            {(["Day", "Week", "Month"] as const).map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodChange(period)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors duration-200 
                  ${
                    period === selectedPeriod
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Line Chart */}
          <div className="h-64 sm:h-80 md:h-96">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : (
              <Line data={getLineChartData()} options={chartOptions} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionDashboard;