import { useState, useEffect } from 'react';
import axios from 'axios';
import { RestaurantProfile } from '../types/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantDetails } from '../store/globalSlice';
import { RootState } from '../store';

export default function useRestaurantProfile() {
  const [restaurantData, setRestaurantData] = useState<RestaurantProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const restaurantId = useSelector((state: RootState) => state.global.restaurantId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!restaurantId) {
      setError('Restaurant ID is missing');
      setLoading(false);
      return;
    }

    const fetchRestaurantProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://menyou-svc-gw.darkube.app/api/v1/restaurants/${restaurantId}/profile`);
        setRestaurantData(response.data);
        dispatch(setRestaurantDetails({
          name: response.data?.data.name,
          address: response.data?.data.address,
        }));
        setError(null);
      } catch (err) {
        setError('Failed to load restaurant data');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantProfile();
  }, [dispatch, restaurantId]);

  return { restaurantData, loading, error };
}
