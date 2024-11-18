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
import { Bar, Doughnut } from "react-chartjs-2"; // Ensure react-chartjs-2 is installed
import { formatCurrency } from "@/lib/formatCurrency"; // Helper for currency formatting
import Table from "@/components/common/Table"; // Reusable table component

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
      totalRevenue: 312450, // ₹3,12,450
      sparePartsSold: 1234,
      activeUsers: 245,
      receivedPayment: 45070, // ₹45,070
      duePayment: 32400, // ₹32,400
      revenueOverview: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        revenue: [50, 60, 75, 80, 100], // Revenue in thousands
        expenses: [30, 40, 50, 60, 70], // Expenses in thousands
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
          <p className="text-4xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p>
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
          <p className="text-4xl font-bold text-green-600">{formatCurrency(receivedPayment)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Due Payment</h2>
          <p className="text-4xl font-bold text-red-600">{formatCurrency(duePayment)}</p>
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
                  backgroundColor: "rgba(54, 162, 235, 0.7)", // Light Blue
                },
                {
                  label: "Expenses (₹ in Thousands)",
                  data: revenueOverview.expenses,
                  backgroundColor: "rgba(255, 99, 132, 0.7)", // Light Red
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
                    label: (tooltipItem) => `₹${tooltipItem.raw}K`, // Format tooltips
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
                    display: false, // Remove X-axis gridlines
                  },
                },
                y: {
                  ticks: {
                    callback: (value) => `₹${value}K`, // Format Y-axis ticks
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
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
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
