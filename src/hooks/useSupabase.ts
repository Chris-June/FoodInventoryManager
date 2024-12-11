import { useState, useEffect } from 'react';
import { mockFoodItems, mockPatrons } from '../lib/mockData';
import type { FoodItem, Patron, Distribution } from '../types';

export function useFoodItems() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setItems(mockFoodItems);
  }, []);

  return { items, loading, error };
}

export function usePatrons() {
  const [patrons, setPatrons] = useState<Patron[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setPatrons(mockPatrons);
  }, []);

  return { patrons, loading, error };
}