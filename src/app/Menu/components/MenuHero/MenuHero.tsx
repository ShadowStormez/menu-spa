import React, { useState } from 'react';
import { MenuHeroStyle } from './MenuHero.Style';
import Image, { StaticImageData } from 'next/image';
import { Badge, IconButton } from '@mui/material';
import { cartIcon } from '@/app/assets/icons';
import CartModal from '../CartModal/CartModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface HeroProps {
  backgroundImage: string | StaticImageData;
}

const MenuHero: React.FC<HeroProps> = ({ backgroundImage }) => {

  const backgroundImageUrl =
    typeof backgroundImage === 'string'
      ? backgroundImage
      : backgroundImage.src;

      const [open, setOpen] = useState(false);
      const cartCount = useSelector((state: RootState) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0));
    

  return (
    <MenuHeroStyle>
  <div className="hero-container">
  <div className="header">
      <IconButton onClick={() => setOpen(true)}>
        <Badge badgeContent={cartCount} color="secondary">
          <Image src={cartIcon} alt='cart-icon' width={20} height={20}/>
        </Badge>
      </IconButton>
      <CartModal open={open} onClose={() => setOpen(false)} />
    </div>
    <div
        className="background-layer"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>
      <div className="hero-content">
        <h1 className="hero-title">دکتر <span>کالری</span></h1>
        <p className="hero-subtitle">شعبه توحید</p>
        <p className="animated-text">Powered by Men<span>YOU</span></p>
      </div>
    </div>
    </MenuHeroStyle>
  );
};

export default MenuHero;
