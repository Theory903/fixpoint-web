"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface RevenueOverview {
  labels: string[];
  revenue: number[];
  expenses: number[];
}

interface ServicePerformance {
  service: string;
  count: number;
}

interface ReportData {
  totalVehiclesServiced: number;
  totalRevenue: number;
  sparePartsSold: number;
  activeUsers: number;
  receivedPayment: number;
  duePayment: number;
  revenueOverview: RevenueOverview;
  servicePerformance: ServicePerformance[];
}

export default function FinancialReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    const data = {
      totalVehiclesServiced: 1245,
      totalRevenue: 312450,
      sparePartsSold: 1234,
      activeUsers: 245,
      receivedPayment: 45070,
      duePayment: 32400,
      revenueOverview: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        revenue: [50, 60, 75, 80, 100],
        expenses: [30, 40, 50, 60, 70],
      },
      servicePerformance: [
        { service: "Oil Change", count: 350 },
        { service: "Tyre Replacement", count: 200 },
        { service: "General Service", count: 450 },
        { service: "Engine Repair", count: 245 },
      ],
    };

    setReportData(data);
  }, []);

  if (!reportData) {
    return <p>Loading...</p>;
  }

  const {
    totalVehiclesServiced,
    totalRevenue,
    sparePartsSold,
    activeUsers,
    receivedPayment,
    duePayment,
    revenueOverview,
    servicePerformance,
  } = reportData;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Financial Reports</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Vehicles Serviced</h2>
          <p className="text-4xl font-bold text-green-600">{totalVehiclesServiced}</p>
          <p className="text-sm text-gray-500">3.21% Increase</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-4xl font-bold text-blue-600">{`₹${totalRevenue.toLocaleString()}`}</p>
          <p className="text-sm text-gray-500">5.45% Increase</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Spare Parts Sold</h2>
          <p className="text-4xl font-bold text-yellow-600">{sparePartsSold}</p>
          <p className="text-sm text-gray-500">2.59% Increase</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="text-4xl font-bold text-red-600">{activeUsers}</p>
          <p className="text-sm text-gray-500">-1.35% Decrease</p>
        </div>
      </div>

      {/* Payment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Received Payment</h2>
          <p className="text-4xl font-bold text-green-600">{`₹${receivedPayment.toLocaleString()}`}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Due Payment</h2>
          <p className="text-4xl font-bold text-red-600">{`₹${duePayment.toLocaleString()}`}</p>
        </div>
      </div>

      {/* Revenue Overview Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Monthly Revenue vs Expenses</h2>
        <div style={{ height: "200px" }}>
          <Bar
            data={{
              labels: revenueOverview.labels,
              datasets: [
                {
                  label: "Revenue (₹ in Thousands)",
                  data: revenueOverview.revenue,
                  backgroundColor: "rgba(0, 128, 0, 0.7)", // Green
                },
                {
                  label: "Expenses (₹ in Thousands)",
                  data: revenueOverview.expenses,
                  backgroundColor: "rgba(255, 0, 0, 0.7)", // Red
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    font: {
                      size: 10,
                    },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `₹${tooltipItem.raw}K`,
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
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
                    callback: (value) => `₹${value}K`,
                    font: {
                      size: 10,
                    },
                  },
                  grid: {
                    color: "rgba(200, 200, 200, 0.3)",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Service Performance Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Service Performance This Week</h2>
        <div style={{ height: "200px", position: "relative" }}>
          <Doughnut
            data={{
              labels: servicePerformance.map((item) => item.service),
              datasets: [
                {
                  data: servicePerformance.map((item) => item.count),
                  backgroundColor: [
                    "rgba(0, 128, 0, 0.6)", // Green
                    "rgba(255, 0, 0, 0.6)", // Red
                    "rgba(0, 0, 255, 0.6)", // Blue
                    "rgba(255, 165, 0, 0.6)", // Orange
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    font: {
                      size: 10,
                    },
                  },
                },
              },
              animation: {
                duration: 1500,
                easing: "easeOutBounce",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}