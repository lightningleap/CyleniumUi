import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "../../features/dashboard/adminDashboard";

export const Route = createFileRoute("/(dashboard)/adminDashboard")({
  component: AdminDashboard,
});
