import { createFileRoute } from '@tanstack/react-router'
import { NewOrganizationForm } from '@/features/dashboard/organisationDashboard/components/NewOrganizationForm'

export const Route = createFileRoute('/(dashboard)/organisationDashboard/new')({
  component: NewOrganizationForm,
})
