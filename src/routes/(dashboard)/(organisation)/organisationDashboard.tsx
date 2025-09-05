import { createFileRoute } from '@tanstack/react-router'
import OrganisationDashboard from '../../../features/dashboard/organisationDashboard'

export const Route = createFileRoute('/(dashboard)/(organisation)/organisationDashboard')({
  component: OrganisationDashboard,
  notFoundComponent: () => <div>Organization not found</div>,
  beforeLoad: () => ({
    getTitle: () => 'Organization Dashboard',
  }),
  errorComponent: (props: { error: Error }) => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Error</h2>
        <p className="text-red-500">{props.error.message}</p>
      </div>
    )
  },
})
