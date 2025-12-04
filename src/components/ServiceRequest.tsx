import { useState } from 'react';

type ServiceType = 'email' | 'website' | 'dns' | 'app-dev' | 'hosting' | '';
type RequestStatus = 'pending' | 'in-progress' | 'completed' | 'on-hold';
type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

interface ServiceRequestData {
  id: string;
  serviceType: string;
  title: string;
  requester: string;
  dateRequested: string;
  status: RequestStatus;
  priority: PriorityLevel;
}

function ServiceRequest() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '',
    requestTitle: '',
    description: '',
    priority: 'medium',
    requesterName: '',
    department: '',
    email: '',
    phone: '',
    targetDate: '',
    budget: '',
    additionalInfo: '',
  });

  const services = [
    {
      id: 'email',
      name: 'Email Services',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Email setup, migration, and configuration',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'website',
      name: 'Website Development',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      description: 'Custom website design and development',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'dns',
      name: 'DNS Management',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      description: 'Domain and DNS configuration services',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'app-dev',
      name: 'App Development',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Mobile and web application development',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'hosting',
      name: 'Hosting Services',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      description: 'Cloud and dedicated hosting solutions',
      color: 'from-indigo-500 to-blue-500'
    },
  ];

  const requests: ServiceRequestData[] = [
    {
      id: 'SR-001',
      serviceType: 'Email Services',
      title: 'Setup corporate email accounts',
      requester: 'John Doe',
      dateRequested: '2024-12-01',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'SR-002',
      serviceType: 'Website Development',
      title: 'Company portfolio website',
      requester: 'Jane Smith',
      dateRequested: '2024-12-03',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 'SR-003',
      serviceType: 'Hosting Services',
      title: 'Cloud hosting for new application',
      requester: 'Mike Johnson',
      dateRequested: '2024-11-28',
      status: 'completed',
      priority: 'urgent'
    },
    {
      id: 'SR-004',
      serviceType: 'DNS Management',
      title: 'Configure DNS for new domain',
      requester: 'Sarah Williams',
      dateRequested: '2024-12-02',
      status: 'on-hold',
      priority: 'low'
    },
  ];

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'on-hold':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getPriorityColor = (priority: PriorityLevel) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-500';
      case 'high':
        return 'text-orange-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleServiceSelect = (serviceId: ServiceType) => {
    setFormData({ ...formData, serviceType: serviceId });
    setShowRequestForm(true);
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
    setShowRequestForm(false);
    // Reset form
    setFormData({
      serviceType: '',
      requestTitle: '',
      description: '',
      priority: 'medium',
      requesterName: '',
      department: '',
      email: '',
      phone: '',
      targetDate: '',
      budget: '',
      additionalInfo: '',
    });
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Service Request</h1>
        <p className="text-gray-400">Request IT services for your organization</p>
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#18181b] border-b border-[#2d2d32] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">New Service Request</h2>
              <button
                onClick={() => setShowRequestForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Service Type */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Service Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Service Type *</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    >
                      <option value="">Select service</option>
                      <option value="email">Email Services</option>
                      <option value="website">Website Development</option>
                      <option value="dns">DNS Management</option>
                      <option value="app-dev">App Development</option>
                      <option value="hosting">Hosting Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Priority *</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Request Title *</label>
                    <input
                      type="text"
                      name="requestTitle"
                      value={formData.requestTitle}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="Brief title for your request"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none resize-none"
                      placeholder="Provide detailed information about your service request"
                    />
                  </div>
                </div>
              </div>

              {/* Requester Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Requester Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="requesterName"
                      value={formData.requesterName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="Your department"
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
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Additional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Target Completion Date</label>
                    <input
                      type="date"
                      name="targetDate"
                      value={formData.targetDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Budget Estimate</label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="$0.00"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Additional Information</label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none resize-none"
                      placeholder="Any other relevant information"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-[#2d2d32]">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="px-6 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Submit Request
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
              <p className="text-sm text-gray-400">Total Requests</p>
              <p className="text-2xl font-semibold text-white">156</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">In Progress</p>
              <p className="text-2xl font-semibold text-white">42</p>
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
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-semibold text-white">98</p>
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
              <p className="text-2xl font-semibold text-white">16</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceSelect(service.id as ServiceType)}
              className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-6 hover:border-orange-500 transition-all group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-4 mx-auto text-white`}>
                {service.icon}
              </div>
              <h3 className="text-white font-semibold mb-2 text-center">{service.name}</h3>
              <p className="text-sm text-gray-400 text-center">{service.description}</p>
              <div className="mt-4 flex items-center justify-center text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Request Service</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
        <div className="px-6 py-4 border-b border-[#2d2d32] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">My Service Requests</h2>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-1.5 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-sm text-gray-300 focus:border-orange-500 focus:outline-none">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0b0c0e]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Service Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2d32]">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-[#0b0c0e] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{request.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.serviceType}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{request.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{request.requester}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{request.dateRequested}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`flex items-center ${getPriorityColor(request.priority)}`}>
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {request.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(request.status)}`}>
                      {request.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-500 hover:text-orange-400 mr-3">View</button>
                    <button className="text-blue-500 hover:text-blue-400">Track</button>
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

export default ServiceRequest;