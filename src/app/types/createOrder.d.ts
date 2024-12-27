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
    id: string; //order id
    restaurant: Restaurant;
    user: User;
    tableNumber: number;
    address: string; //restaurant address
    items: Item[];
    specialRequests: string;
    totalAmount: number;
    __meta: object;
  }
  