"use client";

import React from "react";
import Image from "next/image";
import Cloud from "@/app/assets/icons/Cloud.png";
import LogoFinal from "@/app/assets/icons/LogoFinal.png";
import { HeaderContainer, Clouds, CloudLeft, CloudRight, LogoWrap } from "./Header.style";
import { getImageUrl } from "@/app/utils/getImageUrl";

interface HeaderProps {
  logoId?: string;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({ logoId }, ref) => {
  // Use the logo from API if available, otherwise use default LogoFinal
  const logoSrc = logoId && logoId !== '' ? getImageUrl(logoId) : LogoFinal;
  
  return (
    <HeaderContainer ref={ref}>
      <Clouds>
        <CloudLeft>
          <Image src={Cloud} alt="Cloud left" width={640} height={320} priority style={{ width: "100%", height: "auto" }} />
        </CloudLeft>
        <CloudRight>
          <Image src={Cloud} alt="Cloud right" width={640} height={320} priority style={{ width: "100%", height: "auto" }} />
        </CloudRight>
        <LogoWrap>
          <Image 
            src={logoSrc} 
            alt="Logo" 
            width={220} 
            height={80} 
            priority 
            style={{ width: "min(45vw, 280px)", height: "auto" }} 
          />
        </LogoWrap>
      </Clouds>
    </HeaderContainer>
  );
});

Header.displayName = "Header";

export default Header;


