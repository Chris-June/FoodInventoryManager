import type { User } from '../types/auth';

// Mock users with different roles
export const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@foodbank.org': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@foodbank.org',
      role: 'admin',
      created_at: '2024-01-01T00:00:00.000Z',
    },
  },
  'volunteer@foodbank.org': {
    password: 'volunteer123',
    user: {
      id: '2',
      email: 'volunteer@foodbank.org',
      role: 'volunteer',
      created_at: '2024-01-02T00:00:00.000Z',
    },
  },
  'viewer@foodbank.org': {
    password: 'viewer123',
    user: {
      id: '3',
      email: 'viewer@foodbank.org',
      role: 'viewer',
      created_at: '2024-01-03T00:00:00.000Z',
    },
  },
};