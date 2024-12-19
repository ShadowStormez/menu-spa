import { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuItem } from '../types/menu-item'; // Global type for restaurant profile

export default function useMenuItem(restaurantId: string | null ) {
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);

  useEffect(() => {
    if (!restaurantId) return; // If no restaurantId, skip the request

    const fetchMenuItems = async () => {
      try {
        // Directly request the backend API for restaurant profile
        const response = await axios.get(`http://menyou-svc-gw.darkube.app/api/v1/restaurants/${restaurantId}/menu_item`);
        setMenuItems(response.data); // Save data to state
      } catch (error) {
        console.error('Error fetching restaurant profile', error); // Handle error
      }
    };

    fetchMenuItems();
  }, [restaurantId]); // Trigger when restaurantId changes

  return { menuItems }; // Return restaurant data
}
