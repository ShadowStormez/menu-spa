import { useState, useEffect } from 'react';
import axios from 'axios';
import { RestaurantProfile } from '../types/restaurant'; // Global type for restaurant
import { useDispatch } from 'react-redux';
import { setRestaurantDetails } from '../store/globalSlice'; // Import the action

export default function useRestaurantProfile(restaurantId:string | null) {
  const [restaurantData, setRestaurantData] = useState<RestaurantProfile>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!restaurantId) return;

    const fetchRestaurantProfile = async () => {
      try {
        const response = await axios.get(`http://menyou-svc-gw.darkube.app/api/v1/restaurants/43f89267-c674-4d70-8ead-60aabe2c7884/profile`);
        
        setRestaurantData(response.data);

        dispatch(setRestaurantDetails({
          name: response.data.data.name,
          address:response.data.data.address,
        }));
      } catch (error) {
        console.error('Error fetching restaurant profile', error); 
      }
    };

    fetchRestaurantProfile();
  }, [dispatch, restaurantId]);

  return { restaurantData };
}
