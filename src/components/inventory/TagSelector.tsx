import React from 'react';
import { Tag as TagIcon } from 'lucide-react';
import type { Tag, TagCategory } from '../../types';
import { mockTags } from '../../lib/mockData';

interface TagSelectorProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
}

export function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
  const [activeCategory, setActiveCategory] = React.useState<TagCategory>('dietary');

  const categories: { id: TagCategory; name: string }[] = [
    { id: 'dietary', name: 'Dietary' },
    { id: 'product', name: 'Product' },
    { id: 'ingredient', name: 'Ingredient' },
    { id: 'allergen', name: 'Allergen' },
  ];

  const tagsByCategory = React.useMemo(() => {
    return mockTags.filter(tag => tag.category === activeCategory);
  }, [activeCategory]);

  const toggleTag = (tag: Tag) => {
    const isSelected = selectedTags.some(t => t.id === tag.id);
    if (isSelected) {
      onTagsChange(selectedTags.filter(t => t.id !== tag.id));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tags
      </label>
      
      {/* Category Selector */}
      <div className="flex space-x-2 mb-3">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              activeCategory === category.id
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {tagsByCategory.map(tag => (
          <button
            key={tag.id}
            onClick={() => toggleTag(tag)}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              selectedTags.some(t => t.id === tag.id)
                ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-200'
                : 'bg-gray-50 text-gray-600 border-2 border-gray-100 hover:bg-gray-100'
            }`}
          >
            <TagIcon className="h-4 w-4 mr-2" />
            {tag.name}
          </button>
        ))}
      </div>

      {/* Selected Tags Summary */}
      {selectedTags.length > 0 && (
        <div className="mt-4">
          <div className="text-sm text-gray-500 mb-2">Selected Tags:</div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}