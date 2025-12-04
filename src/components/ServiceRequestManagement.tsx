import { useState } from 'react';
import { useUserRole } from '../contexts/UserRoleContext';

interface ServiceRequestData {
  id: string;
  requestNumber: string;
  title: string;
  description: string;
  serviceType: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected';
  requestedBy: string;
  requestedByEmail: string;
  department: string;
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  assignedTo?: string;
}

function ServiceRequestManagement() {
  const { role } = useUserRole();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequestData | null>(null);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');
  const [approvalNotes, setApprovalNotes] = useState('');

  const [requests, setRequests] = useState<ServiceRequestData[]>([
    {
      id: '1',
      requestNumber: 'SR-2024-001',
      title: 'Email Account Setup',
      description: 'Need email account setup for new employee in Finance department',
      serviceType: 'Email Services',
      priority: 'high',
      status: 'pending',
      requestedBy: 'John Doe',
      requestedByEmail: 'john.doe@example.com',
      department: 'Finance',
      submittedAt: '2024-12-05T09:00:00',
    },
    {
      id: '2',
      requestNumber: 'SR-2024-002',
      title: 'Website Update Request',
      description: 'Update departmental website with new contact information',
      serviceType: 'Website Development',
      priority: 'medium',
      status: 'approved',
      requestedBy: 'Jane Smith',
      requestedByEmail: 'jane.smith@example.com',
      department: 'HR',
      submittedAt: '2024-12-04T14:30:00',
      approvedBy: 'Admin User',
      approvedAt: '2024-12-04T15:00:00',
    },
    {
      id: '3',
      requestNumber: 'SR-2024-003',
      title: 'DNS Configuration',
      description: 'Configure DNS records for new subdomain',
      serviceType: 'DNS Management',
      priority: 'urgent',
      status: 'in-progress',
      requestedBy: 'Mike Johnson',
      requestedByEmail: 'mike.johnson@example.com',
      department: 'IT',
      submittedAt: '2024-12-03T10:15:00',
      approvedBy: 'Engineer User',
      approvedAt: '2024-12-03T11:00:00',
      assignedTo: 'Technical Team',
    },
  ]);

  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    serviceType: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    department: '',
  });

  const serviceTypes = [
    'Email Services',
    'Website Development',
    'DNS Management',
    'App Development',
    'Hosting Services',
    'Technical Support',
    'Network Services',
    'Database Services',
  ];

  const handleCreateRequest = () => {
    const request: ServiceRequestData = {
      id: Date.now().toString(),
      requestNumber: `SR-2024-${String(requests.length + 1).padStart(3, '0')}`,
      ...newRequest,
      status: 'pending',
      requestedBy: 'Current User',
      requestedByEmail: 'current.user@example.com',
      submittedAt: new Date().toISOString(),
    };

    setRequests([request, ...requests]);
    setShowCreateModal(false);
    setNewRequest({
      title: '',
      description: '',
      serviceType: '',
      priority: 'medium',
      department: '',
    });
  };

  const handleApprovalDecision = () => {
    if (selectedRequest) {
      setRequests(requests.map(req =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: approvalAction === 'approve' ? 'approved' : 'rejected',
              approvedBy: 'Current User',
              approvedAt: new Date().toISOString(),
              rejectionReason: approvalAction === 'reject' ? approvalNotes : undefined,
            }
          : req
      ));
      setShowApprovalModal(false);
      setApprovalNotes('');
      setSelectedRequest(null);
    }
  };

  const openApprovalModal = (request: ServiceRequestData, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setApprovalAction(action);
    setShowApprovalModal(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'high': return 'text-orange-500 bg-orange-500/10';
      case 'urgent': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10';
      case 'approved': return 'text-green-500 bg-green-500/10';
      case 'in-progress': return 'text-blue-500 bg-blue-500/10';
      case 'completed': return 'text-purple-500 bg-purple-500/10';
      case 'rejected': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved' || r.status === 'in-progress').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;

  // Check if user can approve (Engineer or Super Admin)
  const canApprove = role === 'engineer' || role === 'super-admin';

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Service Requests</h1>
          <p className="text-gray-400">
            {role === 'officer' 
              ? 'Submit and track your service requests' 
              : 'Review and manage service requests'}
          </p>
        </div>
        {(role === 'officer' || role === 'super-admin') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors whitespace-nowrap"
          >
            + New Request
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Total Requests</div>
          <div className="text-2xl font-bold text-white">{requests.length}</div>
        </div>
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Pending Approval</div>
          <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
        </div>
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">In Progress</div>
          <div className="text-2xl font-bold text-blue-500">{approvedCount}</div>
        </div>
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Completed</div>
          <div className="text-2xl font-bold text-green-500">{completedCount}</div>
        </div>
      </div>

      {/* Service Requests List */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-6 hover:border-[#3a3a42] transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              {/* Request Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{request.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(request.status)}`}>
                    {request.status.toUpperCase().replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(request.priority)}`}>
                    {request.priority.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-gray-400 mb-3">{request.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                  <div className="text-gray-500">
                    <span className="font-medium">Request #:</span> {request.requestNumber}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">Service:</span> {request.serviceType}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">Requested by:</span> {request.requestedBy}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">Department:</span> {request.department}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">Submitted:</span> {new Date(request.submittedAt).toLocaleString()}
                  </div>
                  {request.approvedBy && (
                    <div className="text-gray-500">
                      <span className="font-medium">Approved by:</span> {request.approvedBy}
                    </div>
                  )}
                </div>

                {request.rejectionReason && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded text-sm">
                    <span className="text-red-500 font-medium">Rejection Reason: </span>
                    <span className="text-gray-400">{request.rejectionReason}</span>
                  </div>
                )}

                {request.assignedTo && (
                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-sm">
                    <span className="text-blue-500 font-medium">Assigned to: </span>
                    <span className="text-gray-400">{request.assignedTo}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              {canApprove && request.status === 'pending' && (
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                  <button
                    onClick={() => openApprovalModal(request, 'approve')}
                    className="flex-1 lg:flex-none px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors whitespace-nowrap"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => openApprovalModal(request, 'reject')}
                    className="flex-1 lg:flex-none px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors whitespace-nowrap"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">No service requests</h3>
            <p className="text-gray-500">Create your first service request to get started.</p>
          </div>
        )}
      </div>

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Create Service Request</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Request Title *</label>
                  <input
                    type="text"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    placeholder="Brief title for your request"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Service Type *</label>
                  <select
                    value={newRequest.serviceType}
                    onChange={(e) => setNewRequest({ ...newRequest, serviceType: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="">Select service type</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Priority *</label>
                  <select
                    value={newRequest.priority}
                    onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value as any })}
                    className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Department *</label>
                  <input
                    type="text"
                    value={newRequest.department}
                    onChange={(e) => setNewRequest({ ...newRequest, department: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    placeholder="Your department"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
                  <textarea
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none resize-none"
                    placeholder="Detailed description of your request"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRequest}
                  disabled={!newRequest.title || !newRequest.serviceType || !newRequest.description || !newRequest.department}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                {approvalAction === 'approve' ? 'Approve Request' : 'Reject Request'}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                {selectedRequest.requestNumber} - {selectedRequest.title}
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  {approvalAction === 'approve' ? 'Approval Notes (Optional)' : 'Rejection Reason *'}
                </label>
                <textarea
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none resize-none"
                  placeholder={approvalAction === 'approve' ? 'Enter approval notes...' : 'Enter rejection reason...'}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprovalDecision}
                  disabled={approvalAction === 'reject' && !approvalNotes}
                  className={`px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    approvalAction === 'approve' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {approvalAction === 'approve' ? 'Approve' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceRequestManagement;