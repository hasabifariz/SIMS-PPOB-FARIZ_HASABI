import React, { useState } from 'react'
import BalanceBar from '../../components/BalanceBar'
import { getHistory } from '../../services/TransactionService';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { dateFormatter } from '../../utils/dateFormatter';
import { rupiahFormatter } from '../../utils/rupiahFormatter,js';

const Transaction = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["transactionHistory"],
    queryFn: ({ pageParam = 0 }) => getHistory({ offset: pageParam, limit: 5 }),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.flatMap(page => page.data.records).length;
      return lastPage?.data?.records?.length ? nextOffset : undefined;
    }
  });

  const dataHistory = data?.pages?.flatMap(page => page.data.records) || [];
  console.log("🚀 ~ Transaction ~ dataHistory:", dataHistory)

  return (
    <div className='min-h-screen pt-20 md:pt-30'>
      <BalanceBar />

      <div className='mt-20 gap-10 px-10 md:px-20 lg:px-50'>
        <p className='font-bold text-xl'>Semua Transaksi</p>
        {
          dataHistory?.map((item, index) => (
            <div className='border border-slate-200 rounded-xl p-5 mt-4 space-y-1'>
              <div className='flex justify-between items-center'>
                <h4 className={`font-semibold text-2xl ${item?.transaction_type?.toLowerCase() === 'topup' ? 'text-green-400' : 'text-red-400'} `}> {item?.transaction_type?.toLowerCase() === 'topup' ? '+' : '-'} {rupiahFormatter(item?.total_amount)}</h4>
                <p className=' text-xs text-gray-700'>{item?.description}</p>
              </div>
              <p className='text-xs text-slate-400'>{dateFormatter(item?.created_on)}</p>
            </div>
          ))
        }
        {dataHistory?.length === 0 && !isLoading ?
          <p className='text-center text-slate-400 font-extralight mt-4'>Maaf tidak ada history transaksi saat ini</p>
          :
          (
            <div className='flex justify-center items-center w-full m-4 mb-10'>
              <p className='font-semibold text-red-500 text-lg cursor-pointer' onClick={fetchNextPage}>Show more</p>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Transaction