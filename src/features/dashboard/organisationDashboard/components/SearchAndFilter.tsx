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
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search organizations..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      <Button variant="bluebutton" onClick={onNewOrganization}>
        {/* <Plus className="mr-2 h-4 w-4" /> */}
        New Organization
      </Button>
    </div>
  );
}
