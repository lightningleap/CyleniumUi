import { Label } from '@/components/ui/label';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ActionButtons } from './ActionButtons';

export const GeneralSettings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      {/* Input section */}
      <div className="flex flex-col gap-6">

        {/* Theme section */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-[#09090B] dark:text-white tracking-[-0.006em]">Theme</Label>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <button 
              type="button"
              onClick={() => setTheme('light')}
              className={`flex flex-col items-center gap-1.5 ${theme === 'light' ? 'opacity-100' : 'opacity-50 hover:opacity-75'} transition-opacity`}
            >
              <div className={`w-[200px] h-[144px] border-2 ${theme === 'light' ? 'border-[#008A2E]' : '    dark:border-[#3F3F46] '} rounded-md p-1 transition-colors`}>
                <div className="w-full h-full bg-[#F4F4F5] rounded p-2" />
              </div>
              <span className="text-sm text-[#09090B] dark:text-white">Light</span>
            </button>
            <button 
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex flex-col items-center gap-1.5 ${theme === 'dark' ? 'opacity-100' : 'opacity-50 hover:opacity-75'} transition-opacity`}
            >
              <div className={`w-[200px] h-[144px] border-2 ${theme === 'dark' ? 'border-[#008A2E]' : '    dark:border-[#3F3F46] '} rounded-md p-1 transition-colors`}>
                <div className="w-full h-full bg-[#27272A] rounded p-2" />
              </div>
              <span className="text-sm text-[#09090B] dark:text-white">Dark</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="language" className="text-sm font-medium text-[#09090B] dark:text-white tracking-[-0.006em]">
            Language
          </Label>
          <Select>
            <SelectTrigger className="h-10 w-full px-3 py-2 border dark:bg-black dark:border-[#3F3F46] rounded-md focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="timezone" className="text-sm font-medium text-[#09090B] dark:text-white tracking-[-0.006em]">
            Time Zone
          </Label>
          <Select>
            <SelectTrigger className="h-10 w-full px-3 py-2 border dark:bg-black dark:border-[#3F3F46] rounded-md focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="est">EST</SelectItem>
              <SelectItem value="pst">PST</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      
      <ActionButtons 
        onCancel={() => {
          // Add cancel logic here
          console.log('Cancelled');
        }}
        onSave={() => {
          // Add save logic here
          console.log('Changes saved');
        }}
      />
    </div>
  );
};
