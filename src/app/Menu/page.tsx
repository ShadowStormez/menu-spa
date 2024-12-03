// Menu.tsx
'use client'
import { useScrollManager } from './hooks/useScrollManager';
import { MenuPageStyle } from './page.Style';
import MenuHero from './components/MenuHero/MenuHero';
import { MenuHeroBG } from '../assets/images';
import TabList from './components/Tablist/Tablist';
import { ThemeProvider } from '@mui/material';
import theme from '../Theme/theme';
import { menu } from './components/menuData';
import MenuItem from './components/MenuItem/MenuItem';

export default function Menu() {
  const { categoryRefs, tabListRef, activeCategory, isTabListFixed, handleTabClick } = useScrollManager(menu);

  const categories = menu.map((category) => category.category);

  return (
    <ThemeProvider theme={theme}>
      <MenuPageStyle>
        <MenuHero backgroundImage={MenuHeroBG} />
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
          {menu.map((category) => (
            
            <div
              key={category.category}
              className="menu-category"
              ref={(el) => {
                categoryRefs.current[category.category] = el;
              }}
            >
              <h2>{category.category}</h2>
              <div className="menu-items">
                {category.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    category={item.category}
                    id={item.id}
                    imageBackground={item.imageBackground}
                    imageUncropped={item.imageUncropped}
                    imageDefault={item.imageDefault}
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
