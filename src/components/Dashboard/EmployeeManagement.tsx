"use client";

import React, { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  role: string;
  attendance: string;
  performance: string;
  tags: string[];
  status: string;
}

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    attendance: "",
    performance: "",
    tags: [] as string[],
    status: "Active",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees from the backend
  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5001/api/employees");
      if (!response.ok) throw new Error("Failed to fetch employees.");
      const data = await response.json();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new employee
  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.role || !newEmployee.attendance || !newEmployee.performance) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newEmployee, id: employees.length + 1 }),
      });

      if (!response.ok) throw new Error("Failed to add employee.");

      fetchEmployees(); // Refresh the list
      setShowAddForm(false); // Hide the form
      setNewEmployee({ name: "", role: "", attendance: "", performance: "", tags: [], status: "Active" });
    } catch (err) {
      console.error(err);
      alert("Could not add employee.");
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-8 md:p-6">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl">
        Employee Management
      </h1>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Spinner */}
      {loading && <p className="text-blue-500">Loading employees...</p>}

      {/* Search Bar */}
      <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <input
          type="text"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90"
        >
          {showAddForm ? "Cancel" : "Add New Employee"}
        </button>
      </div>

      {/* Add Employee Form */}
      {showAddForm && (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="Role"
            value={newEmployee.role}
            onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="Attendance (%)"
            value={newEmployee.attendance}
            onChange={(e) => setNewEmployee({ ...newEmployee, attendance: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="Performance"
            value={newEmployee.performance}
            onChange={(e) => setNewEmployee({ ...newEmployee, performance: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button
            onClick={handleAddEmployee}
            className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:opacity-90"
          >
            Save Employee
          </button>
        </div>
      )}

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="hidden bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 md:table-header-group">
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
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="p-4 border">{employee.id}</td>
                  <td className="p-4 border">{employee.name}</td>
                  <td className="p-4 border">{employee.role}</td>
                  <td className="p-4 border">{employee.attendance}</td>
                  <td className="p-4 border">{employee.performance}</td>
                  <td className="p-4 border">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        employee.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-sm text-gray-600 dark:text-gray-400"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;