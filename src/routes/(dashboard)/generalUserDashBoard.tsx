import { createFileRoute } from "@tanstack/react-router";
import GeneralUserDashboard from "../../features/dashboard/generalUserdashBoard";

export const Route = createFileRoute("/(dashboard)/generalUserDashBoard")({
  component: GeneralUserDashboard,
});
