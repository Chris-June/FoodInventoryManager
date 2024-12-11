import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { InventoryManagement } from './components/inventory/InventoryManagement';
import { PatronsPage } from './pages/PatronsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AlertBanner } from './components/alerts/AlertBanner';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useFoodItems } from './hooks/useSupabase';
import type { Alert } from './types';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'inventory' | 'patrons' | 'reports'>('inventory');
  const { items, loading } = useFoodItems();

  const [alerts, setAlerts] = React.useState<Alert[]>([
    {
      id: '1',
      type: 'expiring',
      message: 'Canned Soup is expiring in 5 days',
      itemId: '1',
      createdAt: new Date(),
    },
  ]);

  const handleDismissAlert = (id: string) => {
    setAlerts((current) => current.filter((alert) => alert.id !== id));
  };

  const renderPage = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    switch (currentPage) {
      case 'inventory':
        return <InventoryManagement items={items} />;
      case 'patrons':
        return <PatronsPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <InventoryManagement items={items} />;
    }
  };

  return (
    <AuthProvider>
      <ProtectedRoute>
    <div className="min-h-screen bg-gray-100">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
      <AlertBanner alerts={alerts} onDismiss={handleDismissAlert} />
    </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
