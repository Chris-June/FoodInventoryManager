import React from 'react';
import { PatronList } from '../components/patrons/PatronList';
import { PatronForm } from '../components/patrons/PatronForm';
import { InventoryMatching } from '../components/inventory/InventoryMatching';
import { usePatrons } from '../hooks/useSupabase';
import { useFoodItems } from '../hooks/useSupabase';
import type { Patron, DietaryTag } from '../types';

export function PatronsPage() {
  const { patrons, loading: patronsLoading } = usePatrons();
  const { items: foodItems, loading: itemsLoading } = useFoodItems();
  const [selectedPatron, setSelectedPatron] = React.useState<Patron | null>(null);
  const [showForm, setShowForm] = React.useState(false);

  const handleAddPatron = (data: {
    name: string;
    householdSize: number;
    dietaryRestrictions: DietaryTag[];
  }) => {
    // TODO: Implement with Supabase
    console.log('Adding patron:', data);
    setShowForm(false);
  };

  if (patronsLoading || itemsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Patron Management</h2>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <PatronForm
                onSubmit={handleAddPatron}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      <PatronList
        patrons={patrons}
        onSelectPatron={setSelectedPatron}
        onAddPatron={() => setShowForm(true)}
      />
      
      {selectedPatron && (
        <InventoryMatching
          patron={selectedPatron}
          availableItems={foodItems}
        />
      )}
    </div>
  );
}