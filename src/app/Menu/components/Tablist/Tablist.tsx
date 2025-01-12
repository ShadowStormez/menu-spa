import React, { useEffect } from 'react';
import { TablistStyle } from './Tablist.Style';
import Image from "next/image";
import { useDragAndTouchScroll } from '../../hooks/useDragScroll';
import { Category } from '@/app/types/all-menus';
import { getImageUrl } from '@/app/utils/getImageUrl';

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
        inline: 'start',
      });
    }
  }, [activeCategory, tabListRef]);

  return (
    <TablistStyle>
      <div
        ref={tabListRef}
        className={`tablist ${isFixed ? 'fixed' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {categories?.map((category) => {
          const categoryImage = getImageUrl(category.logoId);

          return (
            <button
              key={category.category}
              className={`tab ${activeCategory === category.category ? 'active' : ''}`}
              onClick={() => onTabClick(category.category)}
            >
              <div className="icon-container">
                {categoryImage && (
                <Image
                loader={() => categoryImage} // Ensures remote images work
                src={categoryImage}
                width={35}
                height={35}
                alt="category-icon"
              />
                )}
              </div>
              <span className="category-name">{category.category}</span>
            </button>
          );
        })}
      </div>
    </TablistStyle>
  );
};

export default TabList;
