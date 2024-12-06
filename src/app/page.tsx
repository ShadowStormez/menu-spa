'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Hero from "./components/Hero/Hero";
import HomeCard from "./components/HomeCard/HomeCard";
import { HomePageStyle } from "./page.Style";
import { menu, AI } from "@/app/assets/icons";

export default function Home() {
  const searchParams = useSearchParams(); // Get query parameters

  const tableId = searchParams.get('tableId'); // Get the tableId from the query parameters

  useEffect(() => {
    if (tableId) {
      // Handle tableId here
      console.log(`Table ID received: ${tableId}`);

      // Example: Pass the tableId to a backend or perform actions based on the tableId
    }
  }, [tableId]);

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
