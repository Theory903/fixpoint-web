import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Dashboard/E-commerce";

export const metadata: Metadata = {
  title: "Dashboard Page",
  description: "E-commerce dashboard page for logged-in users.",
};

export default function DashboardPage() {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
