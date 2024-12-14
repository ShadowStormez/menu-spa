// hooks/useRestaurantProfile.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RestaurantProfile } from '../types/restaurant'; // Global type for restaurant profile

export default function useRestaurantProfile(restaurantId: string) {
  const [restaurantData, setRestaurantData] = useState<RestaurantProfile | null>(null);

  useEffect(() => {
    if (!restaurantId) return; // If no restaurantId, skip the request

    const fetchRestaurantProfile = async () => {
      try {
        // Directly request the backend API for restaurant profile
        const response = await axios.get(`https://menyou-svc-gw.darkube.app/api/v1/restaurants/${restaurantId}/profile`);
        setRestaurantData(response.data); // Save data to state
      } catch (error) {
        console.error('Error fetching restaurant profile', error); // Handle error
      }
    };

    fetchRestaurantProfile();
  }, [restaurantId]); // Trigger when restaurantId changes

  return { restaurantData }; // Return restaurant data
}
