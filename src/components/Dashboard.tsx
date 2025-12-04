function Dashboard() {
  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Stat Card 1 */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">Total Users</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">1,234</div>
              <div className="text-green-500 text-sm font-medium">+12.5%</div>
            </div>
            <div className="mt-2 h-12">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M 0,30 L 20,25 L 40,28 L 60,20 L 80,15 L 100,10" fill="none" stroke="#10b981" strokeWidth="2" />
                <path d="M 0,30 L 20,25 L 40,28 L 60,20 L 80,15 L 100,10 L 100,40 L 0,40 Z" fill="url(#gradient1)" opacity="0.3" />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">Revenue</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">$45.6K</div>
              <div className="text-blue-500 text-sm font-medium">+8.2%</div>
            </div>
            <div className="mt-2 h-12">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M 0,35 L 20,32 L 40,35 L 60,28 L 80,22 L 100,18" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M 0,35 L 20,32 L 40,35 L 60,28 L 80,22 L 100,18 L 100,40 L 0,40 Z" fill="url(#gradient2)" opacity="0.3" />
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">Active Projects</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">24</div>
              <div className="text-purple-500 text-sm font-medium">+3</div>
            </div>
            <div className="mt-2 h-12">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M 0,25 L 20,28 L 40,22 L 60,25 L 80,20 L 100,15" fill="none" stroke="#a855f7" strokeWidth="2" />
                <path d="M 0,25 L 20,28 L 40,22 L 60,25 L 80,20 L 100,15 L 100,40 L 0,40 Z" fill="url(#gradient3)" opacity="0.3" />
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">Completion Rate</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">87%</div>
              <div className="text-orange-500 text-sm font-medium">+5.3%</div>
            </div>
            <div className="mt-2 h-12">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M 0,30 L 20,27 L 40,29 L 60,24 L 80,18 L 100,12" fill="none" stroke="#f97316" strokeWidth="2" />
                <path d="M 0,30 L 20,27 L 40,29 L 60,24 L 80,18 L 100,12 L 100,40 L 0,40 Z" fill="url(#gradient4)" opacity="0.3" />
                <defs>
                  <linearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content Panels Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Recent Activity Panel */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Recent Activity</h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">New user registered</p>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">Project completed successfully</p>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">Payment received</p>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">New analytics report generated</p>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status Panel */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">System Status</h3>
            <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded whitespace-nowrap">All Systems Operational</span>
          </div>
          <div className="p-4">
            <div className="space-y-4">
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
                  <span className="text-sm text-gray-300 truncate">Database</span>
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
                  <span className="text-sm text-gray-300 truncate">CDN</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;