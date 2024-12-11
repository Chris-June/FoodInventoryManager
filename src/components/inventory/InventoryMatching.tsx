import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import type { FoodItem, Patron } from '../../types';
import { calculateRecommendedQuantity } from '../../utils/inventory';

interface InventoryMatchingProps {
  patron: Patron;
  availableItems: FoodItem[];
}

export function InventoryMatching({ patron, availableItems }: InventoryMatchingProps) {
  const matchedItems = React.useMemo(() => {
    return availableItems.filter(item => {
      // Check if item has required dietary tags
      const meetsRestrictions = patron.dietaryRestrictions.every(restriction =>
        item.tags.some(tag => tag.name.toLowerCase() === restriction.toLowerCase())
      );

      // Check availability and expiration
      const isAvailable = item.quantity > 0;
      const isNotExpired = new Date(item.expirationDate) > new Date();

      return meetsRestrictions && isAvailable && isNotExpired;
    });
  }, [availableItems, patron.dietaryRestrictions]);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">
          Recommended Items for {patron.name}
        </h3>
        <div className="mt-4 divide-y divide-gray-200">
          {matchedItems.map(item => (
            <div key={item.id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {patron.dietaryRestrictions.every(restriction =>
                    item.tags.some(tag => tag.name.toLowerCase() === restriction.toLowerCase())
                  ) ? (
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Available: {item.quantity} • Recommended: {
                        calculateRecommendedQuantity(item, patron.householdSize)
                      } • Expires: {
                        new Date(item.expirationDate).toLocaleDateString()
                      }
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add to Distribution
                </button>
              </div>
              <div className="mt-1 flex gap-1">
                {item.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}