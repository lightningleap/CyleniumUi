import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Check, Minus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination } from '@/components/pagination/pagination';
import type { User } from './types';

type SortField = 'name' | 'role' | 'status' | 'lastActive';
type SortDirection = 'asc' | 'desc';

interface UsersTableProps {
  users: User[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  selectedUserIds?: string[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export function UsersTable({
  users,
  totalItems,
  currentPage,
  pageSize,
  selectedUserIds = [],
  onPageChange,
  onPageSizeChange,
  onSelectionChange,
}: UsersTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({ field: 'name', direction: 'asc' });

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      onSelectionChange(checked ? users.map(user => user.id) : []);
    }
  };

  const handleSelectOne = (userId: string, checked: boolean) => {
    if (onSelectionChange) {
      const newSelected = checked
        ? [...selectedUserIds, userId]
        : selectedUserIds.filter(id => id !== userId);
      onSelectionChange(newSelected);
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.field] < b[sortConfig.field]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.field] > b[sortConfig.field]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(totalItems / pageSize);
  const allSelected = users.length > 0 && selectedUserIds.length === users.length;
  const someSelected = selectedUserIds.length > 0 && !allSelected;

  const renderSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) {
      return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  const getStatusBadgeVariant = (status: User['status']) => {
    switch (status) {
      case 'active':
        return { variant: 'default', className: 'bg-green-600 hover:bg-green-700 text-white rounded-full' };
      case 'inactive':
        return { variant: 'secondary', className: 'bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-full' };
      case 'pending':
        return { variant: 'default', className: 'bg-orange-500 hover:bg-orange-600 text-white rounded-full' };
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <div className="flex items-center">
                <Checkbox
                  id="select-all"
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  className="h-4 w-4 rounded"
                />
                {someSelected && <Minus className="h-4 w-4 ml-1 text-muted-foreground" />}
                {allSelected && <Check className="h-4 w-4 ml-1 text-primary" />}
              </div>
            </TableHead>
            <TableHead className="text-left">
              <Button
                variant="ghost"
                onClick={() => handleSort('name')}
                className="p-0 font-medium"
              >
                User
                {renderSortIcon('name')}
              </Button>
            </TableHead>
            <TableHead className="text-left">
              <Button
                variant="ghost"
                onClick={() => handleSort('role')}
                className="p-0 font-medium"
              >
                Role
                {renderSortIcon('role')}
              </Button>
            </TableHead>
            <TableHead className="text-left">
              <Button
                variant="ghost"
                onClick={() => handleSort('status')}
                className="p-0 font-medium"
              >
                Status
                {renderSortIcon('status')}
              </Button>
            </TableHead>
            <TableHead className="text-left">
              <Button
                variant="ghost"
                onClick={() => handleSort('lastActive')}
                className="p-0 font-medium"
              >
                Last Active
                {renderSortIcon('lastActive')}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="text-left">
                <Checkbox
                  id={`user-${user.id}`}
                  checked={selectedUserIds.includes(user.id)}
                  onCheckedChange={(checked) => handleSelectOne(user.id, checked as boolean)}
                  className="h-4 w-4 rounded"
                />
              </TableCell>
              <TableCell className="text-left">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-left">
                <div className="capitalize">{user.role}</div>
              </TableCell>
              <TableCell className="text-left">
                <Badge 
                  // variant={getStatusBadgeVariant(user.status).variant}
                  className={`${getStatusBadgeVariant(user.status).className} capitalize`}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-left text-muted-foreground">
                {user.lastActive}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            selectedCount={selectedUserIds.length}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
    </div>
  );
}
