/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from '@tanstack/react-router';
import { ArrowLeft, ChevronDown , MoreHorizontal} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast-provider';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Avatar1 from '@/assets/avatars/Avatar-1.svg';
import { NavigationTabs } from './components/NavigationTabs';

interface OrganizationData {
  id: string;
  name: string;
  email: string;
  address: string;
  plan: string;
  status: string;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export function OrganizationProfile() {
  const params = useParams({ strict: false });
  const id = params.id;
  const router = useRouter();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [organization, setOrganization] = useState<OrganizationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('users');
  const [_searchQuery, setSearchQuery] = useState('');

  console.log('Route Params:', params);
  console.log('Organization ID:', id);

  useEffect(() => {
    const fetchOrganization = async () => {
      console.log('Fetching organization with ID:', id);
      
      if (!id) {
        console.error('No organization ID provided');
        setError('No organization ID provided');
        setIsLoading(false);
        return;
      }

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Mock data - replace with actual API call
        const mockOrganizations: Record<string, OrganizationData> = {
          '1': {
            id: '1',
            name: 'Acme Inc',
            email: 'contact@acme.com',
            address: '123 Business St, Tech City',
            plan: 'Enterprise',
            status: 'Active',
            lastActive: '2 hours ago',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          '2': {
            id: '2',
            name: 'Globex Corp',
            email: 'info@globex.com',
            address: '456 Corporate Ave, Metro',
            plan: 'Premium',
            status: 'Active',
            lastActive: '30 minutes ago',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };

        console.log('Available mock organizations:', Object.keys(mockOrganizations));
        const org = mockOrganizations[id];
        
        if (!org) {
          console.error('Organization not found in mock data');
          throw new Error(`Organization with ID ${id} not found`);
        }
        
        console.log('Found organization:', org);
        setOrganization(org);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Error fetching organization:', errorMessage);
        setError(`Failed to load organization: ${errorMessage}`);
        addToast({
          title: 'Error',
          description: `Failed to load organization: ${errorMessage}`
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganization();
  }, [id, addToast]);

  const handleBack = () => {
    router.history.back();
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
              <AvatarImage src={Avatar1} alt={organization.name} />
              <AvatarFallback>{organization.name.charAt(0)}</AvatarFallback>
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
            <p className="text-sm leading-5 text-zinc-500 opacity-80">View and manage organization details</p>
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
          <div>Users content will go here</div>
        )}
        {activeTab === 'devices' && (
          <div>Devices content will go here</div>
        )}
        {activeTab === 'billing' && (
          <div>Billing content will go here</div>
        )}
        {activeTab === 'settings' && (
          <div>Settings content will go here</div>
        )}
      </div>
    </div>
  );
}