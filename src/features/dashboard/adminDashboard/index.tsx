// import { useState } from 'react';
import { DashboardLayout } from '../DashboardLayout';

export default function AdminDashboard() {
  // const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
            <p className="text-2xl font-bold mt-2">1,234</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-gray-400 text-sm font-medium">Active Sessions</h3>
            <p className="text-2xl font-bold mt-2">42</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-gray-400 text-sm font-medium">Storage Used</h3>
            <p className="text-2xl font-bold mt-2">1.2 GB</p>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-2 lg:col-span-3 bg-white/5 p-6 rounded-lg border border-white/10">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {/* Add your activity items here */}
              <div className="p-3 bg-white/5 rounded">
                <p>New user registered: johndoe@example.com</p>
                <p className="text-sm text-gray-400">2 minutes ago</p>
              </div>
              <div className="p-3 bg-white/5 rounded">
                <p>System update completed successfully</p>
                <p className="text-sm text-gray-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}