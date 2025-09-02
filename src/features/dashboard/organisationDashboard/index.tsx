import { useState } from 'react';
import { Users, Briefcase, Clock, LayoutDashboard, Settings, ChevronUp } from 'lucide-react';

export default function OrganizationDashboard() {
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
          <span className="text-xl font-semibold">Org Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab === 'members' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5" />
              <span>Members</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5" />
              <span>Projects</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </div>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative z-10">
        <h1 className="text-3xl font-semibold text-white">Welcome, Organization Admin!</h1>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Total Members */}
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 group hover:border-blue-500/50 transition-colors">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-gray-300">Total Members</h2>
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-2xl font-bold text-white">250</p>
              <div className="flex items-center text-emerald-400 text-sm">
                <ChevronUp className="w-4 h-4" />
                <span>15%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Active Projects */}
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 group hover:border-purple-500/50 transition-colors">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-gray-300">Active Projects</h2>
              <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                <Briefcase className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-2xl font-bold text-white">12</p>
              <div className="flex items-center text-emerald-400 text-sm">
                <ChevronUp className="w-4 h-4" />
                <span>10%</span>
              </div>
            </div>
          </div>

          {/* Card 3: Pending Approvals */}
          <div className="p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 group hover:border-orange-500/50 transition-colors">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-gray-300">Pending Approvals</h2>
              <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-2xl font-bold text-white">7</p>
              <div className="flex items-center text-emerald-400 text-sm">
                <ChevronUp className="w-4 h-4" />
                <span>5%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
