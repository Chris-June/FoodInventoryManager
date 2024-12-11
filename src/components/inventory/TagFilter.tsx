import React from 'react';
import { Tag } from 'lucide-react';
import type { Tag as TagType, TagCategory } from '../../types';
import { mockTags } from '../../lib/mockData';

interface TagFilterProps {
  selectedTags: TagType[];
  onTagsChange: (tags: TagType[]) => void;
  selectedCategory: TagCategory;
  onCategoryChange: (category: TagCategory) => void;
}

const categories: { id: TagCategory; name: string }[] = [
  { id: 'dietary', name: 'Dietary' },
  { id: 'product', name: 'Product' },
  { id: 'ingredient', name: 'Ingredient' },
  { id: 'allergen', name: 'Allergen' },
];

export function TagFilter({
  selectedTags,
  onTagsChange,
  selectedCategory,
  onCategoryChange,
}: TagFilterProps) {
  const toggleTag = (tag: TagType) => {
    if (selectedTags.some(t => t.id === tag.id)) {
      onTagsChange(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const availableTags = React.useMemo(
    () => mockTags.filter(tag => tag.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tag className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filter by Tags</span>
        </div>
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                selectedCategory === category.id
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => toggleTag(tag)}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
              selectedTags.some(t => t.id === tag.id)
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          {selectedTags.map(tag => (
            <span
              key={tag.id}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
              <button
                onClick={() => toggleTag(tag)}
                className="ml-1.5 hover:text-gray-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}