// src/services/api.ts
// API Service for backend integration with AWS Amplify - FIXED VERSION

import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper function to get auth token - FIXED
async function getAuthToken(): Promise<string> {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    
    if (!token) {
      throw new Error('No authentication token available');
    }
    
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
}

// Generic API call helper
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'API call failed';
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

// ==================== USER PROFILE API ====================

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  department?: string;
  position?: string;
  role: 'SuperAdmin' | 'Engineer' | 'Officer';
  publicServiceNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export const userAPI = {
  // Get current user profile
  getCurrentProfile: async (): Promise<UserProfile> => {
    return apiCall<UserProfile>('/users/profile');
  },

  // Update current user profile
  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    return apiCall<UserProfile>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Get all users (Super Admin only)
  getAllUsers: async (): Promise<UserProfile[]> => {
    return apiCall<UserProfile[]>('/users');
  },

  // Get user by ID (Super Admin/Engineer only)
  getUserById: async (userId: string): Promise<UserProfile> => {
    return apiCall<UserProfile>(`/users/${userId}`);
  },

  // Create new user (Super Admin only)
  createUser: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    return apiCall<UserProfile>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Delete user (Super Admin only)
  deleteUser: async (userId: string): Promise<void> => {
    return apiCall<void>(`/users/${userId}`, {
      method: 'DELETE',
    });
  },
};

// ==================== SERVICE REQUEST API ====================

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: 'email' | 'hosting' | 'database' | 'dns' | 'certificate' | 'other';
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  assignedEngineerId?: string;
  assignedEngineerName?: string;
  attachments?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const serviceRequestAPI = {
  // Get all service requests (filtered by role)
  getAll: async (): Promise<ServiceRequest[]> => {
    return apiCall<ServiceRequest[]>('/service-requests');
  },

  // Get service request by ID
  getById: async (id: string): Promise<ServiceRequest> => {
    return apiCall<ServiceRequest>(`/service-requests/${id}`);
  },

  // Get current user's service requests (Officer)
  getMyRequests: async (): Promise<ServiceRequest[]> => {
    return apiCall<ServiceRequest[]>('/service-requests/my-requests');
  },

  // Create new service request (Officer)
  create: async (data: Partial<ServiceRequest>): Promise<ServiceRequest> => {
    return apiCall<ServiceRequest>('/service-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update service request
  update: async (id: string, data: Partial<ServiceRequest>): Promise<ServiceRequest> => {
    return apiCall<ServiceRequest>(`/service-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Update request status (Engineer/Admin)
  updateStatus: async (
    id: string,
    status: ServiceRequest['status'],
    notes?: string
  ): Promise<ServiceRequest> => {
    return apiCall<ServiceRequest>(`/service-requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  },

  // Assign request to engineer (Engineer/Admin)
  assignToEngineer: async (id: string, engineerId: string): Promise<ServiceRequest> => {
    return apiCall<ServiceRequest>(`/service-requests/${id}/assign`, {
      method: 'PATCH',
      body: JSON.stringify({ engineerId }),
    });
  },

  // Delete service request (Owner/Admin)
  delete: async (id: string): Promise<void> => {
    return apiCall<void>(`/service-requests/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== CERTIFICATE API ====================

export interface Certificate {
  id: string;
  certificateType: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  documents?: string[];
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const certificateAPI = {
  // Get all certificates (filtered by role)
  getAll: async (): Promise<Certificate[]> => {
    return apiCall<Certificate[]>('/certificates');
  },

  // Get certificate by ID
  getById: async (id: string): Promise<Certificate> => {
    return apiCall<Certificate>(`/certificates/${id}`);
  },

  // Get current user's certificates (Officer)
  getMyCertificates: async (): Promise<Certificate[]> => {
    return apiCall<Certificate[]>('/certificates/my-certificates');
  },

  // Apply for certificate (Officer)
  apply: async (data: Partial<Certificate>): Promise<Certificate> => {
    return apiCall<Certificate>('/certificates', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update certificate status (Engineer/Admin)
  updateStatus: async (
    id: string,
    status: Certificate['status'],
    notes?: string,
    rejectionReason?: string
  ): Promise<Certificate> => {
    return apiCall<Certificate>(`/certificates/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes, rejectionReason }),
    });
  },

  // Approve certificate (Engineer/Admin)
  approve: async (id: string, notes?: string): Promise<Certificate> => {
    return certificateAPI.updateStatus(id, 'approved', notes);
  },

  // Reject certificate (Engineer/Admin)
  reject: async (id: string, reason: string): Promise<Certificate> => {
    return certificateAPI.updateStatus(id, 'rejected', undefined, reason);
  },

  // Delete certificate (Owner/Admin)
  delete: async (id: string): Promise<void> => {
    return apiCall<void>(`/certificates/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== OFFICER APPLICATION API ====================

export interface OfficerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  publicServiceNumber: string;
  department: string;
  position: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  idDocument?: string;
  endorsementLetter?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const applicationAPI = {
  // Get all applications (Engineer/Admin)
  getAll: async (): Promise<OfficerApplication[]> => {
    return apiCall<OfficerApplication[]>('/applications');
  },

  // Get application by ID
  getById: async (id: string): Promise<OfficerApplication> => {
    return apiCall<OfficerApplication>(`/applications/${id}`);
  },

  // Submit application (Public)
  submit: async (data: Partial<OfficerApplication>): Promise<OfficerApplication> => {
    return apiCall<OfficerApplication>('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Approve application (Engineer/Admin)
  approve: async (id: string, notes?: string): Promise<OfficerApplication> => {
    return apiCall<OfficerApplication>(`/applications/${id}/approve`, {
      method: 'PATCH',
      body: JSON.stringify({ notes }),
    });
  },

  // Reject application (Engineer/Admin)
  reject: async (id: string, reason: string): Promise<OfficerApplication> => {
    return apiCall<OfficerApplication>(`/applications/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ rejectionReason: reason }),
    });
  },

  // Delete application (Admin only)
  delete: async (id: string): Promise<void> => {
    return apiCall<void>(`/applications/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== STATISTICS API ====================

export interface DashboardStats {
  totalUsers?: number;
  totalOfficers?: number;
  totalEngineers?: number;
  serviceRequests?: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
  certificates?: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  applications?: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

export const statsAPI = {
  // Get dashboard statistics (filtered by role)
  getDashboardStats: async (): Promise<DashboardStats> => {
    return apiCall<DashboardStats>('/stats/dashboard');
  },

  // Get user activity logs (Admin/Engineer)
  getActivityLogs: async (limit: number = 10): Promise<any[]> => {
    return apiCall<any[]>(`/stats/activity?limit=${limit}`);
  },
};

// Export all APIs
export default {
  user: userAPI,
  serviceRequest: serviceRequestAPI,
  certificate: certificateAPI,
  application: applicationAPI,
  stats: statsAPI,
};