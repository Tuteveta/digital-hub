function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      {/* Header */}
      <header className="bg-[#18181b] border-b border-[#2d2d32] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Digital Hub</h1>
              <p className="text-xs text-gray-400">Privacy Policy</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-2xl p-8 md:p-12">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last Updated: December 5, 2025</p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-300 leading-relaxed mb-4">
              Digital Hub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Digital Transformation Platform.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-orange-500 mb-3 mt-6">1.1 Personal Information</h3>
            <p className="text-gray-300 leading-relaxed mb-3">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Name, email address, and contact information</li>
              <li>Public Service Number (for government officers)</li>
              <li>Department and position information</li>
              <li>Authentication credentials</li>
              <li>Profile information and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-orange-500 mb-3 mt-6">1.2 Usage Information</h3>
            <p className="text-gray-300 leading-relaxed mb-3">We automatically collect certain information when you use our platform:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Log data (IP address, browser type, operating system)</li>
              <li>Usage patterns and interaction data</li>
              <li>Device information</li>
              <li>Analytics and performance data</li>
            </ul>

            <h3 className="text-xl font-semibold text-orange-500 mb-3 mt-6">1.3 Documents and Files</h3>
            <p className="text-gray-300 leading-relaxed">
              When you upload documents (such as identification or endorsement letters), we store these files securely and use them only for verification and account approval purposes.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide, maintain, and improve our platform services</li>
              <li>Process and manage user accounts and authentication</li>
              <li>Review and approve officer applications</li>
              <li>Send administrative information and notifications</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
              <li>Provide customer support and respond to inquiries</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-orange-500 mb-3 mt-6">3.1 We Do Not Sell Your Information</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties.
            </p>

            <h3 className="text-xl font-semibold text-orange-500 mb-3 mt-6">3.2 Authorized Disclosure</h3>
            <p className="text-gray-300 leading-relaxed mb-3">We may share your information in the following circumstances:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>With Government Entities:</strong> When required for official government purposes</li>
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in platform operations (AWS, analytics services)</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
              <li><strong>Security and Safety:</strong> To protect the rights, property, or safety of Digital Hub, users, or others</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication using AWS Cognito</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and role-based permissions</li>
              <li>Secure cloud infrastructure (AWS)</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When information is no longer needed, we securely delete or anonymize it.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-300 leading-relaxed mb-3">You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Opt-Out:</strong> Opt out of non-essential communications</li>
              <li><strong>Data Portability:</strong> Request a copy of your data</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for authentication and basic functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              You can control cookies through your browser settings, but disabling certain cookies may affect platform functionality.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Digital Hub is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">10. International Data Transfers</h2>
            <p className="text-gray-300 leading-relaxed">
              Your information may be transferred to and maintained on servers located outside of your country. By using Digital Hub, you consent to the transfer of your information to countries that may have different data protection laws than your jurisdiction.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-[#0b0c0e] border border-[#2d2d32] rounded-lg p-6">
              <p className="text-gray-300 mb-2"><strong>Email:</strong> privacy@digital.gov.pg</p>
              <p className="text-gray-300 mb-2"><strong>Address:</strong> Digital Hub, Port Moresby, Papua New Guinea</p>
              <p className="text-gray-300"><strong>Support:</strong> support@digital.gov.pg</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-orange-500 bg-opacity-10 border border-orange-500 rounded-lg p-6 mt-8">
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-orange-500">Acknowledgment:</strong> By using Digital Hub, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2d2d32] py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Digital Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;