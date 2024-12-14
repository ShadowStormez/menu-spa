interface User {
    id: string;
  }
  
  interface Item {
    id: string;
    name: string;
    number: number;
  }
  
  export interface Order {
    id: string; //order id
    restaurant: string;
    user: User;
    tableNumber: number;
    address: string; //restaurant address
    items: Item[];
    specialRequests: string;
    __meta: object;
  }
  