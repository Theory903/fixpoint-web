import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard Page",
  description: "E-commerce dashboard page for logged-in users.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
