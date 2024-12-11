import React from 'react';
import { BarChart, Package, AlertTriangle, Tag } from 'lucide-react';
import type { FoodItem } from '../../types';
import { getLowStockItems, getExpiringItems } from '../../utils/inventory';

interface InventoryReportProps {
  items: FoodItem[];
}

export function InventoryReport({ items }: InventoryReportProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = getLowStockItems(items);
  const expiringItems = getExpiringItems(items);
  const totalCategories = new Set(items.map(item => item.category)).size;
  const totalTags = new Set(items.flatMap(item => item.tags.map(t => t.id))).size;

  const categoryTotals = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const subcategoryTotals = items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || {};
    acc[item.category][item.subcategory] = (acc[item.category][item.subcategory] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, Record<string, number>>);
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Inventory</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalItems} items</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Low Stock Items</dt>
                  <dd className="text-lg font-medium text-gray-900">{lowStockItems.length} items</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Categories</dt>
                  <dd className="text-lg font-medium text-gray-900">{Object.keys(categoryTotals).length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Tag className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Unique Tags</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalTags}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Inventory by Category</h3>
          <div className="mt-4 space-y-8">
            {Object.entries(categoryTotals).map(([category, total]) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">{category}</div>
                  <div className="text-sm text-gray-500">{total} items</div>
                </div>

                <div className="mt-1">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                      <div
                        style={{
                          width: `${(total / totalItems) * 100}%`,
                        }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          category === 'Produce'
                            ? 'bg-green-500'
                            : category === 'Protein'
                            ? 'bg-red-500'
                            : category === 'Grains'
                            ? 'bg-yellow-500'
                            : 'bg-indigo-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {((total / totalItems) * 100).toFixed(1)}% of total inventory
                </div>

                {/* Subcategory breakdown */}
                <div className="pl-4 border-l-2 border-gray-200 mt-2 space-y-2">
                  {Object.entries(subcategoryTotals[category] || {}).map(([subcategory, count]) => (
                    <div key={subcategory}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{subcategory}</span>
                        <span className="text-sm text-gray-500">{count} items</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-100">
                          <div
                            style={{ width: `${(count / total) * 100}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Alerts */}
      {(lowStockItems.length > 0 || expiringItems.length > 0) && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Inventory Alerts</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {lowStockItems.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-amber-800">Low Stock Items</h4>
                  {lowStockItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-amber-800">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        {item.name} is running low ({item.quantity} remaining)
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {expiringItems.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-red-800">Expiring Items</h4>
                  {expiringItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-red-800">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                        {item.name} expires on{' '}
                        {new Date(item.expirationDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}