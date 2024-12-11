import React from 'react';
import { Users, Home, Phone, Mail, Calendar } from 'lucide-react';
import type { DietaryTag } from '../../types';
import { HouseholdComposition, type HouseholdComposition as HouseholdCompositionType } from './HouseholdComposition';

interface PatronFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    household: HouseholdCompositionType;
    visitFrequency: 'weekly' | 'biweekly' | 'monthly';
    dietaryRestrictions: DietaryTag[];
    notes: string;
  }) => void;
  onCancel: () => void;
}

export function PatronForm({ onSubmit, onCancel }: PatronFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    household: {
      totalSize: 1,
      hasChildren: false,
      childrenAgeGroups: [],
    },
    visitFrequency: 'biweekly' as const,
    dietaryRestrictions: [] as DietaryTag[],
    notes: '',
  });

  const dietaryOptions: DietaryTag[] = ['vegetarian', 'gluten-free', 'halal'];
  const visitFrequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      household: {
        totalSize: 1,
        hasChildren: false,
        childrenAgeGroups: [],
      },
      visitFrequency: 'biweekly',
      dietaryRestrictions: [],
      notes: '',
    });
  };

  const handleRestrictionToggle = (restriction: DietaryTag) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-2">
        <Users className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Patron Registration</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            placeholder="Full name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="patron@example.com"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="tel"
              placeholder="(555) 555-5555"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Street address"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.address}
              onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>
        </div>

        <div className="col-span-2">
          <HouseholdComposition
            value={formData.household}
            onChange={household => setFormData(prev => ({ ...prev, household }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Visit Frequency
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.visitFrequency}
              onChange={e => setFormData(prev => ({ ...prev, visitFrequency: e.target.value as 'weekly' | 'biweekly' | 'monthly' }))}
            >
              {visitFrequencyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-span-2">
  <label className="block text-sm font-medium text-gray-700">
    Dietary Restrictions
  </label>
  <div className="mt-2 flex flex-wrap gap-2">
    {dietaryOptions.map(restriction => (
      <button
        key={restriction}
        type="button"
        onClick={() => handleRestrictionToggle(restriction)}
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
          formData.dietaryRestrictions.includes(restriction)
            ? 'bg-indigo-100 text-indigo-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {restriction}
      </button>
    ))}
  </div>
</div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            rows={3}
            placeholder="Any additional information about the patron..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={formData.notes}
            onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          />
        </div>
      </div>

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
          Add Patron
        </button>
      </div>
    </form>
  );
}