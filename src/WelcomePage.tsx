import { useState } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import App from './App';
import { UserRoleProvider } from './contexts/UserRoleContext';
import OfficerApplicationForm from './components/OfficerApplicationForm';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsofService';

// Custom CSS for authenticator
const authenticatorStyles = `
  /* Hide the Sign Up tab */
  [data-amplify-authenticator] [role="tablist"] {
    display: none !important;
  }
  
  /* Hide any sign up form */
  [data-amplify-router-content] > div:nth-child(2),
  [data-amplify-router-content] > div[data-amplify-router-content-signup] {
    display: none !important;
  }
  
  /* Hide sign up button/link */
  button[data-amplify-sign-up],
  a[href*="signUp"],
  [data-amplify-footer] a:last-child {
    display: none !important;
  }
  
  /* Authenticator container styling */
  [data-amplify-authenticator] {
    background: transparent;
    border: none;
  }
  
  /* Left align all labels and inputs */
  [data-amplify-authenticator] label {
    color: #d4d4d8;
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
    text-align: left !important;
  }
  
  /* Input fields styling - left aligned */
  [data-amplify-authenticator] input {
    background: #0b0c0e;
    border: 1px solid #3a3a42;
    color: #d4d4d8;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    width: 100%;
    text-align: left !important;
  }
  
  [data-amplify-authenticator] input::placeholder {
    color: #6b7280;
    text-align: left !important;
  }
  
  [data-amplify-authenticator] input:focus {
    border-color: #f97316;
    outline: none;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
  }
  
  /* Field groups - left aligned */
  [data-amplify-authenticator] [data-amplify-field-group],
  [data-amplify-authenticator] .amplify-field-group,
  [data-amplify-authenticator] .amplify-field {
    text-align: left !important;
    display: block !important;
    width: 100%;
  }
  
  /* Form container */
  [data-amplify-authenticator] form {
    text-align: left !important;
  }
  
  /* Buttons */
  [data-amplify-authenticator] button[type="submit"] {
    background: #f97316;
    color: white;
    width: 100%;
    padding: 0.75rem;
    border-radius: 8px;
    font-weight: 600;
    margin-top: 1rem;
  }
  
  [data-amplify-authenticator] button[type="submit"]:hover {
    background: #ea580c;
  }
  
  /* Forgot password link - left aligned */
  [data-amplify-authenticator] [data-amplify-footer] {
    text-align: left !important;
    margin-top: 1rem;
  }
  
  [data-amplify-authenticator] [data-amplify-footer] button {
    color: #f97316;
    background: transparent;
    border: none;
    padding: 0;
    text-decoration: underline;
    cursor: pointer;
    text-align: left !important;
  }
  
  [data-amplify-authenticator] [data-amplify-footer] button:hover {
    color: #ea580c;
  }
`;

// Footer Component (reusable)
function Footer({ onNavigate }: { onNavigate?: (page: 'privacy' | 'terms') => void }) {
  return (
    <div className="relative z-10 py-6 border-t border-[#2d2d32]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-6 text-sm">
            <button
              onClick={() => onNavigate?.('privacy')}
              className="text-gray-500 hover:text-orange-500 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-gray-700">•</span>
            <button
              onClick={() => onNavigate?.('terms')}
              className="text-gray-500 hover:text-orange-500 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
          <p className="text-xs text-gray-600">
            © 2025 Digital Hub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

function AuthContent() {
  const [showAuth, setShowAuth] = useState(false);
  const [showOfficerApplication, setShowOfficerApplication] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  // Handle navigation from footer
  const handleFooterNavigation = (page: 'privacy' | 'terms') => {
    if (page === 'privacy') {
      setShowPrivacyPolicy(true);
      setShowTermsOfService(false);
      setShowAuth(false);
      setShowOfficerApplication(false);
    } else if (page === 'terms') {
      setShowTermsOfService(true);
      setShowPrivacyPolicy(false);
      setShowAuth(false);
      setShowOfficerApplication(false);
    }
  };

  // Reset all views
  const resetViews = () => {
    setShowAuth(false);
    setShowOfficerApplication(false);
    setShowPrivacyPolicy(false);
    setShowTermsOfService(false);
  };

  // Show Privacy Policy
  if (showPrivacyPolicy) {
    return (
      <div className="relative">
        <PrivacyPolicy />
        {/* Back to Welcome Button - Fixed at bottom */}
        <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-xs sm:max-w-sm">
          <button
            onClick={resetViews}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm sm:text-base">Back to Welcome</span>
          </button>
        </div>
      </div>
    );
  }

  // Show Terms of Service
  if (showTermsOfService) {
    return (
      <div className="relative">
        <TermsOfService />
        {/* Back to Welcome Button - Fixed at bottom */}
        <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-xs sm:max-w-sm">
          <button
            onClick={resetViews}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm sm:text-base">Back to Welcome</span>
          </button>
        </div>
      </div>
    );
  }

  // Show Officer Application Form
  if (showOfficerApplication) {
    return (
      <div className="min-h-screen w-full bg-[#0b0c0e] flex flex-col">
        {/* Officer Application Content */}
        <div className="flex-1">
          <OfficerApplicationForm onBack={() => setShowOfficerApplication(false)} />
        </div>
        
        {/* Footer */}
        <Footer onNavigate={handleFooterNavigation} />
      </div>
    );
  }

  // Show Sign In Form
  if (showAuth) {
    return (
      <div className="min-h-screen w-full bg-[#0b0c0e] flex flex-col">
        <style>{authenticatorStyles}</style>
        
        {/* Scrollbar Styles */}
        <style>{`
          .overflow-y-auto::-webkit-scrollbar {
            width: 16px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: #0b0c0e;
            border-radius: 0;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #4a4a52;
            border-radius: 8px;
            border: 3px solid #0b0c0e;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #5a5a62;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:active {
            background: #6a6a72;
          }
        `}</style>
        
        {/* Header - Centered Back Button */}
        <header className="bg-[#18181b] border-b border-[#2d2d32] sticky top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-center max-w-7xl mx-auto">
              {/* Centered Back Button */}
              <button
                onClick={() => setShowAuth(false)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back to Welcome</span>
              </button>
            </div>
          </div>
        </header>

        {/* Sign In Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-center p-4 min-h-full">
            <div className="w-full max-w-md">
              {/* Sign In Heading */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-gray-400 text-sm">Enter your credentials to continue</p>
              </div>

            {/* Sign In Card */}
            <div className="bg-[#18181b] border border-[#2d2d32] rounded-2xl shadow-2xl p-8 mb-8">
              <Authenticator
                initialState="signIn"
                hideSignUp={true}
                signUpAttributes={[]}
                formFields={{
                  signIn: {
                    username: {
                      label: 'Email',
                      placeholder: 'Enter your email',
                      isRequired: true,
                    },
                    password: {
                      label: 'Password',
                      placeholder: 'Enter your password',
                      isRequired: true,
                    },
                  },
                }}
                components={{
                  Header() {
                    return null;
                  },
                  Footer() {
                    return null;
                  },
                }}
              />
            </div>
          </div>
          </div>
        </div>

        {/* Footer */}
        <Footer onNavigate={handleFooterNavigation} />
      </div>
    );
  }

  // Welcome Page (Default View)
  return (
    <div className="min-h-screen w-full bg-[#0b0c0e] relative flex flex-col">
      {/* Scrollbar Styles */}
      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 16px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #0b0c0e;
          border-radius: 0;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #4a4a52;
          border-radius: 8px;
          border: 3px solid #0b0c0e;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #5a5a62;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:active {
          background: #6a6a72;
        }
      `}</style>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="flex items-center justify-center p-4 py-12 min-h-full">
          <div className="w-full max-w-5xl">
          {/* Main Card */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Branding */}
              <div className="p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-[#18181b] to-[#0b0c0e] border-r border-[#2d2d32]">
                {/* Logo - ENHANCED WITH PROFESSIONAL STYLING */}
                <div className="mb-8">
                  <div className="relative inline-block group">
                    {/* Subtle animated glow effect */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-orange-500/20 via-red-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                    
                    {/* Logo container with refined styling */}
                    <div className="relative bg-gradient-to-br from-[#1f1f23] to-[#0b0c0e] p-5 rounded-2xl border-2 border-[#2d2d32] group-hover:border-orange-500/40 transition-all duration-300 shadow-2xl mb-6">
                      {/* Inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-2xl"></div>
                      
                      <img 
                        src="/logo.png" 
                        alt="Digital Hub Logo" 
                        className="relative h-20 w-auto drop-shadow-2xl transition-all duration-300 group-hover:scale-105 filter brightness-110"
                        style={{ imageRendering: 'crisp-edges' }}
                        onError={(e) => {
                          // Fallback to D icon if logo not found
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement?.parentElement;
                          if (parent) {
                            const fallback = parent.nextElementSibling;
                            if (fallback) {
                              fallback.classList.remove('hidden');
                              fallback.classList.add('flex');
                            }
                          }
                        }}
                      />
                    </div>
                    
                    {/* Fallback D Icon - Enhanced with modern styling */}
                    <div className="hidden relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-5 rounded-2xl border-2 border-orange-400/30 shadow-2xl shadow-orange-500/40 mb-6">
                      <div className="w-20 h-20 flex items-center justify-center">
                        <span className="text-white font-bold text-4xl tracking-tight drop-shadow-lg">D</span>
                      </div>
                      {/* Corner accent */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  Welcome to
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Digital Hub
                  </span>
                </h1>
                
                <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                  Your centralized platform for monitoring, analytics, and digital transformation.
                </p>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Real-time Analytics & Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Comprehensive Dashboard Views</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Enterprise-Grade Security</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Scalable Cloud Infrastructure</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Get Started */}
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
                <p className="text-gray-400 text-sm mb-8">
                  Choose an option to continue
                </p>

                {/* Sign In Button - PRIMARY ACTION */}
                <button
                  onClick={() => setShowAuth(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/30 mb-4 shadow-lg"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-lg">Sign In</span>
                  </div>
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#3a3a42]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#18181b] text-gray-500 font-medium">OR</span>
                  </div>
                </div>

                {/* Apply for Account Button */}
                <button
                  onClick={() => setShowOfficerApplication(true)}
                  className="w-full bg-[#2d2d32] hover:bg-[#3a3a42] text-white font-medium py-4 px-6 rounded-xl border border-[#3a3a42] transition-all duration-200 transform hover:scale-[1.02] mb-8"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Apply for Officer Account</span>
                  </div>
                </button>

                {/* Info Box */}
                <div className="bg-[#0b0c0e] border border-[#2d2d32] rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-300 font-semibold mb-1">New Officer?</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Apply with your Public Service Number, ID, and Endorsement Letter. 
                        Your application will be reviewed by our team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Footer - Bottom Center */}
      <Footer onNavigate={handleFooterNavigation} />
    </div>
  );
}

// Auth wrapper to check authentication status
function AuthWrapper() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  
  // If authenticated, render App with UserRoleProvider
  if (authStatus === 'authenticated') {
    return (
      <UserRoleProvider>
        <App />
      </UserRoleProvider>
    );
  }
  
  // Otherwise show the welcome/auth pages
  return <AuthContent />;
}

// Main component with Authenticator Provider
function WelcomePage() {
  return (
    <Authenticator.Provider>
      <AuthWrapper />
    </Authenticator.Provider>
  );
}

export default WelcomePage;