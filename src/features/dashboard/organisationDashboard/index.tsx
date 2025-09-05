import { useState, useMemo, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { DashboardLayout } from '../DashboardLayout';
import { OrganizationTable } from './components/OrganizationTable';
import { SearchAndFilter } from './components/SearchAndFilter';
import type { Organization } from './components/OrganizationTable';

export default function OrganizationDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when the component mounts or when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Check if we're on the new organization route
  const isNewOrgRoute = location.pathname.endsWith('/new');

  // Check if we're on the organization profile route
  const isProfileRoute = location.pathname.includes('/organisationDashboard/');

  // Sample data - replace with your actual data
  const allOrganizations: Organization[] = [
    {
      id: '1',
      name: 'Acme Inc',
      email: 'contact@acme.com',
      logo: '',
      plan: 'Enterprise',
      status: 'Active',
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'Globex Corp',
      email: 'info@globex.com',
      logo: '',
      plan: 'Premium',
      status: 'Active',
      lastActive: '30 minutes ago',
    },
    {
      id: '3',
      name: 'Soylent Corp',
      email: 'hello@soylent.com',
      logo: '',
      plan: 'Standard',
      status: 'Inactive',
      lastActive: '2 weeks ago',
    },
    {
      id: '4',
      name: 'Initech',
      email: 'contact@initech.com',
      logo: '',
      plan: 'Basic',
      status: 'Pending',
      lastActive: '4 days ago',
    },
    {
      id: '5',
      name: 'Umbrella Corp',
      email: 'support@umbrella.com',
      logo: '',
      plan: 'Pro',
      status: 'Active',
      lastActive: '2 months ago',
    },
    {
      id: '6',
      name: 'Cyberdyne Systems',
      email: 'info@cyberdyne.com',
      logo: '',
      plan: 'Enterprise',
      status: 'Active',
      lastActive: '1 day ago',
    },
    {
      id: '7',
      name: 'Stark Industries',
      email: 'contact@stark.com',
      logo: '',
      plan: 'Premium',
      status: 'Active',
      lastActive: '5 hours ago',
    },
    {
      id: '8',
      name: 'Wayne Enterprises',
      email: 'support@wayne.com',
      logo: '',
      plan: 'Pro',
      status: 'Inactive',
      lastActive: '1 month ago',
    },
    {
      id: '9',
      name: 'Oscorp',
      email: 'hello@oscorp.com',
      logo: '',
      plan: 'Standard',
      status: 'Active',
      lastActive: '3 days ago',
    },
    {
      id: '10',
      name: 'Wonka Industries',
      email: 'contact@wonka.com',
      logo: '',
      plan: 'Basic',
      status: 'Pending',
      lastActive: '1 week ago',
    }
  ];

  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Add sorting state
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Organization;
    direction: 'ascending' | 'descending';
  }>({ key: 'name', direction: 'ascending' });

  // Handle sort request
  const handleSort = (key: keyof Organization) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  // Sort organizations
  const sortedOrganizations = useMemo(() => {
    const sortableItems = [...allOrganizations];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [allOrganizations, sortConfig]);

  // Filter and paginate data
  const { filteredOrganizations, pageCount, totalItems } = useMemo(() => {
    const filtered = sortedOrganizations.filter(org => 
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filtered.length / pageSize);
    const startIndex = pageIndex * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

    return {
      filteredOrganizations: paginatedData,
      pageCount,
      totalItems: filtered.length
    };
  }, [sortedOrganizations, searchTerm, pageIndex, pageSize]);

  // Handle row selection
  const toggleRowSelection = (id: string) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedRows(newSelection);
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedRows.size === filteredOrganizations.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredOrganizations.map(org => org.id)));
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPageIndex(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(0); // Reset to first page when page size changes
  };

  const handleNewOrganizationClick = () => {
    navigate({ to: '/organisationDashboard/new' });
  };

  const handleRowClick = (id: string) => {
    navigate({ to: '/organisationDashboard/$id', params: { id } });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] w-full">
        {isNewOrgRoute || isProfileRoute ? (
          <Outlet />
        ) : (
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Organizations</h2>
            </div>
            
            <SearchAndFilter 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onNewOrganization={handleNewOrganizationClick}
            />
            
            <OrganizationTable
              organizations={filteredOrganizations}
              selectedRows={selectedRows}
              onSelectRow={toggleRowSelection}
              onSelectAll={toggleSelectAll}
              onRowClick={handleRowClick}
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount}
              totalItems={filteredOrganizations.length}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
