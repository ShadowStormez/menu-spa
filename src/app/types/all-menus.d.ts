interface Item {
    _id: string;
    name: string;
    description: string;
    price: number;
    number: number;
    logoIds:string[];
    calories: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface Restaurant {
    id: string;
  }
  
  interface Category {
    _id: string;
    restaurant: Restaurant;
    category: string;
    items: Item[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface AllMenus {
    status: boolean;
    data: Category[];
  }
  