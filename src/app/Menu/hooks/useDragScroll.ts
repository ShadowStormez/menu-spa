// useDragScroll.ts
import { useRef,useState } from 'react';

export const useDragScroll = () => {
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle mouse down event
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tabListRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tabListRef.current.offsetLeft);
    setScrollLeft(tabListRef.current.scrollLeft);
    tabListRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !tabListRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabListRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    tabListRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    if (tabListRef.current) {
      setIsDragging(false);
      tabListRef.current.style.cursor = 'grab';
    }
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    if (tabListRef.current) {
      setIsDragging(false);
      tabListRef.current.style.cursor = 'grab';
    }
  };

  return {
    tabListRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  };
};
