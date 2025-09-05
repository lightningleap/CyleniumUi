import { DashboardLayout } from '../DashboardLayout';
import { Clock, FileText, HelpCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function GeneralUserDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.name || 'User'}!</h1>
        
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-gray-400 text-sm font-medium">Recent Documents</h3>
            <p className="text-2xl font-bold mt-2">12</p>
            <div className="flex items-center text-emerald-400 text-sm mt-1">
              <span>Last opened: 2 days ago</span>
            </div>
          </div>
          
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-gray-400 text-sm font-medium">Pending Tasks</h3>
            <p className="text-2xl font-bold mt-2">3</p>
            <div className="flex items-center text-amber-400 text-sm mt-1">
              <span>1 high priority</span>
            </div>
          </div>
          
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-gray-400 text-sm font-medium">Team Members</h3>
            <p className="text-2xl font-bold mt-2">8</p>
            <div className="flex items-center text-blue-400 text-sm mt-1">
              <span>2 online now</span>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-2 lg:col-span-3 bg-white/5 p-6 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded flex items-start">
                <div className="bg-blue-500/10 p-2 rounded-lg mr-3">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p>You updated "Project_Proposal.docx"</p>
                  <p className="text-sm text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded flex items-start">
                <div className="bg-green-500/10 p-2 rounded-lg mr-3">
                  <Clock className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p>Meeting with design team in 15 minutes</p>
                  <p className="text-sm text-gray-400">Today, 2:00 PM</p>
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded flex items-start">
                <div className="bg-purple-500/10 p-2 rounded-lg mr-3">
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p>New comment on "Q3_Report.xlsx"</p>
                  <p className="text-sm text-gray-400">Yesterday, 4:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}