'use client';

import { useScrollManager } from './hooks/useScrollManager';
import { MenuPageStyle } from './page.Style';
import MenuHero from './components/MenuHero/MenuHero';
import TabList from './components/Tablist/Tablist';
import { ThemeProvider,LinearProgress } from '@mui/material';
import theme from '../Theme/theme';
import MenuItem from './components/MenuItem/MenuItem';


// utils
import useRestaurantProfile from '@/app/utils/useRestaurantProfile';
import useAllMenus from '@/app/utils/useAllMenus';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


export default function Menu() {
  const restaurantId = useSelector((state: RootState) => state.global.restaurantId);
  const tableId = useSelector((state: RootState) => state.global.tableId);
  const { restaurantData } = useRestaurantProfile(restaurantId); 
  const { menuData } = useAllMenus(restaurantId);
  

  const { categoryRefs, tabListRef, activeCategory, isTabListFixed, handleTabClick } = useScrollManager(menuData?.data ?? []);


  if (!menuData  || !restaurantData) {
    return <LinearProgress/>;
  }

  const categories = menuData?.data.map((menu) => menu?.category || 'default-category');

  return (
    <ThemeProvider theme={theme}>
      <MenuPageStyle>
        <MenuHero logoUUID={restaurantData?.data.logoIds[1]} backgroundImageUUID={restaurantData?.data.logoIds[0]} name={restaurantData?.data.name} />
        <div ref={tabListRef}>
          <TabList
            categories={categories}
            activeCategory={activeCategory}
            onTabClick={handleTabClick}
            isFixed={isTabListFixed}
          />
        </div>

        {/* Menu Items */}
        <div className="menu-container">
          {menuData?.data.map((menuData) => (
            <div
              key={menuData._id}
              className="menu-category"
              ref={(el) => {
                categoryRefs.current[menuData.category] = el;
              }}
            >
              <h2>{menuData.category}</h2>
              <div className="menu-items">
                {menuData.items.map((menuItem) => (
                  <MenuItem
                    key={menuItem._id}
                    name={menuItem.name}
                    description={menuItem.description}
                    price={menuItem.price}
                    id={menuItem._id}
                    logoIds={menuItem.logoIds}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </MenuPageStyle>
    </ThemeProvider>
  );
}
