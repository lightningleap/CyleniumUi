/* eslint-disable @typescript-eslint/no-explicit-any */
// types/sidebar.types.ts
import React from 'react';

// ========================
// Core Data Types
// ========================

export interface MenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
  count?: number;
  items?: MenuItem[];
}

export interface SidebarSection {
  title: string;
  items: MenuItem[];
}

// ========================
// Event Handler Types
// ========================

export type NavigationHandler = (href: string) => void;
export type ToggleHandler = (href: string) => void;
export type UserMenuActionHandler = (action: string) => void;

// ========================
// Component State Types
// ========================

export interface SidebarState {
  expandedItems: Set<string>;
  activeItem: string;
  userMenuOpen: boolean;
}

// ========================
// Component Props Types
// ========================

export interface CollapsibleMenuItemProps {
  item: MenuItem;
  activeItem: string;
  expandedItems: Set<string>;
  onToggleExpanded: ToggleHandler;
  onNavigate: NavigationHandler;
}

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
  children: React.ReactNode;
}

export interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  className?: string;
  children: React.ReactNode;
}

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface SidebarMenuSubProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
  children: React.ReactNode;
  isOpen?: boolean;
}

export interface SidebarMenuSubItemProps extends React.HTMLAttributes<HTMLLIElement> {
  className?: string;
  children: React.ReactNode;
}

export interface SidebarMenuSubButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// ========================
// Dropdown Menu Types (Custom Implementation)
// ========================

export interface DropdownMenuProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface DropdownMenuTriggerProps {
  children: React.ReactElement<any>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DropdownMenuContentProps {
  children: React.ReactNode;
  open?: boolean;
  className?: string;
}

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// ========================
// Utility Types
// ========================

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
  avatar?: string;
}

export interface SidebarConfiguration {
  defaultOpen?: boolean;
  collapsible?: boolean;
  variant?: 'default' | 'inset' | 'floating';
  theme?: 'light' | 'dark';
}

// ========================
// Hook Return Types
// ========================

export interface UseSidebarStateReturn {
  expandedItems: Set<string>;
  activeItem: string;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  toggleExpanded: ToggleHandler;
  handleNavigate: NavigationHandler;
  handleUserMenuAction: UserMenuActionHandler;
}

// ========================
// Component Composition Types
// ========================

export interface SidebarContentProps {
  expandedItems: Set<string>;
  activeItem: string;
  userMenuOpen: boolean;
  toggleExpanded: ToggleHandler;
  handleNavigate: NavigationHandler;
  handleUserMenuAction: UserMenuActionHandler;
  setUserMenuOpen: (open: boolean) => void;
}

// ========================
// Export all types for convenient importing
// ========================

export type {
  React
};