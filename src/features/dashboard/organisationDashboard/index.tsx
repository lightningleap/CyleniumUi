import { useState, useMemo, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { DashboardLayout } from '../DashboardLayout';
import { Search, Filter, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pagination } from '@/components/pagination';

type Organization = {
  id: string;
  name: string;
  email: string;
  logo: string;
  plan: 'Basic' | 'Standard' | 'Premium' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
};

export default function OrganizationDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when the component mounts or when location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Check if we're on the new organization route
  const isNewOrgRoute = location.pathname.endsWith('/new');

  // Sample data - replace with your actual data
  const allOrganizations: Organization[] = [
    {
      id: '1',
      name: 'Acme Inc',
      email: 'contact@acme.com',
      logo: '',
      plan: 'Enterprise',
      status: 'Active',
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'Globex Corp',
      email: 'info@globex.com',
      logo: '',
      plan: 'Premium',
      status: 'Active',
      lastActive: '30 minutes ago',
    },
    {
      id: '3',
      name: 'Soylent Corp',
      email: 'hello@soylent.com',
      logo: '',
      plan: 'Standard',
      status: 'Inactive',
      lastActive: '2 weeks ago',
    },
    {
      id: '4',
      name: 'Initech',
      email: 'contact@initech.com',
      logo: '',
      plan: 'Basic',
      status: 'Pending',
      lastActive: '4 days ago',
    },
    {
      id: '5',
      name: 'Umbrella Corp',
      email: 'support@umbrella.com',
      logo: '',
      plan: 'Pro',
      status: 'Active',
      lastActive: '2 months ago',
    },
    {
      id: '6',
      name: 'Cyberdyne Systems',
      email: 'info@cyberdyne.com',
      logo: '',
      plan: 'Enterprise',
      status: 'Active',
      lastActive: '1 day ago',
    },
    {
      id: '7',
      name: 'Stark Industries',
      email: 'contact@stark.com',
      logo: '',
      plan: 'Premium',
      status: 'Active',
      lastActive: '5 hours ago',
    },
    {
      id: '8',
      name: 'Wayne Enterprises',
      email: 'support@wayne.com',
      logo: '',
      plan: 'Pro',
      status: 'Inactive',
      lastActive: '1 month ago',
    },
    {
      id: '9',
      name: 'Oscorp',
      email: 'hello@oscorp.com',
      logo: '',
      plan: 'Standard',
      status: 'Active',
      lastActive: '3 days ago',
    },
    {
      id: '10',
      name: 'Wonka Industries',
      email: 'contact@wonka.com',
      logo: '',
      plan: 'Basic',
      status: 'Pending',
      lastActive: '1 week ago',
    }
  ];

  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and paginate data
  const { filteredOrganizations, pageCount } = useMemo(() => {
    const filtered = allOrganizations.filter(org => 
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filtered.length / pageSize);
    const startIndex = pageIndex * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

    return {
      filteredOrganizations: paginatedData,
      pageCount,
      totalItems: filtered.length
    };
  }, [allOrganizations, searchTerm, pageIndex, pageSize]);

  // Handle row selection
  const toggleRowSelection = (id: string) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedRows(newSelection);
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedRows.size === filteredOrganizations.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredOrganizations.map(org => org.id)));
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPageIndex(newPage - 1);
  };

  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(0); // Reset to first page when page size changes
  };

  const handleNewOrganizationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate({ to: '/organisationDashboard/new' });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] w-full">
        {isNewOrgRoute ? (
          <Outlet />
        ) : (
          <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
            {/* Organization List */}
            <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Organizations</h1>
                  <p className="text-sm text-gray-500">Manage your organizations and view their details</p>
                </div>
                <Button 
                  variant="bluebutton" 
                  className="w-full md:w-auto mt-2 md:mt-0"
                  onClick={handleNewOrganizationClick}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Organization
                </Button>
              </div>
              {/* Header with search and actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex flex-1 md:max-w-md gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search organizations..."
                      className="pl-9 w-full"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPageIndex(0); // Reset to first page when searching
                      }}
                    />
                  </div>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
              {/* Table Container */}
              <div className="flex flex-col h-[calc(100vh-250px)] min-h-[400px] rounded-lg border shadow-sm">
                <div className="flex-1 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px] text-left px-3 py-3">
                          <Checkbox 
                            checked={selectedRows.size === filteredOrganizations.length && filteredOrganizations.length > 0}
                            onCheckedChange={toggleSelectAll}
                            aria-label="Select all"
                          />
                        </TableHead>
                        <TableHead className="w-[300px] text-left px-3 py-3">
                          <div className="flex items-center gap-2">
                            Organization
                            <div className="flex flex-col">
                              <ChevronUp className="h-3 w-3 mb-0.1" />
                              <ChevronDown className="h-3 w-3 -mt-1" />
                            </div>
                          </div>
                        </TableHead>
                        <TableHead className="text-left px-3 py-3">
                          <div className="flex items-center gap-2">
                            Plan
                            <div className="flex flex-col">
                              <ChevronUp className="h-3 w-3 mb-0.1" />
                              <ChevronDown className="h-3 w-3 -mt-1" />
                            </div>
                          </div>
                        </TableHead>
                        <TableHead className="text-left px-3 py-3">
                          <div className="flex items-center gap-2">
                            Status
                            <div className="flex flex-col">
                              <ChevronUp className="h-3 w-3 mb-0.1" />
                              <ChevronDown className="h-3 w-3 -mt-1" />
                            </div>
                          </div>
                        </TableHead>
                        <TableHead className="text-left px-3 py-3">
                          <div className="flex items-center gap-2">
                            Last Active
                            <div className="flex flex-col">
                              <ChevronUp className="h-3 w-3 mb-0.1" />
                              <ChevronDown className="h-3 w-3 -mt-1" />
                            </div>
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrganizations.map((org) => (
                        <TableRow key={org.id}>
                          <TableCell className="text-left px-3 py-3">
                            <Checkbox 
                              checked={selectedRows.has(org.id)}
                              onCheckedChange={() => toggleRowSelection(org.id)}
                              aria-label={`Select ${org.name}`}
                            />
                          </TableCell>
                          <TableCell className="text-left px-3 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={org.logo} alt={org.name} />
                                <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-medium">{org.name}</span>
                                <span className="text-sm text-muted-foreground">{org.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-left px-3 py-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-full text-primary">
                              {org.plan} Plan
                            </span>
                          </TableCell>
                          <TableCell className="text-left px-3 py-3">
                            <div className="flex items-center">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                org.status === 'Active' ? 'bg-green-500 text-white' :
                                org.status === 'Inactive' ? 'bg-gray-200 text-gray-800' :
                                'bg-orange-500 text-white'
                              }`}>
                                {org.status}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-left px-3 py-3 text-muted-foreground">
                            {org.lastActive}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Pagination */}
                <div className="border-t bg-background px-4 py-3">
                  <Pagination
                    currentPage={pageIndex + 1}
                    totalPages={pageCount}
                    pageSize={pageSize}
                    totalItems={allOrganizations.length}
                    selectedCount={selectedRows.size}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
