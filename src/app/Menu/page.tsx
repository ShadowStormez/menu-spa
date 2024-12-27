'use client'
import React, { useEffect, useState } from 'react';
import { useScrollManager } from './hooks/useScrollManager';
import { MenuPageStyle } from './page.Style';
import MenuHero from './components/MenuHero/MenuHero';
import TabList from './components/Tablist/Tablist';
import { ThemeProvider, LinearProgress } from '@mui/material';
import theme from '../Theme/theme';
import MenuItem from './components/MenuItem/MenuItem';
import Sidebar from './components/Sidebar/Sidebar';
import useRestaurantProfile from '@/app/utils/useRestaurantProfile';
import useAllMenus from '@/app/utils/useAllMenus';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import SignUpModal from '../components/SignUp/SignUpModal';
import { useAuth } from '../hooks/useAuth';
import { setShowSignUpModal, setShowLoginModal } from '../store/logSignSlice';
import LoginModal from '../components/Login/loginModal';

export default function Menu() {
  const restaurantId = useSelector((state: RootState) => state.global.restaurantId);
  const { restaurantData } = useRestaurantProfile(restaurantId);
  const { menuData } = useAllMenus(restaurantId);
  const dispatch = useDispatch();
  const { showSignUpModal, showLoginModal } = useSelector((state: any) => state.logSign);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { categoryRefs, tabListRef, activeCategory, isTabListFixed, handleTabClick } =
    useScrollManager(menuData?.data ?? []);

  const { handleLogin, handleSignUp } = useAuth();

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [isSidebarOpen]);

  if (!menuData || !restaurantData) {
    return <LinearProgress />;
  }

  const categories = menuData?.data.map((menu) => menu?.category || 'default-category');

  return (
    <ThemeProvider theme={theme}>
      <MenuPageStyle>
        <MenuHero
          logoUUID={restaurantData?.data.logoIds[1]}
          backgroundImageUUID={restaurantData?.data.logoIds[0]}
          name={restaurantData?.data.name}
          onUserIconClick={() => setIsSidebarOpen(true)}
        />
        <div ref={tabListRef}>
          <TabList
            categories={categories}
            activeCategory={activeCategory}
            onTabClick={handleTabClick}
            isFixed={isTabListFixed}
          />
        </div>

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

        {isSidebarOpen && (
          <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
        )}

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLoginClick={() => dispatch(setShowLoginModal(true))}
        />

        <SignUpModal
          open={showSignUpModal}
          onClose={() => dispatch(setShowSignUpModal(false))}
          onSignUp={handleSignUp}
          onShowLogin={() => {
            dispatch(setShowSignUpModal(false));
            dispatch(setShowLoginModal(true));
          }}
        />

        <LoginModal
          open={showLoginModal}
          onClose={() => dispatch(setShowLoginModal(false))}
          onLogin={handleLogin}
          onShowSignUp={() => {
            dispatch(setShowLoginModal(false));
            dispatch(setShowSignUpModal(true));
          }}
        />
      </MenuPageStyle>
    </ThemeProvider>
  );
}
