import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast-provider';
import SuspendModal from '@/components/modals/SuspendModal';
import DeleteModal from '@/components/modals/DeleteModal';

export function Settings() {
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { addToast } = useToast();

  const handleSuspend = async () => {
    try {
      // TODO: Replace with actual suspend organization API call
      // await api.suspendOrganization(orgId);
      
      addToast({
        title: 'Success',
        description: 'Organization has been suspended successfully.',
      });
      
      // Refresh organization data or update local state
      // await refreshOrganizationData();
      
    } catch (error) {
      console.error('Error suspending organization:', error);
      addToast({
        title: 'Error',
        description: 'Failed to suspend organization. Please try again.',
      });
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      // TODO: Replace with actual delete organization API call
      // await api.deleteOrganization(orgId);
      
      addToast({
        title: 'Success',
        description: 'Organization has been deleted successfully.',
      });
      
      // Redirect to organizations list or perform other cleanup
      // router.push('/organizations');
      
    } catch (error) {
      console.error('Error deleting organization:', error);
      addToast({
        title: 'Error',
        description: 'Failed to delete organization. Please try again.',
      });
      throw error;
    }
  };

  return (
    <div className="flex flex-col p-2 gap-6 w-full max-w-[1152px]  h-full">
      {/* Organization Details Section */}
      <div className="flex flex-col sm:flex-row gap-8 w-full">
        <div className="w-full sm:w-[260px] space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Organization Details</h2>
          <p className="text-sm text-muted-foreground">
            Edit the core profile and contact information for this organization.
          </p>
        </div>
        
        <div className="flex-1 space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">Organization Name</label>
            <Input 
              placeholder="Enter organization name"
              className="h-10 text-sm dark:border-[#3F3F46]"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">Email</label>
            <Input 
              type="email"
              placeholder="Enter email address"
              className="h-10 text-sm dark:border-[#3F3F46]"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">Address</label>
            <Textarea 
              placeholder="Enter organization address"
              className="min-h-[80px] text-sm dark:bg-black dark:border-[#3F3F46]"
            />
          </div>
        </div>
      </div>
      
      <Separator className="my-2" />
      
      {/* Organization Logo Section */}
      <div className="flex flex-col sm:flex-row gap-8 w-full">
        <div className="w-full sm:w-[260px] space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Organization Logo</h2>
          <p className="text-sm text-muted-foreground">
            Logo used for this organization's branding and reports.
          </p>
        </div>
        
        <div className="flex-1">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-muted/80 flex items-center justify-center">
                <span className="text-2xl">LO</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Change
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="my-2" />
      
      {/* Transfer Ownership Section */}
      <div className="flex flex-col sm:flex-row gap-8 w-full">
        <div className="w-full sm:w-[260px] space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Transfer Ownership</h2>
          <p className="text-sm text-muted-foreground">
            Assign ownership of this organization to a different user.
          </p>
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">New Owner Email</label>
            <Input 
              type="email"
              placeholder="Enter new owner's email"
              className="h-10 text-sm dark:border-[#3F3F46]"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none">Confirm New Owner Email</label>
            <Input 
              type="email"
              placeholder="Confirm new owner's email"
              className="h-10 text-sm dark:border-[#3F3F46]"
            />
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700 h-9 text-sm">
            Transfer Ownership
          </Button>
        </div>
      </div>
      
      <Separator className="my-2" />
      
      {/* Administrative Actions Section */}
      <div className="flex flex-col sm:flex-row gap-8 w-full mb-6 sm:mb-6">
        <div className="w-full sm:w-[260px] space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Administrative Actions</h2>
          <p className="text-sm text-muted-foreground">
            Manage the organization's status. Actions here affect service availability and data retention.
          </p>
        </div>
        
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Suspend Organization</h3>
            <p className="text-sm text-muted-foreground">
              Temporarily suspend all activity and block user access. This action can be reversed.
            </p>
            <Button 
              variant="destructive" 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => setIsSuspendModalOpen(true)}
            >
              Suspend Organization
            </Button>
            <SuspendModal
              isOpen={isSuspendModalOpen}
              onClose={() => setIsSuspendModalOpen(false)}
              onSuspend={handleSuspend}
              title="Suspend Organization"
              description="This will temporarily suspend the organization. Users won't be able to access it until you unsuspend."
              suspendButtonText="Suspend Organization"
              successMessage="Organization has been suspended successfully."
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Delete Organization</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete the organization and all its data. This action is irreversible.
            </p>
            <Button 
              variant="destructive" 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete Organization
            </Button>
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={handleDelete}
              title="Delete Organization"
              description="This will permanently delete the organization and all its data. This action cannot be undone."
              deleteButtonText="Delete Organization"
              successMessage="Organization has been deleted successfully."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
