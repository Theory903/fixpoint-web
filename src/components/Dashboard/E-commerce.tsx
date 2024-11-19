"use client";

import React, { useState } from "react";
import ChatCard from "../Chat/ChatCard";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";

type OutletData = {
  [key: string]: {
    realTimeUpdates: { label: string; value: string; change: string }[];
    recentTransactions: { id: number; date: string; description: string; amount: string; status: string }[];
    salesFunnel: { stage: string; count: number }[];
  };
};

const outletData: OutletData = {
  "Main Branch": {
    realTimeUpdates: [
      { label: "Total Revenue", value: "₹5,00,000", change: "+7.45%" },
      { label: "Vehicles Serviced", value: "1,450", change: "+4.21%" },
      { label: "Spare Parts Sold", value: "1,800", change: "+6.59%" },
      { label: "Active Users", value: "320", change: "+2.35%" },
    ],
    recentTransactions: [
      {
        id: 1,
        date: "2024-11-20",
        description: "Premium Service Package",
        amount: "₹25,000",
        status: "Completed",
      },
      {
        id: 2,
        date: "2024-11-18",
        description: "Brake Replacement",
        amount: "₹5,500",
        status: "Pending",
      },
      {
        id: 3,
        date: "2024-11-17",
        description: "Tire Purchase",
        amount: "₹8,000",
        status: "Completed",
      },
    ],
    salesFunnel: [
      { stage: "Website Visits", count: 8000 },
      { stage: "Leads", count: 2000 },
      { stage: "Bookings", count: 1200 },
      { stage: "Completed Services", count: 1000 },
    ],
  },
  "Downtown Store": {
    realTimeUpdates: [
      { label: "Total Revenue", value: "₹2,50,000", change: "+3.45%" },
      { label: "Vehicles Serviced", value: "700", change: "+2.21%" },
      { label: "Spare Parts Sold", value: "900", change: "+1.59%" },
      { label: "Active Users", value: "150", change: "-0.35%" },
    ],
    recentTransactions: [
      {
        id: 1,
        date: "2024-11-19",
        description: "Oil Change",
        amount: "₹1,200",
        status: "Completed",
      },
      {
        id: 2,
        date: "2024-11-18",
        description: "Battery Replacement",
        amount: "₹6,000",
        status: "Pending",
      },
      {
        id: 3,
        date: "2024-11-17",
        description: "Wheel Alignment",
        amount: "₹2,500",
        status: "Completed",
      },
    ],
    salesFunnel: [
      { stage: "Website Visits", count: 3000 },
      { stage: "Bookings", count: 500 },
      { stage: "Completed Services", count: 400 },
    ],
  },
};


const Dashboard: React.FC = () => {
  const [selectedOutlet, setSelectedOutlet] = useState("Main Branch");
  const data = outletData[selectedOutlet];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Insights and performance metrics for the{" "}
            <span className="font-bold">{selectedOutlet}</span>.
          </p>
        </div>
        <select
          value={selectedOutlet}
          onChange={(e) => setSelectedOutlet(e.target.value)}
          className="mt-4 lg:mt-0 px-4 py-2 border border-gray-300 rounded-lg shadow focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        >
          {Object.keys(outletData).map((outlet) => (
            <option key={outlet} value={outlet}>
              {outlet}
            </option>
          ))}
        </select>
      </header>

      {/* Section 1: Real-time Updates */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {data.realTimeUpdates.map((update, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {update.label}
            </h3>
            <p className="text-4xl font-bold">{update.value}</p>
            <p
              className={`text-sm ${
                update.change.startsWith("+")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {update.change}
            </p>
          </div>
        ))}
      </section>

      {/* Section 2: Analytics and Insights */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue vs Expenses Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Monthly Revenue vs Expenses
          </h3>
          <ChartOne />
        </div>

        {/* Sales Funnel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Sales Funnel
          </h3>
          <div className="space-y-4">
            {data.salesFunnel.map((stage, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300"
              >
                <span>{stage.stage}</span>
                <span className="text-lg font-semibold">{stage.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Transactions and Chats */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Recent Transactions
          </h3>
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 border text-left">Date</th>
                <th className="p-3 border text-left">Description</th>
                <th className="p-3 border text-left">Amount</th>
                <th className="p-3 border text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{transaction.date}</td>
                  <td className="p-3 border">{transaction.description}</td>
                  <td className="p-3 border">{transaction.amount}</td>
                  <td
                    className={`p-3 border ${
                      transaction.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {transaction.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chats Section */}
        <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow">
          <ChatCard />
        </div>
      </section>

      {/* Section 4: Expense Breakdown */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Expense Breakdown
        </h3>
        <ChartTwo />
      </section>
    </div>
  );
};

export default Dashboard;
