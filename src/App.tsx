import { useAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const { signOut, user } = useAuthenticator();

  return (
    <div className="flex min-h-screen w-full bg-[#0b0c0e]">
      {/* Sidebar */}
      <aside className="w-16 bg-[#18181b] border-r border-[#2d2d32] flex flex-col items-center py-4 flex-shrink-0">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col space-y-4">
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2d2d32] text-orange-500 hover:bg-[#3a3a42] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:bg-[#2d2d32] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:bg-[#2d2d32] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:bg-[#2d2d32] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="bg-[#18181b] border-b border-[#2d2d32] flex-shrink-0">
          <div className="flex items-center justify-between px-4 sm:px-6 h-14">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
              <h1 className="text-base sm:text-lg font-medium text-white truncate">Dashboard</h1>
              <span className="text-gray-500 hidden sm:inline">/</span>
              <span className="text-gray-400 text-xs sm:text-sm hidden sm:inline">Home</span>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Time Range Selector */}
              <button className="hidden md:block px-3 py-1.5 bg-[#2d2d32] text-gray-300 text-sm rounded hover:bg-[#3a3a42] border border-[#3a3a42] transition-colors">
                Last 6 hours
              </button>
              
              {/* Refresh Button */}
              <button className="p-1.5 text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-[#2d2d32]">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-sm text-white truncate max-w-[150px]">{user?.signInDetails?.loginId || 'User'}</span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
                <button
                  onClick={signOut}
                  className="px-2 sm:px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm rounded transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
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
        </main>
      </div>
    </div>
  );
}

export default App;