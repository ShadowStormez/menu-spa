import React, { useEffect, useRef } from 'react';
import { TablistStyle } from './Tablist.Style';
import Image from 'next/image';
import { burgerIcon } from '@/app/assets/icons';

interface TabListProps {
  categories: string[];
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
  const tabListRef = useRef<HTMLDivElement | null>(null);

  // Scroll the active tab into view whenever the active category changes
  useEffect(() => {
    const activeTab = tabListRef.current?.querySelector('.tab.active');
    if (activeTab && tabListRef.current) {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center', // Center the active tab horizontally
      });
    }
  }, [activeCategory]); // Triggered whenever the activeCategory changes

  return (
    <TablistStyle>
      <div
        ref={tabListRef}
        className={`tablist ${isFixed ? 'fixed' : ''}`}
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onTabClick(category)}
          >
            <div className="icon-container">
           <Image src={burgerIcon} width={32} height={32} alt='category-icon'></Image>
            </div>
            {/* Only show category name when the tab is active */}
            <span className={`category-name ${activeCategory === category ? 'show' : ''}`}>
              {category}
            </span>
          </button>
        ))}
      </div>
    </TablistStyle>
  );
};

export default TabList;
