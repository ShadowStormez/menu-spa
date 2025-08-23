import styled from "@emotion/styled";
import { clouds } from "@/app/assets/icons";

/* In your CategorySection styles */
export const CategorySectionContainer = styled.section`
  scroll-margin-top: 100px; /* Add this to prevent sticky header from overlapping */
  width: 100%;
  padding: 12px 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  direction: rtl;
  font-family: var(--font-vazirmatn);
  overflow: visible; /* Add this */
`;

export const CategoryHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  margin-left: auto; /* ✅ Pushes it to the right */
`;



export const CategoryHeader = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
  align-items: center;
  gap: 0;
  margin: 8px 0 14px 0;
  width: 100%;
`;

export const HeaderLine = styled.div`
  flex-grow: 1;
  min-width: 40px;
  height: 0;
  border-top: 2px dashed #FDE047;
`;

export const HeaderDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #FDE047;
  flex-shrink: 0;
`;


export const HeaderTitle = styled.span`
  color: #FDE047;
  margin-right: 10px;
  font-weight: 700;
  font-size: 26px;
  white-space: nowrap;
  overflow: visible;
`;




export const ItemCard = styled.div<{ isActive?: boolean }>`
  width: 90vw;
  height:350px;
  padding: 10px;
  border-radius: 50px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.06),
    0 12px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 2px rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: 12px;
  direction: ltr;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: perspective(1000px) rotateX(1deg);

  ${({ isActive }) =>
    isActive ?
    `
    background: #fef9c3; /* Light yellow */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: perspective(1000px) rotateX(1deg) scale(1.02);
    
  `
    : `
      background: #fff;
    `
}

&::before {
  content: "";
  position: absolute;
  right: -20px;
  bottom: -25px;
  width: 400px;
  height: 220px;
  background-image: url(${clouds.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center right;
  z-index: 0;
  pointer-events: none;
  transform: translate3d(0, 0, 0);
  transition: opacity 0.3s ease, filter 0.3s ease;
  backface-visibility: hidden;
  will-change: opacity, filter;
  opacity: ${({ isActive }) => (isActive ? 0.6 : 0.9)};
  filter: ${({ isActive }) =>
    `drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) ${
      isActive ? 'hue-rotate(45deg) brightness(1.2)' : ''
    }`};
}




  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 946px) {
    height:450px;
  }


  @media (max-width: 640px) {
    flex-direction: column;
    height: auto;
    gap: 40px;
    &::before {
      background-position: bottom right;
      background-size: contain;
    }
  }
`;



export const ItemImageWrap = styled.div`
  width: 30%;
  border-radius: 50px;
  overflow: hidden;
  background: #fff;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* ✅ above background */

  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.06),
    0 4px 12px rgba(0, 0, 0, 0.1);

    @media (max-width: 1100px) {
    width: 50%;
  }

  @media (max-width: 640px) {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1; /* Maintain square aspect ratio */
  }
`;

export const ItemContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 15px;
  direction: rtl;
  z-index: 1; /* ✅ above background */

  @media (max-width: 640px) {
    width: 100%;
    min-height:150px;
    padding: 16px;
    align-items: flex-start;
  }
`;

export const ItemTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(to right, #0284C7, #38BDF8);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
  margin: 0;
  text-align: right;
`;

export const ItemDesc = styled.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0;
  text-align: right;
`;

export const Selector = styled.div`
  margin-top: 6px;
  color:#0284C7;
`;

export const SelectorLabel = styled.div`
  font-size: 18px;
  color: #0284C7;
  margin-bottom: 6px;
  text-align: right;
`;

export const SelectorButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 16px;
  font-weight: 500;
`;

export const SelectorButton = styled.button<{ active?: boolean }>`
  position: relative;
  z-index: 1;
  border-radius: 9999px;
  padding: 6px 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: ${({ active }) => (active ? '#FDE047' : 'rgb(223, 195, 60,0.1)')};
  color: ${({ active }) => (active ? '#000' : 'rgb(230, 200, 60)')};
  border: 1px solid ${({ active }) => (active ? 'none' : 'rgb(223, 195, 60,0.1)')};
  box-shadow: ${({ active }) =>
    active ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'};

`;

export const Price = styled.div`
  margin-top: 4px;
  font-weight: 700;
  font-size: 20px;
  text-align: right;
  background: linear-gradient(to right, #0284C7, #38BDF8);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

export const BottomDialog = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 60vh;
  background: linear-gradient(to top, #cceeff, #e6f7ff); /* subtle gradient for depth */
  border-radius: 24px 24px 0 0;
  box-shadow:
    0 -4px 12px rgba(0, 0, 0, 0.1),
    inset 0 8px 16px rgba(255, 255, 255, 0.3); /* inner glow for lifted look */
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  transition: transform 0.3s ease;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  perspective: 1000px; /* enables 3D transforms */

  &::before {
    content: "";
    position: absolute;
    right: -20px;
    bottom: -25px;
    width: 400px;
    height: 220px;
    background-color: #fff;
    mask-image: url(${clouds.src});
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-position: center right;
    z-index: 0;
    opacity: 0.95;
    filter:
    drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))
    drop-shadow(-2px 2px 4px rgba(0, 0, 0, 0.1)); /* layered shadows */
    transform: rotateX(5deg) rotateY(-3deg); /* slight tilt for 3D illusion */
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
    transform: translateZ(20px); /* lift content forward */
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%) scale(0.95);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
`;

export const DialogContent = styled.div`
  flex: 1;
  padding: 40px 16px 0 16px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;




export const DialogImageWrap = styled.div`
  width: 100%;
  max-height: 350px;
  margin-bottom: 16px;
  border-radius: 50px;
  background: #fff;
  height: auto;
  aspect-ratio: 16 / 9; /* Maintain aspect ratio */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; 

  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.06),
    0 4px 12px rgba(0, 0, 0, 0.1);
`;


export const DialogHandle = styled.div`
  width: 40px;
  height: 6px;
  background: #d1d5db;
  border-radius: 3px;
  margin: 0 auto 12px auto;
  cursor: grab;
`;



