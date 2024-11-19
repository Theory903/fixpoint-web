"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const customers = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Customer ${index + 1}`,
  email: `customer${index + 1}@example.com`,
  phone: `+91 98765 ${String(index).padStart(4, "0")}`,
}));

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

  const handleDelete = (id:number) => {
    alert(`Deleted customer with ID: ${id}`);
  };

  const handleView = (id:number) => {
    alert(`Viewing details for customer with ID: ${id}`);
  };

  return (
    <DefaultLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl">
          Customer Management
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 md:w-1/3"
            aria-label="Search customers"
          />
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg md:w-auto hover:bg-blue-600"
            aria-label="Add New Customer"
          >
            Add New Customer
          </button>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="hidden w-full border-collapse border border-gray-300 dark:border-gray-700 md:table">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 border dark:text-gray-300">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 border dark:text-gray-300">
                  Email
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 border dark:text-gray-300">
                  Phone
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700 border dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-4 text-sm text-gray-600 border dark:text-gray-400">
                      {customer.name}
                    </td>
                    <td className="p-4 text-sm text-gray-600 border dark:text-gray-400">
                      {customer.email}
                    </td>
                    <td className="p-4 text-sm text-gray-600 border dark:text-gray-400">
                      {customer.phone}
                    </td>
                    <td className="p-4 text-sm text-gray-600 border dark:text-gray-400">
                      <button
                        onClick={() => handleView(customer.id)}
                        className="text-blue-500 hover:underline"
                        aria-label={`View details for ${customer.name}`}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="ml-4 text-red-500 hover:underline"
                        aria-label={`Delete ${customer.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile View */}
          <div className="flex flex-col space-y-4 md:hidden">
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="p-4 space-y-2 bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Name: </strong>
                    {customer.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Email: </strong>
                    {customer.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Phone: </strong>
                    {customer.phone}
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleView(customer.id)}
                      className="text-sm text-blue-500 hover:underline"
                      aria-label={`View details for ${customer.name}`}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="text-sm text-red-500 hover:underline"
                      aria-label={`Delete ${customer.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No customers found.
              </p>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center gap-4 mt-4 md:flex-row md:justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
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
                ? "bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
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
