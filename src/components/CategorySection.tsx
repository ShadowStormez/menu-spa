"use client";

import { useState,useEffect, memo } from "react";
import Image from "next/image";
import IcedAmericano from "@/app/assets/icons/LogoFinal.png";
import { getImageUrl } from "@/app/utils/getImageUrl";
import { Item } from "@/app/types/all-menus";
import styled from "@emotion/styled";
import {
  CategorySectionContainer,
  CategoryHeaderContainer,
  CategoryHeader,
  HeaderLine,
  HeaderDot,
  HeaderTitle,
  ItemCard,
  ItemImageWrap,
  ItemContent,
  ItemTitle,
  ItemDesc,
  Selector,
  SelectorLabel,
  SelectorButtons,
  SelectorButton,
  Price,
  DialogImageWrap,
  BottomDialog,
  DialogContent,
} from "./CategorySection.style";
import { Left, Down, Caramel, Chocolate, Coconut, Cookie, Hazelnut, Irish, Vanilla } from "@/app/assets/icons"; // Import left and down icons

interface CategorySectionProps {
  title: string;
  items: Item[];
  categoryId: string;
}

// Items that need flavor dropdown
const FLAVOR_DROPDOWN_ITEMS = ["هات چاکلت","فراپاچینو","آیس لاته","لاته"
];

// Flavor options
const FLAVOR_OPTIONS = [
  { name: "وانیل", icon: Vanilla },
  { name: "آیریش", icon: Irish },
  { name: "نارگیل", icon: Coconut },
  { name: "شکلات", icon: Chocolate },
  { name: "کارامل", icon: Caramel },
  { name: "فندق", icon: Hazelnut },
  { name: "کوکی", icon: Cookie },
];
// Styled overlay and dialog
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
`;



const DialogHandle = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 6px;
  background-color: #ccc;
  border-radius: 3px;
`;


// Accordion state for flavor dropdown
type AccordionState = {
  [itemId: string]: boolean;
};

const CategorySection = ({ title, items, categoryId }: CategorySectionProps) => {
  // State to track selected options for each item
  const [selectedOptions, setSelectedOptions] = useState<{ [itemId: string]: number }>(() => {
  const defaults: { [itemId: string]: number } = {};
  items.forEach(item => {
    defaults[item._id] = 0; // default to first option
  });
  return defaults;
});
  const [selectedFlavors, setSelectedFlavors] = useState<{[itemId: string]: string}>({});

  // Dialog state
  const [openDialogId, setOpenDialogId] = useState<string|null>(null);

  useEffect(() => {
  if (openDialogId) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  // Cleanup in case component unmounts while dialog is open
  return () => {
    document.body.style.overflow = "auto";
  };
}, [openDialogId]);
  // Accordion state
  const [accordion, setAccordion] = useState<AccordionState>({});

  // Handle selector button click
  const handleSelectorClick = (itemId: string, optionIndex: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [itemId]: optionIndex
    }));
  };

  // Handle flavor selection
  const handleFlavorChange = (itemId: string, flavor: string) => {
    setSelectedFlavors(prev => ({
      ...prev,
      [itemId]: flavor
    }));
    // If "هیچکدوم" is selected, close accordion
    if (flavor === "هیچکدوم") {
      setAccordion(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // Check if item needs flavor dropdown
  const needsFlavorDropdown = (itemName: string) => {
    return FLAVOR_DROPDOWN_ITEMS.some(keyword => itemName.includes(keyword));
  };

  const getFlavorOptions = (itemName: string) => {
    if (itemName.includes("هات چاکلت")) {
      return FLAVOR_OPTIONS.filter(f => ["فندق", "کوکی"].includes(f.name));
    }
    if (itemName.includes("فراپاچینو")) {
      return FLAVOR_OPTIONS.filter(f => ["کارامل", "شکلات", "آیریش"].includes(f.name));
    }
    if (itemName.includes("لاته") || itemName.includes("آیس لاته")) {
      return FLAVOR_OPTIONS;
    }
    return [];
  };

  const formatPrice = (price: string, itemId: string, itemName: string, flavor?: string) => {
    // Remove any non-digit characters
    const cleanPrice = price.replace(/\D/g, '');

    let prices: string[] = [];

    if (cleanPrice.length === 6) {
      // Split into two 3-digit prices
      prices = [cleanPrice.slice(0, 3), cleanPrice.slice(3)];
    } else {
      prices = [cleanPrice];
    }

    const selectedOption = selectedOptions[itemId] || 0;
    let selectedPrice = prices[selectedOption] || prices[0];

    // Add 34 for هات چاکلت flavors, 30 for others
    if (flavor && flavor !== "هیچکدوم") {
      if (itemName.includes("هات چاکلت")) {
        selectedPrice = String(Number(selectedPrice) + 34);
      } else {
        selectedPrice = String(Number(selectedPrice) + 30);
      }
    }

    // Convert to Farsi digits
    const toFarsiDigits = (str: string) =>
      str.replace(/\d/g, d => String.fromCharCode(d.charCodeAt(0) + 1728));

    return `${toFarsiDigits(selectedPrice)} تومان`;
  };


  // Render dialog for item
  const renderDialog = (item: Item) => {
    const flavor = selectedFlavors[item._id];
    const showFlavor = needsFlavorDropdown(item.name);
    const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
  if (typeof window === 'undefined') return; // Prevent SSR crash

  const startY =
    'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

  const handleDragMove = (moveEvent: TouchEvent | MouseEvent) => {
    const currentY =
      'touches' in moveEvent
        ? moveEvent.touches[0].clientY
        : (moveEvent as MouseEvent).clientY;

    const deltaY = currentY - startY;

    if (deltaY > 100) {
      setOpenDialogId(null); // Close if dragged down enough

      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('mousemove', handleDragMove);
    }
  };

  document.addEventListener('touchmove', handleDragMove);
  document.addEventListener('mousemove', handleDragMove);
};

    return (
      <>
        <Overlay onClick={() => setOpenDialogId(null)} />
        <BottomDialog onClick={e => e.stopPropagation()}>
          <DialogContent>
          <DialogHandle onMouseDown={handleDragStart} onTouchStart={handleDragStart} />
          <DialogImageWrap>
            <Image
              src={item.logoIds && item.logoIds.length > 0 && item.logoIds[0] !== '' ? getImageUrl(item.logoIds[0]) : IcedAmericano}
              alt={item.name}
              width={96}
              height={96}
              quality={100} // ✅ max quality
              style={{ width: "100%", height: "100%", objectFit: "none" }}
            />
          </DialogImageWrap>
          <ItemContent>
            <ItemTitle lang="fa">
              {item.name}
              {showFlavor && flavor && flavor !== "هیچکدوم" ? ` ${flavor}` : ""}
            </ItemTitle>
            <ItemDesc>{item.description}</ItemDesc>
            {/* Selector buttons for coffee */}
            {(title === "قهوه سرد" || title === "قهوه گرم" || (title === "تاپینگ" && item.name === "شات اسپرسو")) && (
               <Selector>
                <SelectorLabel>لاین قهوتون چی باشه؟</SelectorLabel>
                <SelectorButtons>
                  <SelectorButton
                    active={selectedOptions[item._id] === 0}
                    onClick={e => {
                      e.stopPropagation();
                      handleSelectorClick(item._id, 0);
                    }}
                  >
                    ۷۰/۳ عربیکا
                  </SelectorButton>
                  <SelectorButton
                    active={selectedOptions[item._id] === 1}
                    onClick={e => {
                      e.stopPropagation();
                      handleSelectorClick(item._id, 1);
                    }}
                  >
                    ۱۰۰ عربیکا
                  </SelectorButton>
                </SelectorButtons>
              </Selector>
            )}
            {/* Accordion for flavors */}

{showFlavor && (
  <div style={{ marginTop: '10px' }} onClick={e => e.stopPropagation()}>
    <div
      style={{ cursor: 'pointer', fontWeight: '500', color: '#0284C7', marginBottom: 4,display: 'flex',fontSize: '18px',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start' }}
      onClick={() => setAccordion(prev => ({ ...prev, [item._id]: !prev[item._id] }))}
    >
      سیروپ<Image
              src={accordion[item._id] ? Down : Left}
              alt="arrow"
              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '4px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px' }}
            />
    </div>

{accordion[item._id] && (
  <div
    style={{
      marginTop: 8,
      direction: 'rtl',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      maxWidth: '100%',
    }}
  >
    {getFlavorOptions(item.name).map((flavor) => {
      const isSelected = selectedFlavors[item._id] === flavor.name;

      const baseColor = "rgb(223, 195, 60)";
      const selectedBg = "#FDE047";
      const selectedText = "#000000";

      return (
        <button
          key={flavor.name}
          onClick={() => handleFlavorChange(item._id, flavor.name)}
          style={{
            padding: '6px 12px',
            borderRadius: '9999px',
            border: isSelected ? 'none' : `1px solid rgb(223, 195, 60,0.1)`,
            backgroundColor: isSelected
              ? selectedBg
              : 'rgb(223, 195, 60,0.1)',
            color: isSelected ? selectedText : baseColor,
            fontWeight: 500,
            cursor: 'pointer',
            maxWidth: '160px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            boxShadow: isSelected ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Image src={flavor.icon} alt={flavor.name} width={20} height={20} />
          {flavor.name}
        </button>
      );
    })}
    {!item.name.includes("فراپاچینو") && (
      <button
        onClick={() => handleFlavorChange(item._id, "هیچکدوم")}
        style={{
            padding: '6px 12px',
            borderRadius: '9999px',
            border: selectedFlavors[item._id] === "هیچکدوم" ? 'none' : `1px solid rgb(223, 195, 60,0.1)`,
            backgroundColor: selectedFlavors[item._id] === "هیچکدوم"
              ? "#FDE047"
              : 'rgb(223, 195, 60,0.1)',
            color: selectedFlavors[item._id] === "هیچکدوم" ? "#000000" : "rgb(223, 195, 60)",
            fontWeight: 500,
            cursor: 'pointer',
            maxWidth: '160px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            boxShadow: selectedFlavors[item._id] === "هیچکدوم" ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
        }}
      >
        هیچکدوم
      </button>
    )}
  </div>
)}




  </div>
)}

            <Price>
              {formatPrice(String(item.price), item._id, item.name, flavor)}
            </Price>
          </ItemContent>
          </DialogContent>
        </BottomDialog>
      </>
    );
  };
  
  

  return (<>
    <CategoryHeaderContainer id={`category-${categoryId}`}>
      <CategoryHeader>
        <HeaderLine />
        <HeaderDot />
        <HeaderTitle>{title}</HeaderTitle>
      </CategoryHeader>
    </CategoryHeaderContainer>
    <CategorySectionContainer>
      {items.map((item) => {
        const flavor = selectedFlavors[item._id];
        const showFlavor = needsFlavorDropdown(item.name);
        const isActive = openDialogId === item._id;
        return (
          <div key={item._id}>
            <ItemCard isActive={isActive} onClick={() => setOpenDialogId(item._id)} style={{ cursor: 'pointer' }}>
              <ItemImageWrap>
                <Image
                  src={item.logoIds && item.logoIds.length > 0 && item.logoIds[0] !== '' ? getImageUrl(item.logoIds[0]) : IcedAmericano}       
                  alt={item.name}
                  width={96}
                  height={96}
                  style={{ width: "100%", height: "100%", objectFit: "none" }}
                />
              </ItemImageWrap>
              <ItemContent>
                <ItemTitle>
                  {item.name}
                  {showFlavor && flavor && flavor !== "هیچکدوم" ? ` ${flavor}` : ""}
                </ItemTitle>
                <ItemDesc>{item.description}</ItemDesc>
                {/* Selector buttons for coffee */}
                {(title === "قهوه سرد" || title === "قهوه گرم" || (title === "تاپینگ" && item.name === "شات اسپرسو")) && (
              <Selector>
                <SelectorLabel>لاین قهوتون چی باشه؟</SelectorLabel>
                <SelectorButtons>
                  <SelectorButton
                    active={selectedOptions[item._id] === 0}
                    onClick={e => {
                      e.stopPropagation();
                      handleSelectorClick(item._id, 0);
                    }}
                  >
                    ۷۰/۳ عربیکا
                  </SelectorButton>
                  <SelectorButton
                    active={selectedOptions[item._id] === 1}
                    onClick={e => {
                      e.stopPropagation();
                      handleSelectorClick(item._id, 1);
                    }}
                  >
                    ۱۰۰ عربیکا
                  </SelectorButton>
                </SelectorButtons>
              </Selector>
                )}
                {/* Accordion for flavors */}
{showFlavor && (
  <div style={{ marginTop: '10px' }} onClick={e => e.stopPropagation()}>
    <div
      style={{ cursor: 'pointer', fontWeight: '400', color: '#0284C7', marginBottom: 4,display: 'flex',fontSize: '18px',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start' }}
      onClick={() => setAccordion(prev => ({ ...prev, [item._id]: !prev[item._id] }))}
    >
      سیروپ<Image
              src={accordion[item._id] ? Down : Left}
              alt="arrow"
              style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '4px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: '5px' }}
            />
    </div>

{accordion[item._id] && (
  <div
    style={{
      marginTop: 8,
      direction: 'rtl',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      maxWidth: '100%',
    }}
  >
    {getFlavorOptions(item.name).map((flavor) => {
      const isSelected = selectedFlavors[item._id] === flavor.name;

      const baseColor = "rgb(223, 195, 60)";
      const selectedBg = "#FDE047";
      const selectedText = "#000000";

      return (
        <button
          key={flavor.name}
          onClick={() => handleFlavorChange(item._id, flavor.name)}
          style={{
            padding: '6px 12px',
            borderRadius: '9999px',
            border: isSelected ? 'none' : `1px solid rgb(223, 195, 60,0.1)`,
            backgroundColor: isSelected
              ? selectedBg
              : 'rgb(223, 195, 60,0.1)',
            color: isSelected ? selectedText : baseColor,
            fontWeight: 500,
            cursor: 'pointer',
            maxWidth: '160px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            boxShadow: isSelected ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Image src={flavor.icon} alt={flavor.name} width={20} height={20} />
          {flavor.name}
        </button>
      );
    })}
    {!item.name.includes("فراپاچینو") && (
        <button
            onClick={() => handleFlavorChange(item._id, "هیچکدوم")}
            style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                border: selectedFlavors[item._id] === "هیچکدوم" ? 'none' : `1px solid rgb(223, 195, 60,0.1)`,
                backgroundColor: selectedFlavors[item._id] === "هیچکدوم"
                  ? "#FDE047"
                  : 'rgb(223, 195, 60,0.1)',
                color: selectedFlavors[item._id] === "هیچکدوم" ? "#000000" : "rgb(223, 195, 60)",
                fontWeight: 500,
                cursor: 'pointer',
                maxWidth: '160px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                boxShadow: selectedFlavors[item._id] === "هیچکدوم" ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
            }}
        >
            هیچکدوم
        </button>
    )}
  </div>
)}




  </div>
)}

                <Price>
                  {formatPrice(String(item.price), item._id, item.name, flavor)}
                </Price>
              </ItemContent>
            </ItemCard>
            {openDialogId === item._id && renderDialog(item)}
          </div>
        );
      })}
    </CategorySectionContainer>
    </>
  );
}

export default memo(CategorySection);

