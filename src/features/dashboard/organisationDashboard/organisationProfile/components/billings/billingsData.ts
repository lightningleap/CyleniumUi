export interface Billing {
  id: string;
  dueDate: Date;
  description: string;
  status: 'upcoming' | 'paid';
  invoiceTotal: string;
  invoiceUrl: string;
}

export const mockBillings: Billing[] = [
  {
    id: '1',
    dueDate: new Date(2025, 8, 21), // September 21, 2025
    description: 'Monthly Invoice',
    status: 'upcoming',
    invoiceTotal: '$150.00',
    invoiceUrl: '#',
  },
  {
    id: '2',
    dueDate: new Date(2026, 3, 18), // April 18, 2026
    description: 'Monthly Invoice',
    status: 'upcoming',
    invoiceTotal: '$160.00',
    invoiceUrl: '#',
  },
  {
    id: '3',
    dueDate: new Date(2025, 10, 5), // November 5, 2025
    description: 'Monthly Invoice',
    status: 'paid',
    invoiceTotal: '$150.00',
    invoiceUrl: '#',
  },
  {
    id: '4',
    dueDate: new Date(2025, 7, 15), // August 15, 2025
    description: 'Monthly Invoice',
    status: 'paid',
    invoiceTotal: '$150.00',
    invoiceUrl: '#',
  },
];