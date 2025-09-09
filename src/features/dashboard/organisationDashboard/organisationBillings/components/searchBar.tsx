import * as React from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  className?: string
  onSearch?: (value: string) => void
}

export function SearchBar({ className, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className={`flex flex-row items-center gap-4 w-full h-9 ${className || ''}`}>
      <div className="flex items-center space-x-2 w-[283px]">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-white" />
          <Input
            type="search"
            placeholder="Search organizations..."
            className="pl-8 w-full dark:bg-[#09090B] dark:text-white"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="h-9 dark:bg-[#09090B] dark:text-white">
          <Filter className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
