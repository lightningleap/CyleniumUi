import { createFileRoute } from '@tanstack/react-router'
import { OrganizationProfile } from '@/features/dashboard/organisationDashboard/organisationProfile'

export const Route = createFileRoute(
  '/(dashboard)/(organisation)/organisationDashboard/$id',
)({
  component: OrganizationProfile,
  notFoundComponent: () => <div>Organization not found</div>,
  beforeLoad: () => ({
    getTitle: () => 'Organization Profile',
  }),
})
