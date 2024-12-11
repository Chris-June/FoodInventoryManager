import React from 'react';
import { AlertTriangle, XCircle } from 'lucide-react';
import type { Alert } from '../../types';

interface AlertBannerProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export function AlertBanner({ alerts, onDismiss }: AlertBannerProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2 max-w-sm w-full">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg shadow-lg ${
            alert.type === 'low-stock' ? 'bg-amber-50' : 'bg-red-50'
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle
                className={`h-5 w-5 ${
                  alert.type === 'low-stock' ? 'text-amber-400' : 'text-red-400'
                }`}
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className={`text-sm font-medium ${
                alert.type === 'low-stock' ? 'text-amber-800' : 'text-red-800'
              }`}>
                {alert.message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="inline-flex text-gray-400 hover:text-gray-500"
                onClick={() => onDismiss(alert.id)}
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}