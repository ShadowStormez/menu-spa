"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { TablistStyle } from "./Tablist.Style";
import IcedIcon from "@/app/assets/icons/IcedCoffee-min.png";
import { Category } from "@/app/types/all-menus";
import { getImageUrl } from "@/app/utils/getImageUrl";
import Skeleton from '@mui/material/Skeleton';

interface TabListProps {
  categories: Category[];
  activeCategory: string;
  onTabClick: (categoryId: string) => void;
  isLoading?: boolean; // Add loading prop
}

const TabList: React.FC<TabListProps> = ({ 
  categories, 
  activeCategory, 
  onTabClick,
  isLoading = true 
}) => {
  const tablistRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view when it changes
  useEffect(() => {
    if (activeCategory && tablistRef.current) {
      const activeTab = tablistRef.current.querySelector(
        `[data-category-id="${activeCategory}"]`
      );
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }, [activeCategory]);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY <= 10 && activeCategory) {
        onTabClick(""); // Deselect tab
      }
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [activeCategory, onTabClick]);

  // Render skeleton tabs when loading
  if (isLoading) {
    return (
      <TablistStyle>
        <div className="tablist" ref={tablistRef}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="tab">
              <div className="icon-container">
                <Skeleton 
                  variant="rectangular" 
                  width={35} 
                  height={35} 
                  style={{ borderRadius: '50%' }} 
                />
              </div>
              <Skeleton 
                variant="text" 
                width={60} 
                height={20} 
                style={{ marginTop: '4px' }} 
              />
            </div>
          ))}
        </div>
      </TablistStyle>
    );
  }

  return (
    <TablistStyle>
      <div className="tablist" ref={tablistRef}>
        {categories.map((category) => (
          <div
            key={category._id}
            className={`tab ${activeCategory === category._id ? "active" : ""}`}
            onClick={() => onTabClick(category._id)}
            data-category-id={category._id}
          >
            <div className="icon-container">
              <Image
                src={category.logoId && category.logoId !== '' ? getImageUrl(category.logoId) : IcedIcon}
                width={35}
                height={35}
                alt={category.category}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span className="category-name" lang="fa">
              {category.category}
            </span>
          </div>
        ))}
      </div>
    </TablistStyle>
  );
};

export default TabList;