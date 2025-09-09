import * as React from 'react';
import { DashboardLayout } from '../../DashboardLayout';
import { SearchBar } from './components/searchBar';
import { BillingTable } from './components/billingTable';

export default function OrganisationBillings() {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-3xl font-semibold tracking-tight mb-6">Billings</h2>
        <SearchBar className="mb-4" onSearch={setSearchTerm} />
        <BillingTable searchTerm={searchTerm} />
      </div>
    </DashboardLayout>
  );
}
