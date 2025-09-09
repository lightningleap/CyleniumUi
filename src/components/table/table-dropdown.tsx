import { MoreHorizontal, type LucideIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import React from 'react';

type MenuItemType = 'item' | 'separator' | 'label';

interface BaseMenuItem {
  type: MenuItemType;
  id: string;
}

interface MenuItem extends BaseMenuItem {
  type: 'item';
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  className?: string;
  destructive?: boolean;
}

interface MenuSeparator extends BaseMenuItem {
  type: 'separator';
}

interface MenuLabel extends BaseMenuItem {
  type: 'label';
  label: string;
}

type MenuItems = (MenuItem | MenuSeparator | MenuLabel)[];

interface MenuGroup {
  items: MenuItems;
  label?: string;
}

interface TableDropdownProps {
  groups: MenuGroup[];
  trigger?: React.ReactNode;
}

export function TableDropdown({ groups, trigger }: TableDropdownProps) {
  const renderMenuItem = (item: MenuItem | MenuSeparator | MenuLabel) => {
    switch (item.type) {
      case 'item':
        return (
          <DropdownMenuItem
            key={item.id}
            onClick={item.onClick}
            className={`flex items-center px-2 py-1.5 h-8 gap-2 rounded-[6px] text-sm ${item.destructive ? 'text-red-600' : 'text-[#09090B]'} hover:bg-[#F4F4F5] cursor-pointer ${item.className || ''}`}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.label}
          </DropdownMenuItem>
        );
      case 'separator':
        return <DropdownMenuSeparator key={item.id} className="my-1 h-[1px] bg-[#E4E4E7]" />;
      case 'label':
        return (
          <DropdownMenuLabel key={item.id} className="px-2 py-1.5 text-sm font-medium text-[#71717A]">
            {item.label}
          </DropdownMenuLabel>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-[#F4F4F5]">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[183px] min-w-[128px] p-1 bg-white border border-[#E4E4E7] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] rounded-[6px]"
      >
        {groups.map((group, index) => (
          <DropdownMenuGroup key={index}>
            {group.label && (
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium text-[#71717A]">
                {group.label}
              </DropdownMenuLabel>
            )}
            {group.items.map(renderMenuItem)}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
