function EngineerDashboard() {
  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#0b0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20">
        
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Engineer Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-400">Manage technical operations and applications</p>
        </div>

        {/* Stats Row - Engineer Focus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* My Tasks */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">My Tasks</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">0</div>
                <div className="text-yellow-500 text-sm font-medium">0 Due Today</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">0 In Progress</div>
            </div>
          </div>

          {/* Service Requests */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">Assigned Requests</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">0</div>
                <div className="text-blue-500 text-sm font-medium">0 New</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">0 Active</div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">My Projects</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">0</div>
                <div className="text-purple-500 text-sm font-medium">0 Active</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">0 Completed</div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">Completion Rate</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">--</div>
                <div className="text-green-500 text-sm font-medium">--</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">No data yet</div>
            </div>
          </div>
        </div>

        {/* Engineer CRUD Permissions */}
        <div className="bg-blue-500/10 border border-blue-500 rounded-xl p-4 mb-6">
          <h3 className="text-blue-400 font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Engineer Permissions
          </h3>
          <p className="text-sm text-gray-300">
            You can <strong>Create, Read, Update, Delete</strong>: Service requests, Technical documentation, User applications (Approve/Reject), System configurations, Infrastructure monitoring
          </p>
        </div>

        {/* Engineer Work Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Current Tasks */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
            <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Current Tasks</h3>
              <button className="text-orange-500 hover:text-orange-400 text-xs font-medium">+ New Task</button>
            </div>
            
            {/* Empty State */}
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p className="text-sm text-gray-400 mb-3">No tasks assigned yet</p>
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors">
                Create First Task
              </button>
            </div>
          </div>

          {/* Assigned Service Requests - Engineer can CRUD */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
            <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Service Requests</h3>
              <button className="text-orange-500 hover:text-orange-400 text-xs font-medium">View All</button>
            </div>
            
            {/* Empty State */}
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm text-gray-400">No service requests assigned</p>
            </div>
          </div>
        </div>

        {/* Officer Applications - Engineer can Approve/Reject */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg mb-6">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Pending Officer Applications</h3>
            <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">0</span>
          </div>
          
          {/* Empty State */}
          <div className="p-8 text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">No Pending Applications</h3>
            <p className="text-gray-400 text-sm">Officer applications awaiting review will appear here</p>
          </div>
        </div>

        {/* Bottom Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {/* Technical Resources - Engineer can manage */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
            <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Technical Resources</h3>
              <button className="text-orange-500 hover:text-orange-400 text-xs font-medium">+ Add Resource</button>
            </div>
            
            {/* Empty State */}
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-sm text-gray-400 mb-3">No resources added yet</p>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
                Add First Resource
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
            <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Recent Activity</h3>
            </div>
            
            {/* Empty State */}
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-400">No recent activity</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EngineerDashboard;