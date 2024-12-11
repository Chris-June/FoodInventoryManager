import { useState, useEffect } from 'react';
import { mockUsers } from '../lib/mockAuth';
import type { User, AuthState } from '../types/auth';

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Simulate checking for stored session
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setState({
        user: JSON.parse(storedUser),
        loading: false,
        error: null,
      });
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  return state;
}