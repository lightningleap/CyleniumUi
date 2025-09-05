import * as React from "react"
import { cn } from "@/lib/utils"

type ToastVariant = 'default' | 'success' | 'error';

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  onClose?: () => void
  duration?: number
  variant?: ToastVariant
}

const variantStyles = {
  default: 'bg-[#09090B] border-[#3F3F46]',
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
}

const textColors = {
  default: 'text-white',
  success: 'text-green-800',
  error: 'text-red-800',
}

export function Toast({
  title,
  description,
  onClose,
  duration = 5000,
  variant = 'default',
  className,
  ...props
}: ToastProps) {
  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  return (
    <div
      className={cn(
        "flex flex-col items-start p-4 pr-6 isolate absolute w-[388px] min-h-[74px] right-4 bottom-6 shadow-lg rounded-md z-50 border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex-1">
          {title && (
            <h3 className={cn("font-medium mb-1", textColors[variant])}>
              {title}
            </h3>
          )}
          {description && (
            <p className={cn("text-sm", textColors[variant])}>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className={cn(
            "ml-4 text-gray-400 hover:text-gray-500 transition-colors",
            {
              'hover:text-green-600': variant === 'success',
              'hover:text-red-600': variant === 'error',
            }
          )}
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
