import { createFileRoute } from '@tanstack/react-router'
import OrganisationOperator from '../../../features/dashboard/organisationDashboard/organisationOperator'

export const Route = createFileRoute(
  '/(dashboard)/(organisation)/organizationsOperators',
)({
  component: OrganisationOperator,
})


