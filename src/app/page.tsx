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
      dispatch(setTableId(tableId));
    }
  }, [searchParams, dispatch]);

  return null;
}

export default function Home() {
  
  const restaurantId = useSelector((state: RootState) => state.global.restaurantId);
  const { restaurantData } = useRestaurantProfile(restaurantId || ''); 

  return (
    <Suspense fallback={<div>Loading...</div>}> {/* Fallback loading UI */}
      <HomeSearch />
      <HomePageStyle>
        <Hero restaurantName={restaurantData?.name} />
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
    </Suspense>
  );
}
