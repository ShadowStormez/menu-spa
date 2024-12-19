'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'; // Import Suspense
import React, { useEffect } from 'react';
import Hero from "./components/Hero/Hero";
import HomeCard from "./components/HomeCard/HomeCard";
import { HomePageStyle } from "./page.Style";
import { menu, AI } from "@/app/assets/icons";
import { useDispatch } from 'react-redux';
import { setRestaurantId, setTableId } from './store/globalSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store'; 

//mui
import { Typography, LinearProgress } from '@mui/material';

// utils
import useRestaurantProfile from '@/app/utils/useRestaurantProfile';

function HomeSearch() {
  const searchParams = useSearchParams();
  const dispatch=useDispatch()
  
  useEffect(() => {
    const restaurantId = searchParams.get('restaurantId');
    const tableId = searchParams.get('tableId');

    if (restaurantId) {
      dispatch(setRestaurantId(restaurantId));
    }

    if (tableId) {
      dispatch(setTableId(Number(tableId)));
    }
  }, [searchParams, dispatch]);

  return null;
}

export default function Home() {
  
  const restaurantId = useSelector((state: RootState) => state.global.restaurantId);
  const { restaurantData,error,loading } = useRestaurantProfile(restaurantId); 

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <HomeSearch />
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
