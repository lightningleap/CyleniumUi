/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Moon, Sun, Bell, Laptop } from 'lucide-react';
import { useNavigate } from "@tanstack/react-router";
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import darkLogo from '@/assets/SidebarHeaderLogo.svg';
import lightLogo from '@/assets/SidebarHeaderLogo.svg';
// import { useAuth } from '@/contexts/AuthContext';


interface NavbarProps {
  /** Whether to show the sidebar toggle button */
  showSidebarToggle?: boolean;
  /** Additional class names to apply to the navbar */
  className?: string;
  /** Content to be displayed on the right side of the navbar */
  rightContent?: React.ReactNode;
  /** Breadcrumb items to display */
  breadcrumb?: Array<{
    label: string;
    href?: string;
    active?: boolean;
  }>;
}



export function Navbar({ 
  className = '',
  rightContent,
  breadcrumb = [] // Empty array by default
}: NavbarProps) {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  // const { logout } = useAuth();

  const handleLogout = () => {
    // logout()
    setTimeout(() => {
      navigate({ to: '/sign-in' })
    }, 100)
  }
  return (
    <nav className={`sticky top-0 z-40 w-full border-b bg-white dark:bg-[#09090B] ${className}`}>
      <div className="relative flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Sidebar toggle - visible on all screen sizes */}
          <div className="flex items-center">
            <SidebarTrigger className="-ml-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </SidebarTrigger>
          </div>
          
          {/* Desktop: Breadcrumbs */}
          <div className="hidden items-center md:flex">
            {breadcrumb.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumb.map((item, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {item.active ? (
                          <BreadcrumbPage>
                            {item.label}
                          </BreadcrumbPage>
                        ) : item.href ? (
                          <BreadcrumbLink href={item.href}>
                            {item.label}
                          </BreadcrumbLink>
                        ) : (
                          <span className="text-muted-foreground">
                            {item.label}
                          </span>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </div>
        
        {/* Mobile: Centered logo */}
        <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
          <div className="h-6">
            <img 
              src={lightLogo} 
              alt="CYLENIUM Logo" 
              className="h-full w-auto object-contain dark:hidden"
            />
            {/* <img 
              src={darkLogo} 
              alt="CYLENIUM Logo" 
              className="hidden h-full w-auto object-contain dark:block"
            /> */}
             <span className="font-inter font-normal text-[9px] leading-[17px] tracking-[0.1em] uppercase text-[#3F3F46] group-data-[collapsible=icon]:hidden">
            Administrator Center
          </span>
          </div>
        </div>
        
        {/* Right side items */}
        <div className="flex items-center gap-2">
          {/* Desktop: Theme toggle and notifications */}
          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-white dark:bg-[#09090B]">
                <DropdownMenuItem 
                  onClick={() => setTheme('light')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme('dark')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme('system')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                >
                  <Laptop className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>
          </div>
          
          {/* Profile dropdown - visible on all screens */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 px-2 gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden items-center gap-1 md:flex">
                  <span className="text-sm font-normal text-gray-900 dark:text-gray-100">John Doe</span>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    className="text-gray-500"
                  >
                    <path 
                      d="M4 6L8 10L12 6" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-[#09090B]" align="end" forceMount>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                // onClick={() => navigate({ to: "/settings" })}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem 
               onClick={handleLogout} 
                className="cursor-pointer"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {rightContent && (
            <div className="flex items-center gap-2">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;