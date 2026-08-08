// src/lib/auth/index.js
// ALL auth logic lives here - easy to swap with @jooblie/core

// Mock user data
const MOCK_USER = {
  id: 'user_123',
  email: 'john@example.com',
  full_name: 'John Doe',
  role: 'job_seeker',
  created_at: '2024-01-15T10:30:00Z',
};

// Mock company data for recruiter
const MOCK_COMPANY = {
  id: 'comp_001',
  name: 'TechCorp Inc.',
  verification_status: 'pending',
};

// Auth object with all methods
export const auth = {
  // Sign In
  signIn: async (email, password) => {
    console.log('Sign in attempt:', email);
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    
    // Mock successful login
    return {
      success: true,
      user: {
        ...MOCK_USER,
        email: email,
      },
      session: {
        access_token: 'mock-token-' + Date.now(),
        expires_at: Date.now() + 3600000,
      },
    };
  },

  // Sign Up
  signUp: async (data) => {
    console.log('Sign up attempt:', data);
    
    const { email, password, full_name, role, company_name } = data;
    
    if (!email || !password || !full_name) {
      throw new Error('All fields are required');
    }
    
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    
    if (role === 'recruiter' && !company_name) {
      throw new Error('Company name is required for recruiters');
    }
    
    // Mock successful signup
    return {
      success: true,
      user: {
        id: 'user_' + Date.now(),
        email: email,
        full_name: full_name,
        role: role || 'job_seeker',
        created_at: new Date().toISOString(),
      },
      company: role === 'recruiter' ? {
        ...MOCK_COMPANY,
        name: company_name,
      } : null,
      message: 'Please check your email to confirm your account.',
    };
  },

  // Sign Out
  signOut: async () => {
    console.log('Sign out');
    return {
      success: true,
      message: 'Signed out successfully',
    };
  },

  // Reset Password
  resetPassword: async (email) => {
    console.log('Reset password request:', email);
    
    if (!email) {
      throw new Error('Email is required');
    }
    
    // Always show same message for security (don't reveal if email exists)
    return {
      success: true,
      message: 'If this email exists, we have sent a reset link.',
    };
  },

  // Confirm Email
  confirmEmail: async (token) => {
    console.log('Confirm email token:', token);
    
    if (!token) {
      throw new Error('Invalid confirmation token');
    }
    
    return {
      success: true,
      message: 'Email confirmed successfully!',
    };
  },

  // Refresh Session
  refreshSession: async () => {
    return {
      success: true,
      session: {
        access_token: 'mock-token-refreshed-' + Date.now(),
        expires_at: Date.now() + 3600000,
      },
    };
  },

  // Get Current User
  getCurrentUser: async () => {
    return {
      success: true,
      user: MOCK_USER,
    };
  },

  // Update Password
  updatePassword: async (currentPassword, newPassword) => {
    console.log('Update password');
    
    if (!currentPassword || !newPassword) {
      throw new Error('All fields are required');
    }
    
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    
    return {
      success: true,
      message: 'Password updated successfully',
    };
  },
};

// Auth Context Provider
export const AuthProvider = ({ children }) => {
  // In real app, this would manage session state with context
  return children;
};

// Auth Hook
export const useAuth = () => {
  // In real app, this would return user, loading, etc.
  return {
    user: MOCK_USER,
    loading: false,
    isAuthenticated: true,
    role: 'job_seeker',
  };
};

// Protected Route Guard
export const ProtectedRoute = ({ children, requiredRole }) => {
  // In real app, this would check authentication and role
  const { isAuthenticated, role } = useAuth();
  
  if (!isAuthenticated) {
    return null; // Redirect to login in real app
  }
  
  if (requiredRole && role !== requiredRole) {
    return null; // Redirect to unauthorized page in real app
  }
  
  return children;
};

// Role Guard
export const useRequireAuth = () => {
  // In real app, this would redirect if not authenticated
  return true;
};

export const useRequireRole = (requiredRole) => {
  // In real app, this would check role and redirect if not authorized
  const { role } = useAuth();
  return role === requiredRole;
};