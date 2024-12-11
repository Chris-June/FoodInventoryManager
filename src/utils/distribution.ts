import type { FoodItem, Distribution, Patron } from '../types';

export function validateDistribution(
  items: { itemId: string; quantity: number }[],
  availableItems: FoodItem[]
): boolean {
  return items.every(({ itemId, quantity }) => {
    const item = availableItems.find(i => i.id === itemId);
    return item && quantity <= item.quantity && quantity > 0;
  });
}

export function calculateTotalItems(distributions: Distribution[]): number {
  return distributions.reduce(
    (total, dist) =>
      total + dist.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );
}

export function getPatronVisitFrequency(
  patron: Patron,
  days: number = 30
): number {
  const now = new Date();
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return patron.distributionHistory.filter(dist => dist.date >= cutoff).length;
}

export function getMostDistributedItems(
  distributions: Distribution[],
  items: FoodItem[]
): { name: string; totalQuantity: number }[] {
  const itemQuantities = distributions.reduce((acc, dist) => {
    dist.items.forEach(({ foodItemId, quantity }) => {
      acc[foodItemId] = (acc[foodItemId] || 0) + quantity;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(itemQuantities)
    .map(([itemId, quantity]) => ({
      name: items.find(item => item.id === itemId)?.name || 'Unknown Item',
      totalQuantity: quantity,
    }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity);
}