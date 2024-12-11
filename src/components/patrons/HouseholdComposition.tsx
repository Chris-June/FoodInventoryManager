import React from 'react';
import { Users, Baby } from 'lucide-react';

interface AgeGroup {
  id: string;
  range: string;
  count: number;
}

export interface HouseholdComposition {
  totalSize: number;
  hasChildren: boolean;
  childrenAgeGroups: AgeGroup[];
}

interface HouseholdCompositionProps {
  value: HouseholdComposition;
  onChange: (composition: HouseholdComposition) => void;
}

const defaultAgeGroups: AgeGroup[] = [
  { id: '0-2', range: '0-2 years', count: 0 },
  { id: '3-5', range: '3-5 years', count: 0 },
  { id: '6-12', range: '6-12 years', count: 0 },
  { id: '13-17', range: '13-17 years', count: 0 },
];

export function HouseholdComposition({ value, onChange }: HouseholdCompositionProps) {
  const handleChildrenToggle = (hasChildren: boolean) => {
    onChange({
      ...value,
      hasChildren,
      childrenAgeGroups: hasChildren ? defaultAgeGroups : [],
    });
  };

  const updateAgeGroup = (groupId: string, count: number) => {
    const updatedGroups = value.childrenAgeGroups.map(group =>
      group.id === groupId ? { ...group, count } : group
    );
    onChange({
      ...value,
      childrenAgeGroups: updatedGroups,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Household Size
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="number"
            required
            min="1"
            placeholder="Total number of people"
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={value.totalSize}
            onChange={e => onChange({ ...value, totalSize: parseInt(e.target.value) || 1 })}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2">
          <Baby className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Children in Household</span>
        </div>
        <div className="mt-2">
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                checked={!value.hasChildren}
                onChange={() => handleChildrenToggle(false)}
              />
              <span className="ml-2 text-sm text-gray-700">No</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                checked={value.hasChildren}
                onChange={() => handleChildrenToggle(true)}
              />
              <span className="ml-2 text-sm text-gray-700">Yes</span>
            </label>
          </div>
        </div>
      </div>

      {value.hasChildren && (
        <div className="pl-4 border-l-2 border-indigo-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Children's Age Groups
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {value.childrenAgeGroups.map(group => (
              <div key={group.id}>
                <label className="block text-sm text-gray-600">{group.range}</label>
                <input
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={group.count}
                  onChange={e => updateAgeGroup(group.id, parseInt(e.target.value) || 0)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}