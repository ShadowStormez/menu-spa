import React from "react";
import Image, { StaticImageData } from "next/image";
import { MenuItemStyle } from "./MenuItem.Style";
import { vegan, vegetarian, chilly, ArrowLeft } from "@/app/assets/icons"; // Import necessary icons
import { Button, ButtonGroup } from "@mui/material";
import Link from "next/link";

import { useDispatch, useSelector } from 'react-redux';
import { addItem, decrementNumber, incrementNumber } from '@/app/store/cartSlice';
import toast from "react-hot-toast";
import { RootState } from "@/app/store";
import { foodDefaultBG } from "@/app/assets/images";

interface MenuItemProps {
  id:string;
  name: string;
  description: string;
  price: number;
  // category: string;
  // logoIds:string[] | null;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price,id}) => {
  const dispatch = useDispatch();
  // Get number from Redux state
  const number = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === id)?.number || 0
  );

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price,number })); // Add item to cart
    toast.success(`${name} به سفارش های شما اضافه شد`);
  };

  const handleIncrement = () => {
    dispatch(incrementNumber(id)); // Increment item number in Redux
    toast.success(`${name} به سفارش های شما اضافه شد`);
  };

  const handleDecrement = () => {
    dispatch(decrementNumber(id)); // Decrement item number in Redux
    toast.error(`${name} از سفارش های شما کم شد`);
  };

  // Map category to the appropriate icon
  const categoryIcons: { [key: string]: StaticImageData } = {
    vegetarian,
    vegan,
    chilly,
  };

  return (
    <MenuItemStyle>
      <div className="menu-item">
        <div className="menu-item-image-wrapper">
          <Image
            src={foodDefaultBG} // Fallback to default image
            alt={name}
            width={300} // Set width for image
            height={200} // Set height for image
            objectFit="cover" // Ensure proper aspect ratio
            className="FoodImage"
          />
        </div>
        <div className="menu-item-details-container">
          <div className="menu-item-details">
            <div className="menu-item-text">
            <h3>{name}</h3>
            <p className="description">{description}</p>
            </div>
          </div>
        <div className="menu-item-links">
          <div className="price-container">
          <span>تومان</span>
          <p>{price}</p>
          </div>
        <Link href={`/Menu/${id}`}>
            <span>جزییات </span>
            <ArrowLeft width={15} height={15} fill="var(--lightblue-color)"/>
        </Link>
        </div>
        </div>

   {/* Add Cart / Increment-Decrement Buttons */}
   { number === 0 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            fullWidth
          >
            افزودن
          </Button>
        ) : (
          <ButtonGroup fullWidth>
            <Button variant="MenuItemIncrementDecrement" onClick={handleIncrement}>+</Button>
            <div className="white-space">
            <div className="number-container">
            <span>
              {number}
            </span>
            </div>
            </div>
            <Button variant="MenuItemIncrementDecrement" onClick={handleDecrement}>-</Button>
          </ButtonGroup>
        )}
      </div>
    </MenuItemStyle>
  );
};

export default MenuItem;
