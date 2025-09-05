import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/pagination/pagination';
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
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all"
                      checked={selectedDeviceIds.length === devices.length && devices.length > 0}
                      onCheckedChange={checked => toggleSelectAll(!!checked)}
                      aria-label="Select all"
                    />
                  </div>
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    className="p-0 font-medium hover:bg-transparent"
                    onClick={() => handleSort('deviceId')}
                  >
                    Device ID
                    {renderSortIcon('deviceId')}
                  </Button>
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    className="p-0 font-medium hover:bg-transparent"
                    onClick={() => handleSort('name')}
                  >
                    Name
                    {renderSortIcon('name')}
                  </Button>
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    className="p-0 font-medium hover:bg-transparent"
                    onClick={() => handleSort('type')}
                  >
                    Type
                    {renderSortIcon('type')}
                  </Button>
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Button
                    variant="ghost"
                    className="p-0 font-medium hover:bg-transparent"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {renderSortIcon('status')}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {sortedDevices.map(device => (
                <tr key={device.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    <Checkbox
                      id={`device-${device.id}`}
                      checked={selectedDeviceIds.includes(device.id)}
                      onCheckedChange={checked => toggleSelectDevice(device.id, !!checked)}
                      aria-label={`Select ${device.name}`}
                    />
                  </td>
                  <td className="p-4 align-middle font-medium">{device.deviceId}</td>
                  <td className="p-4 align-middle">{device.name}</td>
                  <td className="p-4 align-middle">{device.type}</td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          device.status === 'active' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-50 text-black'
                        }`}
                      >
                        {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
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
  );
}
