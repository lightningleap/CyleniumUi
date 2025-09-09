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
import type { Billing } from './billingsData';

interface BillingsTableProps {
  billings: Billing[];
  selectedBillingIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

type SortConfig = {
  key: keyof Billing;
  direction: 'asc' | 'desc';
};

export function BillingsTable({ 
  billings, 
  selectedBillingIds, 
  onSelectionChange, 
  currentPage, 
  pageSize, 
  totalItems,
  onPageChange,
  onPageSizeChange
}: BillingsTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: 'dueDate', 
    direction: 'asc' 
  });

  const handleSort = (key: keyof Billing) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedBillings = useMemo(() => {
    return [...billings].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [billings, sortConfig]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(billings.map(billing => billing.id));
    } else {
      onSelectionChange([]);
    }
  };

  const toggleSelectBilling = (billingId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedBillingIds, billingId]);
    } else {
      onSelectionChange(selectedBillingIds.filter(id => id !== billingId));
    }
  };

  const renderSortIcon = (key: keyof Billing) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" />;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedBillingIds.length === billings.length && billings.length > 0}
                  onCheckedChange={checked => toggleSelectAll(!!checked)}
                  aria-label="Select all"
                />
              </div>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="p-0 font-medium hover:bg-transparent"
                onClick={() => handleSort('dueDate')}
              >
                Due Date
                {renderSortIcon('dueDate')}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="p-0 font-medium hover:bg-transparent"
                onClick={() => handleSort('description')}
              >
                Description
                {renderSortIcon('description')}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="p-0 font-medium hover:bg-transparent"
                onClick={() => handleSort('status')}
              >
                Status
                {renderSortIcon('status')}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="p-0 font-medium hover:bg-transparent"
                onClick={() => handleSort('invoiceTotal')}
              >
                Invoice Total
                {renderSortIcon('invoiceTotal')}
              </Button>
            </TableHead>
            <TableHead>Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBillings.map((billing) => (
            <TableRow key={billing.id}>
              <TableCell>
                <Checkbox
                  id={`billing-${billing.id}`}
                  checked={selectedBillingIds.includes(billing.id)}
                  onCheckedChange={(checked) =>
                    toggleSelectBilling(billing.id, !!checked)
                  }
                  aria-label={`Select billing ${billing.id}`}
                />
              </TableCell>
              <TableCell>{formatDate(billing.dueDate)}</TableCell>
              <TableCell>{billing.description}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    billing.status === 'paid'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-50 text-black dark:bg-[#27272A] dark:text-white'
                  }`}
                >
                  {billing.status.charAt(0).toUpperCase() + billing.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="font-medium">
                {billing.invoiceTotal}
              </TableCell>
              <TableCell>
                <a
                  href={billing.invoiceUrl}
                  className="text-blue-600 underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Invoice
                </a>
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
        selectedCount={selectedBillingIds.length}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}