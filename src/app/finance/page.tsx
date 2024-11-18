import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FinancialReportsPage from "@/components/Dashboard/FinancialReportsPage";

export const metadata: Metadata = {
  title: "Dashboard Page",
  description: "E-commerce dashboard page for logged-in users.",
};

export default function DashboardPage() {
  return (
    <DefaultLayout>
      <FinancialReportsPage/>
    </DefaultLayout>
  );
}
