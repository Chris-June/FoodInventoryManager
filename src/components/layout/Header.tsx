import React from 'react';
import { Package2, LogOut } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';

interface HeaderProps {
  currentPage: 'inventory' | 'patrons' | 'reports';
  onNavigate: (page: 'inventory' | 'patrons' | 'reports') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { user, signOut } = useAuthContext();

  return (
    <header className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Package2 className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">FoodBank Manager</span>
          </div>
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('inventory')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'inventory'
                  ? 'bg-indigo-700'
                  : 'hover:bg-indigo-500'
              }`}
            >
              Inventory
            </button>
            <button
              onClick={() => onNavigate('patrons')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'patrons'
                  ? 'bg-indigo-700'
                  : 'hover:bg-indigo-500'
              }`}
            >
              Patrons
            </button>
            <button
              onClick={() => onNavigate('reports')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'reports'
                  ? 'bg-indigo-700'
                  : 'hover:bg-indigo-500'
              }`}
            >
              Reports ({user?.role})
            </button>
            <button
              onClick={signOut}
              className="ml-4 p-2 rounded-full hover:bg-indigo-500 transition-colors"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}