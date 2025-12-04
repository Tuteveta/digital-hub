function EngineerDashboard() {
  return (
    <>
      {/* Stats Row - Engineer Focus */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* My Tasks */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">My Tasks</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">18</div>
              <div className="text-yellow-500 text-sm font-medium">5 Due Today</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">12 In Progress</div>
          </div>
        </div>

        {/* Service Requests */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">Assigned Requests</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">24</div>
              <div className="text-blue-500 text-sm font-medium">+3 New</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">16 Active</div>
          </div>
        </div>

        {/* Projects */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">My Projects</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">8</div>
              <div className="text-purple-500 text-sm font-medium">2 Active</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">6 Completed</div>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">Completion Rate</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">92%</div>
              <div className="text-green-500 text-sm font-medium">+5.3%</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">Above Average</div>
          </div>
        </div>
      </div>

      {/* Engineer Work Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Current Tasks */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Current Tasks</h3>
            <button className="text-orange-500 hover:text-orange-400 text-xs">View All</button>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <input type="checkbox" className="mt-1 rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500" />
              <div className="flex-1">
                <p className="text-sm text-white font-medium">Configure DNS for client domain</p>
                <p className="text-xs text-gray-500 mt-1">Due: Today, 5:00 PM</p>
                <span className="inline-block mt-2 px-2 py-1 bg-red-500/10 text-red-500 text-xs rounded">High Priority</span>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <input type="checkbox" className="mt-1 rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500" />
              <div className="flex-1">
                <p className="text-sm text-white font-medium">Deploy application to staging</p>
                <p className="text-xs text-gray-500 mt-1">Due: Tomorrow</p>
                <span className="inline-block mt-2 px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded">Medium Priority</span>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <input type="checkbox" className="mt-1 rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500" />
              <div className="flex-1">
                <p className="text-sm text-white font-medium">Update security certificates</p>
                <p className="text-xs text-gray-500 mt-1">Due: Next Week</p>
                <span className="inline-block mt-2 px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded">Low Priority</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Service Requests */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Assigned Service Requests</h3>
            <button className="text-orange-500 hover:text-orange-400 text-xs">View All</button>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div>
                <p className="text-sm text-white font-medium">Email Setup - Department XYZ</p>
                <p className="text-xs text-gray-500 mt-1">SR-445 • Submitted 2 hours ago</p>
              </div>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded whitespace-nowrap">In Progress</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div>
                <p className="text-sm text-white font-medium">Website Hosting Request</p>
                <p className="text-xs text-gray-500 mt-1">SR-442 • Submitted 5 hours ago</p>
              </div>
              <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded whitespace-nowrap">Pending</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div>
                <p className="text-sm text-white font-medium">App Development Consultation</p>
                <p className="text-xs text-gray-500 mt-1">SR-438 • Submitted yesterday</p>
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded whitespace-nowrap">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Technical Resources */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Quick Access Resources</h3>
          </div>
          <div className="p-4 space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm text-white">Technical Documentation</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 rounded">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="text-sm text-white">API Reference</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <span className="text-sm text-white">Infrastructure Monitor</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Recent Activity</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 truncate">Completed: Website deployment</p>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 truncate">Started: Database migration</p>
                <span className="text-xs text-gray-500">5 hours ago</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 truncate">Updated: SSL certificates</p>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 truncate">Resolved: DNS configuration issue</p>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EngineerDashboard;