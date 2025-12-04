import { useState } from 'react';

interface OfficerApplication {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  publicServiceNumber: string;
  department: string;
  position: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  idDocumentUrl: string;
  endorsementLetterUrl: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

function ApplicationApproval() {
  const [applications, setApplications] = useState<OfficerApplication[]>([
    {
      id: '1',
      referenceNumber: 'APP-45678901',
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+675 7234 5678',
      publicServiceNumber: 'PS-56789',
      department: 'Finance',
      position: 'Senior Accountant',
      status: 'pending',
      submittedAt: '2024-12-04T10:30:00',
      idDocumentUrl: '/documents/id-sarah.pdf',
      endorsementLetterUrl: '/documents/endorsement-sarah.pdf',
    },
    {
      id: '2',
      referenceNumber: 'APP-45678902',
      fullName: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+675 7234 5679',
      publicServiceNumber: 'PS-56790',
      department: 'Operations',
      position: 'Operations Officer',
      status: 'pending',
      submittedAt: '2024-12-03T14:15:00',
      idDocumentUrl: '/documents/id-michael.pdf',
      endorsementLetterUrl: '/documents/endorsement-michael.pdf',
    },
    {
      id: '3',
      referenceNumber: 'APP-45678903',
      fullName: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+675 7234 5680',
      publicServiceNumber: 'PS-56791',
      department: 'HR',
      position: 'HR Coordinator',
      status: 'approved',
      submittedAt: '2024-12-02T09:00:00',
      idDocumentUrl: '/documents/id-emily.pdf',
      endorsementLetterUrl: '/documents/endorsement-emily.pdf',
      reviewedBy: 'Admin',
      reviewedAt: '2024-12-02T15:30:00',
      reviewNotes: 'All documents verified. Access granted.',
    },
  ]);

  const [selectedApplication, setSelectedApplication] = useState<OfficerApplication | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');
  const [reviewNotes, setReviewNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleReview = (application: OfficerApplication, action: 'approve' | 'reject') => {
    setSelectedApplication(application);
    setReviewAction(action);
    setShowReviewModal(true);
  };

  const submitReview = () => {
    if (selectedApplication) {
      setApplications(applications.map(app =>
        app.id === selectedApplication.id
          ? {
              ...app,
              status: reviewAction === 'approve' ? 'approved' : 'rejected',
              reviewedBy: 'Current User',
              reviewedAt: new Date().toISOString(),
              reviewNotes: reviewNotes,
            }
          : app
      ));
      setShowReviewModal(false);
      setReviewNotes('');
      setSelectedApplication(null);
    }
  };

  const viewDocument = (url: string) => {
    // In production, this would open the document in a new tab
    alert(`Opening document: ${url}`);
  };

  const filteredApplications = applications.filter(app =>
    filterStatus === 'all' || app.status === filterStatus
  );

  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Application Approval</h1>
        <p className="text-gray-400">Review and approve officer applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Total Applications</div>
          <div className="text-2xl font-bold text-white">{applications.length}</div>
        </div>
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Pending Review</div>
          <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
        </div>
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Approved</div>
          <div className="text-2xl font-bold text-green-500">{approvedCount}</div>
        </div>
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Rejected</div>
          <div className="text-2xl font-bold text-red-500">{rejectedCount}</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Filter:</span>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 text-sm rounded ${filterStatus === 'all' ? 'bg-orange-500 text-white' : 'bg-[#2d2d32] text-gray-400 hover:bg-[#3a3a42]'} transition-colors`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1 text-sm rounded ${filterStatus === 'pending' ? 'bg-orange-500 text-white' : 'bg-[#2d2d32] text-gray-400 hover:bg-[#3a3a42]'} transition-colors`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-3 py-1 text-sm rounded ${filterStatus === 'approved' ? 'bg-orange-500 text-white' : 'bg-[#2d2d32] text-gray-400 hover:bg-[#3a3a42]'} transition-colors`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-3 py-1 text-sm rounded ${filterStatus === 'rejected' ? 'bg-orange-500 text-white' : 'bg-[#2d2d32] text-gray-400 hover:bg-[#3a3a42]'} transition-colors`}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div key={application.id} className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-6 hover:border-[#3a3a42] transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Application Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-white">{application.fullName}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    application.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                    application.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {application.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{application.referenceNumber}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{application.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{application.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>PS: {application.publicServiceNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{application.department} - {application.position}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-3">
                  <button
                    onClick={() => viewDocument(application.idDocumentUrl)}
                    className="text-sm text-blue-500 hover:text-blue-400 flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View ID</span>
                  </button>
                  <button
                    onClick={() => viewDocument(application.endorsementLetterUrl)}
                    className="text-sm text-blue-500 hover:text-blue-400 flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Endorsement</span>
                  </button>
                </div>

                {application.reviewedBy && (
                  <div className="mt-3 p-3 bg-[#0b0c0e] border border-[#2d2d32] rounded text-xs">
                    <div className="text-gray-500">Reviewed by: <span className="text-white">{application.reviewedBy}</span></div>
                    <div className="text-gray-500">Date: <span className="text-white">{new Date(application.reviewedAt!).toLocaleString()}</span></div>
                    {application.reviewNotes && (
                      <div className="text-gray-500 mt-1">Notes: <span className="text-white">{application.reviewNotes}</span></div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              {application.status === 'pending' && (
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                  <button
                    onClick={() => handleReview(application, 'approve')}
                    className="flex-1 lg:flex-none px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors whitespace-nowrap"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReview(application, 'reject')}
                    className="flex-1 lg:flex-none px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors whitespace-nowrap"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredApplications.length === 0 && (
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">No applications found</h3>
            <p className="text-gray-500">No applications match the selected filter.</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                {reviewAction === 'approve' ? 'Approve Application' : 'Reject Application'}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                {selectedApplication.fullName} - {selectedApplication.referenceNumber}
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">Review Notes</label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none resize-none"
                  placeholder="Enter your review notes..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReview}
                  className={`px-4 py-2 text-white rounded-lg transition-colors ${
                    reviewAction === 'approve' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {reviewAction === 'approve' ? 'Approve' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationApproval;