import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function AIInsightsPage() {
  return (
    <DefaultLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          AI Insights
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore AI-driven insights to make data-backed decisions for your garage. These insights include competitor analysis, market trends, inventory predictions, and more.
        </p>

        {/* Geographical Trends */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Geographical Trends
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI identifies regions with high demand for services and potential market opportunities.
          </p>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-300">Map Visualization Placeholder</p>
          </div>
        </section>

        {/* Competitor Analysis */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Competitor Analysis
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze your competitors &apos; pricing, services, and market positioning to stay ahead.
          </p>
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
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    Sharma Auto
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    Competitive
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    Oil Change, Engine Repair
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    4.2/5
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    Speedy Garage
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    Slightly Higher
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    Brake Pads, Tire Replacement
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    3.9/5
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Market Capability */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Market Capability
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI predicts your ability to capture market share based on current performance and demand trends.
          </p>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-300">Market Share Chart Placeholder</p>
          </div>
        </section>

        {/* Inventory Insights */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Inventory Health
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI evaluates inventory levels and recommends restocking based on predicted demand.
          </p>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Engine Oil</span>
              <span className="px-2 py-1 text-sm text-white bg-green-500 rounded-full">Optimal</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Brake Pads</span>
              <span className="px-2 py-1 text-sm text-white bg-yellow-500 rounded-full">Low Stock</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Tires</span>
              <span className="px-2 py-1 text-sm text-white bg-red-500 rounded-full">Critical</span>
            </li>
          </ul>
        </section>

        {/* Goals and Recommendations */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Goals and Recommendations
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI suggests actionable goals to improve revenue, customer satisfaction, and efficiency.
          </p>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Increase customer retention by 10%</span>
              <button className="px-4 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Explore Strategy
              </button>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Optimize service delivery times by 15%</span>
              <button className="px-4 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Explore Strategy
              </button>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Reduce inventory waste by 20%</span>
              <button className="px-4 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Explore Strategy
              </button>
            </li>
          </ul>
        </section>
      </div>
    </DefaultLayout>
  );
}
