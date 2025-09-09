import { createFileRoute } from '@tanstack/react-router'
import { OrganizationProfile } from '@/features/dashboard/organisationDashboard/organisationProfile';

export const Route = createFileRoute(
  '/(dashboard)/(organisation)/organizationProfile',
)({
  component: OrganizationProfile,
})


