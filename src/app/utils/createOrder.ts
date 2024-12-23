import axios from 'axios';
import  type {Order} from '../types/createOrder'

export const createOrder = async (order: Order) => {
  try {
    const response = await axios.post(
      'http://menyou-svc-gw-restaurants.darkube.app/api/v1/restaurant-orders',
      order,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Order created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
