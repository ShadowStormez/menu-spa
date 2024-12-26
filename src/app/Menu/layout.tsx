'use client';
import React from 'react';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';

const MenuLayout = ({ children }: { children: React.ReactNode }) => {
  return (
          <>
            <ScrollToTopButton/>
            {children}
          </>
  );
}

export default MenuLayout;
