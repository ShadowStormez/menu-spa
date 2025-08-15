"use client";

import { useEffect, useState } from "react";
import { ScrollButton } from "./ScrollToTopButton.style";
import { Up } from "@/app/assets/icons";
import Image from "next/image";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ScrollButton onClick={scrollToTop} isVisible={isVisible}>
      <Image src={Up} alt="Scroll to top" width={30} height={30} />
    </ScrollButton>
  );
}
