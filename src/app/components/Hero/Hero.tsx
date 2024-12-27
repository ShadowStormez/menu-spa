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
              strings={[`به <span style="color: var(--secondary-color); font-weight: bold;">${restaurantName}</span> خوش آمدید`]}
              typeSpeed={40}
              backSpeed={50}
              loop={false}
              showCursor={false}
            />
            <ReactTyped
              strings={['👋']}
              typeSpeed={100}
              backSpeed={50}
              loop={false}
              showCursor={false}
              startDelay={2000} // Delay to sync with the previous text
            />
          </>
        ) : null}
      </div>
    </HeroStyle>
  );
};

export default Hero;
