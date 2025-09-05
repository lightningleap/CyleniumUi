import type { User } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    lastActive: '2 hours ago',
    image: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'general',
    status: 'active',
    lastActive: '4 days ago',
    image: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'general',
    status: 'inactive',
    lastActive: '2 weeks ago',
    image: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'admin',
    status: 'pending',
    lastActive: '30 minutes ago',
    image: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'general',
    status: 'active',
    lastActive: '2 months ago',
    image: 'https://i.pravatar.cc/150?img=5'
  },
];