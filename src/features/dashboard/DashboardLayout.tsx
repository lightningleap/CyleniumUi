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
  
  const breadcrumb = isNewOrgRoute 
    ? [
        { label: 'Dashboard', href: '/dashboard' },
        { label: dashboardType, href: '/organisationDashboard' },
        { label: 'New Organization', active: true }
      ]
    : [
        { label: 'Dashboard', href: '/dashboard' },
        { label: dashboardType, active: true }
      ];

  return (
    <SidebarLayoutWithNavbar
      navbar={
        <Navbar
          className="border-b border-white/10 bg-white/60 backdrop-blur-sm"
          breadcrumb={breadcrumb}
        />
      }
    >
      <div className="min-h-screen relative overflow-hidden bg-white text-black">
        {/* Background */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-50"
        />
        
        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </SidebarLayoutWithNavbar>
  );
}
