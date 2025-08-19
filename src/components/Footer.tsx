"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Cloud from "@/app/assets/icons/Cloud.png";
import InstagramIcon from "@/app/assets/icons/instagram.png";
import GoogleMapsIcon from "@/app/assets/icons/google-maps.png";
import { FooterContainer, FooterCloud } from "./Footer.style";
interface FooterProps {
  address?: string;
}

export default function Footer({ address }: FooterProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to the bottom of the page
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If we're within 100px of the bottom, show the footer cloud
      if (documentHeight - scrollPosition < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Initial check in case page is already at bottom
    handleScroll();

    // Clean up event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <FooterContainer>
      {/* Placeholder div to maintain footer height even when cloud is not visible */}
      <div style={{ height: '50vh' }}></div>
      
      <FooterCloud isVisible={isVisible}>
        <div style={{ position: 'relative' }}>
          <Image 
            src={Cloud} 
            alt="Footer cloud" 
            width={640} 
            height={320} 
            priority 
            style={{ width: "100%", height: "auto" }} 
          />
          <div className="footer-content">
            <p className="footer-address">
              📍<span className="highlight">آدرس:</span> {address ?? "گیشا-نبش قدرتی-پلاک ۳۰"}
            </p>
            <p className="footer-phone">
              <span className="highlight">تلفن:</span>{" "}
              <a href="tel:+982144448888" className="phone-link">۴۴۴۴۸۸۸۸</a>
            </p>
            <div className="footer-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image src={InstagramIcon} width={32} height={32} alt="instagram" />
            </a>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              <Image src={GoogleMapsIcon} width={32} height={32} alt="google-maps" />
      
            </a>
          </div>

          </div>
        </div>
      </FooterCloud>
    </FooterContainer>
  );
}