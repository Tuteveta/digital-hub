import { useState } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import App from './App';
import { UserRoleProvider } from './contexts/UserRoleContext';
import OfficerApplicationForm from './components/OfficerApplicationForm';

// Custom CSS to hide sign-up and style authenticator
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
  
  /* HIDE THE EYE ICON COMPLETELY */
  [data-amplify-authenticator] button[data-amplify-fieldgroup-icon-button],
  [data-amplify-authenticator] .amplify-field__show-password,
  [data-amplify-authenticator] [class*="show-password"],
  [data-amplify-authenticator] button[aria-label*="Show password"],
  [data-amplify-authenticator] button[aria-label*="Hide password"],
  [data-amplify-authenticator] [data-amplify-field-group] button[type="button"] {
    display: none !important;
  }
  
  /* Authenticator container styling */
  [data-amplify-authenticator] {
    background: #18181b;
    border: 1px solid #2d2d32;
    border-radius: 12px;
    padding: 2rem;
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
  
  /* Password input - normal padding since no icon */
  [data-amplify-authenticator] input[type="password"],
  [data-amplify-authenticator] input[type="text"][name*="password"] {
    padding: 0.75rem 1rem !important;
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
  
  /* Error messages - left aligned */
  [data-amplify-authenticator] [role="alert"],
  [data-amplify-authenticator] .amplify-alert {
    text-align: left !important;
  }
`;

function AuthContent() {
  const [showAuth, setShowAuth] = useState(false);
  const [showOfficerApplication, setShowOfficerApplication] = useState(false);

  // Show Officer Application Form
  if (showOfficerApplication) {
    return <OfficerApplicationForm onBack={() => setShowOfficerApplication(false)} />;
  }

  // Show Sign In Form
  if (showAuth) {
    return (
      <div className="min-h-screen w-full bg-[#0b0c0e] flex items-center justify-center p-4">
        <style>{authenticatorStyles}</style>
        
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => setShowAuth(false)}
            className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Welcome
          </button>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-4 shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-4xl">D</span>
            </div>
            <h1 className="text-3xl font-semibold text-white mb-2">Digital Hub</h1>
            <p className="text-gray-400 text-sm">Sign in to continue to your dashboard</p>
          </div>

          {/* Authenticator - Sign In Only, No Eye Icon */}
          <div className="mb-6">
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
                  return (
                    <div className="text-center mt-6 pt-6 border-t border-[#2d2d32]">
                      <p className="text-xs text-gray-500">Powered by AWS Amplify</p>
                    </div>
                  );
                },
              }}
            />
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">© 2025 Digital Hub. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  // Welcome Page (Default View)
  return (
    <div className="min-h-screen w-full bg-[#0b0c0e] relative overflow-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-8 shadow-2xl shadow-orange-500/30">
                <span className="text-white font-bold text-5xl">D</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Welcome to
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  Digital Hub
                </span>
              </h1>
              
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Your centralized platform for monitoring, analytics, and digital transformation. 
                Experience seamless integration with powerful insights.
              </p>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Real-time Analytics & Monitoring</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Comprehensive Dashboard Views</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Enterprise-Grade Security</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Scalable Cloud Infrastructure</span>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Options */}
            <div className="w-full max-w-md mx-auto">
              <div className="bg-[#18181b] border border-[#2d2d32] rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-2 text-center">Get Started</h2>
                <p className="text-gray-400 text-sm text-center mb-8">
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
                  className="w-full bg-[#2d2d32] hover:bg-[#3a3a42] text-white font-medium py-4 px-6 rounded-xl border border-[#3a3a42] transition-all duration-200 transform hover:scale-[1.02] mb-6"
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
                        Apply for an officer account with your Public Service Number, ID, and Endorsement Letter. 
                        Your application will be reviewed and approved by our team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center space-y-2">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Privacy Policy</a>
                  <span className="text-gray-700">•</span>
                  <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Terms of Service</a>
                </div>
                <p className="text-xs text-gray-600">© 2025 Digital Hub. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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