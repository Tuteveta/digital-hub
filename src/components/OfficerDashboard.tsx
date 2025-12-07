import { useState } from 'react';
import { useMyServiceRequests, useMyCertificates, useDashboardStats } from '../hooks/useData';

function OfficerDashboard() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);

  // Fetch real data from backend
  const { 
    requests, 
    loading: loadingRequests, 
    error: requestsError
  } = useMyServiceRequests();
  
  const { 
    certificates, 
    loading: loadingCerts, 
    error: certsError
  } = useMyCertificates();
  
  const { 
    stats, 
    loading: loadingStats 
  } = useDashboardStats();

  // Calculate stats from real data
  const myRequestsCount = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const completedRequests = requests.filter(r => r.status === 'completed').length;
  
  const myCertsCount = certificates.length;
  const approvedCerts = certificates.filter(c => c.status === 'approved').length;
  const pendingCerts = certificates.filter(c => c.status === 'pending' || c.status === 'under_review').length;

  // Show loading state
  if (loadingRequests || loadingCerts || loadingStats) {
    return (
      <div className="h-full w-full overflow-y-auto bg-[#0b0c0e] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
          <p className="text-gray-400 text-sm mt-2">Fetching your latest data</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (requestsError || certsError) {
    return (
      <div className="h-full w-full overflow-y-auto bg-[#0b0c0e] flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-white text-lg mb-2">Unable to load dashboard</p>
          <p className="text-gray-400 text-sm mb-4">{requestsError || certsError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-[#0b0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 sm:pb-20">
        
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Officer Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-400">Manage your requests and learning progress</p>
        </div>

        {/* Stats Row - Real Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* My Requests */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">My Requests</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">{myRequestsCount}</div>
                <div className="text-blue-500 text-sm font-medium">{pendingRequests} Pending</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">{completedRequests} Completed</div>
            </div>
          </div>

          {/* Certificates */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">My Certificates</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">{myCertsCount}</div>
                <div className="text-green-500 text-sm font-medium">{approvedCerts} Approved</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">{pendingCerts} In Review</div>
            </div>
          </div>

          {/* Training Progress */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">Training Progress</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">
                  {stats?.serviceRequests ? Math.round((completedRequests / myRequestsCount) * 100) || 0 : 0}%
                </div>
                <div className="text-purple-500 text-sm font-medium">--</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">0 Courses Active</div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">Notifications</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">
                  {pendingRequests + pendingCerts}
                </div>
                <div className="text-orange-500 text-sm font-medium">New</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">{pendingRequests + pendingCerts} Unread</div>
            </div>
          </div>
        </div>

        {/* Officer CRUD Permissions */}
        <div className="bg-green-500/10 border border-green-500 rounded-xl p-4 mb-6">
          <h3 className="text-green-400 font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Officer Permissions
          </h3>
          <p className="text-sm text-gray-300">
            You can <strong>Create, Read, Update, Delete</strong>: Your own service requests, Your own certificate applications, Your profile information. 
            <strong>Read-only</strong>: Learning materials, News & announcements, Forum discussions
          </p>
        </div>

        {/* Officer Overview Grid - Real Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* My Service Requests - Real Data */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
            <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">My Service Requests</h3>
              <button 
                onClick={() => setShowRequestForm(true)}
                className="text-orange-500 hover:text-orange-400 text-xs font-medium"
              >
                + New Request
              </button>
            </div>
            
            {requests.length === 0 ? (
              /* Empty State */
              <div className="p-8 text-center">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-sm text-gray-400 mb-3">No service requests yet</p>
                <button 
                  onClick={() => setShowRequestForm(true)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors"
                >
                  Create First Request
                </button>
              </div>
            ) : (
              /* Real Data List */
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {requests.map((request) => (
                  <div 
                    key={request.id} 
                    className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{request.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {request.id} • {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                      {request.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{request.description}</p>
                      )}
                    </div>
                    <span className={`ml-3 px-2 py-1 text-xs rounded whitespace-nowrap ${
                      request.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      request.status === 'in_progress' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      request.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {request.status === 'in_progress' ? 'IN PROGRESS' : request.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Certificates - Real Data */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
            <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">My Certificates</h3>
              <button 
                onClick={() => setShowCertForm(true)}
                className="text-orange-500 hover:text-orange-400 text-xs font-medium"
              >
                + Apply
              </button>
            </div>
            
            {certificates.length === 0 ? (
              /* Empty State */
              <div className="p-8 text-center">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <p className="text-sm text-gray-400 mb-3">No certificates yet</p>
                <button 
                  onClick={() => setShowCertForm(true)}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors"
                >
                  Apply for Certificate
                </button>
              </div>
            ) : (
              /* Real Data List */
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {certificates.map((cert) => (
                  <div 
                    key={cert.id} 
                    className="flex items-center justify-between p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{cert.certificateType}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {cert.id} • {new Date(cert.createdAt).toLocaleDateString()}
                      </p>
                      {cert.approvedBy && (
                        <p className="text-xs text-green-400 mt-1">
                          Approved by {cert.approvedBy}
                        </p>
                      )}
                    </div>
                    <span className={`ml-3 px-2 py-1 text-xs rounded whitespace-nowrap ${
                      cert.status === 'approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      cert.status === 'rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      cert.status === 'under_review' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {cert.status === 'under_review' ? 'UNDER REVIEW' : cert.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <button 
            onClick={() => setShowRequestForm(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-6 text-left hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/10 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Request Service</h3>
            <p className="text-blue-100 text-sm">Submit a new service request</p>
          </button>

          <button 
            onClick={() => setShowCertForm(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-left hover:shadow-lg transition-shadow"
          >
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
          {/* Department Announcements - Read Only */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
            <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">Department Announcements</h3>
              <span className="text-xs text-gray-500">(Read Only)</span>
            </div>
            
            {/* Empty State */}
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              <p className="text-sm text-gray-400">No announcements yet</p>
            </div>
          </div>

          {/* Learning Progress */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
            <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">My Learning Progress</h3>
            </div>
            
            {/* Empty State */}
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-sm text-gray-400 mb-3">No courses enrolled yet</p>
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors">
                Browse Courses
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder for modals */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-white text-lg font-semibold mb-4">Create Service Request</h3>
              <p className="text-gray-400 text-sm mb-4">Form will be implemented here</p>
              <button 
                onClick={() => setShowRequestForm(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showCertForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-white text-lg font-semibold mb-4">Apply for Certificate</h3>
              <p className="text-gray-400 text-sm mb-4">Form will be implemented here</p>
              <button 
                onClick={() => setShowCertForm(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default OfficerDashboard;