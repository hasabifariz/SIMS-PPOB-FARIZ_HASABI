import React, { useState } from 'react'
import BalanceBar from '../../components/BalanceBar'
import { rupiahFormatter } from '../../utils/rupiahFormatter';
import { topupSchema } from './topupSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { topUp } from '../../services/TransactionService';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { showToast } from '../../utils/toaster';
import { useNavigate } from 'react-router-dom';

const Topup = () => {
  const topUpOptions = [10000, 20000, 50000, 100000, 250000, 500000];
  const [isDisabled, setIsDisabled] = useState(true)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(topupSchema) });
  const handleTopupOptionsBtn = (value) => {
    setIsDisabled(false)
    setValue('amount', value)
    setRawValue(Number(value))
  }
  const [rawValue, setRawValue] = useState("");

  const handleOnChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value) {
      setRawValue(Number(value));
      setValue("amount", Number(value));
      setIsDisabled(false);
    } else {
      setRawValue("");
      setValue("amount", "");
      setIsDisabled(true);
    }
  };
  const mutation = useMutation({
    mutationFn: topUp,
    onSuccess: (res) => {
      showToast("Top Up Berhasil!", "success", "bottom-left", () => {
        navigate("/home");
      });
    },
    onError: (error) => {
      console.error("Top Up Failed:", error);
      showToast(error?.response?.data?.message, 'error')
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className='min-h-screen pt-20 md:pt-30'>
      <BalanceBar />

      <div className=' mt-20 px-10 md:px-20 lg:px-50'>
        <h4 className='text-2xl'>Silahkan masukkan</h4>
        <h2 className='font-bold text-5xl'>Nominal Top Up</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
          <div className="md:col-start-9 md:col-end-12 order-1 md:order-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {
              topUpOptions.map((item, index) => (
                <div key={index} className="flex justify-center items-center">
                  <button className="btn w-[130px] bg-white text-slate-700 border border-gray-300" onClick={() => handleTopupOptionsBtn(item)} disabled={watch('amount') === item}>
                    {rupiahFormatter(item)}
                  </button>
                </div>
              ))
            }
          </div>

          <div className="md:col-start-1 md:col-end-9 order-2 md:order-1">
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div>
                <label className="input w-full">
                  <svg
                    width="20px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">  <path d="M6 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>  <path d="M20.8333 9H18.2308C16.4465 9 15 10.3431 15 12C15 13.6569 16.4465 15 18.2308 15H20.8333C20.9167 15 20.9583 15 20.9935 14.9979C21.5328 14.965 21.9623 14.5662 21.9977 14.0654C22 14.0327 22 13.994 22 13.9167V10.0833C22 10.006 22 9.96726 21.9977 9.9346C21.9623 9.43384 21.5328 9.03496 20.9935 9.00214C20.9583 9 20.9167 9 20.8333 9Z" stroke="currentColor" strokeWidth="1.5"  ></path>  <path d="M20.965 9C20.8873 7.1277 20.6366 5.97975 19.8284 5.17157C18.6569 4 16.7712 4 13 4L10 4C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H13C16.7712 20 18.6569 20 19.8284 18.8284C20.6366 18.0203 20.8873 16.8723 20.965 15" stroke="currentColor" strokeWidth="1.5"  ></path>  <path d="M17.9912 12H18.0002" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g>
                  </svg>
                  <input
                    {...register('amount')}
                    type="text" placeholder='masukkan nominal top up'
                    value={rawValue ? `Rp. ${rawValue.toLocaleString("id-ID")}` : ""}
                    onChange={handleOnChange}
                    onKeyDown={(e) => {
                      if (!/[\d]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                        e.preventDefault();
                      }
                    }}
                    className='active:outline-none active:border-none focus:outline-none focus:border-none'
                  />
                </label>
                {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
              </div>
              <button className='btn w-full bg-red-500 hover:bg-red-600 text-white' type='submit' disabled={isDisabled || errors.amount}>Top Up</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Topup