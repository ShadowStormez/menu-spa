'use client'
import { useState, useEffect, useRef } from 'react';

export const useScrollManager = (menu: { category: string }[]) => {
  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState(menu[0].category);
  const [isTabListFixed, setIsTabListFixed] = useState(false);
  const [isTabClicked, setIsTabClicked] = useState(false); // Track if a tab is clicked

  // Track scroll position to toggle fixed TabList and active category
  useEffect(() => {
    const handleScroll = () => {
      if (tabListRef.current) {
        const tabListTop = tabListRef.current.offsetTop;
        setIsTabListFixed(window.scrollY > tabListTop);
      }

      if (isTabClicked) return; // Skip scroll-based activeCategory update if tab was clicked

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
  }, [menu, isTabClicked]); // Re-run effect when menu changes, but skip when tab is clicked

  const handleTabClick = (category: string) => {
    setIsTabClicked(true); // Mark tab as clicked
    const section = categoryRefs.current[category];
    if (section) {
      setActiveCategory(category); // Set active category directly
  
      // Delay the scroll to ensure the layout is settled
      setTimeout(() => {
        const offsetTop = section.offsetTop; // Get the section's top position relative to the document
        window.scrollTo({
          top: offsetTop - 150, // Adjust by 50px to scroll a bit higher
          behavior: 'smooth',  // Smooth scroll animation
        });
      }, 0); // Delay by 0ms to allow reflow
    }
  };
  
  
  

  // Reset the isTabClicked flag after scroll is finished
  useEffect(() => {
    if (!isTabClicked) return;

    const timeout = setTimeout(() => {
      setIsTabClicked(false); // Reset flag after scroll completes
    }, 500); // Adjust time if needed to match your scroll duration

    return () => clearTimeout(timeout);
  }, [isTabClicked]);

  return {
    categoryRefs,
    tabListRef,
    activeCategory,
    isTabListFixed,
    handleTabClick,
  };
};
