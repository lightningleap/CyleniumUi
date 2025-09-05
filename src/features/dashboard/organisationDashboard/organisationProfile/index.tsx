/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter, useParams } from '@tanstack/react-router';
import { ArrowLeft, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast-provider';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { NavigationTabs } from './components/NavigationTabs';
import { UsersTable } from './components/users/UsersTable';
import { mockUsers } from './components/users/usersData';
import { mockDevices } from './components/devices/deviceData';
import { DevicesTable } from './components/devices/DevicesTable';
import { BillingsTable } from './components/billings/billingsTable';
import { mockBillings } from './components/billings/billingsData';
import type { User } from './components/users/types';

interface OrganizationData {
  id: string;
  name: string;
  email: string;
  logo?: string;
  plan: string;
  status: string;
  lastActive?: string;
  createdAt?: string;
  updatedAt?: string;
}

type RouteState = {
  org?: OrganizationData;
};

export function OrganizationProfile() {
  const { id } = useParams({ from: '/(dashboard)/(organisation)/organisationDashboard/$id' });
  const router = useRouter();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [organization, setOrganization] = useState<OrganizationData | null>(
    (router.state.location.state as RouteState)?.org || null
  );
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('users');
  const [_searchQuery, setSearchQuery] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedDeviceIds, setSelectedDeviceIds] = useState<string[]>([]);
  const [selectedBillingIds, setSelectedBillingIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [billingCurrentPage, setBillingCurrentPage] = useState(1);
  const [billingPageSize, setBillingPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // If we don't have organization data in the route state, try to fetch it
    if (!organization && id) {
      fetchOrganization();
    }
  }, [id, organization]);

  useEffect(() => {
    if (activeTab === 'users') {
      setUsers(mockUsers);
      setTotalItems(mockUsers.length);
    }
  }, [activeTab]);

  const fetchOrganization = async () => {
    if (!id) {
      setError('No organization ID provided');
      return;
    }

    // If we already have the organization data from the route state, use it
    const routeState = router.state.location.state as RouteState | undefined;
    if (routeState?.org) {
      setOrganization(routeState.org);
      return;
    }

    // Fallback to fetching the data if not available in route state
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // This would be your actual API call in a real app
      // const response = await fetch(`/api/organizations/${id}`);
      // const data = await response.json();
      // setOrganization(data);
      
      // For now, we'll throw an error since we expect the data to come from the route state
      throw new Error('Organization data not found in route state');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load organization';
      setError(errorMessage);
      addToast({
        title: 'Error',
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.history.back();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, you would fetch the data for the new page here
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
    // In a real app, you would refetch the data with the new page size
  };

  const handleUserSelectionChange = (selectedIds: string[]) => {
    setSelectedUserIds(selectedIds);
    // You can perform actions when selection changes, like enabling/disabling buttons
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !organization) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold">Organization not found</h2>
        <p className="text-muted-foreground mt-2">
          {error || 'The requested organization could not be found.'}
        </p>
        <Button onClick={handleBack} className="mt-4">
          Back to Organizations
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-6 w-full ">
      <div className="flex flex-col items-start gap-3 w-full">
        <div className="flex items-center justify-center gap-2 h-8 cursor-pointer text-zinc-500 hover:text-zinc-600" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-medium leading-4 tracking-[-0.006em]">Back to Organizations</span>
        </div>
        <div className="flex items-center gap-4 w-full h-20">
          <div className="flex justify-center items-center w-20 h-20 bg-zinc-100/80 rounded-lg">
            <Avatar className="w-10 h-10 rounded-full">
              {organization.logo ? (
                <AvatarImage 
                  src={organization.logo} 
                  alt={organization.name} 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                  {organization.name.charAt(0).toUpperCase()}
                </div>
              )}
              <AvatarFallback>{organization.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col justify-center gap-0.5 flex-1">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-2xl font-semibold leading-8 tracking-[-0.006em] text-zinc-900">{organization.name}</h1>
              <div className="hidden md:block">
                <Button variant="outline" className="h-9 px-4 border border-zinc-200 rounded-md">
                  <span className="text-sm font-medium leading-5 tracking-[-0.006em] text-zinc-900">Actions</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="block md:hidden">
                <Button variant="outline" size="icon" className="h-9 w-9 border border-zinc-200">
                  <MoreHorizontal className="h-4 w-4 text-zinc-900" />
                </Button>
              </div>
            </div>
            <p className="text-sm leading-5 text-zinc-500 opacity-80">{organization.email}</p>
          </div>
        </div>
      </div>
      
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSearch={setSearchQuery}
      />

      {/* Conditional Content Based on Active Tab */}
      <div className="mt-6">
        {activeTab === 'users' && (
          <UsersTable
            users={users}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            selectedUserIds={selectedUserIds}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onSelectionChange={handleUserSelectionChange}
          />
        )}
        {activeTab === 'devices' && (
          <div className="space-y-4">
            <DevicesTable
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              devices={mockDevices}
              selectedDeviceIds={selectedDeviceIds}
              onSelectionChange={setSelectedDeviceIds}
            />
          </div>
        )}
        {activeTab === 'billing' && (
          <BillingsTable
            billings={mockBillings}
            selectedBillingIds={selectedBillingIds}
            onSelectionChange={setSelectedBillingIds}
            currentPage={billingCurrentPage}
            pageSize={billingPageSize}
            totalItems={mockBillings.length}
            onPageChange={setBillingCurrentPage}
            onPageSizeChange={setBillingPageSize}
          />
        )}
        {activeTab === 'settings' && (
          <div>Settings content will go here</div>
        )}
      </div>
    </div>
  );
}