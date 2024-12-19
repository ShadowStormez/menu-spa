import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setRestaurantId, setTableId } from '../store/globalSlice';

export default function useInitializeParams() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const restaurantId = searchParams.get('restaurantId');
    const tableId = searchParams.get('tableId');

    if (restaurantId) {
      dispatch(setRestaurantId(restaurantId));
    }

    if (tableId) {
      dispatch(setTableId(Number(tableId)));
    }
  }, [searchParams, dispatch]);
}
