import React, { useEffect } from 'react';
import { TablistStyle } from './Tablist.Style';
import Image, { StaticImageData } from "next/image";
import { maincourse, appetizer, dessert, beverages } from '@/app/assets/icons';
import { useDragAndTouchScroll } from '../../hooks/useDragScroll'; // import the custom hook
import { Category } from '@/app/types/all-menus';

interface TabListProps {
  categories: Category[] | undefined;
  activeCategory: string;
  onTabClick: (category: string) => void;
  isFixed: boolean;
}

const TabList: React.FC<TabListProps> = ({
  categories,
  activeCategory,
  onTabClick,
  isFixed,
}) => {
  const {
    tabListRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useDragAndTouchScroll();

  // Scroll the active tab into view whenever the active category changes
  useEffect(() => {
    const activeTab = tabListRef.current?.querySelector('.tab.active');
    if (activeTab && tabListRef.current) {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start', // Center the active tab horizontally
      });
    }
  }, [activeCategory, tabListRef]);

  return (
    <TablistStyle>
      <div
        ref={tabListRef}
        className={`tablist ${isFixed ? 'fixed' : ''}`}
        onMouseDown={handleMouseDown}  // Bind mouse events
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart} // Bind touch events
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {categories?.map((category) => (
          <button
            key={category.category}
            className={`tab ${activeCategory === category.category ? 'active' : ''}`}
            onClick={() => onTabClick(category.category)}
          >
            <div className="icon-container">
              <Image src={category.logoId} width={35} height={35} alt="category-icon" />
            </div>
            <span className="category-name">
              {category.category}
            </span>
          </button>
        ))}
      </div>
    </TablistStyle>
  );
};

export default TabList;
