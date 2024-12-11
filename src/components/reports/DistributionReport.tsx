import React from 'react';
import { BarChart, Users, Calendar } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import type { Distribution, Patron } from '../../types';

interface DistributionReportProps {
  distributions: Distribution[];
  patrons: Patron[];
}

export function DistributionReport({ distributions, patrons }: DistributionReportProps) {
  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const monthlyDistributions = distributions.filter(
    dist => dist.date >= monthStart && dist.date <= monthEnd
  );

  const dailyDistributions = eachDayOfInterval({ start: monthStart, end: monthEnd }).map(
    date => ({
      date,
      count: distributions.filter(
        dist => format(dist.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      ).length,
    })
  );

  const patronVisits = patrons.map(patron => ({
    name: patron.name,
    visits: distributions.filter(dist =>
      patron.distributionHistory.some(h => h.id === dist.id)
    ).length,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-gray-400" />
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Monthly Distributions
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {monthlyDistributions.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-gray-400" />
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Patrons
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {patronVisits.filter(p => p.visits > 0).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Distribution Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Daily Distributions
        </h3>
        <div className="h-64">
          <div className="flex h-full items-end space-x-2">
            {dailyDistributions.map(({ date, count }) => (
              <div
                key={format(date, 'yyyy-MM-dd')}
                className="flex-1 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                style={{ height: `${(count / Math.max(...dailyDistributions.map(d => d.count))) * 100}%` }}
              >
                <div className="transform -rotate-90 translate-y-6 text-xs text-gray-500">
                  {format(date, 'MMM d')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patron Visit History */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Patron Visit History
        </h3>
        <div className="space-y-4">
          {patronVisits.map(({ name, visits }) => (
            <div key={name}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{name}</span>
                <span className="text-sm text-gray-500">{visits} visits</span>
              </div>
              <div className="mt-1">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                    <div
                      style={{
                        width: `${(visits / Math.max(...patronVisits.map(p => p.visits))) * 100}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}