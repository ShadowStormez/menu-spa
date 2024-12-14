import React, { useEffect } from 'react';
import { TablistStyle } from './Tablist.Style';
import Image, { StaticImageData } from "next/image";
import { maincourse, appetizer, dessert, beverages } from '@/app/assets/icons';
import { useDragAndTouchScroll } from '../../hooks/useDragScroll'; // import the custom hook

interface TabListProps {
  categories: string[] | undefined;
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

  const categoryImages: { [key: string]: string | StaticImageData } = {
    'اصلی': maincourse,
    "پیش غذا": appetizer,
    'دسر': dessert,
    "نوشیدنی‌": beverages,
  };

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
            key={category}
            className={`tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onTabClick(category)}
          >
            <div className="icon-container">
              <Image src={categoryImages[category]} width={35} height={35} alt="category-icon" />
            </div>
            {/* Only show category name when the tab is active */}
            <span className="category-name">
              {category}
            </span>
          </button>
        ))}
      </div>
    </TablistStyle>
  );
};

export default TabList;
