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

function SuperAdminDashboard() {
  const [, setActiveTab] = useState<'overview' | 'requests' | 'applications' | 'content' | 'certificates' | 'logs' | 'users' | 'settings'>('overview');

  // In a real app, these would come from your database/API
  const stats = [
    {
      title: 'Total Users',
      value: '0',
      change: '+0%',
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
      value: '0',
      change: '+0%',
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
      value: '0',
      change: '+0',
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
      value: '0',
      change: '+0%',
      changeType: 'increase' as const,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'bg-green-500',
    },
  ];

  // Super Admin: Full CRUD permissions for all features
  const quickActions = [
    {
      title: 'Manage Users',
      description: 'Create, edit, delete users and assign roles',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      onClick: () => setActiveTab('users'),
      color: 'bg-blue-500',
    },
    {
      title: 'Manage Learning Content',
      description: 'Create, edit, delete courses and materials',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      onClick: () => setActiveTab('content'),
      color: 'bg-green-500',
    },
    {
      title: 'Manage News & Announcements',
      description: 'Create, edit, delete posts and updates',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      onClick: () => setActiveTab('content'),
      color: 'bg-orange-500',
    },
    {
      title: 'Manage Forum',
      description: 'Create, edit, delete topics and moderate discussions',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      onClick: () => setActiveTab('content'),
      color: 'bg-purple-500',
    },
    {
      title: 'Manage Certificates',
      description: 'Approve, edit, delete certificate requests',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      onClick: () => setActiveTab('certificates'),
      color: 'bg-yellow-500',
    },
    {
      title: 'System Logs',
      description: 'View and manage system audit trails',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      onClick: () => setActiveTab('logs'),
      color: 'bg-gray-500',
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#0b0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Super Admin Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-400">Complete system overview and management</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="hidden sm:inline">Quick Action</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions - Super Admin has FULL CRUD ACCESS */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Actions - Full CRUD Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Recent Activities / Logs */}
          <div className="lg:col-span-2">
            <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Activity</h2>
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
              
              {/* Empty State */}
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-white mb-2">No Activity Yet</h3>
                <p className="text-gray-400 text-sm">System activities will appear here once users start interacting with the platform</p>
              </div>
            </div>
          </div>

          {/* Pending Items */}
          <div className="space-y-4 sm:space-y-6">
            {/* Service Requests */}
            <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">Service Requests</h3>
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">0</span>
              </div>
              
              {/* Empty State */}
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-400 text-sm">No pending requests</p>
              </div>
              
              <button 
                onClick={() => setActiveTab('requests')}
                className="w-full mt-4 text-orange-500 hover:text-orange-400 text-sm font-medium py-2"
              >
                View All Requests →
              </button>
            </div>

            {/* Officer Applications */}
            <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">Applications</h3>
                <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">0</span>
              </div>
              
              {/* Empty State */}
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-400 text-sm">No pending applications</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">System Health</h3>
              <span className="text-green-400 text-xs font-semibold">Operational</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">CPU Usage</span>
                  <span className="text-white">--</span>
                </div>
                <div className="w-full bg-[#2d2d32] rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Memory</span>
                  <span className="text-white">--</span>
                </div>
                <div className="w-full bg-[#2d2d32] rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Storage</span>
                  <span className="text-white">--</span>
                </div>
                <div className="w-full bg-[#2d2d32] rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-4 sm:p-6">
            <h3 className="text-white font-semibold mb-4">Certificates Pending</h3>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-400 mb-2">0</p>
              <p className="text-gray-400 text-sm mb-4">Awaiting approval</p>
              <button 
                onClick={() => setActiveTab('certificates')}
                className="text-orange-500 hover:text-orange-400 text-sm font-medium"
              >
                Review Now →
              </button>
            </div>
          </div>

          <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-4 sm:p-6">
            <h3 className="text-white font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Active Officers</span>
                <span className="text-white font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Active Engineers</span>
                <span className="text-white font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Learning Materials</span>
                <span className="text-white font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Forum Topics</span>
                <span className="text-white font-semibold">0</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SuperAdminDashboard;