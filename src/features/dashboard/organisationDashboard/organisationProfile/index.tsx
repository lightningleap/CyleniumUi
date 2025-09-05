import { useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/toast-provider';
import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

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
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Organization Profile</h2>
          <p className="text-muted-foreground">
            View and manage organization details
          </p>
        </div>
        <Button variant="outline" onClick={handleBack}>
          Back to Organizations
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Information</CardTitle>
          <CardDescription>
            View and manage your organization's details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input id="name" value={organization.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={organization.email} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Plan</Label>
              <Input value={organization.plan} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Input value={organization.status} readOnly />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={organization.address} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Last Active</Label>
              <Input value={organization.lastActive} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Created At</Label>
              <Input value={new Date(organization.createdAt).toLocaleDateString()} readOnly />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button>Edit Organization</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}