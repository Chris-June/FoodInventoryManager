import React from 'react';
import { ShoppingBag } from 'lucide-react';
import type { FoodItem } from '../../types';
import { calculateRecommendedQuantity } from '../../utils/inventory';

interface DistributionFormProps {
  items: FoodItem[];
  patronHouseholdSize: number;
  onSubmit: (selectedItems: { itemId: string; quantity: number }[]) => void;
}

export function DistributionForm({
  items,
  patronHouseholdSize,
  onSubmit,
}: DistributionFormProps) {
  const [selectedItems, setSelectedItems] = React.useState<
    { itemId: string; quantity: number }[]
  >([]);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item.itemId === itemId);
      if (existing) {
        return prev.map(item =>
          item.itemId === itemId ? { ...item, quantity } : item
        );
      }
      return [...prev, { itemId, quantity }];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedItems.filter(item => item.quantity > 0));
    setSelectedItems([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-2">
        <ShoppingBag className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Create Distribution</h3>
      </div>

      <div className="space-y-4">
        {items.map(item => {
          const recommended = calculateRecommendedQuantity(item, patronHouseholdSize);
          const selected = selectedItems.find(i => i.itemId === item.id)?.quantity || 0;

          return (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Available: {item.quantity} • Recommended: {recommended}
                </p>
              </div>
              <input
                type="number"
                min="0"
                max={item.quantity}
                className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selected}
                onChange={e => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Distribution
        </button>
      </div>
    </form>
  );
}