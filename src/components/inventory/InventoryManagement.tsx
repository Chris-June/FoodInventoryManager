import React from 'react';
import { Plus, Search, Tag } from 'lucide-react';
import { InventoryForm } from './InventoryForm';
import { InventoryList } from './InventoryList';
import { InventorySearch } from './InventorySearch';
import { TagFilter } from './TagFilter';
import type { FoodItem, TagCategory } from '../../types';
import type { Tag as TagType} from '../../types';
import { filterInventory } from '../../utils/inventory';

interface InventoryManagementProps {
  items: FoodItem[];
}

export function InventoryManagement({ items }: InventoryManagementProps) {
  const [showForm, setShowForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const [selectedTagCategory, setSelectedTagCategory] = React.useState<TagCategory>('dietary');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [editingItem, setEditingItem] = React.useState<FoodItem | null>(null);

  const filteredItems = React.useMemo(
    () => filterInventory(items, searchTerm, selectedTags, selectedCategory),
    [items, searchTerm, selectedTags, selectedCategory]
  );

  const handleAddItem = (data: Omit<FoodItem, 'id' | 'donationDate'>) => {
    // TODO: Implement with Supabase
    console.log('Adding item:', data);
    setShowForm(false);
  };

  const handleEditItem = (item: FoodItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = (itemId: string) => {
    // TODO: Implement with Supabase
    console.log('Deleting item:', itemId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <InventorySearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <TagFilter
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            selectedCategory={selectedTagCategory}
            onCategoryChange={setSelectedTagCategory}
          />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <InventoryForm
                initialData={editingItem}
                onSubmit={(data) => {
                  if (editingItem) {
                    // TODO: Implement edit with Supabase
                    console.log('Editing item:', { ...editingItem, ...data });
                  } else {
                    handleAddItem(data);
                  }
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      <InventoryList
        items={filteredItems}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}