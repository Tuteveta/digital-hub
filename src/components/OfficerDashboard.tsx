function OfficerDashboard() {
  return (
    <>
      {/* Stats Row - Officer Focus */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* My Requests */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">My Requests</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">12</div>
              <div className="text-blue-500 text-sm font-medium">3 Pending</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">9 Completed</div>
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">My Certificates</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">5</div>
              <div className="text-green-500 text-sm font-medium">2 Approved</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">3 In Review</div>
          </div>
        </div>

        {/* Training Progress */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">Training Progress</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">65%</div>
              <div className="text-purple-500 text-sm font-medium">+15%</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">4 Courses Active</div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
          <div className="px-4 py-3 border-b border-[#2d2d32]">
            <h3 className="text-sm font-medium text-gray-400">Notifications</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-semibold text-white">8</div>
              <div className="text-orange-500 text-sm font-medium">New</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">3 Unread</div>
          </div>
        </div>
      </div>

      {/* Officer Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* My Service Requests */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">My Service Requests</h3>
            <button className="text-orange-500 hover:text-orange-400 text-xs">New Request</button>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div>
                <p className="text-sm text-white font-medium">Email Account Setup</p>
                <p className="text-xs text-gray-500 mt-1">SR-448 • Submitted 1 day ago</p>
              </div>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs rounded whitespace-nowrap">In Progress</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div>
                <p className="text-sm text-white font-medium">Website Update Request</p>
                <p className="text-xs text-gray-500 mt-1">SR-445 • Submitted 3 days ago</p>
              </div>
              <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded whitespace-nowrap">Pending</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div>
                <p className="text-sm text-white font-medium">DNS Configuration</p>
                <p className="text-xs text-gray-500 mt-1">SR-440 • Submitted 1 week ago</p>
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded whitespace-nowrap">Completed</span>
            </div>
          </div>
        </div>

        {/* My Certificates */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">My Certificates</h3>
            <button className="text-orange-500 hover:text-orange-400 text-xs">Apply</button>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div>
                <p className="text-sm text-white font-medium">Security Compliance</p>
                <p className="text-xs text-gray-500 mt-1">CERT-225 • Applied 2 days ago</p>
              </div>
              <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded whitespace-nowrap">Under Review</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div>
                <p className="text-sm text-white font-medium">ISO 27001</p>
                <p className="text-xs text-gray-500 mt-1">CERT-220 • Applied 1 week ago</p>
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded whitespace-nowrap">Approved</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div>
                <p className="text-sm text-white font-medium">Data Privacy (GDPR)</p>
                <p className="text-xs text-gray-500 mt-1">CERT-215 • Applied 2 weeks ago</p>
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded whitespace-nowrap">Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-6 text-left hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Request Email Service</h3>
          <p className="text-blue-100 text-sm">Set up new email accounts for your team</p>
        </button>

        <button className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-left hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Apply for Certificate</h3>
          <p className="text-purple-100 text-sm">Request compliance certificates</p>
        </button>

        <button className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-left hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Browse Courses</h3>
          <p className="text-orange-100 text-sm">Continue your learning journey</p>
        </button>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Department Announcements */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Department Announcements</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div className="p-2 bg-blue-500/10 rounded flex-shrink-0">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">System Maintenance Scheduled</p>
                <p className="text-xs text-gray-500 mt-1">Maintenance window: Dec 10, 2:00 AM - 4:00 AM</p>
                <span className="text-xs text-gray-400 mt-2 block">Posted 2 hours ago</span>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div className="p-2 bg-green-500/10 rounded flex-shrink-0">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">New Training Courses Available</p>
                <p className="text-xs text-gray-500 mt-1">Check out the latest cybersecurity courses</p>
                <span className="text-xs text-gray-400 mt-2 block">Posted 1 day ago</span>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg">
              <div className="p-2 bg-purple-500/10 rounded flex-shrink-0">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">Monthly Team Meeting</p>
                <p className="text-xs text-gray-500 mt-1">Join us for the December team meeting on Dec 15</p>
                <span className="text-xs text-gray-400 mt-2 block">Posted 3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">My Learning Progress</h3>
            <button className="text-orange-500 hover:text-orange-400 text-xs">View All</button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">AWS Cloud Fundamentals</span>
                <span className="text-xs text-gray-400">75%</span>
              </div>
              <div className="w-full bg-[#2d2d32] rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">8 of 12 lessons completed</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">Cybersecurity Basics</span>
                <span className="text-xs text-gray-400">50%</span>
              </div>
              <div className="w-full bg-[#2d2d32] rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">5 of 10 lessons completed</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">Data Privacy & Compliance</span>
                <span className="text-xs text-gray-400">30%</span>
              </div>
              <div className="w-full bg-[#2d2d32] rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">3 of 8 lessons completed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OfficerDashboard;