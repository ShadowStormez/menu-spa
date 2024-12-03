import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/index';
import { incrementQuantity, decrementQuantity, clearCart } from '@/app/store/cartSlice';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { CartModalStyle } from './CartModal.Style';
import Image from 'next/image';

const CartModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {

  const isSmallScreen = useMediaQuery('(max-width:550px)');

  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [orderDescription, setOrderDescription] = useState<string>('');

  const handleCheckout = () => {
    // Mock API call or integration
    console.log('Checkout data:', cart, 'Description:', orderDescription);
    dispatch(clearCart());
    onClose();
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
                  src={item.imageUncropped} 
                  alt={item.name}
                  width={100}
                  height={100}
                  objectFit="cover"
                  style={{ borderRadius: '8px' }}
                />
                <ListItemText
                style={{textAlign:'right'}}
                  primary={item.name}
                  secondary={`تعداد: ${item.quantity} | قیمت: ${item.price * item.quantity} تومان`}
                />
                </div>
                <div style={{display:'flex',
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems: 'center',
                    gap:'10px'}}>
                <Button variant='cart' onClick={() => dispatch(incrementQuantity(item.id))}>+</Button>
                <Button variant='cart' onClick={() => dispatch(decrementQuantity(item.id))}>-</Button>
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
