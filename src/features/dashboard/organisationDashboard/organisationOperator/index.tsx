import { DashboardLayout } from '../../DashboardLayout';
import { SearchBar } from './components/searchBar';
import { OperatorsTable } from './components/operatorsTable';
import { useState } from 'react';

export default function OrganisationOperator() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-3xl font-semibold tracking-tight mb-6">Platform Users</h2>
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilter={handleFilter}
        />
        <div className="mt-6">
          <OperatorsTable searchTerm={searchTerm} />
        </div>
      </div>
    </DashboardLayout>
  );
}
