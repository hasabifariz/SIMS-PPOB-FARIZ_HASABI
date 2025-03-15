import React, { useEffect } from 'react'
import BalanceBar from '../../components/BalanceBar'
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { payment } from '../../services/TransactionService';
import { ToastContainer } from 'react-toastify';
import { showToast } from '../../utils/toaster';

const Pembayaran = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.layanan;
  console.log("🚀 ~ Pembayaran ~ data:", data)

  useEffect(() => {
    if (!data) {
      navigate("/home");
    }
  }, [data, navigate]);

  if (!data) return null;

  const mutation = useMutation({
    mutationFn: payment,
    onSuccess: (res) => {
      showToast("Pembayaran Berhasil!", "success", "bottom-left", () => {
        navigate("/home");
      });
    },
    onError: (error) => {
      console.error("Pembayaran Failed:", error);
      showToast(error?.response?.data?.message, 'error')
    },
  });
  const onSubmit = () => {
    const body = {
      service_code: data.service_code,
    }
    mutation.mutate(body);
  };

  return (
    <div className='min-h-screen pt-20 md:pt-30'>
      <BalanceBar />

      <div className=' mt-20 px-10 md:px-20 lg:px-50'>
        <h4 className='text-xl'>PemBayaran</h4>
        <h2 className='font-bold text-2xl'>{data?.service_name}</h2>
        <div className='space-y-4 mt-10'>
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
              <input disabled value={data?.service_tariff ? `Rp. ${data?.service_tariff.toLocaleString("id-ID")}` : ""} />
            </label>
          </div>
          <button className='btn w-full bg-red-500 hover:bg-red-600 text-white' onClick={onSubmit}>Bayar</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Pembayaran