export interface User {
  id: string;
  email: string;
  role: 'admin' | 'volunteer' | 'viewer';
  created_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}