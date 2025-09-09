/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Moon, Sun, Bell, Laptop, Menu } from 'lucide-react';
import { useNavigate } from "@tanstack/react-router";
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import lightLogo from '@/assets/SidebarHeaderLogo.svg';
import darkLogo from '@/assets/sidebarDarkModeLogo.svg';

interface NavbarProps {
  showSidebarToggle?: boolean;
  className?: string;
  rightContent?: React.ReactNode;
  breadcrumb?: Array<{
    label: string;
    href?: string;
    active?: boolean;
  }>;
}

export function Navbar({ 
  className = '',
  rightContent,
  breadcrumb = []
}: NavbarProps) {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout()
    setTimeout(() => {
      navigate({ to: '/sign-in' })
    }, 100)
  }

  return (
    <nav className={`sticky top-0 z-40 w-full border-b bg-background dark:bg-[#09090B] ${className}`}>
      <div className="relative flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1.5 md:-ml-2">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          
          {/* Breadcrumbs */}
          {breadcrumb.length > 0 && (
            <div className="hidden md:flex">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumb.map((item, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {item.active ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : item.href ? (
                          <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        ) : (
                          <span className="text-muted-foreground">{item.label}</span>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}
        </div>

        {/* Mobile Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
          <div className="flex flex-col items-center">
            <div className="h-5">
              <img 
                src={lightLogo} 
                alt="Logo" 
                className="h-full w-auto object-contain dark:hidden"
              />
              <img 
                src={darkLogo} 
                alt="Logo" 
                className="hidden h-full w-auto object-contain dark:block"
              />
            </div>
            <span className="mt-0.5 font-inter font-normal text-[9px] leading-[10px] tracking-[0.1em] uppercase text-[#3F3F46] dark:text-white">
              Control Centre
            </span>
          </div>
        </div>
        
        {/* Right side items */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                <Laptop className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 px-2 gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden items-center gap-1 md:flex">
                  <span className="text-sm font-normal">John Doe</span>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    className="text-muted-foreground"
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
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
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