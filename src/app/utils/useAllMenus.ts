import { useState, useEffect } from 'react';
import axios from 'axios';
import { AllMenus } from '../types/all-menus'; // Global type for restaurant profile

export default function useAllMenus(restaurantId: string | null ) {
  const [menuData, setMenuData] = useState< AllMenus | null>(null);

  useEffect(() => {
    if (!restaurantId) return; // If no restaurantId, skip the request

    const fetchAllMenus = async () => {
      try {
        const response = await axios.get(`https://menyou-svc-gw.darkube.app/api/v1/restaurants/${restaurantId}/all_menus`);
        setMenuData(response.data);
      } catch (error) {
        console.error('Error fetching menu data', error);
      }
    };

    fetchAllMenus();
  }, [restaurantId]);

  return { menuData };
}
