export interface MenuItem {
    id: string;
    restaurant: { id: string };
    item: {
      id: string;
      name: string;
      description: string;
      price: number;
      number: number;
      calories: number;
      logoIds: string[];
    };
  }