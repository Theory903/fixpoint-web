'use client';
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const serviceOrders = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  customerName: `Customer ${index + 1}`,
  service: index % 3 === 0 ? "Oil Change" : index % 3 === 1 ? "Brake Repair" : "Engine Overhaul",
  assignedMechanic: index % 2 === 0 ? "Rajesh Kumar" : "Anita Verma",
  status: index % 4 === 0 ? "Completed" : index % 4 === 1 ? "In Progress" : "Pending",
  cost: `₹${(index + 1) * 1000}`,
}));

export default function ServiceOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredOrders = serviceOrders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const handleUpdateStatus = (id: number) => {
    alert(`Update status for service order with ID: ${id}`);
  };

  const handleViewDetails = (id: number) => {
    alert(`Viewing details for service order with ID: ${id}`);
  };

  return (
    <DefaultLayout>
      <div className="p-4 md:p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">
          Service Orders
        </h1>

        {/* Search Bar and Add Button */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search service orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600">
            Add New Service Order
          </button>
        </div>

        {/* Service Orders Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Customer Name
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Service
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Assigned Mechanic
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Cost
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {order.customerName}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {order.service}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {order.assignedMechanic}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {order.cost}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        order.status === "Completed"
                          ? "bg-green-500"
                          : order.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.id)}
                      className="text-green-500 hover:underline ml-4"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Service Orders Cards (Mobile) */}
        <div className="md:hidden space-y-4">
          {paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md space-y-2"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Customer:</strong> {order.customerName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Service:</strong> {order.service}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Mechanic:</strong> {order.assignedMechanic}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Cost:</strong> {order.cost}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    order.status === "Completed"
                      ? "bg-green-500"
                      : order.status === "In Progress"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleViewDetails(order.id)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => handleUpdateStatus(order.id)}
                  className="text-green-500 hover:underline text-sm"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center gap-4 mt-4 md:flex-row md:justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
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
