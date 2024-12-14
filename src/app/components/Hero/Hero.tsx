'use client'
import { ReactTyped } from "react-typed";
import { HeroStyle } from "./Hero.Style";

interface HeroProps {
  restaurantName?: string | undefined;
}
const Hero= ({ restaurantName }: HeroProps)=> {
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
  }
  export default Hero