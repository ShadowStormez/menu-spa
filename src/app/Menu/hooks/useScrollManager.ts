// useScrollManager.ts
import { useState, useEffect, useRef } from 'react';

export const useScrollManager = (menu: { category: string }[]) => {
  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState(menu[0].category);
  const [isTabListFixed, setIsTabListFixed] = useState(false);

  // Track scroll position to toggle fixed TabList and active category
  useEffect(() => {
    const handleScroll = () => {
      if (tabListRef.current) {
        const tabListTop = tabListRef.current.offsetTop;
        setIsTabListFixed(window.scrollY > tabListTop);
      }

      const scrollPosition = window.scrollY;
      for (const category of menu) {
        const section = categoryRefs.current[category.category];
        if (
          section &&
          section.offsetTop <= scrollPosition + 200 &&
          section.offsetTop + section.offsetHeight > scrollPosition + 200
        ) {
          setActiveCategory(category.category);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menu]);

  // Scroll to the category when a tab is clicked
  const handleTabClick = (category: string) => {
    const section = categoryRefs.current[category];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveCategory(category);
    }
  };

  return {
    categoryRefs,
    tabListRef,
    activeCategory,
    isTabListFixed,
    handleTabClick,
  };
};
