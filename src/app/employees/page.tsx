import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EmployeeManagement from "@/components/Dashboard/EmployeeManagement";

export const metadata: Metadata = {
  title: "Employee Management",
  description: "Manage employees, track attendance, and evaluate performance.",
};

export default function EmployeeManagementPage() {
  return (
    <DefaultLayout>
      <EmployeeManagement />
    </DefaultLayout>
  );
}
