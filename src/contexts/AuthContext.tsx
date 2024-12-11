import React, { createContext, useContext } from 'react';
import { mockUsers } from '../lib/mockAuth';
import { useAuth } from '../hooks/useAuth';
import type { AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { loading, error, user } = useAuth();
  const [state, setState] = React.useState({ user, loading, error });

  // Keep state in sync with useAuth
  React.useEffect(() => {
    setState(prev => ({ ...prev, user, loading, error }));
  }, [user, loading, error]);

  const signIn = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = mockUsers[email];
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    localStorage.setItem('mockUser', JSON.stringify(mockUser.user));
    setState(prev => ({ ...prev, user: mockUser.user }));
  };

  const signOut = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('mockUser');
    setState(prev => ({ ...prev, user: null }));
  };

  const resetPassword = async (email: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    if (!mockUsers[email]) {
      throw new Error('User not found');
    }
    // In mock mode, we just simulate the reset
    console.log('Password reset email would be sent to:', email);
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}