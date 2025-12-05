import { useState } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, changeType, icon, color }: StatCardProps) {
  return (
    <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-6 hover:border-orange-500/50 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-semibold ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </span>
            <span className="text-gray-500 text-xs">vs last month</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}

function QuickActionCard({ title, description, icon, onClick, color }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-6 hover:border-orange-500 transition-all text-left w-full group"
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <h4 className="text-white font-semibold mb-1">{title}</h4>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </button>
  );
}

interface ActivityItemProps {
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'create' | 'update' | 'delete' | 'login' | 'approve';
}

function ActivityItem({ user, action, target, time, type }: ActivityItemProps) {
  const getIcon = () => {
    switch (type) {
      case 'create':
        return (
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        );
      case 'update':
        return (
          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      case 'delete':
        return (
          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        );
      case 'login':
        return (
          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
        );
      case 'approve':
        return (
          <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-[#2d2d32] rounded-lg transition-colors">
      {getIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white">
          <span className="font-semibold">{user}</span>{' '}
          <span className="text-gray-400">{action}</span>{' '}
          <span className="font-semibold text-orange-400">{target}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'applications' | 'content' | 'certificates' | 'logs' | 'users' | 'settings'>('overview');

  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      title: 'Service Requests',
      value: '156',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'bg-orange-500',
    },
    {
      title: 'Pending Applications',
      value: '23',
      change: '+3',
      changeType: 'increase' as const,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-purple-500',
    },
    {
      title: 'Active Sessions',
      value: '892',
      change: '-2.4%',
      changeType: 'decrease' as const,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'bg-green-500',
    },
  ];

  const quickActions = [
    {
      title: 'Create New User',
      description: 'Add users and assign roles & permissions',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      onClick: () => setActiveTab('users'),
      color: 'bg-blue-500',
    },
    {
      title: 'Create Learning Material',
      description: 'Add courses, videos, and documents',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      onClick: () => setActiveTab('content'),
      color: 'bg-green-500',
    },
    {
      title: 'Post News Update',
      description: 'Publish announcements and updates',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      onClick: () => setActiveTab('content'),
      color: 'bg-orange-500',
    },
    {
      title: 'Create Forum Topic',
      description: 'Start discussions and knowledge sharing',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      onClick: () => setActiveTab('content'),
      color: 'bg-purple-500',
    },
    {
      title: 'Review Certificates',
      description: 'Approve or reject certificate requests',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      onClick: () => setActiveTab('certificates'),
      color: 'bg-yellow-500',
    },
    {
      title: 'View Logs',
      description: 'Monitor system activities and audit trail',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      onClick: () => setActiveTab('logs'),
      color: 'bg-gray-500',
    },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'created', target: 'Service Request #SR-2024-156', time: '2 minutes ago', type: 'create' as const },
    { user: 'Sarah Admin', action: 'approved', target: 'Officer Application #APP-2024-089', time: '15 minutes ago', type: 'approve' as const },
    { user: 'Mike Engineer', action: 'updated', target: 'Certificate Request #CERT-2024-034', time: '32 minutes ago', type: 'update' as const },
    { user: 'Emily Officer', action: 'logged in', target: 'from 192.168.1.100', time: '1 hour ago', type: 'login' as const },
    { user: 'Admin User', action: 'created', target: 'News: System Maintenance Notice', time: '2 hours ago', type: 'create' as const },
    { user: 'Tech Support', action: 'deleted', target: 'Old Service Request #SR-2023-945', time: '3 hours ago', type: 'delete' as const },
  ];

  return (
    <div className="space-y-6 max-h-[calc(100vh-90px)] overflow-y-auto pr-2">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Super Admin Dashboard</h1>
          <p className="text-gray-400">Complete system overview and management</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Quick Action</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities / Logs */}
        <div className="lg:col-span-2">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              <button 
                onClick={() => setActiveTab('logs')}
                className="text-orange-500 hover:text-orange-400 text-sm font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Pending Items */}
        <div className="space-y-6">
          {/* Service Requests */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Service Requests</h3>
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">12 New</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#2d2d32] rounded-lg hover:bg-[#3a3a42] transition-colors cursor-pointer">
                <div>
                  <p className="text-white text-sm font-medium">SSL Certificate</p>
                  <p className="text-gray-400 text-xs">John Doe • 2 hours ago</p>
                </div>
                <span className="text-orange-400 text-xs font-semibold">Pending</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#2d2d32] rounded-lg hover:bg-[#3a3a42] transition-colors cursor-pointer">
                <div>
                  <p className="text-white text-sm font-medium">Database Access</p>
                  <p className="text-gray-400 text-xs">Sarah Smith • 5 hours ago</p>
                </div>
                <span className="text-orange-400 text-xs font-semibold">Pending</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#2d2d32] rounded-lg hover:bg-[#3a3a42] transition-colors cursor-pointer">
                <div>
                  <p className="text-white text-sm font-medium">Server Access</p>
                  <p className="text-gray-400 text-xs">Mike Johnson • 1 day ago</p>
                </div>
                <span className="text-yellow-400 text-xs font-semibold">Review</span>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('requests')}
              className="w-full mt-4 text-orange-500 hover:text-orange-400 text-sm font-medium py-2"
            >
              View All Requests →
            </button>
          </div>

          {/* Officer Applications */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Applications</h3>
              <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">5 New</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#2d2d32] rounded-lg hover:bg-[#3a3a42] transition-colors cursor-pointer">
                <div>
                  <p className="text-white text-sm font-medium">Officer Application</p>
                  <p className="text-gray-400 text-xs">APP-2024-089</p>
                </div>
                <span className="text-purple-400 text-xs font-semibold">New</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#2d2d32] rounded-lg hover:bg-[#3a3a42] transition-colors cursor-pointer">
                <div>
                  <p className="text-white text-sm font-medium">Officer Application</p>
                  <p className="text-gray-400 text-xs">APP-2024-088</p>
                </div>
                <span className="text-purple-400 text-xs font-semibold">New</span>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('applications')}
              className="w-full mt-4 text-orange-500 hover:text-orange-400 text-sm font-medium py-2"
            >
              Review Applications →
            </button>
          </div>
        </div>
      </div>

      {/* System Health & Monitoring */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">System Health</h3>
            <span className="text-green-400 text-xs font-semibold">Operational</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">CPU Usage</span>
                <span className="text-white">32%</span>
              </div>
              <div className="w-full bg-[#2d2d32] rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Memory</span>
                <span className="text-white">58%</span>
              </div>
              <div className="w-full bg-[#2d2d32] rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Storage</span>
                <span className="text-white">45%</span>
              </div>
              <div className="w-full bg-[#2d2d32] rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Certificates Pending</h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-400 mb-2">8</p>
            <p className="text-gray-400 text-sm mb-4">Awaiting approval</p>
            <button 
              onClick={() => setActiveTab('certificates')}
              className="text-orange-500 hover:text-orange-400 text-sm font-medium"
            >
              Review Now →
            </button>
          </div>
        </div>

        <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Active Officers</span>
              <span className="text-white font-semibold">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Active Engineers</span>
              <span className="text-white font-semibold">89</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Learning Materials</span>
              <span className="text-white font-semibold">456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Forum Topics</span>
              <span className="text-white font-semibold">234</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spacing for Scroll */}
      <div className="h-4"></div>
    </div>
  );
}

export default SuperAdminDashboard;