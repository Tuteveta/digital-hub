import { useState } from 'react';
import { EngineerPermissions } from '../contexts/UserRoleContext';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'super-admin' | 'engineer' | 'officer';
  status: 'active' | 'suspended';
  publicServiceNumber?: string;
  createdAt: string;
  permissions?: EngineerPermissions;
}

function UserManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'engineer' | 'officer'>('all');

  // Mock data - replace with actual API call
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'john.engineer@digitalhub.com',
      fullName: 'John Smith',
      role: 'engineer',
      status: 'active',
      createdAt: '2024-01-15',
      permissions: {
        canCreateForums: true,
        canCreateEvents: true,
        canCreateLearningModules: false,
        canApproveOfficers: true,
      }
    },
    {
      id: '2',
      email: 'jane.doe@digitalhub.com',
      fullName: 'Jane Doe',
      role: 'officer',
      status: 'active',
      publicServiceNumber: 'PS-12345',
      createdAt: '2024-02-10',
    },
    {
      id: '3',
      email: 'mike.tech@digitalhub.com',
      fullName: 'Mike Johnson',
      role: 'engineer',
      status: 'active',
      createdAt: '2024-01-20',
      permissions: {
        canCreateForums: false,
        canCreateEvents: true,
        canCreateLearningModules: true,
        canApproveOfficers: false,
      }
    },
  ]);

  const [newUser, setNewUser] = useState({
    email: '',
    fullName: '',
    role: 'officer' as 'engineer' | 'officer',
    publicServiceNumber: '',
  });

  const [permissions, setPermissions] = useState<EngineerPermissions>({
    canCreateForums: false,
    canCreateEvents: false,
    canCreateLearningModules: false,
    canApproveOfficers: false,
  });

  const handleCreateUser = () => {
    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      permissions: newUser.role === 'engineer' ? permissions : undefined,
    };

    setUsers([...users, user]);
    setShowCreateModal(false);
    setNewUser({ email: '', fullName: '', role: 'officer', publicServiceNumber: '' });
    setPermissions({
      canCreateForums: false,
      canCreateEvents: false,
      canCreateLearningModules: false,
      canApproveOfficers: false,
    });
  };

  const handleUpdatePermissions = () => {
    if (selectedUser && selectedUser.role === 'engineer') {
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, permissions } 
          : u
      ));
      setShowPermissionsModal(false);
      setSelectedUser(null);
    }
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } 
        : u
    ));
  };

  const openPermissionsModal = (user: User) => {
    setSelectedUser(user);
    setPermissions(user.permissions || {
      canCreateForums: false,
      canCreateEvents: false,
      canCreateLearningModules: false,
      canApproveOfficers: false,
    });
    setShowPermissionsModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-gray-400">Create and manage user accounts and permissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Total Users</div>
          <div className="text-2xl font-bold text-white">{users.length}</div>
        </div>
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Engineers</div>
          <div className="text-2xl font-bold text-blue-500">{users.filter(u => u.role === 'engineer').length}</div>
        </div>
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Officers</div>
          <div className="text-2xl font-bold text-green-500">{users.filter(u => u.role === 'officer').length}</div>
        </div>
        <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Active</div>
          <div className="text-2xl font-bold text-purple-500">{users.filter(u => u.status === 'active').length}</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="engineer">Engineers</option>
              <option value="officer">Officers</option>
            </select>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors whitespace-nowrap"
          >
            + Create User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0b0c0e]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2d32]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#0b0c0e] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{user.fullName}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      {user.publicServiceNumber && (
                        <div className="text-xs text-gray-600">PS: {user.publicServiceNumber}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      user.role === 'engineer' 
                        ? 'bg-blue-500/10 text-blue-500' 
                        : 'bg-green-500/10 text-green-500'
                    }`}>
                      {user.role === 'engineer' ? 'Engineer' : 'Officer'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      user.status === 'active' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{user.createdAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {user.role === 'engineer' && (
                        <button
                          onClick={() => openPermissionsModal(user)}
                          className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs rounded hover:bg-blue-500/20 transition-colors"
                        >
                          Permissions
                        </button>
                      )}
                      <button
                        onClick={() => handleSuspendUser(user.id)}
                        className={`px-3 py-1 text-xs rounded transition-colors ${
                          user.status === 'active'
                            ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                            : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                        }`}
                      >
                        {user.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Create New User</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                    placeholder="john.smith@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                    className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="officer">Officer</option>
                    <option value="engineer">Engineer</option>
                  </select>
                </div>

                {newUser.role === 'officer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Public Service Number</label>
                    <input
                      type="text"
                      value={newUser.publicServiceNumber}
                      onChange={(e) => setNewUser({ ...newUser, publicServiceNumber: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0b0c0e] border border-[#3a3a42] rounded-lg text-white focus:border-orange-500 focus:outline-none"
                      placeholder="PS-12345"
                    />
                  </div>
                )}

                {newUser.role === 'engineer' && (
                  <div className="border border-[#2d2d32] rounded-lg p-4">
                    <h3 className="text-sm font-medium text-white mb-3">Engineer Permissions</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permissions.canCreateForums}
                          onChange={(e) => setPermissions({ ...permissions, canCreateForums: e.target.checked })}
                          className="rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-300">Can Create Forum Messages</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permissions.canCreateEvents}
                          onChange={(e) => setPermissions({ ...permissions, canCreateEvents: e.target.checked })}
                          className="rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-300">Can Create Event Registrations</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permissions.canCreateLearningModules}
                          onChange={(e) => setPermissions({ ...permissions, canCreateLearningModules: e.target.checked })}
                          className="rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-300">Can Create Learning Modules</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permissions.canApproveOfficers}
                          onChange={(e) => setPermissions({ ...permissions, canApproveOfficers: e.target.checked })}
                          className="rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-300">Can Approve Officer Applications</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateUser}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Create User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissionsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] border border-[#2d2d32] rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Engineer Permissions</h2>
              <p className="text-sm text-gray-400 mb-6">{selectedUser.fullName}</p>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.canCreateForums}
                    onChange={(e) => setPermissions({ ...permissions, canCreateForums: e.target.checked })}
                    className="rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-300">Can Create Forum Messages</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.canCreateEvents}
                    onChange={(e) => setPermissions({ ...permissions, canCreateEvents: e.target.checked })}
                    className="rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-300">Can Create Event Registrations</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.canCreateLearningModules}
                    onChange={(e) => setPermissions({ ...permissions, canCreateLearningModules: e.target.checked })}
                    className="rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-300">Can Create Learning Modules</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.canApproveOfficers}
                    onChange={(e) => setPermissions({ ...permissions, canApproveOfficers: e.target.checked })}
                    className="rounded border-[#3a3a42] text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-300">Can Approve Officer Applications</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowPermissionsModal(false)}
                  className="px-4 py-2 bg-[#2d2d32] hover:bg-[#3a3a42] text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePermissions}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Update Permissions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;