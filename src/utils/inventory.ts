import type { FoodItem, Patron } from '../types';
import type { Tag } from '../types';

export function filterInventory(
  items: FoodItem[],
  searchTerm: string,
  selectedTags: Tag[],
  selectedCategory: string
): FoodItem[] {
  return items.filter((item) => {
    const matchesSearch = searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => item.tags.some(t => t.id === tag.id));

    const matchesCategory =
      !selectedCategory || selectedCategory === 'All Categories'
        ? true
        : item.category === selectedCategory;

    return matchesSearch && matchesTags && matchesCategory;
  });
}

export function getExpiringItems(items: FoodItem[], daysThreshold = 7): FoodItem[] {
  const now = new Date();
  const threshold = daysThreshold * 24 * 60 * 60 * 1000; // Convert days to milliseconds

  return items.filter(item => {
    const timeUntilExpiration = new Date(item.expirationDate).getTime() - now.getTime();
    return timeUntilExpiration > 0 && timeUntilExpiration < threshold;
  });
}

export function getLowStockItems(items: FoodItem[], threshold = 10): FoodItem[] {
  return items.filter(item => item.quantity < threshold);
}

export function findMatchingItems(items: FoodItem[], patron: Patron): FoodItem[] {
  return items.filter(item => {
    // Check dietary restrictions
    const meetsRestrictions = patron.dietaryRestrictions.every(
      restriction => item.tags.some(tag => tag.id === restriction)
    );

    // Check availability
    const isAvailable = item.quantity > 0;

    // Check expiration
    const isNotExpired = new Date(item.expirationDate) > new Date();

    return meetsRestrictions && isAvailable && isNotExpired;
  });
}

export function calculateRecommendedQuantity(
  item: FoodItem,
  householdSize: number
): number {
  // Base quantity on household size and current stock
  const baseQuantity = Math.min(
    Math.ceil(householdSize / 2), // 1 item per 2 people
    Math.floor(item.quantity * 0.2) // Don't give more than 20% of stock to one patron
  );

  return Math.max(1, baseQuantity); // At least 1 item
}