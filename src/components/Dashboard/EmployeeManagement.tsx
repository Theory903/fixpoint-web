"use client";

import React, { useState } from "react";

const employees = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: `Employee ${index + 1}`,
  role: index % 3 === 0 ? "Manager" : index % 3 === 1 ? "Technician" : "Supervisor",
  attendance: `${Math.floor(Math.random() * 100)}%`,
  performance: index % 5 === 0 ? "Outstanding" : index % 5 === 1 ? "Good" : "Average",
  tags: index % 2 === 0 ? ["Reliable", "Team Player"] : ["Punctual", "Efficient"],
  status: index % 2 === 0 ? "Active" : "Inactive",
}));

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Management</h1>

      {/* Search Bar */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90">
          Add New Employee
        </button>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            <tr>
              <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                ID
              </th>
              <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Role
              </th>
              <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Attendance
              </th>
              <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Performance
              </th>
              <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tags
              </th>
              <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">{employee.id}</td>
                <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">{employee.name}</td>
                <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      employee.role === "Manager"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600"
                        : employee.role === "Technician"
                        ? "bg-gradient-to-r from-green-500 to-teal-500"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500"
                    }`}
                  >
                    {employee.role}
                  </span>
                </td>
                <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                  {employee.attendance}
                </td>
                <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      employee.performance === "Outstanding"
                        ? "bg-green-500"
                        : employee.performance === "Good"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {employee.performance}
                  </span>
                </td>
                <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                  {employee.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 mr-1 rounded-full bg-gray-200 dark:bg-gray-600 text-xs text-gray-800 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      employee.status === "Active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;