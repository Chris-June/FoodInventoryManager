export interface Tag {
  id: string;
  name: string;
  category: TagCategory;
}

export interface ItemTag {
  tagId: string;
  itemId: string;
}

export type TagCategory = 'dietary' | 'product' | 'ingredient' | 'allergen';

export interface FoodItem {
  id: string;
  name: string;
  subcategory: string;
  quantity: number;
  category: string;
  donationDate: Date;
  expirationDate: Date;
  tags: Tag[];
}

export interface Patron {
  id: string;
  name: string;
  household: {
    totalSize: number;
    hasChildren: boolean;
    childrenAgeGroups: {
      id: string;
      range: string;
      count: number;
    }[];
  };
  dietaryRestrictions: DietaryTag[];
  distributionHistory: Distribution[];
}

export interface Distribution {
  id: string;
  date: Date;
  items: {
    foodItemId: string;
    quantity: number;
  }[];
}

export interface Alert {
  id: string;
  type: 'low-stock' | 'expiring';
  message: string;
  itemId: string;
  createdAt: Date;
}