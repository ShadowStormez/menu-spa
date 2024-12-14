import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/index';
import { incrementNumber, decrementNumber, clearCart } from '@/app/store/cartSlice';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { CartModalStyle } from './CartModal.Style';
import Image from 'next/image';
import { foodDefaultBG } from '@/app/assets/images';

import { createOrder } from '../../../utils/createOrder'

const CartModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {

  const isSmallScreen = useMediaQuery('(max-width:550px)');
  const { userId } = useSelector((state: any) => state.auth);
  const tableId = useSelector((state: RootState) => state.global.tableId) ?? 0;
  const restaurantName = useSelector((state: RootState) => state.global.restaurantName) ?? '';
  const restaurantAddress = useSelector((state: RootState) => state.global.restaurantAddress) ?? '';
  
  const cart = useSelector((state: RootState) => state.cart.items);

  const generateRandomUUID = (): string => {
    return crypto.randomUUID();
  };
  
  const dispatch = useDispatch();

  const [orderDescription, setOrderDescription] = useState<string>('');

  const handleCheckout = async () => {
    try {

      const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        number: item.number
      }));

      const order = {
        id: generateRandomUUID(),
        restaurant: restaurantName,
        user: { id: userId },
        tableNumber: tableId,
        address: restaurantAddress,
        items: items,
        specialRequests: orderDescription,
        __meta: {},
      };

      await createOrder(order);
      dispatch(clearCart());
      onClose();
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDescription(event.target.value);
  };

  return (
    <CartModalStyle>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>سفارش ها</DialogTitle>
        <DialogContent sx={{ width:'100%',overflowY: "auto",
         scrollbarWidth: 'none', // Hides scrollbar in Firefox
         msOverflowStyle: 'none', // Hides scrollbar in IE/Edge
         '&::-webkit-scrollbar': {
           display: 'none', // Hides scrollbar in WebKit browsers (Chrome/Safari)
         },}}>
          <List sx={{display: 'flex',flexDirection:'column',gap:'10px'}}>
            {cart.map(item => (
              <ListItem key={item.id} style={{ display: 'flex', alignItems: 'center', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',borderRadius:'8px',background:'#fff' }}>
                {/* Display item image */}
                <div style={{
                display: 'flex',
                alignItems: isSmallScreen ? 'flex-start' : 'center',
                flexDirection: isSmallScreen ? 'column' : 'row',
                gap: '10px',
                justifyContent: 'flex-start',
              }}>
                <Image  
                  src={foodDefaultBG} 
                  alt={item.name}
                  width={100}
                  height={100}
                  objectFit="cover"
                  style={{ borderRadius: '8px' }}
                />
                <ListItemText
                style={{textAlign:'right'}}
                  primary={item.name}
                  secondary={`تعداد: ${item.number} | قیمت: ${item.price * item.number} تومان`}
                />
                </div>
                <div style={{display:'flex',
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems: 'center',
                    gap:'10px'}}>
                <Button variant='cart' onClick={() => dispatch(incrementNumber(item.id))}>+</Button>
                <Button variant='cart' onClick={() => dispatch(decrementNumber(item.id))}>-</Button>
                </div>
        
              </ListItem>
            ))}
          </List>

          {/* Conditionally render the description input only if cart is not empty */}
          {cart.length > 0 && (
            <TextField
              label="توضیحات سفارش"
              fullWidth
              multiline
              rows={4}
              value={orderDescription}
              onChange={handleDescriptionChange}
              variant="outlined"
              margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>بستن</Button>
          <Button onClick={handleCheckout} variant="contained" color="primary">
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
    </CartModalStyle>
  );
};

export default CartModal;
