import { useState, useEffect } from 'react';
import axios from 'axios';
import { RestaurantProfile } from '../types/restaurant'; // Global type for restaurant
import { useDispatch } from 'react-redux';
import { setRestaurantDetails } from '../store/globalSlice'; // Import the action

export default function useRestaurantProfile(restaurantId:string | null ) {
  const [restaurantData, setRestaurantData] = useState<RestaurantProfile>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!restaurantId) return; 
  
    const fetchRestaurantProfile = async () => {
      try {
        const response = await axios.get(`http://menyou-svc-gw.darkube.app/api/v1/restaurants/${restaurantId}/profile`);
        setRestaurantData(response.data);
  
        dispatch(setRestaurantDetails({
          name: response.data?.data.name,
          address: response.data?.data.address,
        }));
      } catch (error) {
        console.error('Error fetching restaurant profile', error);
        setError('Failed to fetch restaurant profile'); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchRestaurantProfile();
  }, [dispatch, restaurantId]);
  

  return { restaurantData, error, loading };
}
