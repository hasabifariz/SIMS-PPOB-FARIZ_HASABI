import React, { useState } from 'react'
import { getProfile } from '../services/ProfileService';
import { getBalance } from '../services/TransactionService';
import { useQuery } from '@tanstack/react-query';
import PhotoProfile from '../../src/assets/Profile Photo.png'
import BGSaldo from '../../src/assets/Background Saldo.png'

const BalanceBar = () => {
  const [showBalance, setShowBalance] = useState(false)

  const { data: dataProfile, isLoading: isLoadingProfile, isError: isErrorProfile, error: errorProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: dataBalance, isLoading: isLoadingBalance, isError: isErrorBalance, error: errorBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });

  return (
    <div className='grid grid-cols-12 gap-2 px-10 md:px-50'>
      <div className='col-span-12 md:col-start-1 md:col-end-6 flex flex-col justify-between py-4'>
        <img src={PhotoProfile} alt="" className='w-20 h-20' />
        <div>
          <p className='text-2xl mt-5'>Selamat datang,</p>
          <p className='text-4xl font-bold'>{dataProfile?.data?.first_name} {dataProfile?.data?.last_name}</p>
        </div>
      </div>
      <div className="col-span-12 md:col-start-6 md:col-end-13 relative">
        <img src={BGSaldo} alt="" className=" w-full h-full md:h-[200px] md:w-[800px]" />
        <div className='absolute top-2 md:top-6 left-5 md:left-10 text-white z-10 md:space-y-4 space-y-0.5'>
          <p className='text-sm md:text-xl lg:text-2xl font-semibold'>
            Saldo anda
          </p>
          <p className='text-xl md:text-4xl lg:text-5xl font-bold'>
            Rp {showBalance ? dataBalance?.data?.balance : "•••••••"}
          </p>
        </div>
        <div className='absolute bottom-1 md:bottom-8.75 left-5 md:left-10 text-white hover:text-gray-400 z-10 cursor-pointer hidden md:block' onClick={() => setShowBalance(!showBalance)}>
          <p className='text-sm md:text-xl'>Lihat Saldo</p>
        </div>
      </div>
    </div>
  )
}

export default BalanceBar