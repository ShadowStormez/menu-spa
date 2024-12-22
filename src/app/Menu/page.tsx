'use client';

import { useScrollManager } from './hooks/useScrollManager';
import { MenuPageStyle } from './page.Style';
import MenuHero from './components/MenuHero/MenuHero';
import TabList from './components/Tablist/Tablist';
import { ThemeProvider,LinearProgress } from '@mui/material';
import theme from '../Theme/theme';
import MenuItem from './components/MenuItem/MenuItem';

import { useSelector } from 'react-redux';
import { RootState } from '../store'; 

// utils
import useRestaurantProfile from '@/app/utils/useRestaurantProfile';
import useAllMenus from '@/app/utils/useAllMenus';
import useMenuItem from '@/app/utils/useMenuItem';


export default function Menu() {
  const restaurantId = useSelector((state: RootState) => state.global.restaurantId);
  const tableId = useSelector((state: RootState) => state.global.tableId);
  const { restaurantData } = useRestaurantProfile(restaurantId); 
  const { menuData } = useAllMenus(restaurantId);
  const { menuItems } = useMenuItem(restaurantId);

  const { categoryRefs, tabListRef, activeCategory, isTabListFixed, handleTabClick } = useScrollManager(menuData ?? []);


  // if (!menuData || !menuItems || !restaurantData) {
  //   return <LinearProgress/>;
  // }

  const categories = menuData?.map((menu) => menu?.category || 'default-category');

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
          {menuData?.map((menuData) => (
            <div
              key={menuData.id}
              className="menu-category"
              ref={(el) => {
                categoryRefs.current[menuData.category] = el;
              }}
            >
              <h2>{menuData.category}</h2>
              <div className="menu-items">
                {menuItems?.map((menuItem) => (
                  <MenuItem
                    key={menuItem.id}
                    name={menuItem.item.name}
                    description={menuItem.item.description}
                    price={menuItem.item.price}
                    id={menuItem.id}
                    images={menuItem.item.logoIds}
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
