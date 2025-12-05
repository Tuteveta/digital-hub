function TermsOfService() {
  return (
    <div className="min-h-screen w-full bg-[#0b0c0e] text-white overflow-y-auto">
      {/* Header - Sticky */}
      <header className="bg-[#18181b] border-b border-[#2d2d32] sticky top-0 z-40 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg shadow-orange-500/20 flex-shrink-0">
              <span className="text-white font-bold text-lg sm:text-xl">D</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl font-semibold truncate">Digital Hub</h1>
              <p className="text-xs text-gray-400">Terms of Service</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content - Scrollable */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 pb-28">
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 w-full">
          {/* Title */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 break-words">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-400">
              Last Updated: December 5, 2025
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-6 sm:mb-8">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              Welcome to Digital Hub. These Terms of Service ("Terms") govern your access to and use of the Digital Hub platform, including our website, services, and applications (collectively, the "Platform").
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Platform.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              By creating an account, accessing, or using Digital Hub, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms constitute a legally binding agreement between you and Digital Hub.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. Continued use of the Platform after changes are posted constitutes your acceptance of the modified Terms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              2. Eligibility and Account Registration
            </h2>
            
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              2.1 Eligibility
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              You must be at least 18 years old and legally capable of entering into binding contracts to use this Platform. By using the Platform, you represent and warrant that you meet these eligibility requirements.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              2.2 Account Registration
            </h3>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-300 space-y-1 sm:space-y-2 ml-2 sm:ml-4">
              <li>You must provide accurate, current, and complete information during registration</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>You must notify us immediately of any unauthorized access or security breach</li>
              <li>We reserve the right to refuse registration or terminate accounts at our discretion</li>
            </ul>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              2.3 Officer Application Process
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Government officers must submit valid documentation (Public Service Number, identification, and endorsement letters) for account approval. All applications are subject to review and verification. False or misleading information may result in account denial or termination.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              3. User Roles and Access
            </h2>
            
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              3.1 Role-Based Access
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-2 sm:mb-3">
              The Platform provides different levels of access based on user roles:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-300 space-y-1 sm:space-y-2 ml-2 sm:ml-4">
              <li><strong>Officers:</strong> Access to dashboards, service requests, learning materials, and certificates</li>
              <li><strong>Engineers:</strong> Additional access to technical features, application approvals, and system management</li>
              <li><strong>Super Admins:</strong> Full platform access including user management and system configuration</li>
            </ul>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              3.2 Access Restrictions
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              You may only access features and data appropriate to your assigned role. Unauthorized access attempts may result in account suspension or termination and potential legal action.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              4. Acceptable Use Policy
            </h2>
            
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              4.1 Permitted Use
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              You agree to use the Platform only for lawful purposes and in accordance with these Terms. The Platform is intended for government digital transformation activities, analytics, monitoring, and related professional purposes.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              4.2 Prohibited Activities
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-2 sm:mb-3">
              You must not:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-300 space-y-1 sm:space-y-2 ml-2 sm:ml-4">
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Attempt to gain unauthorized access to any part of the Platform</li>
              <li>Interfere with or disrupt the Platform's operation or servers</li>
              <li>Use automated systems to access the Platform without permission</li>
              <li>Transmit malware, viruses, or malicious code</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Collect or harvest information about other users</li>
              <li>Use the Platform for any illegal or unauthorized purpose</li>
              <li>Share your account credentials with unauthorized individuals</li>
              <li>Attempt to reverse engineer or decompile any part of the Platform</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              5. Intellectual Property Rights
            </h2>
            
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              5.1 Platform Ownership
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              The Platform and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Digital Hub and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              5.2 User Content
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              You retain ownership of any content you upload or submit to the Platform. However, by submitting content, you grant Digital Hub a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content for the purpose of operating and improving the Platform.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              5.3 Trademarks
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              "Digital Hub" and associated logos are trademarks. You may not use these trademarks without our prior written permission.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              6. Data and Privacy
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data collection and use practices.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              You acknowledge that data transmitted through the Platform may be stored on servers located in various jurisdictions and consent to such storage and processing.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              7. Service Availability and Modifications
            </h2>
            
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              7.1 Service Availability
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              We strive to provide reliable and continuous service, but we do not guarantee that the Platform will be available at all times or free from interruptions, delays, or errors. We may suspend or terminate the Platform for maintenance, updates, or other reasons without prior notice.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              7.2 Platform Modifications
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time without liability. We may also impose limits on certain features or restrict access to parts of the Platform.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              8. Third-Party Services and Links
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              The Platform may contain links to third-party websites or services that are not owned or controlled by Digital Hub. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any third-party services.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              9. Disclaimers and Warranties
            </h2>
            
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              9.1 "As Is" Provision
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              9.2 No Warranty
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We do not warrant that the Platform will be uninterrupted, secure, or error-free, or that any defects will be corrected. You use the Platform at your own risk.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              10. Limitation of Liability
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              TO THE FULLEST EXTENT PERMITTED BY LAW, DIGITAL HUB SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING THE PLATFORM DURING THE SIX (6) MONTHS PRIOR TO THE CLAIM.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              11. Indemnification
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Digital Hub and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the Platform, your violation of these Terms, or your violation of any rights of another party.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              12. Termination
            </h2>
            
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              12.1 Termination by You
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              You may terminate your account at any time by contacting us or using the account deletion feature in the Platform.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              12.2 Termination by Us
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              We may suspend or terminate your account immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Platform will immediately cease.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              12.3 Effect of Termination
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Upon termination, all provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              13. Governing Law and Dispute Resolution
            </h2>
            
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              13.1 Governing Law
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Papua New Guinea, without regard to its conflict of law provisions.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              13.2 Dispute Resolution
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Any disputes arising out of or relating to these Terms or the Platform shall be resolved through good faith negotiations. If negotiations fail, disputes shall be submitted to the competent courts of Papua New Guinea.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              14. General Provisions
            </h2>
            
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              14.1 Entire Agreement
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Digital Hub regarding the Platform.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              14.2 Severability
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              14.3 Waiver
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term.
            </p>

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 mb-2 sm:mb-3 mt-4 sm:mt-6">
              14.4 Assignment
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              15. Contact Information
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-[#0b0c0e] border border-[#2d2d32] rounded-lg p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-300 mb-2 break-words">
                <strong>Email:</strong> legal@digital.gov.pg
              </p>
              <p className="text-sm sm:text-base text-gray-300 mb-2 break-words">
                <strong>Address:</strong> Digital Hub, Port Moresby, Papua New Guinea
              </p>
              <p className="text-sm sm:text-base text-gray-300 break-words">
                <strong>Support:</strong> support@digital.gov.pg
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-orange-500 bg-opacity-10 border border-orange-500 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              <strong className="text-orange-500">By using Digital Hub, you acknowledge that you have read these Terms of Service and agree to be bound by them.</strong>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2d2d32] py-6 sm:py-8 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            © 2025 Digital Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default TermsOfService;