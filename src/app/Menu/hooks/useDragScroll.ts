import { useState, useRef } from 'react';

export const useDragAndTouchScroll = () => {
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle the mouse down event
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tabListRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tabListRef.current.offsetLeft);
    setScrollLeft(tabListRef.current.scrollLeft);
    tabListRef.current.style.cursor = 'grabbing';  // Change cursor to grabbing
  };

  // Handle the mouse move event
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabListRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabListRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed adjustment
    tabListRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle the mouse up event
  const handleMouseUp = () => {
    if (tabListRef.current) {
      setIsDragging(false);
      tabListRef.current.style.cursor = 'grab'; // Reset cursor
    }
  };

  // Handle mouse leave event to stop dragging
  const handleMouseLeave = () => {
    if (tabListRef.current) {
      setIsDragging(false);
      tabListRef.current.style.cursor = 'grab'; // Reset cursor
    }
  };

  // Handle the touch start event (for touch devices)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!tabListRef.current) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setStartX(touch.pageX - tabListRef.current.offsetLeft);
    setScrollLeft(tabListRef.current.scrollLeft);
    tabListRef.current.style.cursor = 'grabbing'; // Change cursor on touch
  };

  // Handle the touch move event (for touch devices)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !tabListRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.pageX - tabListRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed adjustment
    tabListRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle touch end event (for touch devices)
  const handleTouchEnd = () => {
    if (tabListRef.current) {
      setIsDragging(false);
      tabListRef.current.style.cursor = 'grab'; // Reset cursor
    }
  };

  return {
    tabListRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
