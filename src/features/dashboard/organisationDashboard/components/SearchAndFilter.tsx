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
    <div className="flex flex-col space-y-4 mb-6 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex flex-1 space-x-2 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-white" />
          <Input
            type="search"
            placeholder="Search organizations..."
            className="pl-8 w-full border-[#E4E4E7] dark:border-[#3F3F46] dark:bg-[#09090B] dark:text-white"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 w-12 flex-shrink-0 border border-[#E4E4E7] dark:border-[#3F3F46] dark:bg-[#09090B] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="bluebutton" onClick={onNewOrganization}>
        New Organization
      </Button>
    </div>
  );
}
