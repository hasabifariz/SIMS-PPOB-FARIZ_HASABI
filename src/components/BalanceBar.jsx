import React, { useState } from 'react'
import { getProfile } from '../services/ProfileService';
import { getBalance } from '../services/TransactionService';
import { useQuery } from '@tanstack/react-query';
import PhotoProfile from '../../src/assets/Profile Photo.png'
import BGSaldo from '../../src/assets/Background Saldo.png'
import { rupiahFormatter } from '../utils/rupiahFormatter';

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
    <div className='grid grid-cols-12 gap-2 px-10 md:px-20 lg:px-50'>
      <div className='col-span-12 lg:col-start-1 lg:col-end-6 flex flex-col justify-center items-center lg:justify-between lg:items-start py-4'>
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={(dataProfile?.data?.profile_image?.split("/").pop() === "null" ? PhotoProfile : dataProfile?.data?.profile_image)} />
          </div>
        </div>
        <div className='w-full'>
          <p className='md:text-xl lg:text-2xl mt-5'>Selamat datang,</p>
          <p className='text-xl md:text-4xl lg:text-5xl font-bold'>{dataProfile?.data?.first_name} {dataProfile?.data?.last_name}</p>
        </div>
      </div>
      <div className='col-span-12 lg:col-start-6 lg:col-end-13 bg-cover bg-center bg-no-repeat md:h-[250px] rounded-2xl' style={{ backgroundImage: `url(${BGSaldo})` }}>
        <div className="grid grid-cols-2 md:grid-cols-1 items-center gap-2 md:gap-9 p-2 md:p-7 md:pl-10">
          <div className='md:space-y-8'>
            <p className="text-xs md:text-xl lg:text-2xl font-semibold text-white">Saldo anda</p>
            <p className="text-xl md:text-4xl lg:text-5xl font-bold text-white">{showBalance ? rupiahFormatter(dataBalance?.data?.balance) : "Rp •••••••"}</p>
          </div>
          <div className="text-white hover:text-gray-400 cursor-pointer" onClick={() => setShowBalance(!showBalance)}>
            <p className="text-xs text-right md:text-left md:text-xl">Lihat Saldo</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceBar