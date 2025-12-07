import { useState, useEffect } from 'react';
import { signOut, fetchUserAttributes } from 'aws-amplify/auth';
import { useUserRole } from './contexts/UserRoleContext';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import EngineerDashboard from './components/EngineerDashboard';
import OfficerDashboard from './components/OfficerDashboard';
import Dashboard from './components/Dashboard';
import LearningHub from './components/LearningHub';
import CertificateCompliance from './components/CertificateCompliance';
import ServiceRequest from './components/ServiceRequest';
import ProfileUpdate from './components/ProfileUpdate';
import UserManagement from './components/UserManagement';
import ApplicationApproval from './components/ApplicationApproval';
import ServiceRequestManagement from './components/ServiceRequestManagement';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsofService';

type PageType = 
  | 'dashboard'
  | 'learning'
  | 'certificates'
  | 'service-request'
  | 'profile'
  | 'users'
  | 'applications'
  | 'service-requests'
  | 'privacy-policy'
  | 'terms-of-service';

function App() {
  const { role, setRole, hasPermission } = useUserRole();
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const attributes = await fetchUserAttributes();
      setUserEmail(attributes.email || '');
      
      // Set role based on custom attribute or group membership
      const userRole = attributes['custom:role'] as string;
      if (userRole === 'super-admin') {
        setRole('super-admin');
      } else if (userRole === 'engineer') {
        setRole('engineer');
      } else {
        setRole('officer');
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const canAccessPage = (page: PageType): boolean => {
    if (role === 'super-admin') return true;
    
    if (role === 'engineer') {
      if (page === 'users') return false;
      if (page === 'applications') return hasPermission('canApproveOfficers');
      return true;
    }
    
    if (role === 'officer') {
      return ['dashboard', 'learning', 'certificates', 'service-requests', 'profile'].includes(page);
    }
    
    return false;
  };

  const renderDashboard = () => {
    switch (role) {
      case 'super-admin':
        return <SuperAdminDashboard />;
      case 'engineer':
        return <EngineerDashboard />;
      case 'officer':
        return <OfficerDashboard />;
      default:
        return <Dashboard />;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      case 'learning':
        return <LearningHub />;
      case 'certificates':
        return <CertificateCompliance />;
      case 'service-request':
        return <ServiceRequest />;
      case 'profile':
        return <ProfileUpdate />;
      case 'users':
        return <UserManagement />;
      case 'applications':
        return <ApplicationApproval />;
      case 'service-requests':
        return <ServiceRequestManagement />;  
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'terms-of-service':
        return <TermsOfService />;
      default:
        return renderDashboard();
    }
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case 'super-admin':
        return 'text-purple-400';
      case 'engineer':
        return 'text-blue-400';
      case 'officer':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRoleDisplayName = () => {
    switch (role) {
      case 'super-admin':
        return 'Super Admin';
      case 'engineer':
        return 'Engineer';
      case 'officer':
        return 'Officer';
      default:
        return 'User';
    }
  };

  const navigationItems = [
    {
      id: 'dashboard' as PageType,
      name: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      roles: ['super-admin', 'engineer', 'officer'],
    },
    {
      id: 'users' as PageType,
      name: 'User Management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      roles: ['super-admin'],
    },
    {
      id: 'applications' as PageType,
      name: 'Applications',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      roles: ['super-admin', 'engineer'],
      requiresPermission: 'canApproveOfficers',
    },
    {
      id: 'service-requests' as PageType,
      name: 'Service Requests',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      roles: ['super-admin', 'engineer', 'officer'],
    },
    {
      id: 'learning' as PageType,
      name: 'Learning Hub',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      roles: ['super-admin', 'engineer', 'officer'],
    },
    {
      id: 'certificates' as PageType,
      name: 'Certificates',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      roles: ['super-admin', 'engineer', 'officer'],
    },
    {
      id: 'profile' as PageType,
      name: 'Profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      roles: ['super-admin', 'engineer', 'officer'],
    },
  ];

  const visibleNavigationItems = navigationItems.filter(item => {
    if (!item.roles.includes(role)) return false;
    if (item.requiresPermission && role === 'engineer') {
      return hasPermission(item.requiresPermission as any);
    }
    return true;
  });

  return (
    <div className="h-screen overflow-hidden bg-[#0b0c0e] text-white flex flex-col">
      {/* Header - Fixed height */}
      <header className="bg-[#18181b] border-b border-[#2d2d32] flex-shrink-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg shadow-orange-500/20">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Digital Hub</h1>
                <p className="text-xs text-gray-400">Transformation Platform</p>
              </div>
            </div>

            {/* Right - User Info & Actions */}
            <div className="flex items-center space-x-4">
              {/* Time Filter */}
              <select className="bg-[#2d2d32] text-gray-300 text-sm px-3 py-2 rounded-lg border border-[#3a3a42] focus:outline-none focus:border-orange-500">
                <option>Last 6 hours</option>
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>

              {/* Refresh Button */}
              <button className="p-2 hover:bg-[#2d2d32] rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* User Info */}
              <div className="flex items-center space-x-3 px-4 py-2 bg-[#2d2d32] rounded-lg">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-300">{userEmail}</p>
                  <p className={`text-xs font-semibold ${getRoleBadgeColor()}`}>
                    {getRoleDisplayName()}
                  </p>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Flex row with sidebar and main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation - Fixed width, scrollable if needed */}
        <aside className="w-64 bg-[#18181b] border-r border-[#2d2d32] flex-shrink-0 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {visibleNavigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => canAccessPage(item.id) && setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  currentPage === item.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'text-gray-400 hover:bg-[#2d2d32] hover:text-white'
                } ${!canAccessPage(item.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!canAccessPage(item.id)}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Page Content - Scrollable main area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;