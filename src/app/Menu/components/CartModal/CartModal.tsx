import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/index';
import { incrementNumber, decrementNumber, clearCart } from '@/app/store/cartSlice';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField} from '@mui/material';
import { useMediaQuery,Box } from '@mui/material';
import { CartModalStyle } from './CartModal.Style';
import Image from 'next/image';
import {generateRandomUUID} from '../../../utils/UuidCreator'
import { createOrder } from '../../../utils/createOrder'
import { EmptyCart } from '@/app/assets/icons';
import toast from 'react-hot-toast';
import { foodDefault } from '@/app/assets/images';

const CartModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {

  const isSmallScreen = useMediaQuery('(max-width:550px)');
  const { userId } = useSelector((state: any) => state.auth);
  const tableId = useSelector((state: RootState) => state.global.tableId) ?? 0;
  const restaurantId = useSelector((state: RootState) => state.global.restaurantId) ?? '';
  const restaurantAddress = useSelector((state: RootState) => state.global.restaurantAddress) ?? '';
  
  const cart = useSelector((state: RootState) => state.cart.items);

  const totalAmount=cart.reduce((total, item) => total + item.price * item.number, 0);
  
  const dispatch = useDispatch();

  const [orderDescription, setOrderDescription] = useState<string>('');

  const handleCheckout = async () => {
    try {

      const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        number: item.number
      }));

      const order = 
         {
          id: generateRandomUUID(),
          restaurant: { id: restaurantId },
          user: { id: userId },
          tableNumber: tableId,
          address: restaurantAddress,
          items: items,
          specialRequests: orderDescription,
          orderGroupId: generateRandomUUID(),
      };
      if(userId){
        await createOrder(order);
        dispatch(clearCart());
        onClose();
        toast.success('سفارش شما ثبت شد')
      }else{
        toast.error('برای ثبت سفارش ابتدا وارد حساب کاربری خود شوید')
      }

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
          {cart.length > 0 ? (
                      <List sx={{display: 'flex',flexDirection:'column',gap:'10px'}}>
                      {cart.map(item => (
                        <ListItem key={item.id} style={{ display: 'flex', alignItems: 'center', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',borderRadius:'8px',background:'radial-gradient(circle at -1% 57.5%, #001A6E 0%, #074799 90%) no-repeat center center fixed',color:'#fff' }}>
                          {/* Display item image */}
                          <div style={{
                          display: 'flex',
                          alignItems: isSmallScreen ? 'flex-start' : 'center',
                          flexDirection: isSmallScreen ? 'column' : 'row',
                          gap: '10px',
                          justifyContent: 'flex-start',
                        }}>
                          <Image  
                            src={item.foodImageUncropped || foodDefault }
                            alt={item.name}
                            width={100}
                            height={100}
                            objectFit="cover"
                            style={{ borderRadius: '8px',height: '100px',
                              objectFit: 'cover' }}
                          />
                          <ListItemText
                          style={{textAlign:'right',color:'#fff'}}
                            primary={item.name}
                            secondary={`تعداد: ${item.number} | قیمت: ${item.price * item.number} تومان`}
                            primaryTypographyProps={{ style: { color: '#fff' } }}
                            secondaryTypographyProps={{ style: { color: '#fff' } }}
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
                        <ListItem
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            padding: '10px',
                          }}
                        >
                          <ListItemText
                            style={{ textAlign: 'right' }}
                            primary={`جمع کل: ${totalAmount} تومان`}
                            primaryTypographyProps={{ style: { color: '#000' } }}
                          />
                        </ListItem>
                    </List>
          ) : (
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'5px'}}>
              <Image src={EmptyCart} width={150} height={150} alt='empty-cart-icon'/>
              <h2 style={{fontSize:'20px'}}>سفارشی ندارید😔</h2>
            </Box>
          )}

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
