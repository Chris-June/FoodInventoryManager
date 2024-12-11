import React from 'react';
import { InventoryReport } from '../components/reports/InventoryReport';
import { InventoryTrends } from '../components/reports/InventoryTrends';
import { DemographicInsights } from '../components/reports/DemographicInsights';
import { DistributionAnalytics } from '../components/reports/DistributionAnalytics';
import { SeasonalTrends } from '../components/reports/SeasonalTrends';
import { useFoodItems, usePatrons } from '../hooks/useSupabase';

export function ReportsPage() {
  const { items, loading } = useFoodItems();
  const { patrons, loading: patronsLoading } = usePatrons();

  if (loading || patronsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>

      <InventoryReport items={items} />

      <DistributionAnalytics
        distributions={patrons.flatMap(p => p.distributionHistory)}
        items={items}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryTrends items={items} />
        <DemographicInsights patrons={patrons} />
      </div>

      <SeasonalTrends
        distributions={patrons.flatMap(p => p.distributionHistory)}
        items={items}
      />
    </div>
  );
}