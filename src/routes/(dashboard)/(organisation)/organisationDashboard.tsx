import { createFileRoute } from '@tanstack/react-router'
import OrganisationDashboard from '../../../features/dashboard/organisationDashboard'

export const Route = createFileRoute('/(dashboard)/(organisation)/organisationDashboard')({
  component: OrganisationDashboard,
})
