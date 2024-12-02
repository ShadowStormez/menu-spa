'use client'
import Hero from "./components/Hero/Hero";
import HomeCard from "./components/HomeCard/HomeCard";
import { HomePageStyle } from "./page.Style";
import { menu, AI } from "@/app/assets/icons";

export default function Home() {
  return (
    <HomePageStyle>
      <Hero />
      <div className="HomeCards-Container">
        <HomeCard
          title=""
          link="/Questionnaire"
          whereTo="مشاهده منو"
          imageSrc={menu}
        />
        <HomeCard
          title="نمی دونی دلت چی میخواد؟"
          whereTo="بیا اینجا"
          link="/page2"
          imageSrc={AI}

        />
      </div>
      </HomePageStyle>
  );
}
