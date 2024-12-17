import { useState, useEffect } from 'react';
import axios from 'axios';
import { RestaurantProfile } from '../types/restaurant'; // Global type for restaurant
import { useDispatch } from 'react-redux';
import { setRestaurantDetails } from '../store/globalSlice'; // Import the action

export default function useRestaurantProfile(restaurantId: string) {
  const [restaurantData, setRestaurantData] = useState<RestaurantProfile | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!restaurantId) return; // If no restaurantId, skip the request

    const fetchRestaurantProfile = async () => {
      try {
        // Directly request the backend API for restaurant profile
        const response = await axios.get(`http://menyou-svc-gw.darkube.app/api/v1/restaurants/${restaurantId}/profile`);
        
        // Save data to state
        setRestaurantData(response.data);

        // Dispatch the restaurant name and address to the global store
        dispatch(setRestaurantDetails({
          name: response.data.name,
          address: response.data.address,
        }));
      } catch (error) {
        console.error('Error fetching restaurant profile', error); // Handle error
      }
    };

    fetchRestaurantProfile();
  }, [restaurantId, dispatch]); // Trigger when restaurantId changes

  return { restaurantData }; // Return restaurant data
}
