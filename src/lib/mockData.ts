import type { FoodItem, Patron, Tag } from '../types';

export const mockTags: Tag[] = [
  // Dietary Tags
  { id: 'vegetarian', name: 'Vegetarian', category: 'dietary' },
  { id: 'vegan', name: 'Vegan', category: 'dietary' },
  { id: 'gluten-free', name: 'Gluten Free', category: 'dietary' },
  { id: 'halal', name: 'Halal', category: 'dietary' },
  { id: 'kosher', name: 'Kosher', category: 'dietary' },
  
  // Product Tags
  { id: 'organic', name: 'Organic', category: 'product' },
  { id: 'local', name: 'Locally Sourced', category: 'product' },
  { id: 'fair-trade', name: 'Fair Trade', category: 'product' },
  
  // Ingredient Tags
  { id: 'whole-grain', name: 'Whole Grain', category: 'ingredient' },
  { id: 'high-protein', name: 'High Protein', category: 'ingredient' },
  { id: 'low-sodium', name: 'Low Sodium', category: 'ingredient' },
  
  // Allergen Tags
  { id: 'contains-nuts', name: 'Contains Nuts', category: 'allergen' },
  { id: 'dairy-free', name: 'Dairy Free', category: 'allergen' },
  { id: 'egg-free', name: 'Egg Free', category: 'allergen' },
];
export const foodCategories = {
  'Vegetables and Fruits': {
    name: 'Vegetables and Fruits',
    subcategories: [
      // Fresh Vegetables
      'Leafy Greens',
      'Root Vegetables',
      'Cruciferous Vegetables',
      'Squash & Gourds',
      'Allium Vegetables',
      'Fresh Herbs',
      // Fresh Fruits
      'Citrus Fruits',
      'Berries',
      'Tree Fruits',
      'Tropical Fruits',
      'Melons',
      // Preserved
      'Canned Vegetables',
      'Canned Fruits',
      'Dried Fruits',
      'Frozen Vegetables',
      'Frozen Fruits'
    ]
  },
  'Whole Grains': {
    name: 'Whole Grains',
    subcategories: [
      'Brown Rice',
      'Wild Rice',
      'Quinoa',
      'Oats & Oatmeal',
      'Barley',
      'Whole Wheat Bread',
      'Whole Grain Pasta',
      'Ancient Grains',
      'Whole Grain Cereals',
      'Corn Products'
    ]
  },
  'Protein Foods': {
    name: 'Protein Foods',
    subcategories: [
      // Plant-based
      'Dried Beans & Lentils',
      'Canned Beans',
      'Tofu & Tempeh',
      'Nuts & Seeds',
      'Nut & Seed Butters',
      // Animal-based
      'Canned Fish',
      'Canned Meat',
      'Eggs',
      'Frozen Meat',
      'Frozen Fish'
    ]
  },
  'Dairy': {
    name: 'Dairy',
    subcategories: [
      'Milk',
      'Plant-based Milk',
      'Cheese',
      'Yogurt',
      'Cottage Cheese',
      'Butter & Spreads',
      'Shelf-stable Milk',
      'Powdered Milk'
    ]
  },
  'Pantry Staples': {
    name: 'Pantry Staples',
    subcategories: [
      'Cooking Oils',
      'Vinegars',
      'Condiments',
      'Herbs & Spices',
      'Baking Supplies',
      'Broths & Stocks',
      'Soup Mixes',
      'Salt & Seasonings'
    ]
  },
  'Beverages & Drinks': {
    name: 'Beverages & Drinks',
    subcategories: [
      'Water',
      'Fruit Juices',
      'Vegetable Juices',
      'Tea',
      'Coffee',
      'Hot Chocolate',
      'Drink Mixes',
      'Nutritional Drinks'
    ]
  }
};

export const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Canned Soup',
    subcategory: 'Soup',
    quantity: 150,
    category: 'Canned Goods',
    donationDate: new Date('2024-03-01'),
    expirationDate: new Date('2024-03-20'),
    tags: [
      mockTags.find(t => t.id === 'vegetarian')!,
      mockTags.find(t => t.id === 'gluten-free')!,
      mockTags.find(t => t.id === 'low-sodium')!
    ],
  },
  {
    id: '2',
    name: 'Rice',
    subcategory: 'Rice',
    quantity: 200,
    category: 'Grains',
    donationDate: new Date('2024-03-05'),
    expirationDate: new Date('2024-12-31'),
    tags: [
      mockTags.find(t => t.id === 'halal')!,
      mockTags.find(t => t.id === 'whole-grain')!,
    ],
  },
  {
    id: '3',
    name: 'Black Beans',
    subcategory: 'Beans',
    quantity: 175,
    category: 'Canned Goods',
    donationDate: new Date('2024-03-02'),
    expirationDate: new Date('2024-06-15'),
    tags: [
      mockTags.find(t => t.id === 'vegetarian')!,
      mockTags.find(t => t.id === 'gluten-free')!,
      mockTags.find(t => t.id === 'high-protein')!,
    ],
  },
  {
    id: '4',
    name: 'Chicken Broth',
    subcategory: 'Soup',
    quantity: 80,
    category: 'Canned Goods',
    donationDate: new Date('2024-03-10'),
    expirationDate: new Date('2024-03-25'),
    tags: [
      mockTags.find(t => t.id === 'halal')!,
    ],
  },
  {
    id: '5',
    name: 'Fresh Apples',
    subcategory: 'Fresh Fruits',
    quantity: 300,
    category: 'Produce',
    donationDate: new Date('2024-03-12'),
    expirationDate: new Date('2024-03-19'),
    tags: [
      mockTags.find(t => t.id === 'organic')!,
      mockTags.find(t => t.id === 'local')!,
    ],
  },
  {
    id: '6',
    name: 'Whole Wheat Pasta',
    subcategory: 'Pasta',
    quantity: 120,
    category: 'Grains',
    donationDate: new Date('2024-03-08'),
    expirationDate: new Date('2024-09-30'),
    tags: [
      mockTags.find(t => t.id === 'whole-grain')!,
      mockTags.find(t => t.id === 'vegetarian')!,
    ],
  },
  {
    id: '7',
    name: 'Peanut Butter',
    subcategory: 'Nut Butters',
    quantity: 85,
    category: 'Protein',
    donationDate: new Date('2024-03-03'),
    expirationDate: new Date('2024-12-31'),
    tags: [
      mockTags.find(t => t.id === 'high-protein')!,
      mockTags.find(t => t.id === 'contains-nuts')!,
    ],
  },
];

export const mockPatrons: Patron[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    household: {
      totalSize: 4,
      hasChildren: true,
      childrenAgeGroups: [
        { id: '6-12', range: '6-12 years', count: 2 },
        { id: '13-17', range: '13-17 years', count: 1 }
      ]
    },
    dietaryRestrictions: ['vegetarian'],
    distributionHistory: [
      {
        id: '1',
        date: new Date('2024-03-01'),
        items: [
          { foodItemId: '1', quantity: 2 },
          { foodItemId: '3', quantity: 3 },
          { foodItemId: '6', quantity: 2 },
        ],
      },
      {
        id: '5',
        date: new Date('2024-02-15'),
        items: [
          { foodItemId: '2', quantity: 3 },
          { foodItemId: '3', quantity: 2 },
        ],
      },
      {
        id: '8',
        date: new Date('2024-01-20'),
        items: [
          { foodItemId: '1', quantity: 2 },
          { foodItemId: '6', quantity: 2 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    household: {
      totalSize: 3,
      hasChildren: true,
      childrenAgeGroups: [
        { id: '0-2', range: '0-2 years', count: 1 }
      ]
    },
    dietaryRestrictions: ['halal'],
    distributionHistory: [
      {
        id: '2',
        date: new Date('2024-03-05'),
        items: [
          { foodItemId: '2', quantity: 2 },
          { foodItemId: '4', quantity: 1 },
          { foodItemId: '5', quantity: 4 },
        ],
      },
      {
        id: '6',
        date: new Date('2024-02-20'),
        items: [
          { foodItemId: '2', quantity: 2 },
          { foodItemId: '7', quantity: 1 },
        ],
      },
      {
        id: '9',
        date: new Date('2024-01-15'),
        items: [
          { foodItemId: '4', quantity: 2 },
          { foodItemId: '2', quantity: 3 },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Emma Chen',
    household: {
      totalSize: 2,
      hasChildren: false,
      childrenAgeGroups: []
    },
    dietaryRestrictions: ['gluten-free'],
    distributionHistory: [
      {
        id: '7',
        date: new Date('2024-03-10'),
        items: [
          { foodItemId: '3', quantity: 2 },
          { foodItemId: '5', quantity: 3 },
          { foodItemId: '6', quantity: 1 },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    household: {
      totalSize: 5,
      hasChildren: true,
      childrenAgeGroups: [
        { id: '3-5', range: '3-5 years', count: 1 },
        { id: '6-12', range: '6-12 years', count: 2 }
      ]
    },
    dietaryRestrictions: ['dairy-free'],
    distributionHistory: [
      {
        id: '10',
        date: new Date('2024-03-08'),
        items: [
          { foodItemId: '1', quantity: 3 },
          { foodItemId: '5', quantity: 5 },
          { foodItemId: '7', quantity: 2 },
        ],
      },
      {
        id: '11',
        date: new Date('2024-02-22'),
        items: [
          { foodItemId: '2', quantity: 4 },
          { foodItemId: '3', quantity: 3 },
        ],
      },
    ],
  },
];