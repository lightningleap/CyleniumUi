import { ChevronUp, ChevronDown, Edit, CircleSlash, Trash2 } from 'lucide-react'
import DeleteModal from '@/components/modals/DeleteModal'
import { DeactivateModal } from '@/components/modals/DeactivateModal'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import * as React from 'react'
import { Pagination } from '@/components/pagination/pagination'
import { TableDropdown } from '@/components/table/table-dropdown'
import { NewUserModal } from './newUserModal'

interface Operator {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastActive: string
  avatar?: string
}

const data: Operator[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Administrator',
    status: 'active',
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'Editor',
    status: 'inactive',
    lastActive: '3 days ago'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    role: 'Viewer',
    status: 'pending',
    lastActive: '1 week ago'
  }
]

type SortDirection = 'asc' | 'desc' | null
type SortField = keyof Operator | null

interface OperatorsTableProps {
  searchTerm?: string
}

export function OperatorsTable({ searchTerm = '' }: OperatorsTableProps) {
  const [editingOperator, setEditingOperator] = React.useState<Operator | null>(null)
  const [deactivatingOperator, setDeactivatingOperator] = React.useState<Operator | null>(null)
  const [isUpdatingStatus, setIsUpdatingStatus] = React.useState(false)
  const [deletingOperator, setDeletingOperator] = React.useState<Operator | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)
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

  const toggleSort = (field: keyof Operator) => {
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

  const getSortedData = (dataToSort: Operator[]) => {
    if (!sortField || !sortDirection) return dataToSort

    return [...dataToSort].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue)
        return sortDirection === 'asc' ? comparison : -comparison
      }
      return 0
    })
  }

  const getSortIcon = (field: keyof Operator) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  const getStatusBadgeColor = (status: Operator['status']) => {
    switch (status) {
      case 'active':
        return 'bg-[#008A2E] text-[#FAFAFA]';
      case 'inactive':
        return 'bg-[#F4F4F5] text-[#18181B]';
      case 'pending':
        return 'bg-[#DC7609] text-[#FAFAFA]';
      default:
        return 'bg-[#F4F4F5] text-[#18181B]';
    }
  };

  const mapRoleToEnum = (role: string): 'admin' | 'editor' | 'viewer' => {
    const roleMap: Record<string, 'admin' | 'editor' | 'viewer'> = {
      'Administrator': 'admin',
      'Editor': 'editor',
      'Viewer': 'viewer'
    }
    return roleMap[role] || 'viewer'
  }

  const handleEditSuccess = () => {
    // TODO: Refresh table data
    setEditingOperator(null)
  }

  return (
    <div className="flex flex-col">
      <NewUserModal
        open={!!editingOperator}
        onClose={() => setEditingOperator(null)}
        onSuccess={handleEditSuccess}
        initialData={editingOperator ? {
          id: editingOperator.id,
          role: mapRoleToEnum(editingOperator.role),
          email: editingOperator.email,
          name: editingOperator.name
        } : undefined}
      />
      <div className="flex flex-col w-full h-full">
        <Table>
          <TableHeader>
            <TableRow >
              <TableHead className="w-12 h-12 flex justify-center items-center">
                <Checkbox 
                  checked={isAllSelected}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead 
                className="min-w-[175px] w-[263px] font-medium cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleSort('name')}
              >
                <div className="flex items-center dark:text-[#A1A1AA]">
                  Administrator
                  <span className="ml-2 dark:text-[#A1A1AA]">{getSortIcon('name')}</span>
                </div>
              </TableHead>
              <TableHead 
                className="min-w-[175px] w-[263px] font-medium cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleSort('role')}
              >
                <div className="flex items-center dark:text-[#A1A1AA]">
                  Role
                  <span className="ml-2 dark:text-[#A1A1AA]">{getSortIcon('role')}</span>
                </div>
              </TableHead>
              <TableHead 
                className="min-w-[175px] w-[263px] font-medium cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleSort('status')}
              >
                <div className="flex items-center dark:text-[#A1A1AA]">
                  Status
                  <span className="ml-2 dark:text-[#A1A1AA]">{getSortIcon('status')}</span>
                </div>
              </TableHead>
              <TableHead 
                className="min-w-[175px] w-[263px] font-medium cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleSort('lastActive')}
              >
                <div className="flex items-center dark:text-[#A1A1AA]">
                  Last Active
                  <span className="ml-2 dark:text-[#A1A1AA]">{getSortIcon('lastActive')}</span>
                </div>
              </TableHead>
              <TableHead className="w-[52px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {getPaginatedData().map((operator) => (
              <TableRow key={operator.id} className="border-b border-[#E4E4E7] dark:border-[#3F3F46]">
                <TableCell className="w-12 h-[65px] flex justify-center items-center">
                  <Checkbox 
                    checked={selectedRows.includes(operator.id)}
                    onCheckedChange={() => toggleRow(operator.id)}
                  />
                </TableCell>
                <TableCell className="min-w-[175px] w-[263px]">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#F4F4F5] flex items-center justify-center">
                      {operator.avatar ? (
                        <img src={operator.avatar} alt={operator.name} className="w-10 h-10 rounded-full" />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8ZM8 16C11.866 16 15 14.2091 15 12C15 9.79086 11.866 8 8 8C4.13401 8 1 9.79086 1 12C1 14.2091 4.13401 16 8 16Z" fill="#09090B"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#09090B] dark:text-white">{operator.name}</span>
                      <span className="text-sm text-[#71717A] dark:text-white">{operator.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="min-w-[175px] w-[263px]">
                  <span className="text-sm text-[#09090B] dark:text-white">{operator.role}</span>
                </TableCell>
                <TableCell className="min-w-[175px] w-[263px]">
                  <Badge 
                    variant={operator.status === 'active' ? 'default' : 'secondary'}
                    className={getStatusBadgeColor(operator.status)}
                  >
                    {operator.status}
                  </Badge>
                </TableCell>
                <TableCell className="min-w-[175px] w-[263px]">
                  <span className="text-sm text-[#09090B] dark:text-white">{operator.lastActive}</span>
                </TableCell>
                <TableCell >
                  <TableDropdown
                    groups={[
                      {
                        items: [
                          {
                            id: 'edit',
                            type: 'item' as const,
                            label: 'Edit',
                            icon: Edit,
                            onClick: () => setEditingOperator(operator)
                          },
                          {
                            id: 'deactivate',
                            type: 'item' as const,
                            label: 'Deactivate',
                            icon: CircleSlash,
                            onClick: () => setDeactivatingOperator(operator),
                          }
                        ]
                      },
                      {
                        items: [
                          {
                            id: 'delete',
                            type: 'item' as const,
                            label: 'Delete',
                            icon: Trash2,
                            onClick: () => setDeletingOperator(operator),
                            destructive: true
                          }
                        ]
                      }
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(getFilteredData().length / pageSize)}
        pageSize={pageSize}
        totalItems={getFilteredData().length}
        selectedCount={selectedRows.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[10, 20, 50]}
      />
      <DeactivateModal
        isOpen={!!deactivatingOperator}
        onClose={() => setDeactivatingOperator(null)}
        status={deactivatingOperator?.status === 'active' ? 'active' : 'inactive'}
        onConfirm={async () => {
          if (!deactivatingOperator) return;
          try {
            setIsUpdatingStatus(true);
            // TODO: Call your update status API here
            // await updateOperatorStatus(deactivatingOperator.id, deactivatingOperator.status === 'active' ? 'inactive' : 'active');
            console.log('Updating operator status:', deactivatingOperator.id);
            // Refresh the operators list after status update
            // onSuccess?.();
          } catch (error) {
            console.error('Failed to update operator status:', error);
            throw error; // This will be caught by the DeactivateModal
          } finally {
            setIsUpdatingStatus(false);
          }
        }}
        isLoading={isUpdatingStatus}
      />
      <DeleteModal
        isOpen={!!deletingOperator}
        onClose={() => setDeletingOperator(null)}
        onDelete={async () => {
          if (!deletingOperator) return;
          try {
            setIsDeleting(true);
            // TODO: Call your delete API here
            // await deleteOperator(deletingOperator.id);
            console.log('Deleting operator:', deletingOperator.id);
            // Refresh the operators list after deletion
            // onSuccess?.();
          } catch (error) {
            console.error('Failed to delete operator:', error);
            throw error; // This will trigger the error toast in the DeleteModal
          } finally {
            setIsDeleting(false);
          }
        }}
        title="Delete Operator"
        description="Are you sure you want to delete this operator? This action cannot be undone."
        deleteButtonText="Delete"
        cancelButtonText="Cancel"
        isLoading={isDeleting}
        successMessage="Operator deleted successfully"
      />
    </div>
  );
}
