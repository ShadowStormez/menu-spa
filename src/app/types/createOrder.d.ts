interface User {
  id: string;
}

interface Restaurant {
  id: string;
}

interface Item {
  id: string;
  name: string;
  number: number;
}

export interface Order {
    id: string; // Order ID
    restaurant: Restaurant;
    user: User;
    tableNumber: number;
    address: string;
    items: Item[];
    specialRequests: string;
    orderGroupId: string;
  };
