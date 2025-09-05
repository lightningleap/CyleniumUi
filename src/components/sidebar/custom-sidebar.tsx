/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { 
  ChevronRight,
  Settings,
  LogOut,
  ChevronsUpDown,
  Lock
} from 'lucide-react';

import { SIDEBAR_SECTIONS } from './SidebarSections';
import type { MenuItem, SidebarSection } from './types';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { Badge } from '@/components/ui/badge';
// import { SetNewPasswordDialog } from '@/components/dialogs/set-new-password-dialog';
import lightLogo from '@/assets/SidebarHeaderLogo.svg';
import darkLogo from '@/assets/SidebarHeaderLogo.svg';

// Types are now imported from './types'

// Custom hook for TanStack Router navigation
export const useAppNavigation = () => {
  const navigate = useNavigate();
  const router = useRouter();
  
  const currentPath = router.state.location.pathname;
  
  const navigateTo = (href: string) => {
    if (href === '#') return;
    navigate({ to: href });
  };

  const handleUserAction = (action: string) => {
    const routes = {
      profile: '/profile',
      settings: '/settings',
      billing: '/billing',
      notifications: '/notifications',
      help: '/help',
      logout: '/login', // Redirect to login on logout
    };

    const route = routes[action as keyof typeof routes];
    
    if (action === 'logout') {
      // Handle logout logic
      localStorage.removeItem('auth-token');
      sessionStorage.clear();
      // You might want to call your auth logout function here
    }
    
    if (route) {
      navigateTo(route);
    }
  };

  return {
    currentPath,
    navigateTo,
    handleUserAction,
  };
};



// Navigation Item Component
const NavItem = ({ 
  item, 
  currentPath, 
  onNavigate 
}: { 
  item: MenuItem; 
  currentPath: string; 
  onNavigate: (href: string) => void;
}) => {
  const hasSubItems = Boolean(item.items?.length);
  const isActive = currentPath === item.href || 
    item.items?.some(subItem => currentPath === subItem.href);
  const [isOpen, setIsOpen] = useState(isActive);

  // Auto-expand if sub-item is active
  useEffect(() => {
    if (item.items?.some(subItem => currentPath === subItem.href)) {
      setIsOpen(true);
    }
  }, [currentPath, item.items]);

  if (hasSubItems) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton 
              isActive={isActive}
              className="w-full justify-between"
              tooltip={item.title}
            >
              <div className="flex items-center gap-2 min-w-0">
                {item.icon}
                <span className="group-data-[collapsible=icon]:hidden truncate">{item.title}</span>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.href}>
                  <SidebarMenuSubButton
                    isActive={currentPath === subItem.href}
                    onClick={() => onNavigate(subItem.href)}
                    className="w-full justify-between"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {subItem.icon}
                      <span className="truncate">{subItem.title}</span>
                    </div>
                    {subItem.badge && (
                      <Badge variant="destructive" className="ml-auto h-5 w-5 rounded-full p-0 text-xs">
                        {subItem.badge}
                      </Badge>
                    )}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={currentPath === item.href}
        onClick={() => onNavigate(item.href)}
        tooltip={item.title}
        className="w-full justify-between"
      >
        <div className="flex items-center gap-2">
          {item.icon}
          <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
        </div>
        {item.badge && (
          <Badge variant="secondary" className="ml-auto group-data-[collapsible=icon]:hidden">
            {item.badge}
          </Badge>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

// Main Navigation Component
const NavMain = ({ 
  sections, 
  currentPath, 
  onNavigate 
}: { 
  sections: SidebarSection[]; 
  currentPath: string; 
  onNavigate: (href: string) => void;
}) => (
  <SidebarContent className="flex-1 overflow-y-auto bg-[#FAFAFA] dark:bg-[#18181B]">
    {sections.map((section) => (
      <SidebarGroup key={section.title} className="bg-[#FAFAFA] dark:bg-[#18181B]">
        <SidebarGroupContent className="bg-[#FAFAFA] dark:bg-[#18181B]">
          <SidebarMenu>
            {section.items.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                currentPath={currentPath}
                onNavigate={onNavigate}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ))}
  </SidebarContent>
);


const NavUser = ({ onUserAction }: { onUserAction: (action: string) => void }) => {
  const navigate = useNavigate();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const user = {
    name: "John Doe",
    email: "john@aegismind.com",
    initials: "JD",
  };

  return (
    <SidebarFooter className="border-t border-border/50 bg-[#FAFAFA] dark:bg-[#18181B]">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:mx-auto">
                  {user.initials}
                </div>
                <div className="grid flex-1 min-w-0 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-[#FAFAFA] dark:bg-[#18181B]"
              side="bottom"
              align="end"
              sideOffset={4}
            >

              
              <DropdownMenuItem onClick={() => onUserAction('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setShowPasswordDialog(true)}>
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </DropdownMenuItem>

              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={() => {
                  onUserAction('logout');
                  navigate({ to: "/sign-in" });
                }}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Set New Password Dialog */}
      {/* <SetNewPasswordDialog
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        // onSubmit={async (_password, _confirmPassword) => {
        //   try {
        //     // Here you would typically call your API to update the password
        //     // await updatePassword(password);
        //     setShowPasswordDialog(false);
        //   } catch (error) {
        //     console.error('Failed to update password:', error);
        //   }
        // }}
      /> */}
    </SidebarFooter>
  );
};

// App Sidebar Component
export function AppSidebar() {
  const { currentPath, navigateTo, handleUserAction } = useAppNavigation();
  // Use a ref to track if we've set the initial collapsed state
  const initialCollapsedRef = React.useRef(false);
  const { toggleSidebar } = useSidebar();

  React.useEffect(() => {
    // Check if the screen width is in the iPad range (768px - 1024px)
    const checkIfTablet = () => {
      const width = window.innerWidth;
      const isTablet = width >= 768 && width <= 1024;
      
      // Only toggle if we haven't set an initial state yet
      if (!initialCollapsedRef.current) {
        if (isTablet) {
          toggleSidebar();
        }
        initialCollapsedRef.current = true;
      }
    };
    
    // Initial check with a small delay to ensure the sidebar is mounted
    const timer = setTimeout(checkIfTablet, 100);
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfTablet);
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkIfTablet);
    };
  }, [toggleSidebar]);

  return (
    <Sidebar 
      variant="inset" 
      collapsible="icon" 
      className="bg-[#FAFAFA] dark:bg-[#18181B]"
    >
      {/* Logo Header */}
      <SidebarHeader className="flex flex-col justify-center items-start p-2 gap-2 w-full h-[61.91px] rounded-none flex-none order-0 self-stretch flex-grow-0 z-[3] isolate">
        <button 
          onClick={() => navigateTo('/organisationDashboard')}
          className="flex flex-col items-start justify-center p-2 w-full h-[45.91px] rounded-md flex-none order-0 self-stretch flex-grow-0 z-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:p-0"
        >
          {/* Logo container */}
          <div className="flex items-center justify-start mb-1 group-data-[collapsible=icon]:mb-0">
            <img
              src={lightLogo}
              alt="Logo"
              className="h-5 w-auto dark:hidden group-data-[collapsible=icon]:h-6"
            />
            <img
              src={darkLogo}
              alt="Logo"
              className="h-5 w-auto hidden dark:block group-data-[collapsible=icon]:h-6"
            />
          </div>
          
          {/* Control Center text - hidden when collapsed */}
          <span className="font-inter font-normal text-[9px] leading-[17px] tracking-[0.1em] uppercase text-[#3F3F46] group-data-[collapsible=icon]:hidden">
            Control Center
          </span>
        </button>
      </SidebarHeader>

      {/* Main Navigation */}
      <NavMain 
        sections={SIDEBAR_SECTIONS} 
        currentPath={currentPath} 
        onNavigate={navigateTo} 
      />

      {/* User Menu */}
      <NavUser onUserAction={handleUserAction} />
    </Sidebar>
  );
}


export function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col transition-all duration-300 ease-in-out bg-[#FAFAFA]">
        {/* Header with mobile trigger - visible on all screen sizes */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-[#FAFAFA] dark:bg-[#18181B] px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2 px-3">
            {/* Add breadcrumbs or page title here if needed */}
          </div>
        </header>
        
        {/* Main content area */}
        <div className="flex-1 space-y-4 p-4 md:p-8 ">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

// Layout Wrapper Component with Custom Navbar Support
export function SidebarLayoutWithNavbar({ 
  children, 
  navbar 
}: { 
  children: React.ReactNode;
  navbar?: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col transition-all duration-300 ease-in-out bg-[#FAFAFA] dark:bg-[#18181B]">
        {/* Custom Navbar - will automatically get sidebar context */}
        {navbar}
        
        {/* Main content area */}
        <div className="flex-1 space-y-4 dark:bg-background">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

// Enhanced Layout with Better Mobile Support
export function ResponsiveSidebarLayout({ 
  children, 
  navbar,
  title,
  breadcrumbs
}: { 
  children: React.ReactNode;
  navbar?: React.ReactNode;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col min-h-screen overflow-hidden">
        {/* If no custom navbar provided, use default responsive header */}
        {navbar || (
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 bg-[#FAFAFA] dark:bg-[#18181B] border-b    dark:border-[#3F3F46]">
            {/* Mobile and Tablet trigger - always visible on mobile and tablet */}
            <SidebarTrigger className="lg:hidden" />
            {/* Desktop trigger - only visible on desktop */}
            <div className="hidden lg:flex">
              <SidebarTrigger className="-ml-1" />
            </div>
            
            <div className="flex flex-1 items-center gap-2 px-3">
              {breadcrumbs && breadcrumbs.length > 0 ? (
                <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span>/</span>}
                      <span className={index === breadcrumbs.length - 1 ? "text-foreground font-medium" : ""}>
                        {crumb.label}
                      </span>
                    </React.Fragment>
                  ))}
                </nav>
              ) : title ? (
                <h1 className="text-lg font-semibold text-foreground truncate">
                  {title}
                </h1>
              ) : null}
            </div>
          </header>
        )}
        
        {/* Main content area */}
        <div className="flex-1 space-y-4 dark:bg-background">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

// Alternative Mobile-First Layout (if you prefer the floating mobile trigger)
export function MobileSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      
      {/* Floating Mobile Trigger - only visible on mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <SidebarTrigger className="h-10 w-10 bg-[#FAFAFA] dark:bg-[#18181B] border shadow-md" />
      </div>

      <main className="flex flex-1 flex-col min-h-screen">
        {/* Desktop header - hidden on mobile */}
        <header className="hidden md:flex sticky top-0 z-40 h-16 shrink-0 items-center gap-2 border-b bg-[#FAFAFA] dark:bg-[#18181B] px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2 px-3">
            {/* Add breadcrumbs or page title here if needed */}
          </div>
        </header>
        
        {/* Main content area with mobile padding adjustment */}
        <div className="flex-1 space-y-4 p-4 pt-16 md:pt-4 md:p-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

// Export aliases for backward compatibility
export const CustomSidebar = AppSidebar;
export const ResponsiveSidebarWrapper = SidebarLayout;

export default AppSidebar;