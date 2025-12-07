import { useServiceRequests, useApplications } from '../hooks/useData';

function EngineerDashboard() {
  // Fetch real data from backend
  const { 
    requests, 
    loading: loadingRequests, 
    error: requestsError,
    updateStatus 
  } = useServiceRequests();
  
  const { 
    applications, 
    loading: loadingApps, 
    error: appsError,
    approve: approveApplication,
    reject: rejectApplication
  } = useApplications();

  // Calculate stats from real data
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const inProgressRequests = requests.filter(r => r.status === 'in_progress').length;
  const completedRequests = requests.filter(r => r.status === 'completed').length;
  
  const pendingApplications = applications.filter(a => a.status === 'pending').length;
  
  const completionRate = totalRequests > 0 
    ? Math.round((completedRequests / totalRequests) * 100) 
    : 0;

  // Approve service request
  const handleApproveRequest = async (requestId: string) => {
    try {
      await updateStatus(requestId, 'completed', 'Request approved and completed by engineer');
      alert('✅ Service request approved successfully!');
    } catch (error) {
      console.error('Error approving request:', error);
      alert('❌ Failed to approve request. Please try again.');
    }
  };

  // Reject service request
  const handleRejectRequest = async (requestId: string) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      try {
        await updateStatus(requestId, 'rejected', reason);
        alert('✅ Service request rejected');
      } catch (error) {
        console.error('Error rejecting request:', error);
        alert('❌ Failed to reject request. Please try again.');
      }
    }
  };

  // Start working on request
  const handleStartRequest = async (requestId: string) => {
    try {
      await updateStatus(requestId, 'in_progress', 'Engineer started working on this request');
      alert('✅ Request marked as in progress');
    } catch (error) {
      console.error('Error updating request:', error);
      alert('❌ Failed to update request. Please try again.');
    }
  };

  // Approve officer application
  const handleApproveApplication = async (applicationId: string) => {
    const notes = prompt('Enter approval notes (optional):');
    try {
      await approveApplication(applicationId, notes || undefined);
      alert('✅ Officer application approved successfully!');
    } catch (error) {
      console.error('Error approving application:', error);
      alert('❌ Failed to approve application. Please try again.');
    }
  };

  // Reject officer application
  const handleRejectApplication = async (applicationId: string) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      try {
        await rejectApplication(applicationId, reason);
        alert('✅ Officer application rejected');
      } catch (error) {
        console.error('Error rejecting application:', error);
        alert('❌ Failed to reject application. Please try again.');
      }
    }
  };

  // Show loading state
  if (loadingRequests || loadingApps) {
    return (
      <div className="h-full w-full overflow-y-auto bg-[#0b0c0e] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white text-lg">Loading engineer dashboard...</p>
          <p className="text-gray-400 text-sm mt-2">Fetching requests and applications</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (requestsError || appsError) {
    return (
      <div className="h-full w-full overflow-y-auto bg-[#0b0c0e] flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-white text-lg mb-2">Unable to load dashboard</p>
          <p className="text-gray-400 text-sm mb-4">{requestsError || appsError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Engineer Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-400">Manage technical operations and applications</p>
        </div>

        {/* Stats Row - Real Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* My Tasks */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">My Tasks</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">{totalRequests}</div>
                <div className="text-yellow-500 text-sm font-medium">{pendingRequests} Due Today</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">{inProgressRequests} In Progress</div>
            </div>
          </div>

          {/* Service Requests */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">Assigned Requests</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">{totalRequests}</div>
                <div className="text-blue-500 text-sm font-medium">{pendingRequests} New</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">{inProgressRequests} Active</div>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">Applications</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">{applications.length}</div>
                <div className="text-purple-500 text-sm font-medium">{pendingApplications} Pending</div>
              </div>
              <div className="mt-2 text-xs text-gray-500">{applications.length - pendingApplications} Reviewed</div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors">
            <div className="px-4 py-3 border-b border-[#2d2d32]">
              <h3 className="text-sm font-medium text-gray-400">Completion Rate</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-semibold text-white">{completionRate}%</div>
                <div className="text-green-500 text-sm font-medium">
                  {completionRate >= 75 ? '✓' : completionRate >= 50 ? '~' : '!'}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">{completedRequests} of {totalRequests} completed</div>
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

        {/* Service Requests - Real Data with Approve/Reject */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg mb-6">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Service Requests</h3>
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">{pendingRequests} Pending</span>
          </div>
          
          {requests.length === 0 ? (
            /* Empty State */
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm text-gray-400">No service requests assigned</p>
            </div>
          ) : (
            /* Real Data List with Actions */
            <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
              {requests.map((request) => (
                <div 
                  key={request.id} 
                  className="p-4 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-white font-medium">{request.title}</p>
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          request.priority === 'high' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          request.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                          'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                        }`}>
                          {request.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{request.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>From: {request.requesterName}</span>
                        <span>•</span>
                        <span>{request.id}</span>
                        <span>•</span>
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
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

                  {/* Action Buttons */}
                  {(request.status === 'pending' || request.status === 'in_progress') && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#2d2d32]">
                      {request.status === 'pending' && (
                        <button
                          onClick={() => handleStartRequest(request.id)}
                          className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors"
                        >
                          Start Working
                        </button>
                      )}
                      <button
                        onClick={() => handleApproveRequest(request.id)}
                        className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition-colors"
                      >
                        ✓ Approve & Complete
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  )}

                  {request.status === 'completed' && (
                    <div className="mt-3 pt-3 border-t border-[#2d2d32]">
                      <p className="text-xs text-green-400">✓ Completed</p>
                    </div>
                  )}

                  {request.status === 'rejected' && request.notes && (
                    <div className="mt-3 pt-3 border-t border-[#2d2d32]">
                      <p className="text-xs text-red-400">✗ Rejected: {request.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Officer Applications - Real Data with Approve/Reject */}
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg mb-6">
          <div className="px-4 py-3 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Pending Officer Applications</h3>
            <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">{pendingApplications}</span>
          </div>
          
          {applications.filter(a => a.status === 'pending').length === 0 ? (
            /* Empty State */
            <div className="p-8 text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-white mb-2">No Pending Applications</h3>
              <p className="text-gray-400 text-sm">Officer applications awaiting review will appear here</p>
            </div>
          ) : (
            /* Real Data List with Approve/Reject */
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {applications.filter(a => a.status === 'pending').map((app) => (
                <div 
                  key={app.id} 
                  className="p-4 bg-[#0b0c0e] border border-[#2d2d32] rounded-lg hover:border-[#3a3a42] transition-colors"
                >
                  <div className="mb-3">
                    <p className="text-sm text-white font-medium mb-2">{app.fullName}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                      <div>
                        <span className="text-gray-500">Email:</span> {app.email}
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span> {app.phone}
                      </div>
                      <div>
                        <span className="text-gray-500">Department:</span> {app.department}
                      </div>
                      <div>
                        <span className="text-gray-500">Position:</span> {app.position}
                      </div>
                      <div>
                        <span className="text-gray-500">PSN:</span> {app.publicServiceNumber}
                      </div>
                      <div>
                        <span className="text-gray-500">Applied:</span> {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#2d2d32]">
                    <button
                      onClick={() => handleApproveApplication(app.id)}
                      className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition-colors"
                    >
                      ✓ Approve Application
                    </button>
                    <button
                      onClick={() => handleRejectApplication(app.id)}
                      className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                    >
                      ✗ Reject Application
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {/* Technical Resources */}
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
            
            {/* Show recent completions */}
            {completedRequests > 0 ? (
              <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                {requests.filter(r => r.status === 'completed').slice(0, 5).map((request) => (
                  <div key={request.id} className="flex items-center gap-2 text-xs text-gray-400 py-2 border-b border-[#2d2d32] last:border-0">
                    <span className="text-green-500">✓</span>
                    <span className="flex-1">{request.title}</span>
                    <span className="text-gray-500">{new Date(request.updatedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-400">No recent activity</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default EngineerDashboard;