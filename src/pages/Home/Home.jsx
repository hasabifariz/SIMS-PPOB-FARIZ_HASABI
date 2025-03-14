import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { layanan, promo } from '../../services/LayananService';
import { useRef } from 'react';
import BalanceBar from '../../components/BalanceBar';

const Home = () => {
  const carouselRef = useRef(null);
  
  const handleDrag = (e) => {
    e.preventDefault();
    const carousel = carouselRef.current;
    let startX = e.pageX || e.touches[0].pageX;
    let scrollLeft = carousel.scrollLeft;
    
    const onMouseMove = (event) => {
      let x = event.pageX || event.touches[0].pageX;
      let walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    };
    
    const stopDragging = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchmove", onMouseMove);
      document.removeEventListener("touchend", stopDragging);
    };
    
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchmove", onMouseMove, { passive: false });
    document.addEventListener("touchend", stopDragging);
  };

  const { data: dataLayanan, isLoading: isLoadingLayanan, isError: isErrorLayanan, error: errorLayanan } = useQuery({
    queryKey: ["layanan"],
    queryFn: layanan,
  });

  const { data: dataPromo, isLoading: isLoadingPromo, isError: isErrorPromo, error: errorPromo } = useQuery({
    queryKey: ["promo"],
    queryFn: promo,
  });

  return (
    <div className='min-h-screen pt-20 md:pt-30'>

      <BalanceBar />

      {/* Layanan  */}
      <div className='flex flex-wrap items-center mt-20 gap-10 px-10 md:px-20 lg:px-50'>
        {
          dataLayanan?.data?.map((item) => {
            return (
              <div key={item?.service_code} className='cursor-pointer w-13 h-13 md:w-17 md:h-17 hover:scale-110 tooltip' data-tip={item?.service_name} >
                <img src={item?.service_icon} alt={item?.service_code} className='w-full h-full object-cover' />
                <p className='text-center text-gray-600 font-semibold truncate text-sm md:text-md px-1'>{item?.service_name}</p>
              </div>
            )
          })
        }
      </div>

      {/* Promo */}
      <div className='mt-20 md:mt-30 gap-10 px-10 md:px-20 lg:px-50'>
        <p className='font-semibold'>Temukan promo menarik</p>
        <div
          ref={carouselRef}
          className="flex gap-3 mt-10 overflow-x-auto carousel scrollbar-hide cursor-pointer active:cursor-grabbing"
          onMouseDown={handleDrag}
          onTouchStart={handleDrag}
        >
          {dataPromo?.data?.map((item, index) => (
            <div key={index} className="carousel-item p-5 min-w-[300px]">
              <img
                src={item?.banner_image}
                alt={item?.banner_name}
                className="w-full h-full object-cover rounded-lg  hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home