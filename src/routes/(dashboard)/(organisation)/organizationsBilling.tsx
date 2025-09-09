import { createFileRoute } from '@tanstack/react-router'
import OrganisationBillings from '../../../features/dashboard/organisationDashboard/organisationBillings'

export const Route = createFileRoute(
  '/(dashboard)/(organisation)/organizationsBilling',
)({
  component: OrganisationBillings,
})


