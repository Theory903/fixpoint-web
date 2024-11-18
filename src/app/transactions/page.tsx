import TransactionDashboard from "@/components/Dashboard/transactions";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title:
    "Dashboard Page",
  description: "",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
      <TransactionDashboard />
      </DefaultLayout>
    </>
  );
}
