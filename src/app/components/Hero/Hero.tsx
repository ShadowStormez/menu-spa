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
         <div className="react-typed-container">
            <ReactTyped
                strings={[`به`]}
                typeSpeed={40}
                backSpeed={50}
                loop={false}
            />
            <span style={{color:'var(--secondary-color)'}}>{restaurantName}</span>
            <ReactTyped
                strings={['👋خوش آمدید']}
                typeSpeed={40}
                backSpeed={50}
                loop={false}
            />
        </div>
        ) : (
          null
        )}
      </div>
    </HeroStyle>
  );
};

export default Hero;
