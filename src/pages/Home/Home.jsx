import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { layanan, promo } from '../../services/LayananService';
import { useRef } from 'react';
import BalanceBar from '../../components/BalanceBar';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate()

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

  const { data: dataLayanan, isLoading: isLoadingLayanan, } = useQuery({
    queryKey: ["layanan"],
    queryFn: layanan,
  });

  const { data: dataPromo, isLoading: isLoadingPromo, } = useQuery({
    queryKey: ["promo"],
    queryFn: promo,
  });

  const handlePaymentLayanan = (layanan) => {
    navigate(`/payment`, {
      state: {
        layanan: layanan
      }
    })
  }

  return (
    <div className='min-h-screen pt-20 md:pt-30'>

      <BalanceBar />

      {/* Layanan  */}
      <div className='flex flex-wrap items-center mt-20 gap-10 px-10 md:px-20 lg:px-50'>
        {isLoadingLayanan ? (
          [...Array(8)].map((_, index) => (
            <div key={index} className="carousel-item p-2 min-w-17">
              <div className="skeleton w-full h-17 rounded-lg"></div>
            </div>
          ))
        ) : (
          dataLayanan?.data?.map((item) => {
            return (
              <div key={item?.service_code} className='cursor-pointer w-13 h-13 md:w-17 md:h-17 hover:scale-110 tooltip' data-tip={item?.service_name} onClick={() => handlePaymentLayanan(item)}>
                <img src={item?.service_icon} alt={item?.service_code} className='w-full h-full object-cover' />
                <p className='text-center text-gray-600 font-semibold truncate text-sm md:text-md px-1'>{item?.service_name}</p>
              </div>
            )
          })
        )}
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
          {isLoadingPromo ? (
            [...Array(3)].map((_, index) => (
              <div key={index} className="carousel-item p-5 min-w-[300px]">
                <div className="skeleton w-full h-[150px] rounded-lg"></div>
              </div>
            ))
          ) : (
            dataPromo?.data?.map((item, index) => (
              <div key={index} className="carousel-item p-5 min-w-[300px]">
                <img
                  src={item?.banner_image}
                  alt={item?.banner_name}
                  className="w-full h-full object-cover rounded-lg hover:scale-105"
                />
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home