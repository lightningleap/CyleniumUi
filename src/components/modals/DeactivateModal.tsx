import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeactivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  status: 'active' | 'inactive';
  isLoading?: boolean;
}

export const DeactivateModal: React.FC<DeactivateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  status,
  isLoading = false,
}) => {
  const isDeactivating = status === 'active';
  const actionText = isDeactivating ? 'Deactivate' : 'Reactivate';
  const title = isDeactivating ? 'Deactivate User' : 'Reactivate User';
  const description = isDeactivating
    ? 'Are you sure you want to deactivate this user? They will no longer have access to the system.'
    : 'Are you sure you want to reactivate this user? They will regain access to the system.';

  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[352px] sm:w-full sm:max-w-[512px] p-6 gap-4 bg-white dark:bg-[#09090B] border">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#09090B] dark:text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#71717A] dark:text-gray-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="h-9 px-4 text-sm font-medium text-[#09090B] dark:text-white     dark:border-[#3F3F46] hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`h-9 px-4 text-sm font-medium text-white ${
              isDeactivating ? 'bg-[#EF4444] hover:bg-[#DC2626]' : 'bg-[#10B981] hover:bg-[#059669]'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isDeactivating ? 'Deactivating...' : 'Reactivating...'}
              </>
            ) : (
              actionText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
