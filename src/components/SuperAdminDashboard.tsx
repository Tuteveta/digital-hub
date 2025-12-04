function SuperAdminDashboard() {
  return (
    <>
      {/* Stats Row - Admin has access to all metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Total Users */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">Total Users</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">1,234</div>
              <div className="text-green-500 text-sm font-medium">+12.5%</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">456 Active Today</div>
          </div>
        </div>

        {/* System Revenue */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">Total Revenue</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">$245.6K</div>
              <div className="text-blue-500 text-sm font-medium">+18.2%</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">$45K This Month</div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">All Projects</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">124</div>
              <div className="text-purple-500 text-sm font-medium">+8</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">24 Active</div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">System Health</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">99.8%</div>
              <div className="text-green-500 text-sm font-medium">Healthy</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">All Services Running</div>
          </div>
        </div>
      </div>

      {/* Admin Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* User Management */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">User Management</h3>
            <button className="text-orange-500 hover:text-orange-400 text-xs">Manage</button>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Super Admins</span>
              <span className="text-white font-medium">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Engineers</span>
              <span className="text-white font-medium">45</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Officers</span>
              <span className="text-white font-medium">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Pending Approvals</span>
              <span className="text-orange-500 font-medium">12</span>
            </div>
          </div>
        </div>

        {/* Service Requests */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Service Requests</h3>
            <button className="text-orange-500 hover:text-orange-400 text-xs">View All</button>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Open</span>
              <span className="text-yellow-500 font-medium">28</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">In Progress</span>
              <span className="text-blue-500 font-medium">42</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Completed Today</span>
              <span className="text-green-500 font-medium">15</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Overdue</span>
              <span className="text-red-500 font-medium">3</span>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Compliance Certificates</h3>
            <button className="text-orange-500 hover:text-orange-400 text-xs">Review</button>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Pending Review</span>
              <span className="text-yellow-500 font-medium">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Approved</span>
              <span className="text-green-500 font-medium">32</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Rejected</span>
              <span className="text-red-500 font-medium">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Expiring Soon</span>
              <span className="text-orange-500 font-medium">5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Recent Admin Activity */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Recent Admin Activity</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 truncate">New user role assigned: Engineer</p>
                <span className="text-xs text-gray-500">2 hours ago by Admin</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 truncate">Service request approved: SR-445</p>
                <span className="text-xs text-gray-500">5 hours ago by Admin</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 truncate">System backup completed</p>
                <span className="text-xs text-gray-500">8 hours ago by System</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 truncate">Certificate approved: CERT-223</p>
                <span className="text-xs text-gray-500">1 day ago by Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">System Overview</h3>
            <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded whitespace-nowrap">All Systems Operational</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm text-gray-300 truncate">API Server</span>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">99.9% uptime</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm text-gray-300 truncate">Database Cluster</span>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm text-gray-300 truncate">Storage</span>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">75% used</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm text-gray-300 truncate">Authentication Service</span>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">Active</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperAdminDashboard;