import { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Dashboard from './components/Dashboard';
import LearningHub from './components/LearningHub';

type PageType = 'dashboard' | 'learning' | 'analytics' | 'projects' | 'settings';

function App() {
  const { signOut, user } = useAuthenticator();
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'learning':
        return <LearningHub />;
      case 'analytics':
        return <div className="p-6"><h1 className="text-3xl font-bold text-white">Analytics</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>;
      case 'projects':
        return <div className="p-6"><h1 className="text-3xl font-bold text-white">Projects</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>;
      case 'settings':
        return <div className="p-6"><h1 className="text-3xl font-bold text-white">Settings</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#0b0c0e]">
      {/* Sidebar */}
      <aside className="w-16 bg-[#18181b] border-r border-[#2d2d32] flex flex-col items-center py-4 flex-shrink-0">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col space-y-4">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              currentPage === 'dashboard'
                ? 'bg-[#2d2d32] text-orange-500'
                : 'text-gray-400 hover:bg-[#2d2d32] hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentPage('learning')}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              currentPage === 'learning'
                ? 'bg-[#2d2d32] text-orange-500'
                : 'text-gray-400 hover:bg-[#2d2d32] hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentPage('analytics')}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              currentPage === 'analytics'
                ? 'bg-[#2d2d32] text-orange-500'
                : 'text-gray-400 hover:bg-[#2d2d32] hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentPage('projects')}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              currentPage === 'projects'
                ? 'bg-[#2d2d32] text-orange-500'
                : 'text-gray-400 hover:bg-[#2d2d32] hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentPage('settings')}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              currentPage === 'settings'
                ? 'bg-[#2d2d32] text-orange-500'
                : 'text-gray-400 hover:bg-[#2d2d32] hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="bg-[#18181b] border-b border-[#2d2d32] flex-shrink-0">
          <div className="flex items-center justify-between px-4 sm:px-6 h-14">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
              <h1 className="text-base sm:text-lg font-medium text-white truncate capitalize">{currentPage}</h1>
              <span className="text-gray-500 hidden sm:inline">/</span>
              <span className="text-gray-400 text-xs sm:text-sm hidden sm:inline">Home</span>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Time Range Selector */}
              <button className="hidden md:block px-3 py-1.5 bg-[#2d2d32] text-gray-300 text-sm rounded hover:bg-[#3a3a42] border border-[#3a3a42] transition-colors">
                Last 6 hours
              </button>
              
              {/* Refresh Button */}
              <button className="p-1.5 text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-[#2d2d32]">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-sm text-white truncate max-w-[150px]">{user?.signInDetails?.loginId || 'User'}</span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
                <button
                  onClick={signOut}
                  className="px-2 sm:px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm rounded transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;