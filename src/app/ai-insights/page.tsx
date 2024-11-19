'use client';
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const competitors = [
  { name: "Sharma Auto", pricing: "Competitive", services: ["Oil Change", "Engine Repair"], rating: 4.2 },
  { name: "Speedy Garage", pricing: "Slightly Higher", services: ["Brake Pads", "Tire Replacement"], rating: 3.9 },
  { name: "QuickFix Auto", pricing: "Budget-Friendly", services: ["Battery Replacement"], rating: 4.5 },
];

const inventory = [
  { name: "Engine Oil", stock: 120, status: "Optimal" },
  { name: "Brake Pads", stock: 40, status: "Low Stock" },
  { name: "Tires", stock: 10, status: "Critical" },
];

const goals = [
  {
    title: "Increase customer retention by 10%",
    details: "Focus on personalized services, loyalty programs, and follow-up reminders to improve satisfaction.",
  },
  {
    title: "Optimize service delivery times by 15%",
    details: "Streamline operations, introduce AI scheduling, and reduce waiting times for customers.",
  },
  {
    title: "Reduce inventory waste by 20%",
    details: "Implement just-in-time inventory systems and leverage AI predictions for better stock management.",
  },
];

export default function AIInsightsPage() {
  const [competitorFilter, setCompetitorFilter] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<{ title: string; details: string } | null>(null);

  const filteredCompetitors = competitors.filter((comp) =>
    comp.name.toLowerCase().includes(competitorFilter.toLowerCase())
  );

  const handleRestock = (itemName: string) => {
    alert(`Restocking action initiated for: ${itemName}`);
  };

  const handleExploreGoal = (goal: { title: string; details: string }) => {
    setSelectedGoal(goal);
  };

  const closeModal = () => {
    setSelectedGoal(null);
  };

  return (
    <DefaultLayout>
      <div className="p-4 md:p-6 space-y-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white">
          AI Insights
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Explore AI-driven insights to make data-backed decisions for your garage. These insights include competitor analysis, market trends, inventory predictions, and actionable goals.
        </p>

       {/* Geographical Trends */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
            Geographical Trends
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            AI identifies regions with high demand for services and potential market opportunities across India.
          </p>
          <div className="grid gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { region: "Delhi NCR", demand: "High", services: "Oil Changes, Engine Repairs" },
              { region: "Mumbai", demand: "Medium", services: "Tire Replacements" },
              { region: "Bangalore", demand: "High", services: "Eco-Friendly Services" },
            ].map((data, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {data.region}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Demand: <span className="font-bold text-blue-500">{data.demand}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Services: {data.services}
                  </p>
                </div>
                <button
                  onClick={() => alert(`Viewing detailed trends for ${data.region}`)}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  View Trends
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Market Capability */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
            Market Capability
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            AI predicts your ability to capture market share based on current performance and demand trends.
          </p>
          <div className="grid gap-4 mt-6">
            {[
              { region: "Delhi NCR", share: 30 },
              { region: "Mumbai", share: 25 },
              { region: "Bangalore", share: 20 },
            ].map((data, idx) => (
              <div key={idx} className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{data.region}</h3>
                <div className="relative w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-lg mt-2">
                  <div
                    className={`h-full rounded-lg ${
                      data.share > 25
                        ? "bg-green-500"
                        : data.share > 15
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${data.share}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Market Share: <span className="font-bold">{data.share}%</span>
                </p>
                <button
                  onClick={() => alert(`Analyzing market capability for ${data.region}`)}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Analyze Market
                </button>
              </div>
            ))}
          </div>
        </section>




        {/* Competitor Analysis */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
            Competitor Analysis
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Analyze your competitors&apos; pricing, services, and market positioning to stay ahead.
          </p>
          <input
            type="text"
            placeholder="Search competitors..."
            value={competitorFilter}
            onChange={(e) => setCompetitorFilter(e.target.value)}
            className="w-full md:w-1/3 p-2 my-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Competitor Name
                  </th>
                  <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Pricing
                  </th>
                  <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Services
                  </th>
                  <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCompetitors.map((comp, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                      {comp.name}
                    </td>
                    <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                      {comp.pricing}
                    </td>
                    <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                      {comp.services.join(", ")}
                    </td>
                    <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                      {comp.rating}/5
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Inventory Health */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
            Inventory Health
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            AI evaluates inventory levels and recommends restocking based on predicted demand.
          </p>
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {inventory.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Stock Status:
                  </p>
                  <span
                    className={`px-3 py-1 mt-1 inline-block text-sm font-medium rounded-full ${
                      item.status === "Optimal"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <button
                  onClick={() => handleRestock(item.name)}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Restock
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Goals and Recommendations */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
            Goals and Recommendations
          </h2>
          <ul className="space-y-4 mt-4">
            {goals.map((goal, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {goal.title}
                </span>
                <button
                  onClick={() => handleExploreGoal(goal)}
                  className="px-4 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Explore Strategy
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Modal for Goal Details */}
        {selectedGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {selectedGoal.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                {selectedGoal.details}
              </p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
