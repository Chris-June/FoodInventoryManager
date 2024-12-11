import React from 'react';
import { Users, PieChart } from 'lucide-react';
import type { Patron } from '../../types';

interface DemographicInsightsProps {
  patrons: Patron[];
}

export function DemographicInsights({ patrons }: DemographicInsightsProps) {
  const demographics = React.useMemo(() => {
    const totalPatrons = patrons.length;
    const householdsWithChildren = patrons.filter(p => p.household.hasChildren).length;
    
    const ageGroups = patrons.reduce((acc, patron) => {
      if (patron.household.hasChildren) {
        patron.household.childrenAgeGroups.forEach(group => {
          acc[group.range] = (acc[group.range] || 0) + group.count;
        });
      }
      return acc;
    }, {} as Record<string, number>);

    const dietaryNeeds = patrons.reduce((acc, patron) => {
      patron.dietaryRestrictions.forEach(restriction => {
        acc[restriction] = (acc[restriction] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return {
      totalPatrons,
      householdsWithChildren,
      ageGroups,
      dietaryNeeds,
    };
  }, [patrons]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Demographic Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Household Composition</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Households with Children</span>
                <span className="text-sm text-gray-900">
                  {((demographics.householdsWithChildren / demographics.totalPatrons) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                  <div
                    style={{
                      width: `${(demographics.householdsWithChildren / demographics.totalPatrons) * 100}%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-sm font-medium text-gray-700 mt-6 mb-4">Children Age Distribution</h4>
          <div className="space-y-4">
            {Object.entries(demographics.ageGroups).map(([range, count]) => (
              <div key={range}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{range}</span>
                  <span className="text-sm text-gray-900">{count} children</span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div
                      style={{
                        width: `${(count / Object.values(demographics.ageGroups).reduce((a, b) => a + b, 0)) * 100}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Dietary Needs</h4>
          <div className="space-y-4">
            {Object.entries(demographics.dietaryNeeds).map(([restriction, count]) => (
              <div key={restriction}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{restriction}</span>
                  <span className="text-sm text-gray-900">
                    {((count / demographics.totalPatrons) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div
                      style={{
                        width: `${(count / demographics.totalPatrons) * 100}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}