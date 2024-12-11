import React from 'react';
import { AlertCircle, Package } from 'lucide-react';
import type { FoodItem } from '../../types';

interface InventoryListProps {
  items: FoodItem[];
  onEdit?: (item: FoodItem) => void;
  onDelete?: (id: string) => void;
}

export function InventoryList({ items, onEdit, onDelete }: InventoryListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-gray-900">Inventory Items</h2>
            <p className="mt-2 text-sm text-gray-700">
              A list of all food items currently in stock.
            </p>
          </div>
        </div>
        <div className="mt-6 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Subcategory
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Quantity
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Expiration
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Tags
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => {
                    const isExpiringSoon = new Date(item.expirationDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;
                    return (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            <Package className="h-5 w-5 text-gray-400 mr-2" />
                            {item.name}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.subcategory}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.category}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            {isExpiringSoon && (
                              <AlertCircle className="h-5 w-5 text-amber-500 mr-1" />
                            )}
                            {new Date(item.expirationDate).toLocaleDateString()}
                          </div>
                        </td>

                        
                       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
  <div className="flex gap-1">
    {item.tags.map((tag) => (
      <span
        key={tag.id}
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
          tag.category === 'allergen'
            ? 'bg-red-100 text-red-800'
            : tag.category === 'dietary'
            ? 'bg-green-100 text-green-800'
            : tag.category === 'product'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800'
        }`}
      >
        {tag.name}
      </span>
    ))}
  </div>
</td>
                      
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => onEdit?.(item)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete?.(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}