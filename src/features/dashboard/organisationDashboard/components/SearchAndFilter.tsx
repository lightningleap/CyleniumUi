import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Plus } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewOrganization: () => void;
}

export function SearchAndFilter({ 
  searchTerm, 
  onSearchChange, 
  onNewOrganization 
}: SearchAndFilterProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-white" />
          <Input
            type="search"
            placeholder="Search organizations..."
            className="pl-8 w-full dark:bg-[#09090B] dark:text-white"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="h-9 dark:bg-[#09090B] dark:text-white">
          <Filter className="mr-2 h-4 w-4" />
        </Button>
      </div>
      <Button variant="bluebutton" onClick={onNewOrganization}>
        New Organization
      </Button>
    </div>
  );
}
