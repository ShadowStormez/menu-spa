"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { VariableSizeList as List } from "react-window";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuStyle from "./page.style";
import { LinearProgress } from "@mui/material";
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
  const [isReady, setIsReady] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const headerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<List>(null);
  const itemHeights = useRef<number[]>([]);
  const categoryOffsets = useRef<number[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const listContainerRef = useRef<HTMLDivElement>(null);
  
  const { restaurantData } = useRestaurantProfile(DEFAULT_RESTAURANT_ID);
  const { menuData } = useAllMenus(DEFAULT_RESTAURANT_ID);
  const finalMenuData = menuData?.data?.length ? menuData : toyMenuData;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (listContainerRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });
      resizeObserver.observe(listContainerRef.current);
      // Set initial size
      setSize({
        width: listContainerRef.current.clientWidth,
        height: listContainerRef.current.clientHeight,
      });
      return () => resizeObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    if (finalMenuData?.data) {
      const heights: number[] = [];
      const offs: number[] = [];
      let currentOffset = 0;
      finalMenuData.data.forEach(category => {
        // Estimate height based on number of items
        const headerHeight = 80; // Approximate height of the category header
        const itemHeight = 120; // Approximate height of an item card
        const h = headerHeight + category.items.length * itemHeight;
        heights.push(h);
        offs.push(currentOffset);
        currentOffset += h;
      });
      itemHeights.current = heights;
      categoryOffsets.current = offs;
    }
  }, [finalMenuData]);

  const getItemSize = (index: number) => itemHeights.current[index] || 0;

  const handleTabClick = (categoryId: string) => {
    if (finalMenuData?.data && listRef.current) {
      const index = finalMenuData.data.findIndex(c => c._id === categoryId);
      if (index !== -1) {
        listRef.current.scrollToItem(index, 'start');
      }
    }
  };

  const handleListScroll = ({ scrollOffset }: { scrollOffset: number }) => {
    // Determine active category based on scroll offset
    let index = 0;
    for (let i = 0; i < categoryOffsets.current.length; i++) {
      if (categoryOffsets.current[i] <= scrollOffset + 1) {
        index = i;
      } else {
        break;
      }
    }
    const activeId = finalMenuData?.data[index]?._id;
    if (activeId && activeId !== activeCategory) {
      setActiveCategory(activeId);
    }
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const category = finalMenuData!.data[index];
    return (
      <div style={style}>
        <CategorySection
          title={category.category}
          items={category.items}
          categoryId={category._id}
        />
      </div>
    );
  };
  
  return (
    <div style={{ position: "relative" }}>
      {!isReady && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#0284c7",
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
              backgroundColor: "#60a5fa",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ffffff",
              },
            }}
          />
        </div>
      )}
      <div
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.4s ease-in-out",
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <MenuStyle>
          <Header ref={headerRef} logoId={restaurantData?.data?.logoIds?.[0]} />
          <TabList
            categories={finalMenuData?.data || []}
            activeCategory={activeCategory}
            onTabClick={handleTabClick}
          />
          <div ref={listContainerRef} style={{ flex: 1, willChange: 'transform' }}>
            {size.width > 0 && (
              <List
                ref={listRef}
                height={size.height}
                width={size.width}
                itemCount={finalMenuData?.data?.length || 0}
                itemSize={getItemSize}
                onScroll={handleListScroll}
                estimatedItemSize={450} // An average estimate
              >
                {Row}
              </List>
            )}
          </div>
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
