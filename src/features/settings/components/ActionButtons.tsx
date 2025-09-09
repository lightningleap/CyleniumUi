import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ActionButtonsProps {
  onCancel?: () => void;
  onSave?: () => void;
  cancelLabel?: string;
  saveLabel?: string;
  className?: string;
  isSaveDisabled?: boolean;
  isLoading?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onSave,
  cancelLabel = 'Cancel',
  saveLabel = 'Save',
  className = '',
  isSaveDisabled = false,
  isLoading = false,
}) => {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        className={cn(
          'box-border flex flex-row justify-center items-center',
          'h-10 px-4 py-0',
          'text-sm font-medium leading-5',
          'font-["Inter"] font-sans',
          'text-[#18181B]',
          'bg-[#F4F4F5] hover:bg-[#E4E4E7]',
          'rounded-[6px]',
          'whitespace-nowrap',
          'w-[78px]',
          'shadow-none',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400',
          'active:bg-[#E4E4E7]',
          'dark:bg-[#18181B] dark:hover:bg-[#3F3F46]',
          'dark:active:bg-[#3F3F46]',
          'dark:text-white'
        )}
        style={{
          fontStyle: 'normal',
          letterSpacing: '-0.006em',
          lineHeight: '20px',
        }}
      >
        {cancelLabel}
      </Button>
      <Button
        type="button"
        onClick={onSave}
        disabled={isSaveDisabled || isLoading}
        className={cn(
          'box-border flex flex-row justify-center items-center',
          'h-10 px-4 py-0',
          'text-sm font-medium leading-5',
          'font-sans',
          'text-white',
          'bg-gradient-to-b from-[#0066FF] to-[#0052CC]',
          'hover:from-[#0052CC] hover:to-[#003D99]',
          'active:from-[#0047B3] active:to-[#003366]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'rounded-[6px]',
          'whitespace-nowrap',
          'w-[65px]',
          'shadow-sm',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
          'dark:from-[#0066FF] dark:to-[#0052CC]',
          'dark:hover:from-[#0052CC] dark:hover:to-[#003D99]',
          'dark:active:from-[#0047B3] dark:active:to-[#003366]'
        )}
        style={{
          letterSpacing: '-0.006em',
          lineHeight: '20px',
        }}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {saveLabel}
          </>
        ) : (
          saveLabel
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;