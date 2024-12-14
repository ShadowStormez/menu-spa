'use client';
import { menu } from "../components/menuData";
import Image from "next/image";
import { Badge, Button, ButtonGroup, IconButton, ThemeProvider } from "@mui/material";
import { MenuItemIdStyle } from "./page.Style";
import {  cartIcon, chilly, vegan, vegetarian } from "@/app/assets/icons";
import { foodDefaultBG } from "@/app/assets/images";
import Header from "../components/Header/Header";

import { useDispatch, useSelector } from 'react-redux';
import { addItem, decrementQuantity, incrementQuantity } from '@/app/store/cartSlice';
import toast from "react-hot-toast";
import { RootState } from "@/app/store";
import theme from "@/app/Theme/theme";
import React, { useState } from "react";
import CartModal from "../components/CartModal/CartModal";

import useMenuItem from '@/app/utils/useMenuItem';

export default function MenuItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // Access params.id after unwrapping
  const itemId = id; // Convert id to a number
  let TheeItem = null;
  const restaurantId = useSelector((state: RootState) => state.global.restaurantId);
  const { menuItems } = useMenuItem(restaurantId || '');
  const [open, setOpen] = useState(false);
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0));

  menuItems?.forEach((menuItem) => {
    const foundItem=menuItem.item.id === itemId
    if (foundItem) TheeItem=foundItem
})
  
  if(!TheeItem){
    return(<div>محصولی یافت نشد</div>)
  }


  const { name, description, price, images } = TheeItem;


  const dispatch = useDispatch();

  // Get quantity from Redux state
  const quantity = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === itemId)?.quantity || 0
  );

  // Add to cart
  const handleAddToCart = () => {
    dispatch(addItem({ id: itemId, name, price, images,quantity })); // Add item to cart
    toast.success(`${name} به سفارش های شما اضافه شد`);
  };

  // Increment quantity
  const handleIncrement = () => {
    dispatch(incrementQuantity(itemId));
    toast.success(`${name} به سفارش های شما اضافه شد`);
  };

  // Decrement quantity
  const handleDecrement = () => {
    dispatch(decrementQuantity(itemId));
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
      <Image
        src={foodDefaultBG}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        priority
      />
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
          {quantity === 0 ? (
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
                variant="cart"
                style={{borderRadius:'50%'}}
                onClick={handleIncrement}
              >
                +
              </Button>
                <div className="quantity-container">
                  <span>{quantity}</span>
                </div>
              <Button
                variant="cart"
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
