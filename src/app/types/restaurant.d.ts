// types/restaurant.d.ts
export interface RestaurantProfile {
  status: boolean;
  data: {
    _id: string;
    name: string;
    address: string;
    phone: string;
    logoIds: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  }
  