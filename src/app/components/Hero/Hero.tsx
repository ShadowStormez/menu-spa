'use client';
import { ReactTyped } from "react-typed";
import { HeroStyle } from "./Hero.Style";

interface HeroProps {
  restaurantName?: string;
}

const Hero = ({ restaurantName }: HeroProps) => {
  return (
    <HeroStyle>
      <div className="Hero-Container">
        {restaurantName ? (
          <>
        
     <ReactTyped
     strings={[`به`]}
     typeSpeed={40}
     backSpeed={50}
     loop={false}
     showCursor={false}
     />
 <span style={{color:'var(--secondary-color)',fontWeight:'bold'}}>{restaurantName}</span>
      <ReactTyped
          strings={[' 👋خوش آمدید']}
          typeSpeed={40}
          backSpeed={50}
          loop={false}
      />
   </>
        ) : (
          null
        )}
      </div>
    </HeroStyle>
  );
};

export default Hero;
