import { useState } from 'react';
import { LayoutDashboard, Clock, Settings, FileText, HelpCircle } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export default function GeneralUserDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#09090B]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-50"
        style={{ backgroundImage: 'url(/Background.svg)' }}
      />

      {/* Sidebar */}
      <aside className="w-64 bg-black/60 backdrop-blur-sm text-white flex flex-col relative z-10 border-r border-white/10">
        <div className="p-6 flex items-center space-x-3 border-b border-white/10">
          <img src="/logo/Cylenium.svg" alt="Cylenium" className="w-8 h-8" />
          <span className="text-xl font-semibold">User Dashboard</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
              activeTab === 'recent' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>Recent Activity</span>
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
              activeTab === 'documents' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>My Documents</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
              activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full text-left p-3 rounded-lg text-red-400 hover:bg-red-900/30 transition-colors flex items-center space-x-3"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative z-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-white">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-gray-400">Here's what's happening with your account today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
            <h2 className="text-lg font-medium text-gray-300">Active Projects</h2>
            <p className="mt-2 text-2xl font-bold text-white">5</p>
            <p className="text-sm text-green-400 mt-1">+2 from last month</p>
          </div>
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
            <h2 className="text-lg font-medium text-gray-300">Tasks Due</h2>
            <p className="mt-2 text-2xl font-bold text-white">3</p>
            <p className="text-sm text-yellow-400 mt-1">1 overdue</p>
          </div>
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
            <h2 className="text-lg font-medium text-gray-300">Storage Used</h2>
            <p className="mt-2 text-2xl font-bold text-white">45%</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start p-4 hover:bg-white/5 rounded-lg transition-colors">
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-white">Document {item} was updated</p>
                  <p className="text-sm text-gray-400">2 hours ago</p>
                </div>
                <button className="text-blue-400 hover:text-blue-300">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}