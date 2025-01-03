interface User {
  id: string;
}

interface Restaurant {
  id: string;
}

interface Item {
  id: string;
  name: string;
  quantity: number;
}

export interface Order {
  status: boolean; // Top-level status field
  data: {
    id: string; // Order ID
    restaurant: Restaurant;
    user: User;
    tableNumber: number;
    address: string;
    items: Item[];
    specialRequests: string;
    totalAmount: number;
    __meta: object; // Optional metadata
  };
}
