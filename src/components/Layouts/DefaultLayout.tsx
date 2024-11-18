"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  User,
  Calendar,
  Wrench,
  Users,
  BarChart,
  Database,
  FileText,
  CreditCard,
  Bell,
  Settings,
  MessageSquare,
  DollarSign,
  Shield,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Component({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState("main-branch");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const outlets = [
    { id: "main-branch", name: "Main Branch" },
    { id: "downtown", name: "Downtown Store" },
    { id: "mall-outlet", name: "Shopping Mall" },
    { id: "airport", name: "Airport Branch" },
  ];

  const navigationItems = [
    { name: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
    { name: "Financial Reports", icon: DollarSign, href: "/finance" },
    { name: "Employee Management", icon: Users, href: "/employees" },
    { name: "Customer Management", icon: User, href: "/customers" },
    { name: "Payments & Invoicing", icon: CreditCard, href: "/transactions" },
    { name: "Appointments", icon: Calendar, href: "/appointments" },
    { name: "Service Orders", icon: Wrench, href: "/service-orders" },
    { name: "Inventory Management", icon: Database, href: "/inventory" },
    { name: "Personalized AI Insights", icon: FileText, href: "/ai-insights" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const NavLink = ({ item }: { item: typeof navigationItems[0] }) => {
    const isActive =
      typeof window !== "undefined" && window.location.pathname === item.href;
    return (
      <a
        key={item.name}
        href={item.href}
        className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 rounded-lg mx-2 ${
          isActive
            ? "bg-primary text-white dark:bg-primary/90"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        title={sidebarOpen ? "" : item.name}
      >
        <item.icon className="h-5 w-5" />
        {sidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
      </a>
    );
  };

  return (
    <div className={`flex min-h-screen ${isDark ? "dark" : ""}`}>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${
          sidebarOpen ? "w-64" : "w-20"
        } h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out z-50 flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-800">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 pt-4 overflow-y-auto space-y-1">
          {navigationItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-900 shadow-sm">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Outlet Selector */}
          <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
            <SelectTrigger className="w-48 md:w-56 bg-opacity-80 bg-background border border-input rounded-lg">
              <SelectValue placeholder="Select outlet" />
            </SelectTrigger>
            <SelectContent className="bg-opacity-90 bg-background border border-input rounded-lg shadow-lg">
              {outlets.map((outlet) => (
                <SelectItem key={outlet.id} value={outlet.id}>
                  {outlet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
