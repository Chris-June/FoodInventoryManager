import React from 'react';
import { TrendingUp, Package } from 'lucide-react';
import type { FoodItem } from '../../types';

interface InventoryTrendsProps {
  items: FoodItem[];
  timeframe?: 'week' | 'month' | 'year';
}

export function InventoryTrends({ items, timeframe = 'month' }: InventoryTrendsProps) {
  const categoryTrends = React.useMemo(() => {
    const trends = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(trends)
      .sort((a, b) => b[1] - a[1])
      .map(([category, total]) => ({
        category,
        total,
        percentage: (total / items.reduce((sum, item) => sum + item.quantity, 0)) * 100,
      }));
  }, [items]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Inventory Trends</h3>
      </div>

      <div className="space-y-6">
        {categoryTrends.map(({ category, total, percentage }) => (
          <div key={category}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">{category}</span>
              </div>
              <span className="text-sm text-gray-500">{total} items</span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div
                  style={{ width: `${percentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                />
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500 text-right">
              {percentage.toFixed(1)}% of total inventory
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}