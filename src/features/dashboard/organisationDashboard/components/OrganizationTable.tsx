import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pagination } from '@/components/pagination';
import { ChevronUp, ChevronDown } from 'lucide-react';

export type Organization = {
  id: string;
  name: string;
  email: string;
  logo: string;
  plan: 'Basic' | 'Standard' | 'Premium' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
};

interface OrganizationTableProps {
  organizations: Organization[];
  selectedRows: Set<string>;
  onSelectRow: (id: string) => void;
  onSelectAll: () => void;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onRowClick?: (id: string) => void;
  sortConfig?: {
    key: keyof Organization;
    direction: 'ascending' | 'descending';
  };
  onSort?: (key: keyof Organization) => void;
}

export function OrganizationTable({
  organizations,
  selectedRows,
  onSelectRow,
  onSelectAll,
  pageIndex,
  pageSize,
  pageCount,
  totalItems,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  sortConfig = { key: 'name', direction: 'ascending' },
  onSort = () => {},
}: OrganizationTableProps) {
  const allSelected = organizations.length > 0 && selectedRows.size === organizations.length;
  const someSelected = selectedRows.size > 0 && !allSelected;

  const SortableHeader = ({ 
    columnKey,
    children 
  }: { 
    columnKey: keyof Organization; 
    children: React.ReactNode 
  }) => (
    <TableHead 
      className="cursor-pointer hover:bg-gray-50"
      onClick={() => onSort(columnKey)}
    >
      <div className="flex items-center">
        {children}
        <span className="ml-1 flex flex-col">
          <ChevronUp 
            className={`h-4 w-4 -mb-1 ${sortConfig.key === columnKey && sortConfig.direction === 'ascending' ? 'text-foreground' : 'text-muted-foreground/30'}`} 
          />
          <ChevronDown 
            className={`h-4 w-4 -mt-1 ${sortConfig.key === columnKey && sortConfig.direction === 'descending' ? 'text-foreground' : 'text-muted-foreground/30'}`} 
          />
        </span>
      </div>
    </TableHead>
  );

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                  aria-label="Select all"
                  className={someSelected ? 'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground' : ''}
                />
              </TableHead>
              <SortableHeader columnKey="name">Organization</SortableHeader>
              <SortableHeader columnKey="plan">Plan</SortableHeader>
              <SortableHeader columnKey="status">Status</SortableHeader>
              <SortableHeader columnKey="lastActive">Last Active</SortableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.length > 0 ? (
              organizations.map((org) => (
                <TableRow 
                  key={org.id}
                  className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                  onClick={(e) => {
                    // Don't trigger row click if clicking on checkbox
                    if (!(e.target as HTMLElement).closest('input[type="checkbox"]') && onRowClick) {
                      onRowClick(org.id);
                    }
                  }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(org.id)}
                      onCheckedChange={() => onSelectRow(org.id)}
                      aria-label={`Select ${org.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={org.logo} alt={org.name} />
                        <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{org.name}</div>
                        <div className="text-sm text-muted-foreground">{org.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{org.plan}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      org.status === 'Active' 
                        ? 'bg-green-500 text-white' 
                        : org.status === 'Inactive'
                        ? 'bg-gray-50 text-black'
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {org.status}
                    </span>
                  </TableCell>
                  <TableCell>{org.lastActive}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedRows.size} of {totalItems} row(s) selected.
        </div>
        <Pagination
          currentPage={pageIndex + 1}
          totalPages={pageCount}
          onPageChange={(page) => onPageChange(page - 1)}
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
          totalItems={totalItems}
          selectedCount={selectedRows.size}
        />
      </div>
    </div>
  );
}
