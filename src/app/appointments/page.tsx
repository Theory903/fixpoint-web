'use client';
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const appointments = [
  {
    id: 1,
    customerName: "Amit Sharma",
    date: "2024-11-01",
    time: "10:00 AM",
    service: "Oil Change",
    status: "Scheduled",
  },
  {
    id: 2,
    customerName: "Neha Verma",
    date: "2024-11-02",
    time: "11:30 AM",
    service: "Tire Replacement",
    status: "Completed",
  },
  {
    id: 3,
    customerName: "Rahul Singh",
    date: "2024-11-03",
    time: "02:00 PM",
    service: "Engine Repair",
    status: "Scheduled",
  },
  {
    id: 4,
    customerName: "Priya Gupta",
    date: "2024-11-04",
    time: "03:00 PM",
    service: "Battery Replacement",
    status: "Scheduled",
  },
  {
    id: 5,
    customerName: "Rohit Jain",
    date: "2024-11-05",
    time: "01:00 PM",
    service: "Brake Check",
    status: "Completed",
  },
  {
    id: 6,
    customerName: "Sonia Mehta",
    date: "2024-11-06",
    time: "09:30 AM",
    service: "Wheel Alignment",
    status: "Cancelled",
  },
  {
    id: 7,
    customerName: "Manish Agarwal",
    date: "2024-11-07",
    time: "12:00 PM",
    service: "Oil Change",
    status: "Completed",
  },
  {
    id: 8,
    customerName: "Anjali Kapoor",
    date: "2024-11-08",
    time: "04:30 PM",
    service: "Tire Replacement",
    status: "Scheduled",
  },
  {
    id: 9,
    customerName: "Karan Malhotra",
    date: "2024-11-09",
    time: "11:00 AM",
    service: "Car Wash",
    status: "Completed",
  },
  {
    id: 10,
    customerName: "Deepak Chauhan",
    date: "2024-11-10",
    time: "01:30 PM",
    service: "AC Repair",
    status: "Scheduled",
  },
];


export default function AppointmentsPage() {
  type Appointment = {
    id: number;
    customerName: string;
    date: string;
    time: string;
    service: string;
    status: string;
  };
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      customerName: "Amit Sharma",
      date: "2024-11-01",
      time: "10:00 AM",
      service: "Oil Change",
      status: "Scheduled",
    },
    {
      id: 2,
      customerName: "Neha Verma",
      date: "2024-11-02",
      time: "11:30 AM",
      service: "Tire Replacement",
      status: "Completed",
    },
    {
      id: 3,
      customerName: "Rahul Singh",
      date: "2024-11-03",
      time: "02:00 PM",
      service: "Engine Repair",
      status: "Scheduled",
    },
    {
      id: 4,
      customerName: "Priya Gupta",
      date: "2024-11-04",
      time: "03:00 PM",
      service: "Battery Replacement",
      status: "Scheduled",
    },
    {
      id: 5,
      customerName: "Rohit Jain",
      date: "2024-11-05",
      time: "01:00 PM",
      service: "Brake Check",
      status: "Completed",
    },
    {
      id: 6,
      customerName: "Sonia Mehta",
      date: "2024-11-06",
      time: "09:30 AM",
      service: "Wheel Alignment",
      status: "Cancelled",
    },
    {
      id: 7,
      customerName: "Manish Agarwal",
      date: "2024-11-07",
      time: "12:00 PM",
      service: "Oil Change",
      status: "Completed",
    },
    {
      id: 8,
      customerName: "Anjali Kapoor",
      date: "2024-11-08",
      time: "04:30 PM",
      service: "Tire Replacement",
      status: "Scheduled",
    },
    {
      id: 9,
      customerName: "Karan Malhotra",
      date: "2024-11-09",
      time: "11:00 AM",
      service: "Car Wash",
      status: "Completed",
    },
    {
      id: 10,
      customerName: "Deepak Chauhan",
      date: "2024-11-10",
      time: "01:30 PM",
      service: "AC Repair",
      status: "Scheduled",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    customerName: "",
    date: "",
    time: "",
    service: "",
    status: "Scheduled",
  });

  const rowsPerPage = 10;

  const filteredAppointments = appointments.filter((appointment: { customerName: string; date: string; time: string; service: string; status: string; }) => {
    const matchesSearch = appointment.customerName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate =
      !selectedDate ||
      appointment.date ===
        (selectedDate ? selectedDate.toISOString().split("T")[0] : "");
    return matchesSearch && matchesDate;
  });

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);

  const handleSchedule = () => {
    setShowModal(true);
  };

  const handleSaveAppointment = () => {
    if (
      newAppointment.customerName &&
      newAppointment.date &&
      newAppointment.time &&
      newAppointment.service
    ) {
      setAppointments([
        ...appointments,
        { id: appointments.length + 1, ...newAppointment },
      ]);
      setShowModal(false);
      setNewAppointment({
        customerName: "",
        date: "",
        time: "",
        service: "",
        status: "Scheduled",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <DefaultLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Appointments</h1>

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
            onClick={handleSchedule}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Schedule New Appointment
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <Calendar
            onChange={(value) => setSelectedDate(value as Date)}
            value={selectedDate}
            className="w-full"
          />
          {selectedDate && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Showing results for: {selectedDate.toDateString()}
            </p>
          )}
        </div>

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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
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
}