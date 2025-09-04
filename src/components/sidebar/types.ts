import type { ReactNode } from 'react';

export interface MenuItem {
  title: string;
  href: string;
  icon: ReactNode;
  badge?: number;
  items?: MenuItem[];
}

export interface SidebarSection {
  title: string;
  items: MenuItem[];
}
