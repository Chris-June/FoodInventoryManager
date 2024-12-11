import React from 'react';
import { BarChart2, Calendar, TrendingUp } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import type { Distribution, FoodItem } from '../../types';

interface DistributionAnalyticsProps {
  distributions: Distribution[];
  items: FoodItem[];
}

export function DistributionAnalytics({ distributions, items }: DistributionAnalyticsProps) {
  const monthlyStats = React.useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    
    const monthlyDist = distributions.filter(
      dist => dist.date >= monthStart && dist.date <= monthEnd
    );

    const dailyDistribution = eachDayOfInterval({ start: monthStart, end: monthEnd })
      .map(date => ({
        date,
        count: distributions.filter(
          dist => format(dist.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        ).length,
      }));

    const itemDistribution = monthlyDist.reduce((acc, dist) => {
      dist.items.forEach(({ foodItemId, quantity }) => {
        acc[foodItemId] = (acc[foodItemId] || 0) + quantity;
      });
      return acc;
    }, {} as Record<string, number>);

    const topItems = Object.entries(itemDistribution)
      .map(([id, quantity]) => ({
        name: items.find(item => item.id === id)?.name || 'Unknown',
        quantity,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return {
      totalDistributions: monthlyDist.length,
      dailyDistribution,
      topItems,
    };
  }, [distributions, items]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart2 className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Distribution Analytics</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">
            Daily Distribution Volume
          </h4>
          <div className="h-48 flex items-end space-x-1">
            {monthlyStats.dailyDistribution.map(({ date, count }) => (
              <div
                key={format(date, 'yyyy-MM-dd')}
                className="flex-1 bg-indigo-100 hover:bg-indigo-200 transition-colors relative group"
                style={{ height: `${(count / Math.max(...monthlyStats.dailyDistribution.map(d => d.count))) * 100}%` }}
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -rotate-90 text-xs text-gray-500 whitespace-nowrap origin-bottom-left">
                  {format(date, 'MMM d')}
                </div>
                <div className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1">
                  {count} distributions
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">
            Most Distributed Items
          </h4>
          <div className="space-y-4">
            {monthlyStats.topItems.map(({ name, quantity }) => (
              <div key={name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{name}</span>
                  <span className="text-sm text-gray-900">{quantity} units</span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div
                      style={{
                        width: `${(quantity / monthlyStats.topItems[0].quantity) * 100}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
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