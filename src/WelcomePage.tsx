import { useState } from 'react';
import { Authenticator, useAuthenticator, ThemeProvider } from '@aws-amplify/ui-react';
import App from './App';

const authenticatorTheme = {
  name: 'grafana-theme',
  tokens: {
    colors: {
      background: {
        primary: '#18181b',
        secondary: '#0b0c0e',
      },
      font: {
        primary: '#d4d4d8',
        secondary: '#9ca3af',
        interactive: '#f97316',
      },
      brand: {
        primary: {
          10: '#fff7ed',
          20: '#ffedd5',
          40: '#fed7aa',
          60: '#fdba74',
          80: '#fb923c',
          90: '#f97316',
          100: '#ea580c',
        },
      },
      border: {
        primary: '#3a3a42',
        secondary: '#2d2d32',
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: '#f97316',
          color: '#ffffff',
          _hover: {
            backgroundColor: '#ea580c',
          },
        },
      },
      fieldcontrol: {
        borderColor: '#3a3a42',
        backgroundColor: '#0b0c0e',
        color: '#d4d4d8',
        _focus: {
          borderColor: '#f97316',
        },
      },
      tabs: {
        item: {
          color: '#9ca3af',
          borderColor: 'transparent',
          _active: {
            color: '#f97316',
            borderColor: '#f97316',
          },
        },
      },
    },
  },
};

function AuthContent() {
  const [initialState, setInitialState] = useState<'signIn' | 'signUp'>('signIn');
  const [showAuth, setShowAuth] = useState(false);

  if (showAuth) {
    return (
      <div className="h-screen w-screen bg-[#0b0c0e] flex items-center justify-center p-4 overflow-auto">
        <div className="w-full max-w-md">
          {/* Header with Back Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAuth(false)}
              className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center mx-auto"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Welcome
            </button>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-6 shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-4xl">D</span>
            </div>
            <h1 className="text-3xl font-semibold text-white mb-2">Digital Hub</h1>
            <p className="text-gray-400 text-sm">
              {initialState === 'signIn' ? 'Sign in to continue to your dashboard' : 'Create your account to get started'}
            </p>
          </div>

          {/* Authenticator with Theme */}
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <ThemeProvider theme={authenticatorTheme}>
                <Authenticator
                  initialState={initialState}
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
              </ThemeProvider>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">© 2024 Digital Hub. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#0b0c0e] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center p-4 overflow-auto">
        <div className="max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-8 shadow-2xl shadow-orange-500/30">
                <span className="text-white font-bold text-5xl">D</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Welcome to
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  Digital Hub
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Your centralized platform for monitoring, analytics, and digital transformation. 
                Experience seamless integration with powerful insights.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Real-time Analytics & Monitoring</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Comprehensive Dashboard Views</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Enterprise-Grade Security</span>
                </div>
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-300">Scalable Cloud Infrastructure</span>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Options */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-[#18181b] border border-[#2d2d32] rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-2 text-center">Get Started</h2>
                <p className="text-gray-400 text-sm text-center mb-8">
                  Choose an option to continue
                </p>

                {/* Sign In Button */}
                <button
                  onClick={() => {
                    setInitialState('signIn');
                    setShowAuth(true);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 mb-4"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign In</span>
                  </div>
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2d2d32]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#18181b] text-gray-500">or</span>
                  </div>
                </div>

                {/* Create Account Button */}
                <button
                  onClick={() => {
                    setInitialState('signUp');
                    setShowAuth(true);
                  }}
                  className="w-full bg-[#2d2d32] hover:bg-[#3a3a42] text-white font-medium py-4 px-6 rounded-lg border border-[#3a3a42] transition-all duration-200 transform hover:scale-105 mb-6"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Create Account</span>
                  </div>
                </button>

                {/* Info Box */}
                <div className="bg-[#0b0c0e] border border-[#2d2d32] rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-300 font-medium mb-1">New to Digital Hub?</p>
                      <p className="text-xs text-gray-500">
                        Create an account to access all features including analytics, monitoring, and reporting tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center space-y-2">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Privacy Policy</a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Terms of Service</a>
                </div>
                <p className="text-xs text-gray-600">© 2024 Digital Hub. All rights reserved.</p>
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
  
  // If authenticated, render App directly
  if (authStatus === 'authenticated') {
    return <App />;
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