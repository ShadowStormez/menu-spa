"use client";

import { useEffect, useState, useRef,useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuStyle from "./page.style";
import { LinearProgress, Skeleton } from "@mui/material";
import TabList from "@/components/TabList";
import CategorySection from "@/components/CategorySection";
import useRestaurantProfile from "@/app/utils/useRestaurantProfile";
import useAllMenus from "@/app/utils/useAllMenus";
import toyMenuData from "@/app/utils/toy/data.json";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import supportsEmoji from "../utils/SupportsEmoji";
import { Category } from "../types/all-menus";

// Default restaurant ID
const DEFAULT_RESTAURANT_ID = "c7f3a9e2-1b4d-4f8e-9a6c-7d2e3b9f1c84";

export default function MenuPage() {
  const [isReady, setIsReady] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const categoryRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const tabListRef = useRef<HTMLDivElement | null>(null);
  
 const { restaurantData, isLoading: isRestaurantLoading } = useRestaurantProfile(DEFAULT_RESTAURANT_ID);
 const { menuData, isLoading: isMenuLoading } = useAllMenus(DEFAULT_RESTAURANT_ID);

 const isLoading = isRestaurantLoading || isMenuLoading;
 const finalMenuData = menuData?.data?.length ? menuData : toyMenuData;

  
// In MenuPage component - replace handleTabClick
const handleTabClick = (categoryId: string) => {
  if (!categoryId) return; // Do nothing if categoryId is empty
  const element = categoryRefs.current[categoryId];
  if (element) {
    // Direct scroll instead of smooth scroll through all items
      element.scrollIntoView({ block: 'start' });
  }
};

  
// In MenuPage.tsx - Move useCallback to the top level, outside useEffect



// Separate function for updateActiveCategory
const updateActiveCategory = useCallback((categories: Category[]) => {
  for (const category of categories) {
    const element = categoryRefs.current[category._id];
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        if (activeCategory !== category._id) {
          setActiveCategory(category._id);
        }
        break;
      }
    }
  }
}, [activeCategory]);

// In MenuPage.tsx - Add a new useEffect for scroll handling
useEffect(() => {
  const categories = finalMenuData?.data || [];

  const handleScroll = () => {
    // Use requestIdleCallback for non-critical scroll updates
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        updateActiveCategory(categories);
      }, { timeout: 100 });
    } else {
      updateActiveCategory(categories);
    }
  };

  let ticking = false;
  const throttledScrollHandler = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", throttledScrollHandler, { passive: true });
  return () => window.removeEventListener("scroll", throttledScrollHandler);
}, [finalMenuData, updateActiveCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 800); // adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  
  return (
    <div style={{ position: "relative" }}>
      {/* Loading screen */}
      {!isReady && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#0284c7", // blue background
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <LinearProgress
            sx={{
              width: "100%",
              height: "4px",
              backgroundColor: "#60a5fa", // lighter blue track
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ffffff", // white progress bar
              },
            }}
          />
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.4s ease-in-out",
        }}
      >
        <MenuStyle>
          <Header logoId={restaurantData?.data?.logoIds?.[0]} />
          <div ref={tabListRef}>
        <TabList 
          categories={finalMenuData?.data || []} 
          activeCategory={activeCategory}
          onTabClick={handleTabClick}
          isLoading={isLoading}
        />
          </div>
     {(
        finalMenuData?.data?.map((category) => (
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
            isLoading={isLoading}
          />
        </div>
        ))
      )}
      <Footer address={restaurantData?.data?.address} phone={restaurantData?.data?.phone} />
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
          Made with {supportsEmoji({ emoji: "🩵" }) ? "🩵" : "💙"} in Iran

        </span>
        </div>

    </MenuStyle>
      </div>
    </div>
  );
}


       