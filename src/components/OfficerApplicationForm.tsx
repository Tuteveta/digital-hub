import { useState } from 'react';

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  publicServiceNumber: string;
  department: string;
  position: string;
  idDocument: File | null;
  endorsementLetter: File | null;
}

interface OfficerApplicationFormProps {
  onBack?: () => void;
}

function OfficerApplicationForm({ onBack }: OfficerApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    publicServiceNumber: '',
    department: '',
    position: '',
    idDocument: null,
    endorsementLetter: null,
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name as keyof ApplicationFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'idDocument' | 'endorsementLetter') => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, [field]: file });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ApplicationFormData, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.publicServiceNumber.trim()) newErrors.publicServiceNumber = 'Public Service Number is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.idDocument) newErrors.idDocument = 'ID document is required';
    if (!formData.endorsementLetter) newErrors.endorsementLetter = 'Endorsement letter is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmissionStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      console.log('Application submitted:', formData);
      setSubmissionStatus('success');
    }, 2000);
  };

  const handleBackToWelcome = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = '/';
    }
  };

  if (submissionStatus === 'success') {
    return (
      <div className="min-h-screen w-full bg-[#0b0c0e] overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Application Submitted!</h2>
            <p className="text-sm sm:text-base text-gray-400 mb-6">
              Your officer application has been submitted successfully. You will receive an email notification once your application has been reviewed and approved by an administrator or engineer.
            </p>
            <div className="bg-[#0b0c0e] border border-[#2d2d32] rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-400 mb-2">Application Reference</div>
              <div className="text-lg font-mono text-orange-500">APP-{Date.now().toString().slice(-8)}</div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Please check your email ({formData.email}) for updates on your application status.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleBackToWelcome}
                className="px-6 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white rounded-lg transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => setSubmissionStatus('idle')}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0b0c0e] overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24">
        
        {/* Back Button */}
        <button
          onClick={handleBackToWelcome}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm sm:text-base">Back to Welcome</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-4">
            <span className="text-white font-bold text-xl sm:text-2xl">D</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Officer Application</h1>
          <p className="text-sm sm:text-base text-gray-400">Complete the form below to apply for officer access</p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-[#18181b] border border-[#2d2d32] rounded-xl p-4 sm:p-6 md:p-8">
          
          {/* Personal Information */}
          <div className="mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0b0c0e] border ${errors.fullName ? 'border-red-500' : 'border-[#3a3a42]'} rounded-lg text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none`}
                  placeholder="John Smith"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0b0c0e] border ${errors.email ? 'border-red-500' : 'border-[#3a3a42]'} rounded-lg text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none`}
                  placeholder="john.smith@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0b0c0e] border ${errors.phone ? 'border-red-500' : 'border-[#3a3a42]'} rounded-lg text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none`}
                  placeholder="+675 7234 5678"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Public Service Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="publicServiceNumber"
                  value={formData.publicServiceNumber}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0b0c0e] border ${errors.publicServiceNumber ? 'border-red-500' : 'border-[#3a3a42]'} rounded-lg text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none`}
                  placeholder="PS-12345"
                />
                {errors.publicServiceNumber && <p className="text-red-500 text-xs mt-1">{errors.publicServiceNumber}</p>}
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className="mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Employment Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0b0c0e] border ${errors.department ? 'border-red-500' : 'border-[#3a3a42]'} rounded-lg text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none`}
                >
                  <option value="">Select Department</option>
                  <option value="IT">Information Technology</option>
                  <option value="HR">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="Legal">Legal</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Other">Other</option>
                </select>
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#0b0c0e] border ${errors.position ? 'border-red-500' : 'border-[#3a3a42]'} rounded-lg text-sm sm:text-base text-white focus:border-orange-500 focus:outline-none`}
                  placeholder="Senior Officer"
                />
                {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
              </div>
            </div>
          </div>

          {/* Document Uploads */}
          <div className="mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Required Documents
            </h2>

            <div className="space-y-4">
              {/* ID Document */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  ID Document (National ID or Passport) <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed ${errors.idDocument ? 'border-red-500' : 'border-[#3a3a42]'} rounded-lg p-4 sm:p-6 text-center hover:border-orange-500 transition-colors`}>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'idDocument')}
                    className="hidden"
                    id="idDocument"
                  />
                  <label htmlFor="idDocument" className="cursor-pointer">
                    {formData.idDocument ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm sm:text-base text-white">{formData.idDocument.name}</span>
                      </div>
                    ) : (
                      <>
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-400">Click to upload ID document</p>
                        <p className="text-xs text-gray-600 mt-1">PDF, JPG, JPEG, or PNG (Max 5MB)</p>
                      </>
                    )}
                  </label>
                </div>
                {errors.idDocument && <p className="text-red-500 text-xs mt-1">{errors.idDocument}</p>}
              </div>

              {/* Endorsement Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Endorsement Letter from Department Head <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed ${errors.endorsementLetter ? 'border-red-500' : 'border-[#3a3a42]'} rounded-lg p-4 sm:p-6 text-center hover:border-orange-500 transition-colors`}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'endorsementLetter')}
                    className="hidden"
                    id="endorsementLetter"
                  />
                  <label htmlFor="endorsementLetter" className="cursor-pointer">
                    {formData.endorsementLetter ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm sm:text-base text-white">{formData.endorsementLetter.name}</span>
                      </div>
                    ) : (
                      <>
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-400">Click to upload endorsement letter</p>
                        <p className="text-xs text-gray-600 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                      </>
                    )}
                  </label>
                </div>
                {errors.endorsementLetter && <p className="text-red-500 text-xs mt-1">{errors.endorsementLetter}</p>}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-[#0b0c0e] border border-[#2d2d32] rounded-lg p-3 sm:p-4 mb-6">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-gray-300 font-medium mb-1">Application Review Process</p>
                <p className="text-xs text-gray-500">
                  Your application will be reviewed by authorized engineers or administrators. You will receive email notifications about your application status. Once approved, you can log in and access the system.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={handleBackToWelcome}
              className="px-6 py-3 bg-[#2d2d32] hover:bg-[#3a3a42] text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submissionStatus === 'submitting'}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              {submissionStatus === 'submitting' ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Application</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default OfficerApplicationForm;