'use client';
import Image from "next/image";
import { Badge, Button, ButtonGroup, IconButton, ThemeProvider,LinearProgress } from "@mui/material";
import { MenuItemIdStyle } from "./page.Style";
import {  cartIcon, chilly, vegan, vegetarian } from "@/app/assets/icons";
import Header from "../components/Header/Header";

import { useDispatch, useSelector } from 'react-redux';
import { addItem, decrementNumber, incrementNumber } from '@/app/store/cartSlice';
import toast from "react-hot-toast";
import { RootState } from "@/app/store";
import theme from "@/app/Theme/theme";
import React, { useState } from "react";
import CartModal from "../components/CartModal/CartModal";

//utils 
import useAllmenus from '../../utils/useAllMenus'
import { getImageUrl } from "@/app/utils/getImageUrl";
import { foodDefault } from "@/app/assets/images";



export default function MenuItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // Access params.id after unwrapping
  const itemId = id; // Convert id to a number
  const restaurantId = useSelector((state: RootState) => state.global.restaurantId);
  
  //menu items extraction
  const { menuData } = useAllmenus(restaurantId);
  const allItems = menuData?.data.flatMap((menu) => menu.items);
  const TheeItem = allItems?.find((Item) => Item._id === itemId);

  const [open, setOpen] = useState(false);
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((acc, item) => acc + item.number, 0));

  const dispatch = useDispatch();

  // Get number from Redux state
  const number = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === itemId)?.number || 0
  );

  
  if(!TheeItem){
    return(<LinearProgress/>)
  }


  const { name, description, price,logoIds } = TheeItem;
  const foodImageUncropped = getImageUrl(logoIds?.[0]);
  const foodImageBackground = getImageUrl(logoIds?.[2]);

  // Add to cart
  const handleAddToCart = () => {
    dispatch(addItem({ id: itemId, name, price,foodImageUncropped,number })); // Add item to cart
    toast.success(`${name} به سفارش های شما اضافه شد`);
  };

  // Increment number
  const handleIncrement = () => {
    dispatch(incrementNumber(itemId));
    toast.success(`${name} به سفارش های شما اضافه شد`);
  };

  // Decrement number
  const handleDecrement = () => {
    dispatch(decrementNumber(itemId));
    toast.error(`${name} از سفارش های شما کم شد`);
  };

  return (
    <ThemeProvider theme={theme}>
    <MenuItemIdStyle>
      <div className="Item-Container">
      <div className="cartFixed">
      <IconButton onClick={() => setOpen(true)}>
        <Badge badgeContent={cartCount} color="secondary">
          <Image src={cartIcon} alt='cart-icon' width={20} height={20}/>
        </Badge>
      </IconButton>
      <CartModal open={open} onClose={() => setOpen(false)} />
    </div>
      <div className="image-container">
        <Header/>
        {foodImageBackground && (
          <Image
          loader={() => foodImageBackground}
          src={foodImageBackground}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority
          />
        )}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff', // Text color
      }}>
      </div>
    </div>
        <div className="menu-item-details-container">
          <div className="menu-item-details">
            <div className="menu-item-text">
              <h3>{name}</h3>
              <p className="description">{description}</p>
            </div>
          </div>
            <div className="price-container">
              <span>تومان</span>
              <p>{price}</p>
            </div>
          {/* Add Cart / Increment-Decrement Buttons */}
          {number === 0 ? (
            <Button
            sx={{
              width: '30%',
              margin: '0 auto',
              '@media (max-width: 600px)': { 
                width: '50%', 
              },
            }}
              onClick={handleAddToCart}
              fullWidth
            >
              افزودن
            </Button>
          ) : (
            <ButtonGroup fullWidth>
              <Button
                variant="itemDetails"
                style={{borderRadius:'50%'}}
                onClick={handleIncrement}
              >
                +
              </Button>
                <div className="number-container">
                  <span style={{color:"white"}}>{number}</span>
                </div>
              <Button
                variant="itemDetails"
                style={{borderRadius:'50%'}}
                onClick={handleDecrement}
              >
                -
              </Button>
            </ButtonGroup>
          )}
        </div>
      </div>
    </MenuItemIdStyle>
    </ThemeProvider>
  );
}
