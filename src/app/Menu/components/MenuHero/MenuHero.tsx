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
  backgroundImageUUID: string | undefined;
  logoUUID: string | undefined;
  name: string | undefined;
  onUserIconClick: () => void;
}

const MenuHero: React.FC<HeroProps> = ({ backgroundImageUUID, logoUUID, name, onUserIconClick }) => {
  const backgroundImageUrl = getImageUrl(backgroundImageUUID);
  const logoUrl = getImageUrl(logoUUID);
  const [firstWord, ...restWords] = name?.split(' ') || [];

  const [open, setOpen] = useState(false);
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((acc, item) => acc + item.number, 0));

  return (
    <MenuHeroStyle>
      <div className="hero-container">
        <div className="header">
          <IconButton onClick={() => setOpen(true)}>
            <Badge badgeContent={cartCount} color="secondary">
              <Image src={cartIcon} alt="cart-icon" width={20} height={20} />
            </Badge>
          </IconButton>
          <CartModal open={open} onClose={() => setOpen(false)} />
          <div className="user" onClick={onUserIconClick}>
            <Image src={userIcon} alt="user-icon" width={20} height={20} />
          </div>
        </div>
        {/* Background Image */}
        <div
          className="background-layer"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        ></div>
        <div className="hero-content">
          {/* Use Next.js Image component with loader function */}
          {logoUrl && (
            <Image
              loader={() => logoUrl}
              src={logoUrl}
              width={200}
              height={200}
              alt="restaurant-logo"
            />
          )}
          <p className="animated-text">
            Powered by Men<span>YOU</span>
          </p>
        </div>
      </div>
    </MenuHeroStyle>
  );
};

export default MenuHero;
