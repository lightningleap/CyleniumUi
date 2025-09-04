import React from 'react';
import { cn } from '@/lib/utils';

// Import your logos
// import lightLogo from '@/assets/images/logo-light.svg';
// import darkLogo from '@/assets/images/logo-dark.svg';

interface StandaloneSidebarProps {
  sections?: Array<{
    title: string;
    items: Array<{
      name: string;
      href: string;
      icon?: React.ReactNode;
    }>;
  }>;
  onNavigate?: (path: string) => void;
  className?: string;
}

export function StandaloneSidebar({ 
  sections = [], 
  onNavigate,
  className 
}: StandaloneSidebarProps) {
  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className={cn(
      "flex h-full w-64 flex-col bg-[#FAFAFA] dark:bg-[#18181B] border-r",
      className
    )}>
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center border-b px-4">
        <button 
          onClick={() => handleNavigation('/dashboard')}
          className="flex h-16 items-center justify-center"
        >
          {/* <img
            src={lightLogo}
            alt="Logo"
            className="h-6 w-auto dark:hidden"
          />
          <img
            src={darkLogo}
            alt="Logo"
            className="hidden h-6 w-auto dark:block"
          /> */}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-4">
        {sections.map((section, index) => (
          <div key={index} className="px-2 mb-6">
            <h3 className="mb-2 px-4 text-sm font-semibold text-gray-500">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {item.icon && (
                    <span className="mr-3">{item.icon}</span>
                  )}
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t p-4">
        {/* Add your footer content here */}
      </div>
    </div>
  );
}
