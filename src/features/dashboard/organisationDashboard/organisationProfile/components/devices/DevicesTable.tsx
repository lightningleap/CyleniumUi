import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/pagination/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Device } from './deviceData';

interface DevicesTableProps {
  devices: Device[];
  selectedDeviceIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

type SortConfig = {
  key: keyof Device;
  direction: 'asc' | 'desc';
};

export function DevicesTable({ 
  devices, 
  selectedDeviceIds, 
  onSelectionChange, 
  currentPage, 
  pageSize, 
  totalItems,
  onPageChange,
  onPageSizeChange
}: DevicesTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'deviceId', direction: 'asc' });

  const handleSort = (key: keyof Device) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedDevices = useMemo(() => {
    return [...devices].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [devices, sortConfig]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(devices.map(device => device.id));
    } else {
      onSelectionChange([]);
    }
  };

  const toggleSelectDevice = (deviceId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedDeviceIds, deviceId]);
    } else {
      onSelectionChange(selectedDeviceIds.filter(id => id !== deviceId));
    }
  };

  const renderSortIcon = (key: keyof Device) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" />;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div>
      <div className="rounded-md border dark:border-[#27272A]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
              <TableHead className="w-[48px] h-[48px]">
                <Checkbox
                  id="select-all"
                  checked={selectedDeviceIds.length === devices.length && devices.length > 0}
                  onCheckedChange={checked => toggleSelectAll(!!checked)}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="h-[48px]">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-medium text-xs hover:bg-transparent dark:text-white"
                  onClick={() => handleSort('deviceId')}
                >
                  Device ID
                  {renderSortIcon('deviceId')}
                </Button>
              </TableHead>
              <TableHead className="h-[48px]">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-medium text-xs hover:bg-transparent dark:text-white"
                  onClick={() => handleSort('name')}
                >
                  Name
                  {renderSortIcon('name')}
                </Button>
              </TableHead>
              <TableHead className="h-[48px]">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-medium text-xs hover:bg-transparent dark:text-white"
                  onClick={() => handleSort('type')}
                >
                  Type
                  {renderSortIcon('type')}
                </Button>
              </TableHead>
              <TableHead className="h-[48px]">
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-medium text-xs hover:bg-transparent dark:text-white"
                  onClick={() => handleSort('status')}
                >
                  Status
                  {renderSortIcon('status')}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDevices.map(device => (
              <TableRow 
                key={device.id}
                className="hover:bg-muted/50 dark:hover:bg-muted/50"
              >
                <TableCell className="w-[48px] h-[52px]">
                  <Checkbox
                    id={`select-${device.id}`}
                    checked={selectedDeviceIds.includes(device.id)}
                    onCheckedChange={checked => toggleSelectDevice(device.id, !!checked)}
                    aria-label={`Select ${device.name}`}
                  />
                </TableCell>
                <TableCell className="h-[52px] text-sm font-normal">{device.deviceId}</TableCell>
                <TableCell className="h-[52px] text-sm font-normal">{device.name}</TableCell>
                <TableCell className="h-[52px] text-sm font-normal">{device.type}</TableCell>
                <TableCell className="h-[52px]">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    device.status === 'active' ? 'bg-[#DCFCE7] text-[#166534] dark:bg-[#052E16] dark:text-[#4ADE80]' :
                    device.status === 'inactive' ? 'bg-[#F4F4F5] text-[#3F3F46] dark:bg-[#18181B] dark:text-[#A1A1AA]' :
                    'bg-[#FEF9C3] text-[#854D0E] dark:bg-[#422006] dark:text-[#FDE047]'
                  }`}>
                    {device.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 0 && (
        <div className="">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            selectedCount={selectedDeviceIds.length}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      )}
    </div>
  );
}
