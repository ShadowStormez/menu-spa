import { useState, useEffect } from 'react';
import axios from 'axios';
import { RestaurantProfile } from '../types/restaurant';
import { useDispatch } from 'react-redux';
import { setRestaurantDetails } from '../store/globalSlice';

export default function useRestaurantProfile(restaurantId: string | null) {
  const [restaurantData, setRestaurantData] = useState<RestaurantProfile>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!restaurantId) {
      setIsLoading(false);
      return;
    }

    const fetchRestaurantProfile = async () => {
      setIsLoading(true);
      try {
        console.log("Using restaurantId:", restaurantId);
        const response = await axios.get(`https://menyou-svc-gw.darkube.app/api/v1/restaurants/${restaurantId}/profile`, {
          withCredentials: true
        });
        
        setRestaurantData(response.data);

        dispatch(setRestaurantDetails({
          name: response.data.data.name,
          address: response.data.data.address,
        }));
      } catch (error) {
        console.error('Error fetching restaurant profile', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurantProfile();
  }, [dispatch, restaurantId]);

  return { restaurantData, isLoading };
}