'use client';
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const initialInventoryItems = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  itemName: index % 3 === 0 ? "Engine Oil" : index % 3 === 1 ? "Brake Pads" : "Tyres",
  stock: Math.floor(Math.random() * 200) + 10,
  predictedDemand: Math.floor(Math.random() * 150) + 20,
  restockDate: index % 4 === 0 ? "2024-11-25" : "2024-11-30",
  aiInsights:
    index % 3 === 0
      ? "High demand expected due to seasonal trends."
      : "Stock levels optimal for the next month.",
}));

export default function InventoryManagementPage() {
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: "",
    stock: "",
    predictedDemand: "",
    restockDate: "",
    aiInsights: "No insights available yet.",
  });

  const rowsPerPage = 10;

  const filteredItems = inventoryItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  const handleAddNewItem = () => {
    setInventoryItems((prevItems) => [
      ...prevItems,
      {
        ...newItem,
        id: prevItems.length + 1,
        stock: Number(newItem.stock),
        predictedDemand: Number(newItem.predictedDemand),
      },
    ]);
    setShowModal(false);
    setNewItem({
      itemName: "",
      stock: "",
      predictedDemand: "",
      restockDate: "",
      aiInsights: "No insights available yet.",
    });
  };

  const handleOrderStock = (id: number) => {
    const updatedItems = inventoryItems.map((item) =>
      item.id === id
        ? { ...item, stock: item.stock + 50, aiInsights: "Stock replenished by AI." }
        : item
    );
    setInventoryItems(updatedItems);
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
            <span className="absolute top-2 right-3 text-gray-400">🔍</span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600"
          >
            ➕ Add New Item
          </button>
        </div>

        {/* Add New Item Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Add New Inventory Item
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newItem.itemName}
                  onChange={(e) =>
                    setNewItem({ ...newItem, itemName: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={newItem.stock}
                  onChange={(e) =>
                    setNewItem({ ...newItem, stock: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="number"
                  placeholder="Predicted Demand"
                  value={newItem.predictedDemand}
                  onChange={(e) =>
                    setNewItem({ ...newItem, predictedDemand: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="date"
                  placeholder="Restock Date"
                  value={newItem.restockDate}
                  onChange={(e) =>
                    setNewItem({ ...newItem, restockDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNewItem}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Table */}
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
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  <td className="p-4 border">{item.itemName}</td>
                  <td className="p-4 border">
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
                  <td className="p-4 border">{item.predictedDemand}</td>
                  <td className="p-4 border">{item.restockDate}</td>
                  <td className="p-4 border">{item.aiInsights}</td>
                  <td className="p-4 border">
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

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className={`px-4 py-2 ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
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
