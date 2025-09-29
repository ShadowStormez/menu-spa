"use client";

import React from "react";
import { ReactTyped } from "react-typed";
import { FeaturedContainer, ItemImageWrap, FeaturedHeader } from "./Featured.style";
import { Category } from "@/app/types/all-menus";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import IcedAmericano from "@/app/assets/icons/CloudBGe.png";
import { getImageUrl } from "@/app/utils/getImageUrl";

interface FeaturedProps {
  autumnCategory?: Category;
}

const Featured: React.FC<FeaturedProps> = ({ autumnCategory }) => {
  return (
    <FeaturedContainer>
      <FeaturedHeader>
        <ReactTyped
          strings={[
            "آیتم های پاییزی 🍂"
          ]}
          typeSpeed={80}
          backSpeed={30}
        />
      </FeaturedHeader>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 3000, // 3s between slides
          disableOnInteraction: false, // keep autoplay after user drag
        }}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          450: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {autumnCategory?.items.map((item) => {
          const hasPic = item.logoIds?.length && item.logoIds[0] !== "";
          return (
            <SwiperSlide key={item._id}>
              <ItemImageWrap isFallback={!hasPic}>
  {hasPic ? (
    <Image
      src={getImageUrl(item.logoIds![0])}
      alt={item.name}
      fill
      quality={100}
      style={{ objectFit: "cover", borderRadius: "20px" }}
    />
  ) : (
    <Image
      src={IcedAmericano}
      alt="Fallback"
      fill
      quality={100}
      style={{ objectFit: "cover", borderRadius: "20px"}}
    />
  )}

  <div className="card">
    <h3>{item.name}</h3>
  </div>
</ItemImageWrap>

            </SwiperSlide>
          );
        })}
      </Swiper>
    </FeaturedContainer>
  );
};

export default Featured;
