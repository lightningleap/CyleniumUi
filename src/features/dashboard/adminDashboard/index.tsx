import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
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
            <span className="text-xl font-semibold">Admin Panel</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
            >
              Settings
            </button>
          </nav>
        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-8 relative z-10">
          <h1 className="text-3xl font-semibold text-white">Welcome, Admin!</h1>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
              <h2 className="text-lg font-medium text-gray-300">Total Users</h2>
              <p className="mt-2 text-2xl font-bold text-white">120</p>
            </div>
            <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
              <h2 className="text-lg font-medium text-gray-300">Active Sessions</h2>
              <p className="mt-2 text-2xl font-bold text-white">34</p>
            </div>
            <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
              <h2 className="text-lg font-medium text-gray-300">Pending Requests</h2>
              <p className="mt-2 text-2xl font-bold text-white">5</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
  