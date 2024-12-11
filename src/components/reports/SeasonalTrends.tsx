import React from 'react';
import { Sun, Cloud, Leaf, Snowflake } from 'lucide-react';
import type { Distribution, FoodItem } from '../../types';

interface SeasonalTrendsProps {
  distributions: Distribution[];
  items: FoodItem[];
}

export function SeasonalTrends({ distributions, items }: SeasonalTrendsProps) {
  const seasonalData = React.useMemo(() => {
    const getSeasonForDate = (date: Date) => {
      const month = date.getMonth();
      if (month >= 2 && month <= 4) return 'spring';
      if (month >= 5 && month <= 7) return 'summer';
      if (month >= 8 && month <= 10) return 'fall';
      return 'winter';
    };

    const seasonalDistributions = distributions.reduce((acc, dist) => {
      const season = getSeasonForDate(dist.date);
      acc[season] = acc[season] || { total: 0, items: {} };
      acc[season].total++;
      
      dist.items.forEach(({ foodItemId, quantity }) => {
        acc[season].items[foodItemId] = (acc[season].items[foodItemId] || 0) + quantity;
      });
      
      return acc;
    }, {} as Record<string, { total: number; items: Record<string, number> }>);

    return Object.entries(seasonalDistributions).map(([season, data]) => ({
      season,
      total: data.total,
      topItems: Object.entries(data.items)
        .map(([id, quantity]) => ({
          name: items.find(item => item.id === id)?.name || 'Unknown',
          quantity,
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 3),
    }));
  }, [distributions, items]);

  const SeasonIcon = ({ season }: { season: string }) => {
    switch (season) {
      case 'spring':
        return <Leaf className="h-5 w-5 text-green-500" />;
      case 'summer':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'fall':
        return <Cloud className="h-5 w-5 text-orange-500" />;
      case 'winter':
        return <Snowflake className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Seasonal Distribution Patterns</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {seasonalData.map(({ season, total, topItems }) => (
          <div
            key={season}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-2 mb-4">
              <SeasonIcon season={season} />
              <h4 className="text-sm font-medium text-gray-900 capitalize">{season}</h4>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Total Distributions: <span className="font-medium text-gray-900">{total}</span>
              </p>
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Most Requested Items:</p>
                <ul className="space-y-1">
                  {topItems.map(({ name, quantity }) => (
                    <li key={name} className="text-sm">
                      <span className="text-gray-900">{name}</span>
                      <span className="text-gray-500 text-xs ml-1">({quantity})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}