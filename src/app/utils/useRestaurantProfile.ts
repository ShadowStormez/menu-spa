import { useState, useEffect } from 'react';
import axios from 'axios';
import { RestaurantProfile } from '../types/restaurant'; // Global type for restaurant
import { useDispatch } from 'react-redux';
import { setRestaurantDetails } from '../store/globalSlice'; // Import the action

export default function useRestaurantProfile(restaurantId: string | null) {
  const [restaurantData, setRestaurantData] = useState<RestaurantProfile>();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId) {
      setLoading(false);
      return;
    }

    const fetchRestaurantProfile = async () => {
      try {
        const response = await axios.get(`http://menyou-svc-gw.darkube.app/api/v1/restaurants/${restaurantId}/profile`);
        setRestaurantData(response.data);
        setError(null);
        dispatch(setRestaurantDetails({
          name: response.data?.data.name,
          address: response.data?.data.address,
        }));
      } catch (err) {
        setError("Failed to load restaurant data");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantProfile();
  }, [dispatch, restaurantId]);

  return { restaurantData, loading, error };
}

