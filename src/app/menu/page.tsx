"use client";

import { useEffect, useState, useRef,useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuStyle from "./page.style";
import { LinearProgress, Skeleton } from "@mui/material";
import TabList from "@/components/TabList";
import CategorySection from "@/components/CategorySection";
import Featured from "@/components/Featured";
import useRestaurantProfile from "@/app/utils/useRestaurantProfile";
import useAllMenus from "@/app/utils/useAllMenus";
import toyMenuData from "@/app/utils/toy/data.json";
import ScrollToTopButton from "@/components/ScrollToTopButton";
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
 // Find the category with title "پاییز"
  const autumnCategory = finalMenuData?.data.find(
    (category: Category) => category.category === "پاییز"
  );

  
// In MenuPage component - replace handleTabClick
const handleTabClick = (categoryId: string) => {
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

// Move this useCallback to the top level of your component (after your state declarations)
const handleScroll = useCallback(() => {
  const tabList = document.querySelector('.tablist');

  if (tabListRef.current && tabList) {
    const tabListRect = tabListRef.current.getBoundingClientRect();
    const isFixed = tabListRect.top <= 0;

    if (isFixed) {
      tabList.classList.add('fixed');
    } else {
      tabList.classList.remove('fixed');
      if (activeCategory) {
        setActiveCategory("");
      }
      return;
    }
  }

  // Only check active category when tablist is fixed
  if (tabList?.classList.contains('fixed')) {
    const categories = finalMenuData?.data || [];
    
    // Use requestIdleCallback for non-critical scroll updates
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        updateActiveCategory(categories);
      }, { timeout: 100 });
    } else {
      updateActiveCategory(categories);
    }
  }
}, [finalMenuData, activeCategory,updateActiveCategory]);

// Now your useEffect should look like this:
useEffect(() => {
  let ticking = false;

  const scrollHandler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
  return () => window.removeEventListener('scroll', scrollHandler);
}, [handleScroll]); // Don't forget to add handleScroll as dependency

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
          <Featured
          autumnCategory={autumnCategory}
          />
          <div ref={tabListRef}>
        <TabList 
          categories={finalMenuData?.data || []} 
          activeCategory={activeCategory}
          onTabClick={handleTabClick}
          isLoading={isLoading}
        />
          </div>
     {[...(finalMenuData?.data || [])]
      .sort((a, b) => a.sortPosition - b.sortPosition)
      .map((category) => (
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
    ))}

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
    Coded with ❤️ and ☕️ by{" "}
    <br />
    <a
      href="https://github.com/ShadowStormez"
      style={{
        background: "linear-gradient(to right, #F2C94C, #F2994A)", // Modern browsers
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      ShadowStorme
    </a>{" "}
    &{" "}
    <a
      href="https://github.com/s4j4d"
      style={{
        background: "linear-gradient(to right, #ff4d4d, #cc0000)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      s4j4d
    </a>
  </span>
</div>



    </MenuStyle>
      </div>
    </div>
  );
}


       