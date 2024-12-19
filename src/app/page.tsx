'use client';

import React from 'react';
import Hero from "./components/Hero/Hero";
import HomeCard from "./components/HomeCard/HomeCard";
import { HomePageStyle } from "./page.Style";
import { menu, AI } from "@/app/assets/icons";

//mui
import { Typography, LinearProgress } from '@mui/material';

// utils
import useRestaurantProfile from '@/app/utils/useRestaurantProfile';
import useInitializeParams from '@/app/utils/useInitializeParams';



export default function Home() {
  useInitializeParams();
  const { restaurantData,loading,error } = useRestaurantProfile();

  if (loading) {
    return <LinearProgress />;
  }
  
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  
  if (!restaurantData) {
    return <Typography>No restaurant data available.</Typography>;
  }

  return (
      <>
      <HomePageStyle>
        <Hero restaurantName={restaurantData?.data.name} />
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
      </>
  );
}
