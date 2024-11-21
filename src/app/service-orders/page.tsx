'use client';
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const initialServiceOrders = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  customerName: `Customer ${index + 1}`,
  service:
    index % 3 === 0
      ? "Oil Change"
      : index % 3 === 1
      ? "Brake Repair"
      : "Engine Overhaul",
  assignedMechanic: index % 2 === 0 ? "Rajesh Kumar" : "Anita Verma",
  status: index % 4 === 0 ? "Completed" : index % 4 === 1 ? "In Progress" : "Pending",
  cost: `₹${(index + 1) * 1000}`,
}));

export default function ServiceOrdersPage() {
  const [serviceOrders, setServiceOrders] = useState(initialServiceOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    service: "",
    assignedMechanic: "",
    cost: "",
    status: "Pending",
  });

  const rowsPerPage = 10;

  const filteredOrders = serviceOrders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const handleAddNewOrder = () => {
    setServiceOrders((prevOrders) => [
      ...prevOrders,
      {
        ...newOrder,
        id: prevOrders.length + 1,
      },
    ]);
    setShowModal(false);
    setNewOrder({
      customerName: "",
      service: "",
      assignedMechanic: "",
      cost: "",
      status: "Pending",
    });
  };

  serviceOrders.reduce<{ [key: string]: typeof serviceOrders }>((acc, order) => {
    if (!acc[order.assignedMechanic]) {
      acc[order.assignedMechanic] = [];
    }
    acc[order.assignedMechanic].push(order);
    return acc;
  }, {});

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
          <button
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Add New Service Order
          </button>
        </div>

        {/* Add New Order Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Add New Service Order
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={newOrder.customerName}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, customerName: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Service"
                  value={newOrder.service}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, service: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Assigned Mechanic"
                  value={newOrder.assignedMechanic}
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      assignedMechanic: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Cost"
                  value={newOrder.cost}
                  onChange={(e) =>
                    setNewOrder({ ...newOrder, cost: e.target.value })
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
                  onClick={handleAddNewOrder}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Service Orders Table */}
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
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td className="p-4 border">{order.customerName}</td>
                  <td className="p-4 border">{order.service}</td>
                  <td className="p-4 border">{order.assignedMechanic}</td>
                  <td className="p-4 border">{order.cost}</td>
                  <td className="p-4 border">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
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
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}
