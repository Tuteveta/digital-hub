import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'super-admin' | 'engineer' | 'officer' | 'pending-officer';

export interface EngineerPermissions {
  canCreateForums: boolean;
  canCreateEvents: boolean;
  canCreateLearningModules: boolean;
  canApproveOfficers: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  publicServiceNumber?: string;
  status: 'active' | 'pending' | 'suspended';
  engineerPermissions?: EngineerPermissions;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

interface UserRoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  engineerPermissions: EngineerPermissions | null;
  hasPermission: (permission: keyof EngineerPermissions) => boolean;
}

const defaultEngineerPermissions: EngineerPermissions = {
  canCreateForums: false,
  canCreateEvents: false,
  canCreateLearningModules: false,
  canApproveOfficers: false,
};

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: ReactNode }) {
  // Default role - in production, this would come from your authentication system
  const [role, setRole] = useState<UserRole>('officer');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [engineerPermissions, setEngineerPermissions] = useState<EngineerPermissions | null>(null);

  // Update permissions when role changes
  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    
    // Set default permissions for engineers
    if (newRole === 'engineer') {
      setEngineerPermissions(defaultEngineerPermissions);
    } else {
      setEngineerPermissions(null);
    }
  };

  // Check if user has specific permission
  const hasPermission = (permission: keyof EngineerPermissions): boolean => {
    if (role === 'super-admin') return true; // Super admin has all permissions
    if (role === 'engineer' && engineerPermissions) {
      return engineerPermissions[permission];
    }
    return false;
  };

  return (
    <UserRoleContext.Provider value={{ 
      role, 
      setRole: handleSetRole, 
      userProfile,
      setUserProfile,
      engineerPermissions,
      hasPermission
    }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}