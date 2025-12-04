import { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

function ProfileUpdate() {
  const { user } = useAuthenticator();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: user?.signInDetails?.loginId || 'john.doe@example.com',
    phone: '+675 7234 5678',
    department: 'IT Infrastructure',
    position: 'Cloud Engineer',
    location: 'Port Moresby, PNG',
    bio: 'Experienced cloud infrastructure engineer specializing in AWS and enterprise solutions.',
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    projectUpdates: true,
    securityAlerts: true,
    language: 'en',
    timezone: 'Pacific/Port_Moresby',
    theme: 'dark',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityData({
      ...securityData,
      [e.target.name]: e.target.value
    });
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    setIsEditing(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password updated');
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Preferences updated:', preferences);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-gray-400">Manage your account information and preferences</p>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-green-500 font-medium">Changes saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-6">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-3xl">JD</span>
              </div>
              <h3 className="text-white font-semibold text-lg">{profileData.fullName}</h3>
              <p className="text-gray-400 text-sm">{profileData.position}</p>
              <button className="mt-4 px-4 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white text-sm rounded-lg transition-colors">
                Change Photo
              </button>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4 pt-6 border-t border-[#2d2d32]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Member Since</span>
                <span className="text-sm text-white">Jan 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Projects</span>
                <span className="text-sm text-white">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Completed Tasks</span>
                <span className="text-sm text-white">48</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg">
            {/* Tabs */}
            <div className="border-b border-[#2d2d32]">
              <div className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'profile'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'security'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'preferences'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Preferences
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Profile Information Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileSubmit}>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors"
                        >
                          Edit Profile
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white text-sm rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors"
                          >
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Department</label>
                        <input
                          type="text"
                          name="department"
                          value={profileData.department}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Position</label>
                        <input
                          type="text"
                          name="position"
                          value={profileData.position}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          rows={4}
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <form onSubmit={handleSecuritySubmit}>
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Change Password</h3>

                    <div className="max-w-xl space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={securityData.currentPassword}
                          onChange={handleSecurityChange}
                          required
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                          placeholder="Enter current password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={securityData.newPassword}
                          onChange={handleSecurityChange}
                          required
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                          placeholder="Enter new password"
                        />
                        <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters with uppercase, lowercase, and numbers</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={securityData.confirmPassword}
                          onChange={handleSecurityChange}
                          required
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                      >
                        Update Password
                      </button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="pt-6 mt-6 border-t border-[#2d2d32]">
                      <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between bg-[#0b0c0e] border border-[#2d2d32] rounded-lg p-4">
                        <div>
                          <p className="text-white font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-400 mt-1">Add an extra layer of security to your account</p>
                        </div>
                        <button type="button" className="px-4 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white text-sm rounded-lg transition-colors">
                          Enable
                        </button>
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="pt-6 mt-6 border-t border-[#2d2d32]">
                      <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between bg-[#0b0c0e] border border-[#2d2d32] rounded-lg p-4">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-white font-medium">Current Session</p>
                              <p className="text-sm text-gray-400">Port Moresby, PNG • Chrome on Windows</p>
                            </div>
                          </div>
                          <span className="text-xs text-green-500 font-medium">Active Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <form onSubmit={handlePreferencesSubmit}>
                  <div className="space-y-6">
                    {/* Notifications */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-400">Receive email about your account activity</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="emailNotifications"
                              checked={preferences.emailNotifications}
                              onChange={handlePreferenceChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2d2d32] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-400">Receive push notifications on your devices</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="pushNotifications"
                              checked={preferences.pushNotifications}
                              onChange={handlePreferenceChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2d2d32] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Weekly Digest</p>
                            <p className="text-sm text-gray-400">Receive weekly summary of activities</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="weeklyDigest"
                              checked={preferences.weeklyDigest}
                              onChange={handlePreferenceChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2d2d32] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Project Updates</p>
                            <p className="text-sm text-gray-400">Get notified about project changes</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="projectUpdates"
                              checked={preferences.projectUpdates}
                              onChange={handlePreferenceChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2d2d32] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Security Alerts</p>
                            <p className="text-sm text-gray-400">Get alerts about account security</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="securityAlerts"
                              checked={preferences.securityAlerts}
                              onChange={handlePreferenceChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2d2d32] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Regional Settings */}
                    <div className="pt-6 mt-6 border-t border-[#2d2d32]">
                      <h3 className="text-lg font-semibold text-white mb-4">Regional Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
                          <select
                            name="language"
                            value={preferences.language}
                            onChange={handlePreferenceChange}
                            className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                          >
                            <option value="en">English</option>
                            <option value="tpi">Tok Pisin</option>
                            <option value="hiri">Hiri Motu</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Timezone</label>
                          <select
                            name="timezone"
                            value={preferences.timezone}
                            onChange={handlePreferenceChange}
                            className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                          >
                            <option value="Pacific/Port_Moresby">Port Moresby (GMT+10)</option>
                            <option value="Pacific/Bougainville">Bougainville (GMT+11)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Appearance */}
                    <div className="pt-6 mt-6 border-t border-[#2d2d32]">
                      <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
                      <div className="max-w-xs">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Theme</label>
                        <select
                          name="theme"
                          value={preferences.theme}
                          onChange={handlePreferenceChange}
                          className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                        >
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;