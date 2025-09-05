import { createFileRoute } from '@tanstack/react-router'
import { NewOrganizationForm } from '@/features/dashboard/organisationDashboard/components/NewOrganizationForm'

export const Route = createFileRoute('/(dashboard)/(organisation)/organisationDashboard/new')({
  component: NewOrganizationForm,
})
