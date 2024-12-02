'use client'
import { ReactTyped } from "react-typed";
import { HeroStyle } from "./Hero.Style";
export default function Hero() {
    return (
        <HeroStyle>  
            <div className="Hero-Container">
        <ReactTyped
          strings={['👋...به منیو خوش آمدید']}
          typeSpeed={40}
          backSpeed={50}
          loop={false}
          className="text-2xl mt-7"
        />
      </div>
      </HeroStyle>
    
    );
  }