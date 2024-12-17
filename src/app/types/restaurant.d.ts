// types/restaurant.d.ts
export interface RestaurantProfile {
    _id: string;
    name: string;
    phone: string;
    fax: string;
    address: string;
    logoIds: string[];
    province: string;
    city: string;
    postalCode: string;
    __meta: object;
  }
  