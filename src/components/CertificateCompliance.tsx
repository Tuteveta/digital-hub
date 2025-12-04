import { useState } from 'react';

type CertificateStatus = 'pending' | 'approved' | 'rejected' | 'under-review';

interface Certificate {
  id: string;
  projectName: string;
  applicant: string;
  submittedDate: string;
  status: CertificateStatus;
  type: string;
}

function CertificateCompliance() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    certificateType: '',
    description: '',
    projectManager: '',
    email: '',
    phone: '',
  });

  const certificates: Certificate[] = [
    {
      id: 'CERT-001',
      projectName: 'E-Commerce Platform',
      applicant: 'John Doe',
      submittedDate: '2024-11-28',
      status: 'approved',
      type: 'Security Compliance'
    },
    {
      id: 'CERT-002',
      projectName: 'Mobile Banking App',
      applicant: 'Jane Smith',
      submittedDate: '2024-12-01',
      status: 'under-review',
      type: 'Data Privacy'
    },
    {
      id: 'CERT-003',
      projectName: 'Cloud Infrastructure',
      applicant: 'Mike Johnson',
      submittedDate: '2024-12-03',
      status: 'pending',
      type: 'ISO 27001'
    },
  ];

  const getStatusColor = (status: CertificateStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'under-review':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowApplicationForm(false);
    // Reset form
    setFormData({
      projectName: '',
      projectType: '',
      certificateType: '',
      description: '',
      projectManager: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Certificate of Compliance</h1>
          <p className="text-gray-400">Apply for and manage project compliance certificates</p>
        </div>
        <button
          onClick={() => setShowApplicationForm(true)}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Application</span>
        </button>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#18181b] border-b border-[#2d2d32] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">New Certificate Application</h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Project Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Project Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Project Name *</label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="Enter project name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Project Type *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    >
                      <option value="">Select type</option>
                      <option value="web">Web Application</option>
                      <option value="mobile">Mobile Application</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="api">API/Microservices</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Certificate Type *</label>
                    <select
                      name="certificateType"
                      value={formData.certificateType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    >
                      <option value="">Select certificate type</option>
                      <option value="security">Security Compliance</option>
                      <option value="data-privacy">Data Privacy (GDPR/CCPA)</option>
                      <option value="iso27001">ISO 27001</option>
                      <option value="soc2">SOC 2 Type II</option>
                      <option value="pci-dss">PCI DSS</option>
                      <option value="hipaa">HIPAA</option>
                      <option value="accessibility">Accessibility (WCAG)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Project Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none resize-none"
                      placeholder="Describe your project and compliance requirements"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Project Manager *</label>
                    <input
                      type="text"
                      name="projectManager"
                      value={formData.projectManager}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Supporting Documents</h3>
                <div className="border-2 border-dashed border-[#3a3a42] rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" multiple />
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white rounded-lg transition-colors text-sm"
                  >
                    Browse Files
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-[#2d2d32]">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="px-6 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Applications</p>
              <p className="text-2xl font-semibold text-white">48</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Approved</p>
              <p className="text-2xl font-semibold text-white">32</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-white">12</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Under Review</p>
              <p className="text-2xl font-semibold text-white">4</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
        <div className="px-6 py-4 border-b border-[#2d2d32] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Applications</h2>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-1.5 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-sm text-gray-300 focus:border-orange-500 focus:outline-none">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="under-review">Under Review</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0b0c0e]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Certificate ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2d32]">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-[#0b0c0e] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{cert.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{cert.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{cert.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{cert.applicant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{cert.submittedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(cert.status)}`}>
                      {cert.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-500 hover:text-orange-400 mr-3">View</button>
                    <button className="text-blue-500 hover:text-blue-400">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CertificateCompliance;