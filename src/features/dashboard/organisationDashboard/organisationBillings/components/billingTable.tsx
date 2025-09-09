import { ChevronUp, ChevronDown } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import * as React from 'react'
import { Pagination } from '@/components/pagination/pagination'

interface BillingData {
  id: string
  dueDate: string
  organization: string
  description: string
  status: 'paid' | 'pending'
  invoiceTotal: string
  invoice: string
}

const data: BillingData[] = [
  {
    id: '1',
    dueDate: '2025-09-15',
    organization: 'Acme Corp',
    description: 'Monthly Subscription',
    status: 'paid',
    invoiceTotal: '$599.00',
    invoice: 'INV-001'
  },
  {
    id: '2',
    dueDate: '2025-09-20',
    organization: 'Tech Solutions',
    description: 'Annual License',
    status: 'pending',
    invoiceTotal: '$1,299.00',
    invoice: 'INV-002'
  },
  {
    id: '3',
    dueDate: '2025-09-25',
    organization: 'Global Services',
    description: 'Consulting Hours',
    status: 'paid',
    invoiceTotal: '$899.00',
    invoice: 'INV-003'
  },
  {
    id: '4',
    dueDate: '2025-09-30',
    organization: 'Digital Systems',
    description: 'Support Package',
    status: 'pending',
    invoiceTotal: '$499.00',
    invoice: 'INV-004'
  },
  {
    id: '5',
    dueDate: '2025-10-05',
    organization: 'Cloud Platforms',
    description: 'Infrastructure Setup',
    status: 'paid',
    invoiceTotal: '$2,499.00',
    invoice: 'INV-005'
  }
]

type SortDirection = 'asc' | 'desc' | null
type SortField = keyof BillingData | null

interface BillingTableProps {
  searchTerm?: string;
}

export function BillingTable({ searchTerm = '' }: BillingTableProps) {
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  const [sortField, setSortField] = React.useState<SortField>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])

  const isAllSelected = data.length > 0 && selectedRows.length === data.length

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedRows([])
    } else {
      setSelectedRows(data.map(row => row.id))
    }
  }

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const toggleSort = (field: keyof BillingData) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortField(null)
        setSortDirection(null)
      }
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getFilteredData = () => {
    return data.filter(row => 
      Object.values(row).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const getPaginatedData = () => {
    const filteredData = getFilteredData();
    const sortedData = getSortedData(filteredData);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  };

  const getSortedData = (dataToSort: BillingData[]) => {
    if (!sortField || !sortDirection) return dataToSort

    return [...dataToSort].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortField === 'invoiceTotal') {
          // Remove currency symbol and convert to number for comparison
          const aNum = parseFloat(aValue.replace(/[$,]/g, ''))
          const bNum = parseFloat(bValue.replace(/[$,]/g, ''))
          return sortDirection === 'asc' ? aNum - bNum : bNum - aNum
        }
        if (sortField === 'dueDate') {
          // Compare dates
          const aDate = new Date(aValue)
          const bDate = new Date(bValue)
          return sortDirection === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime()
        }
        return sortDirection === 'asc' ? 
          aValue.localeCompare(bValue) : 
          bValue.localeCompare(aValue)
      }
      return 0
    })
  }

  const getSortIcon = (field: keyof BillingData) => {
    if (sortField !== field) {
      return <ChevronUp className="ml-2 h-4 w-4" />
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="ml-2 h-4 w-4" /> : 
      <ChevronDown className="ml-2 h-4 w-4" />
  }
  return (
    <div className="w-full">
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 h-12 flex justify-center items-center">
                <Checkbox 
                  checked={isAllSelected}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => toggleSort('dueDate')}>
                  Due Date {getSortIcon('dueDate')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => toggleSort('organization')}>
                  Organization {getSortIcon('organization')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => toggleSort('description')}>
                  Description {getSortIcon('description')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => toggleSort('status')}>
                  Status {getSortIcon('status')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => toggleSort('invoiceTotal')}>
                  Invoice Total {getSortIcon('invoiceTotal')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => toggleSort('invoice')}>
                  Invoice {getSortIcon('invoice')}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getPaginatedData().map((row) => (
              <TableRow key={row.id}>
                <TableCell className="w-12 h-[65px] flex justify-center items-center">
                  <Checkbox 
                    checked={selectedRows.includes(row.id)}
                    onCheckedChange={() => toggleRow(row.id)}
                  />
                </TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>{row.organization}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Badge 
                    variant={row.status === 'paid' ? 'default' : 'secondary'}
                    className={row.status === 'paid' ? 'bg-[#008A2E] text-white' : 'bg-[#F4F4F5] text-[#18181B]'}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>{row.invoiceTotal}</TableCell>
                <TableCell>
                  <Button 
                    variant="link" 
                    className="p-0 text-[rgba(0,122,255,0.9)] underline font-medium"
                  >
                    {row.invoice}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / pageSize)}
        pageSize={pageSize}
        totalItems={data.length}
        selectedCount={selectedRows.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(1)
        }}
      />
    </div>
  )
}
