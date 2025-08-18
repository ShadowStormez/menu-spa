"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuStyle from "./page.style";
import TabList from "@/components/TabList";
import CategorySection from "@/components/CategorySection";
import useRestaurantProfile from "@/app/utils/useRestaurantProfile";
import useAllMenus from "@/app/utils/useAllMenus";
import toyMenuData from "@/app/utils/toy/data.json";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import supportsEmoji from "../utils/SupportsEmoji";

// Default restaurant ID
const DEFAULT_RESTAURANT_ID = "c7f3a9e2-1b4d-4f8e-9a6c-7d2e3b9f1c84";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const categoryRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const tabListRef = useRef<HTMLDivElement | null>(null);
  
  // Fetch restaurant profile
  const { restaurantData } = useRestaurantProfile(DEFAULT_RESTAURANT_ID);
  
  // Fetch menu data
  const { menuData } = useAllMenus(DEFAULT_RESTAURANT_ID);
  const finalMenuData = menuData?.data?.length ? menuData : toyMenuData;
  
  // Handle tab click to scroll to category
  const handleTabClick = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
useEffect(() => {
  const handleScroll = () => {
    const tabList = document.querySelector('.tablist');

    if (tabListRef.current && tabList) {
      const tabListRect = tabListRef.current.getBoundingClientRect();
      const isFixed = tabListRect.top <= 0;

      if (isFixed) {
        tabList.classList.add('fixed');
      } else {
        // Tab list is unfixed → clear active tab
        tabList.classList.remove('fixed');
        if (activeCategory) {
          setActiveCategory("");
        }
      }
    }

    // Don't try to find active category if tablist isn't fixed
    if (!tabList?.classList.contains('fixed')) {
      return;
    }

    // Update active category based on scroll position
    const categories = finalMenuData?.data || [];
    for (const category of categories) {
      const element = categoryRefs.current[category._id];
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveCategory(category._id);
          break;
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [finalMenuData, activeCategory]);


  
  return (
    <MenuStyle>
      <Header logoId={restaurantData?.data?.logoIds?.[0]} />
      <div ref={tabListRef}>
        <TabList 
          categories={finalMenuData?.data || []} 
          activeCategory={activeCategory}
          onTabClick={handleTabClick}
        />
      </div>
      {finalMenuData?.data?.map((category) => (
        <div 
          key={category._id} 
          ref={(el: HTMLDivElement | null) => {
            categoryRefs.current[category._id] = el;
          }}
        >
          <CategorySection 
            title={category.category} 
            items={category.items} 
            categoryId={category._id}
          />
        </div>
      ))}
      <Footer address={restaurantData?.data?.address} />
      <ScrollToTopButton />
      <div style={{ textAlign: "center", marginTop: "24px", marginBottom: "16px" }}>
        <span
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            padding: "6px 12px",
            fontSize: "18px",
            borderRadius: "8px",
            fontWeight: 500,
            fontFamily: "sans-serif",
            display: "inline-block",
          }}
        >
          Made with love {supportsEmoji({ emoji: "🩵" }) ? "🩵" : "💙"} in Iran

        </span>
        </div>

    </MenuStyle>
  );
}
