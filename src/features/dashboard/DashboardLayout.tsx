import React from 'react';
import { useRouter } from '@tanstack/react-router';
import { SidebarLayoutWithNavbar } from '@/components/sidebar/custom-sidebar';
import { Navbar } from '@/components/navbar/navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  
  // Get the current dashboard type from the path
  const getDashboardType = (path: string) => {
    if (path.includes('adminDashboard')) return 'Admin';
    if (path.includes('organisationDashboard')) return 'Organization';
    if (path.includes('generalUserDashboard')) return 'General User';
    return 'Dashboard';
  };

  const dashboardType = getDashboardType(pathname);
  const isNewOrgRoute = pathname.endsWith('/new');
  const isOrgBillingsRoute = pathname.includes('billings');
  const isOrganizationsBilling = pathname === '/organizationsBilling';
  const isOrganizationsOperators = pathname === '/organizationsOperators';
  const isOrganizationsList = pathname === '/organizations';
  
  // Extract organization ID from the URL if it exists
  const pathSegments = pathname.split('/').filter(Boolean);
  const orgSegmentIndex = pathSegments.findIndex(seg => seg === 'organization');
  const orgId = orgSegmentIndex >= 0 ? pathSegments[orgSegmentIndex + 1] : null;
  
  let breadcrumb = [];
  
  if (isNewOrgRoute) {
    breadcrumb = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Organizations', href: '/organizations' },
      { label: 'New Organization', active: true }
    ];
  } else if (isOrganizationsBilling) {
    breadcrumb = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Billings', active: true }
    ];
  } else if (isOrgBillingsRoute && orgId) {
    breadcrumb = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Organizations', href: '/organizations' },
      { label: 'Billings', active: true }
    ];
  } else if (isOrganizationsOperators) {
    breadcrumb = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Platform Users', active: true }
    ];
  } else if (isOrganizationsList) {
    breadcrumb = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Organizations', active: true }
    ];
  } else {
    breadcrumb = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: dashboardType, active: true }
    ];
  }

  return (
    <SidebarLayoutWithNavbar
      navbar={
        <Navbar
          className="border-b border-white/10 bg-white/60 backdrop-blur-sm"
          breadcrumb={breadcrumb}
        />
      }
    >
      <div className="flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-[#09090B]">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </SidebarLayoutWithNavbar>
  );
}
