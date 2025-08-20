import { useState, useEffect } from 'react';
import axios from 'axios';
import { AllMenus } from '../types/all-menus';

export default function useAllMenus(restaurantId: string | null) {
  const [menuData, setMenuData] = useState<AllMenus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) {
      setIsLoading(false);
      return;
    }

    const fetchAllMenus = async () => {
      setIsLoading(true);
      try {
        console.log("Using restaurantId:", restaurantId);
        const response = await axios.get(`https://menyou-svc-gw.darkube.app/api/v1/restaurants/${restaurantId}/all_menus`, {
          withCredentials: true
        });
        setMenuData(response.data);
      } catch (error) {
        console.error('Error fetching menu data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMenus();
  }, [restaurantId]);

  return { menuData, isLoading };
}