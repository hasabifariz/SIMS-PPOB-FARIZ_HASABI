import React, { useEffect, useState } from 'react'
import LoginIllust from '../../assets/Illustrasi Login.png'
import Logo from '../../assets/Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from './loginSchema'
import { useForm } from 'react-hook-form'
import { login } from '../../services/LoginService'
import { useMutation } from '@tanstack/react-query'
import { showToast } from '../../utils/toaster'
import { ToastContainer } from 'react-toastify'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
  }, []);

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("isAuthenticated", true)
      showToast("Berhasil Login!", "success", "bottom-left", () => {
        navigate("/home");
      });
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      showToast(error?.response?.data?.message, 'error')
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <section className="bg-white" >
      <div className="h-screen lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src={LoginIllust}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6" >
          <div className="max-w-xl lg:max-w-3xl flex flex-col justify-center items-center">
            <div className='flex justify-center items-center gap-2'>
              <img src={Logo} alt="" width={25} height={25} />
              <h1 className="pb-1 text-xl font-semibold sm:text-2xl ">
                SIMS PPOB
              </h1>
            </div>
            <h2 className="mt-4 font-semibold text-2xl">
              Masuk atau buat akun untuk memulai
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full mt-10' onKeyDown={(e) => e.key === "Enter" && handleSubmit(onSubmit)()} >
              <div>
                <label className="input w-full">
                  <svg width="20" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input {...register("email")} placeholder="masukkan email anda" className='active:outline-none active:border-none focus:outline-none focus:border-none'/>
                </label>
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>
              <div>
                <label className="input w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    width="20"
                    height="16"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3h-6V7zm3 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
                    />
                  </svg>
                  <input type="password" {...register("password")} placeholder='masukkan password anda' className='active:outline-none active:border-none focus:outline-none focus:border-none'/>
                </label>
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>
              <button className="btn w-full bg-red-600 text-white" type='submit'>
                Masuk
              </button>
              <div className='text-center'>
                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  {"Belum punya akun? registrasi "}
                  <Link to={'/register'} className="font-semibold text-red-500"> disini</Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer />
    </section >
  )
}

export default Login