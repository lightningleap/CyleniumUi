import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NewUserModal } from './newUserModal';
import { useState } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilter: () => void;
}

export function SearchBar({ 
  searchTerm, 
  onSearchChange,
  onFilter 
}: SearchBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full h-auto sm:h-[36px] gap-4 sm:gap-[16px]">
      <div className="flex items-center gap-2 sm:gap-[8px] w-full max-w-[352px] sm:w-[283px]">
        <div className="relative w-full sm:w-[239px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A] dark:text-[#A1A1AA]" />
          <Input
            type="search"
            placeholder="Search operators..."
            className="w-full h-9 sm:h-[36px] px-3 pl-9 bg-white dark:bg-[#09090B] rounded-[6px] text-sm font-normal text-[#09090B] dark:text-white placeholder:text-[#71717A] dark:placeholder:text-[#A1A1AA] hover:bg-[#F4F4F5]/80 dark:hover:bg-[#27272A]/80 focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#09090B] transition-colors"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onFilter}
          className="w-9 sm:w-[36px] h-9 sm:h-[36px] p-[6px] sm:p-3 bg-white dark:bg-[#09090B] rounded-[6px] flex items-center justify-center hover:bg-[#F4F4F5]/80 dark:hover:bg-[#27272A]/80 focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#09090B] transition-colors">
          <Filter className="h-4 w-4 text-[#09090B] dark:text-white" />
        </Button>
      </div>
      <Button 
        variant="bluebutton" 
        onClick={() => setIsModalOpen(true)} 
        className="w-full max-w-[352px] sm:w-[156px] h-9 sm:h-[36px] bg-[#006FE8] hover:bg-[#006FE8]/90 text-white font-medium text-sm leading-5 tracking-[-0.006em] rounded-[6px] px-4"
      >
        New User
      </Button>

      <NewUserModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
