import * as React from "react"
import { cn } from "@/lib/utils"

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  onClose?: () => void
  duration?: number
}

export function Toast({
  title,
  description,
  onClose,
  duration = 5000,
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
        "flex flex-col items-start p-4 pr-6 isolate absolute w-[388px] h-[74px] right-4 bottom-6 bg-[#09090B] border border-[#3F3F46] shadow-lg rounded-md z-50",
        className
      )}
      {...props}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-1.5 top-1.5 flex justify-center items-center w-6 h-6 opacity-50 hover:opacity-100 rounded-md"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1.5L10.5 10.5M1.5 10.5L10.5 1.5"
              stroke="#FAFAFA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className="flex flex-row items-center gap-6 w-[348px] h-[42px]">
        <div className="flex flex-col items-start gap-0.5 w-[348px] h-[42px]">
          {title && (
            <h3 className="font-inter font-medium text-sm leading-5 tracking-[-0.006em] text-[#FAFAFA] w-full">
              {title}
            </h3>
          )}
          {description && (
            <p className="font-inter text-sm leading-5 text-[#A1A1AA] opacity-90 w-full">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
