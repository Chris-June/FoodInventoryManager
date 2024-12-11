export interface Database {
  public: {
    Tables: {
      food_items: {
        Row: {
          id: string;
          name: string;
          quantity: number;
          category: string;
          donation_date: string;
          expiration_date: string;
          dietary_tags: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['food_items']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['food_items']['Insert']>;
      };
      patrons: {
        Row: {
          id: string;
          name: string;
          household_size: number;
          dietary_restrictions: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['patrons']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['patrons']['Insert']>;
      };
      distributions: {
        Row: {
          id: string;
          patron_id: string;
          date: string;
          items: {
            food_item_id: string;
            quantity: number;
          }[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['distributions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['distributions']['Insert']>;
      };
    };
  };
}