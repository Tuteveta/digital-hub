// src/hooks/useData.ts
// Custom hooks for data fetching and real-time updates

import { useState, useEffect, useCallback } from 'react';
import api, {
  UserProfile,
  ServiceRequest,
  Certificate,
  OfficerApplication,
  DashboardStats,
} from '../services/api';

// ==================== USER PROFILE HOOK ====================

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.user.getCurrentProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedProfile = await api.user.updateProfile(updates);
      setProfile(updatedProfile);
      
      // Force a fresh fetch to ensure we have latest data from backend
      await fetchProfile();
      
      return updatedProfile;
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      console.error('Error updating profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile,
  };
}

// ==================== SERVICE REQUESTS HOOK ====================

export function useServiceRequests() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.serviceRequest.getAll();
      setRequests(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch service requests');
      console.error('Error fetching service requests:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRequest = useCallback(async (data: Partial<ServiceRequest>) => {
    try {
      const newRequest = await api.serviceRequest.create(data);
      setRequests(prev => [newRequest, ...prev]);
      return newRequest;
    } catch (err: any) {
      console.error('Error creating service request:', err);
      throw err;
    }
  }, []);

  const updateRequest = useCallback(async (id: string, updates: Partial<ServiceRequest>) => {
    try {
      const updated = await api.serviceRequest.update(id, updates);
      setRequests(prev => prev.map(req => req.id === id ? updated : req));
      
      // Force refetch to get latest data
      await fetchRequests();
      
      return updated;
    } catch (err: any) {
      console.error('Error updating service request:', err);
      throw err;
    }
  }, [fetchRequests]);

  const updateStatus = useCallback(async (
    id: string,
    status: ServiceRequest['status'],
    notes?: string
  ) => {
    try {
      const updated = await api.serviceRequest.updateStatus(id, status, notes);
      setRequests(prev => prev.map(req => req.id === id ? updated : req));
      
      // Force refetch to ensure all dashboards see the update
      await fetchRequests();
      
      return updated;
    } catch (err: any) {
      console.error('Error updating request status:', err);
      throw err;
    }
  }, [fetchRequests]);

  const deleteRequest = useCallback(async (id: string) => {
    try {
      await api.serviceRequest.delete(id);
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (err: any) {
      console.error('Error deleting service request:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchRequests();
    
    // Poll for updates every 30 seconds to keep data fresh
    const interval = setInterval(fetchRequests, 30000);
    
    return () => clearInterval(interval);
  }, [fetchRequests]);

  return {
    requests,
    loading,
    error,
    createRequest,
    updateRequest,
    updateStatus,
    deleteRequest,
    refetch: fetchRequests,
  };
}

// ==================== MY SERVICE REQUESTS HOOK (For Officers) ====================

export function useMyServiceRequests() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.serviceRequest.getMyRequests();
      setRequests(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch your service requests');
      console.error('Error fetching my service requests:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRequest = useCallback(async (data: Partial<ServiceRequest>) => {
    try {
      const newRequest = await api.serviceRequest.create(data);
      setRequests(prev => [newRequest, ...prev]);
      return newRequest;
    } catch (err: any) {
      console.error('Error creating service request:', err);
      throw err;
    }
  }, []);

  const updateRequest = useCallback(async (id: string, updates: Partial<ServiceRequest>) => {
    try {
      const updated = await api.serviceRequest.update(id, updates);
      setRequests(prev => prev.map(req => req.id === id ? updated : req));
      
      // Force refetch
      await fetchMyRequests();
      
      return updated;
    } catch (err: any) {
      console.error('Error updating service request:', err);
      throw err;
    }
  }, [fetchMyRequests]);

  const deleteRequest = useCallback(async (id: string) => {
    try {
      await api.serviceRequest.delete(id);
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (err: any) {
      console.error('Error deleting service request:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchMyRequests();
    
    // Poll for updates every 15 seconds for officer's own requests
    const interval = setInterval(fetchMyRequests, 15000);
    
    return () => clearInterval(interval);
  }, [fetchMyRequests]);

  return {
    requests,
    loading,
    error,
    createRequest,
    updateRequest,
    deleteRequest,
    refetch: fetchMyRequests,
  };
}

// ==================== CERTIFICATES HOOK ====================

export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.certificate.getAll();
      setCertificates(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch certificates');
      console.error('Error fetching certificates:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyCertificate = useCallback(async (data: Partial<Certificate>) => {
    try {
      const newCert = await api.certificate.apply(data);
      setCertificates(prev => [newCert, ...prev]);
      return newCert;
    } catch (err: any) {
      console.error('Error applying for certificate:', err);
      throw err;
    }
  }, []);

  const approve = useCallback(async (id: string, notes?: string) => {
    try {
      const updated = await api.certificate.approve(id, notes);
      setCertificates(prev => prev.map(cert => cert.id === id ? updated : cert));
      
      // Force refetch
      await fetchCertificates();
      
      return updated;
    } catch (err: any) {
      console.error('Error approving certificate:', err);
      throw err;
    }
  }, [fetchCertificates]);

  const reject = useCallback(async (id: string, reason: string) => {
    try {
      const updated = await api.certificate.reject(id, reason);
      setCertificates(prev => prev.map(cert => cert.id === id ? updated : cert));
      
      // Force refetch
      await fetchCertificates();
      
      return updated;
    } catch (err: any) {
      console.error('Error rejecting certificate:', err);
      throw err;
    }
  }, [fetchCertificates]);

  useEffect(() => {
    fetchCertificates();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchCertificates, 30000);
    
    return () => clearInterval(interval);
  }, [fetchCertificates]);

  return {
    certificates,
    loading,
    error,
    applyCertificate,
    approve,
    reject,
    refetch: fetchCertificates,
  };
}

// ==================== MY CERTIFICATES HOOK (For Officers) ====================

export function useMyCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyCertificates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.certificate.getMyCertificates();
      setCertificates(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch your certificates');
      console.error('Error fetching my certificates:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyCertificate = useCallback(async (data: Partial<Certificate>) => {
    try {
      const newCert = await api.certificate.apply(data);
      setCertificates(prev => [newCert, ...prev]);
      return newCert;
    } catch (err: any) {
      console.error('Error applying for certificate:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchMyCertificates();
    
    // Poll for updates every 15 seconds
    const interval = setInterval(fetchMyCertificates, 15000);
    
    return () => clearInterval(interval);
  }, [fetchMyCertificates]);

  return {
    certificates,
    loading,
    error,
    applyCertificate,
    refetch: fetchMyCertificates,
  };
}

// ==================== APPLICATIONS HOOK (For Engineers/Admins) ====================

export function useApplications() {
  const [applications, setApplications] = useState<OfficerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.application.getAll();
      setApplications(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const approve = useCallback(async (id: string, notes?: string) => {
    try {
      const updated = await api.application.approve(id, notes);
      setApplications(prev => prev.map(app => app.id === id ? updated : app));
      
      // Force refetch
      await fetchApplications();
      
      return updated;
    } catch (err: any) {
      console.error('Error approving application:', err);
      throw err;
    }
  }, [fetchApplications]);

  const reject = useCallback(async (id: string, reason: string) => {
    try {
      const updated = await api.application.reject(id, reason);
      setApplications(prev => prev.map(app => app.id === id ? updated : app));
      
      // Force refetch
      await fetchApplications();
      
      return updated;
    } catch (err: any) {
      console.error('Error rejecting application:', err);
      throw err;
    }
  }, [fetchApplications]);

  useEffect(() => {
    fetchApplications();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchApplications, 30000);
    
    return () => clearInterval(interval);
  }, [fetchApplications]);

  return {
    applications,
    loading,
    error,
    approve,
    reject,
    refetch: fetchApplications,
  };
}

// ==================== DASHBOARD STATS HOOK ====================

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.stats.getDashboardStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard stats');
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    
    // Poll for updates every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    
    return () => clearInterval(interval);
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}