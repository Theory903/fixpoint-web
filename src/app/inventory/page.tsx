'use client';
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const inventoryItems = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  itemName: index % 3 === 0 ? "Engine Oil" : index % 3 === 1 ? "Brake Pads" : "Tires",
  stock: Math.floor(Math.random() * 200) + 10,
  predictedDemand: Math.floor(Math.random() * 150) + 20,
  restockDate: index % 4 === 0 ? "2024-11-25" : "2024-11-30",
  aiInsights:
    index % 3 === 0
      ? "High demand expected due to seasonal trends."
      : "Stock levels optimal for the next month.",
}));

export default function InventoryManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredItems = inventoryItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  const handleOrderStock = (id: number) => {
    alert(`AI has ordered stock for item with ID: ${id}`);
  };

  return (
    <DefaultLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold md:text-3xl">Inventory Management</h1>
          <p className="mt-2 text-sm md:text-base">
            AI-powered inventory management ensures optimal stock levels, predicts demand, and automates restocking for your garage.
          </p>
        </div>

        {/* Search and Add */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <span className="absolute top-2 right-3 text-gray-400">
              🔍
            </span>
          </div>
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600">
            ➕ Add New Item
          </button>
        </div>

        {/* Table for Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Item Name
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Stock
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Predicted Demand
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Restock Date
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  AI Insights
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {item.itemName}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        item.stock < 50
                          ? "bg-red-500"
                          : item.stock < 100
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {item.stock}
                    </span>
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {item.predictedDemand}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {item.restockDate}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {item.aiInsights}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    <button
                      onClick={() => handleOrderStock(item.id)}
                      className="text-blue-500 hover:underline"
                    >
                      AI Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for Mobile */}
        <div className="md:hidden space-y-4">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md"
            >
              <p className="text-sm font-bold text-gray-700 dark:text-white">
                {item.itemName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Stock:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    item.stock < 50
                      ? "bg-red-500"
                      : item.stock < 100
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {item.stock}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Predicted Demand:</strong> {item.predictedDemand}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Restock Date:</strong> {item.restockDate}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>AI Insights:</strong> {item.aiInsights}
              </p>
              <button
                onClick={() => handleOrderStock(item.id)}
                className="mt-2 text-blue-500 hover:underline text-sm"
              >
                AI Restock
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}
