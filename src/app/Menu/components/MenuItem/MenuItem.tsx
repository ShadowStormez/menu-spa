import React from "react";
import Image, { StaticImageData } from "next/image";
import { MenuItemStyle } from "./MenuItem.Style";
import { vegan, vegetarian, chilly, arrowLeft } from "@/app/assets/icons"; // Import necessary icons
import { Badge,Button, ButtonGroup } from "@mui/material";
import Link from "next/link";

import { useDispatch, useSelector } from 'react-redux';
import { addItem, decrementQuantity, incrementQuantity } from '@/app/store/cartSlice';
import toast from "react-hot-toast";
import { RootState } from "@/app/store";

interface MenuItemProps {
  id:number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageDefault?: string | StaticImageData;  // Allow string or StaticImageData
  imageUncropped?: string | StaticImageData;  // Allow string or StaticImageData
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, category,id,imageDefault,imageUncropped}) => {
  const dispatch = useDispatch();
  // Get quantity from Redux state
  const quantity = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === id)?.quantity || 0
  );

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price,quantity,imageUncropped })); // Add item to cart
    toast.success(`${name} به سفارش های شما اضافه شد`);
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(id)); // Increment item quantity in Redux
    toast.success(`${name} به سفارش های شما اضافه شد`);
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(id)); // Decrement item quantity in Redux
    toast.error(`${name} از سفارش های شما کم شد`);
  };

  // Map category to the appropriate icon
  const categoryIcons: { [key: string]: StaticImageData } = {
    vegetarian,
    vegan,
    chilly,
  };

  // Fallback to a default icon if category is invalid or undefined
  const icon = categoryIcons[category.toLowerCase()] || chilly;



  return (
    <MenuItemStyle>
      <div className="menu-item">
        <div className="menu-item-image-wrapper">
          <Image
            src={imageDefault} // Fallback to default image
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
            <Badge className={`menu-item-category ${category.toLowerCase()}`}>
            <Image src={icon} width={20} height={20} alt={`${category} Icon`} />
            </Badge>
          </div>
        <div className="menu-item-links">
          <div className="price-container">
          <span>تومان</span>
          <p>{price}</p>
          </div>
        <Link href={`/Menu/${id}`}>
            <span>جزییات </span>
            <Image src={arrowLeft} width={20} height={20} alt={`arrow-image`} className="arrow-icon" />
        </Link>
        </div>
        </div>

   {/* Add Cart / Increment-Decrement Buttons */}
   {quantity === 0 ? (
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
            <Button style={{borderRadius:'8px'}} variant="incrementDecrement" onClick={handleIncrement}>+</Button>
            <div className="white-space">
            <div className="quantity-container">
            <span>
              {quantity}
            </span>
            </div>
            </div>
            <Button  style={{borderRadius:'8px'}} variant="incrementDecrement" onClick={handleDecrement}>-</Button>
          </ButtonGroup>
        )}
      </div>
    </MenuItemStyle>
  );
};

export default MenuItem;
