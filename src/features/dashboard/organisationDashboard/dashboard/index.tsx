import { DashboardLayout } from '../../DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, Server, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function OrganizationDashboard() {
  // Mock data - replace with actual data from your API
  const stats = [
    { 
      title: 'Total Users', 
      value: '156', 
      icon: Users,
      change: '+12% from last month'
    },
    { 
      title: 'Active Devices', 
      value: '42', 
      icon: Server,
      change: '+5 this week'
    },
    { 
      title: 'Uptime', 
      value: '99.9%', 
      icon: Activity,
      change: 'All systems operational'
    }
  ];

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'created a new project', time: '2 minutes ago', status: 'success' },
    { id: 2, user: 'Jane Smith', action: 'updated billing information', time: '1 hour ago', status: 'info' },
    { id: 3, user: 'System', action: 'scheduled maintenance', time: '3 hours ago', status: 'warning' },
    { id: 4, user: 'Mike Johnson', action: 'invited 3 new users', time: '1 day ago', status: 'success' },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Organization Dashboard</h1>
          <div className="flex space-x-2">
            <Button variant="outline">Export Report</Button>
            <Button>New Project</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <div className="mr-4">
                      {activity.status === 'success' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : activity.status === 'warning' ? (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.user} <span className="text-muted-foreground font-normal">{activity.action}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Invite Team Members
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Server className="mr-2 h-4 w-4" />
                Add New Device
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="mr-2 h-4 w-4" />
                Report an Issue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}