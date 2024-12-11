import React from 'react';
import { Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Patron } from '../../types';

interface PatronListProps {
  patrons: Patron[];
  onSelectPatron: (patron: Patron) => void;
  onAddPatron: () => void;
}

export function PatronList({ patrons, onSelectPatron, onAddPatron }: PatronListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-gray-900">Patrons</h2>
            <p className="mt-2 text-sm text-gray-700">
              A list of all registered patrons and their distribution history.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={onAddPatron}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Add patron
            </button>
          </div>
        </div>
        <div className="mt-6 flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {patrons.map((patron) => (
              <li
                key={patron.id}
                className="py-4 cursor-pointer hover:bg-gray-50"
                onClick={() => onSelectPatron(patron)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {patron.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Household size: {patron.householdSize}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {patron.dietaryRestrictions.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {patron.distributionHistory.length > 0 && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Last visit:{' '}
                        {format(
                          patron.distributionHistory[patron.distributionHistory.length - 1].date,
                          'MMM d, yyyy'
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}