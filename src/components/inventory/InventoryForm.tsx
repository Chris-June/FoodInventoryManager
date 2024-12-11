import React from 'react';
import { Package } from 'lucide-react';
import type { Tag, FoodItem } from '../../types';
import { foodCategories } from '../../lib/mockData';
import { TagSelector } from './TagSelector';

interface InventoryFormProps {
  initialData?: FoodItem | null;
  onSubmit: (data: {
    name: string;
    quantity: number;
    category: string;
    expirationDate: string;
    tags: Tag[];
  }) => void;
  onCancel: () => void;
}

export function InventoryForm({ initialData, onSubmit, onCancel }: InventoryFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    quantity: initialData?.quantity || 0,
    subcategory: initialData?.subcategory || '',
    category: initialData?.category || 'Canned Goods',
    expirationDate: initialData?.expirationDate.toISOString().split('T')[0] || '',
    tags: initialData?.tags || [],
  });

  const categories = Object.keys(foodCategories);
  const subcategories = foodCategories[formData.category]?.subcategories || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      quantity: 0,
      subcategory: '',
      category: 'Canned Goods',
      expirationDate: '',
      tags: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-2">
        <Package className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">
          {initialData ? 'Edit Item' : 'Add New Item'}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.quantity}
            onChange={e => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.category}
            onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subcategory</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.subcategory}
            onChange={e => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
          >
            <option value="">Select a subcategory</option>
            {subcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiration Date
          </label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.expirationDate}
            onChange={e => setFormData(prev => ({ ...prev, expirationDate: e.target.value }))}
          />
        </div>
      </div>

      <TagSelector
        selectedTags={formData.tags}
        onTagsChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
      />

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Save Changes' : 'Add Item'}
        </button>
      </div>
    </form>
  );
}