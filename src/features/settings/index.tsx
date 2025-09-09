import React, { useState } from 'react';
import { ResponsiveSidebarLayout } from '@/components/sidebar/custom-sidebar';
import Navbar from '@/components/navbar/navbar';
import { cn } from '@/lib/utils';
import { GeneralSettings } from './components/ApplicationSettings';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { YourProfile } from './components/YourProfile';
import { LoginAndSecurity } from './components/LoginAndSecurity';

interface SettingsSectionProps {
  title: string;
  description?: string;
  component: React.ReactNode;
}

const Settings = () => {
  const [activeSection, setActiveSection] = useState('Your Profile');
  
  const settingsSections: Record<string, SettingsSectionProps> = {
    'Your Profile': {
      title: 'Your Profile',
      description: 'Your personal information and role within the organization.',
      component: <YourProfile />
    },
    'Login & Security': {
      title: 'Login & Security',
      description: 'Manage your account security settings and preferences',
      component: <LoginAndSecurity />
    },
    'Application Settings': {
      title: 'Application Settings',
      description: 'Customize your experience within the application.',
      component: <GeneralSettings />
    }
  };
  
  const sectionNames = ['Your Profile', 'Login & Security', 'Application Settings'];

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', active: true }
  ];

  return (
    <ResponsiveSidebarLayout
      navbar={
        <Navbar
          breadcrumb={breadcrumbItems}
          showSidebarToggle={true}
        />
      }
      title="Settings"
      breadcrumbs={breadcrumbItems}
    >
      <div className="flex flex-col px-6 py-6 dark:bg-black h-full">
        <h1 className="text-2xl font-semibold leading-8 ml-2 tracking-[-0.006em] text-[#09090B] font-sans dark:text-white hidden md:block">
          Settings
        </h1>
        {/* Mobile Header */}
        <div className="md:hidden flex flex-col gap-6 w-full max-w-[352px] mb-6">
          <h1 className="text-2xl font-semibold leading-8 tracking-[-0.006em] text-[#09090B] font-sans w-full h-[40px] dark:text-white">
            Settings
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[200px] h-[40px] px-4 flex items-center justify-between text-sm font-medium text-[#09090B] dark:text-white bg-white dark:bg-black border dark:border-[#3F3F46] rounded-md"
              >
                {activeSection}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] bg-white dark:bg-black border dark:border-[#3F3F46]">
              {sectionNames.map((section) => (
                <DropdownMenuItem
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className="cursor-pointer text-[#09090B] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {section}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-row gap-8 w-full dark:bg-black ">
          {/* Left Navigation Menu */}
          <div className="hidden md:flex flex-col w-[215px] py-6">
            <div className="flex flex-col gap-2">
              {sectionNames.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={cn(
                  'px-4 py-2 w-full h-9 rounded-md text-sm font-medium tracking-[-0.006em] text-[#09090B] dark:text-white',
                  activeSection === section ? 'bg-[#F4F4F5] dark:bg-[#18181B]' : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                  'truncate text-left'
                )}
              >
                {section}
              </button>
            ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full md:max-w-[626px] md:py-6">
            <div className="flex flex-col gap-1 mb-6">
              <h2 className="text-base font-medium leading-6 text-[#09090B] dark:text-white">
                {settingsSections[activeSection].title}
              </h2>
              <p className="text-sm text-[#71717A] dark:text-gray-400">
                {settingsSections[activeSection].description}
              </p>
            </div>
            <div className="w-full">
              {settingsSections[activeSection].component}
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSidebarLayout>
  );
};

export default Settings;
