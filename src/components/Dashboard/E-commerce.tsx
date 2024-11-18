"use client";

import React, { useState } from "react";
import ChatCard from "../Chat/ChatCard";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChartThree from "../Charts/ChartThree";
import TableOne from "../Tables/TableOne";

const Dashboard: React.FC = () => {
  const [realTimeUpdates] = useState([
    { label: "Total Revenue", value: "₹3,12,450", change: "+5.45%" },
    { label: "Vehicles Serviced", value: "1,245", change: "+3.21%" },
    { label: "Spare Parts Sold", value: "1,234", change: "+2.59%" },
    { label: "Active Users", value: "245", change: "-1.35%" },
  ]);

  const [recentTransactions] = useState([
    {
      id: 1,
      date: "2024-11-20",
      description: "Engine Repair",
      amount: "₹12,000",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-11-18",
      description: "Oil Change",
      amount: "₹1,200",
      status: "Pending",
    },
    {
      id: 3,
      date: "2024-11-17",
      description: "Spare Parts Purchase",
      amount: "₹5,000",
      status: "Completed",
    },
  ]);

  const [salesFunnel] = useState([
    { stage: "Website Visits", count: 5000 },
    { stage: "Leads", count: 1200 },
    { stage: "Bookings", count: 800 },
    { stage: "Completed Services", count: 650 },
  ]);

  return (
    <div className="space-y-8">
      {/* Section 1: Real-time Updates */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {realTimeUpdates.map((update, index) => (
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
            {salesFunnel.map((stage, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{stage.stage}</span>
                <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {stage.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Recent Transactions */}
        <div className="col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Recent Transactions
          </h3>
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Date</th>
                <th className="p-3 border text-left">Description</th>
                <th className="p-3 border text-left">Amount</th>
                <th className="p-3 border text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
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


        {/* Chat Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <ChatCard />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
