'use client';
import { ReactTyped } from "react-typed";
import { HeroStyle } from "./Hero.Style";

interface HeroProps {
  restaurantName?: string;
}

const Hero = ({ restaurantName }: HeroProps) => {
  // Render nothing if restaurantName is undefined
  if (!restaurantName) {
    return null;
  }

  return (
    <HeroStyle>  
      <div className="Hero-Container">
        <ReactTyped
          strings={[`👋به ${restaurantName} خوش آمدید`]}
          typeSpeed={40}
          backSpeed={50}
          loop={false}
          className="text-2xl mt-7"
        />
      </div>
    </HeroStyle>
  );
};

export default Hero;
