'use client';
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    alert("You have been logged out.");
    // Add actual logout logic here
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <DefaultLayout>
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>

        {/* Account Settings */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Account Settings</h2>
          <div className="flex justify-between">
            <div className="text-gray-600 dark:text-gray-400">
              <p className="text-sm">Username:</p>
              <p className="font-medium">John Doe</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Edit
            </button>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-600 dark:text-gray-400">
              <p className="text-sm">Email:</p>
              <p className="font-medium">johndoe@example.com</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Edit
            </button>
          </div>
        </section>

        {/* Theme Preferences */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Theme Preferences</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">Enable Dark Mode</p>
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {darkMode ? "Enabled" : "Disabled"}
            </button>
          </div>
        </section>

        {/* Logout Button */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Logout</h2>
          <p className="text-gray-600 dark:text-gray-400">
            You can log out from your account. Make sure to save any unsaved work.
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </section>
      </div>
    </DefaultLayout>
  );
}
