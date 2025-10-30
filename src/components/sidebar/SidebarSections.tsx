import { 
  LayoutDashboard,
  Building2,
  CreditCard,
  Users,
  Settings
} from 'lucide-react';

import type { SidebarSection } from './types';

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: 'Main',
    items: [
      {
        title: 'Dashboard',
        href: '/organizationDashboard',
        icon: <LayoutDashboard size={16} />
      },
      {
        title: 'Organizations',
        href: '/organizations',
        icon: <Building2 size={16} />
      },
      {
        title: 'Billings',
        href: '/organizationsBilling',
        icon: <CreditCard size={16} />
      },
      {
        title: 'Platform Users',
        href: '/organizationsOperators',
        icon: <Users size={16} />
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: <Settings size={16} />
      }
    ]
  }
];