export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'admin' | 'general';
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
}
