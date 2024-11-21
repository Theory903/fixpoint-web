"use client";

import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Appointment {
  id: number;
  customerName: string;
  date: string;
  time: string;
  service: string;
  status: string;
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newAppointment, setNewAppointment] = useState({
    customerName: "",
    date: "",
    time: "",
    service: "",
    status: "Scheduled",
  });

  const rowsPerPage = 10;

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [searchTerm, selectedDates, appointments]);

  // Fetch all appointments
  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5001/api/appointments");
      if (!response.ok) throw new Error("Failed to fetch appointments.");
      const data = await response.json();
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Filter appointments by search term and date range
  const filterAppointments = () => {
    let filtered = [...appointments];

    if (searchTerm) {
      filtered = filtered.filter((appointment) =>
        appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDates.length === 2) {
      const [start, end] = selectedDates;
      filtered = filtered.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= start && appointmentDate <= end;
      });
    }

    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset pagination when filters change
  };

  // Save a new appointment
  const handleSaveAppointment = async () => {
    if (!newAppointment.customerName || !newAppointment.date || !newAppointment.time || !newAppointment.service) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appointments.length + 1, ...newAppointment }),
      });

      if (response.ok) {
        fetchAppointments();
        setShowModal(false);
        setNewAppointment({ customerName: "", date: "", time: "", service: "", status: "Scheduled" });
      } else {
        alert("Failed to add appointment.");
      }
    } catch (err) {
      console.error("Error saving appointment:", err);
    }
  };

  // Highlight dates with appointments on the calendar
  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = date.toISOString().split("T")[0];
    return appointments.some((appointment) => appointment.date === dateString)
      ? "bg-blue-200"
      : null;
  };

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);

  return (
    <DefaultLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Appointments</h1>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Search Bar and Add Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Schedule New Appointment
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <Calendar
            onChange={(value) => setSelectedDates(Array.isArray(value) ? value.filter((v): v is Date => v instanceof Date) : [value as Date])}
            value={selectedDates.length === 2 ? [selectedDates[0], selectedDates[1]] : undefined}
            selectRange={true}
            tileClassName={tileClassName}
            className="w-full"
          />
          {selectedDates.length === 2 && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Showing results from: {selectedDates[0]?.toDateString()} to {selectedDates[1]?.toDateString()}
            </p>
          )}
        </div>

        {/* Loading Spinner */}
        {loading && <p className="text-center text-blue-500">Loading appointments...</p>}

        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Customer Name
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Date
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Time
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Service
                </th>
                <th className="p-4 border text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {appointment.customerName}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {appointment.date}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {appointment.time}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    {appointment.service}
                  </td>
                  <td className="p-4 border text-sm text-gray-600 dark:text-gray-400">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        appointment.status === "Completed"
                          ? "bg-green-500"
                          : appointment.status === "Cancelled"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
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
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500"
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
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Schedule Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Schedule Appointment</h2>
            <input
              type="text"
              placeholder="Customer Name"
              value={newAppointment.customerName}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, customerName: e.target.value })
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="date"
              value={newAppointment.date}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, date: e.target.value })
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="time"
              value={newAppointment.time}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, time: e.target.value })
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Service"
              value={newAppointment.service}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, service: e.target.value })
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAppointment}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default AppointmentsPage;