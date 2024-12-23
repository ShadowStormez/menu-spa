'use client'
import React, { useState } from 'react';
import { MenuHeroStyle } from './MenuHero.Style';
import Image from 'next/image';
import { Badge, IconButton } from '@mui/material';
import { cartIcon, userIcon } from '@/app/assets/icons';
import CartModal from '../CartModal/CartModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { getImageUrl } from '@/app/utils/getImageUrl';

interface HeroProps {
  backgroundImageUUID: string | undefined ;
  logoUUID:string | undefined;
  name:string | undefined;
}

const MenuHero: React.FC<HeroProps> = ({ backgroundImageUUID,logoUUID,name }) => {

  const backgroundImageUrl = getImageUrl(backgroundImageUUID);
  const logoUrl = getImageUrl(logoUUID);
  const [firstWord, ...restWords] = name?.split(' ') || [];

      const [open, setOpen] = useState(false);
      const cartCount = useSelector((state: RootState) => state.cart.items.reduce((acc, item) => acc + item.number, 0));
      const { isLoggedIn } = useSelector((state: any) => state.auth);
      const { userName } = useSelector((state: any) => state.auth); // Access global state from Redux

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
      {isLoggedIn ? (
          <div className='user'>
            <Image src={userIcon} alt='user-icon' width={20} height={20}/>
            <span>{userName}</span>
          </div>
      ) : (
        null
      )}
    </div>
    <div
        className="background-layer"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>
      <div className="hero-content">
        <h1 className="hero-title"><span>{firstWord}</span>{' '}
        {restWords.join(' ')}</h1>
        <p className="animated-text">Powered by Men<span>YOU</span></p>
      </div>
    </div>
    </MenuHeroStyle>
  );
};

export default MenuHero;
