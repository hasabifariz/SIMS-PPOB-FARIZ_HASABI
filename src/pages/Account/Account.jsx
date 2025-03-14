import React, { useEffect, useState } from 'react'
import { getProfile, updatePhotoProfile, updateProfile } from '../../services/ProfileService';
import { useMutation, useQuery } from '@tanstack/react-query';
import PhotoProfile from '../../assets/Profile Photo.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { showToast } from '../../utils/toaster';
import { Link, useNavigate } from 'react-router-dom';
import { editProfileSchema } from './editProfileSchema';
import { ToastContainer } from 'react-toastify';

const Account = () => {
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  })

  const { data: dataProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  useEffect(() => {
    if (dataProfile?.data) {
      setValue("first_name", dataProfile.data.first_name);
      setValue("last_name", dataProfile.data.last_name);
    }
  }, [dataProfile, setValue]);

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      showToast("Update Profile Berhasil!", "success");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    },
    onError: (error) => {
      console.error("Update Failed:", error);
      showToast(error?.response?.data?.message, "error");
    },
  });

  const imageMutation = useMutation({
    mutationFn: updatePhotoProfile,
    onSuccess: () => {
      showToast("Foto profil berhasil diperbarui!", "success");
      refetch(); // Refresh profile data
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || "Gagal mengupdate foto!", "error");
    },
  });


  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    mutation.mutate(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const formData = new FormData();
      formData.append("file", file);
      imageMutation.mutate(formData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    showToast("Berhasil Logout!", 'success')
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }


  return (
    <div className="flex flex-col items-center gap-4 min-h-screen pt-20 md:pt-30 px-10 md:px-20 lg:px-50">
      {/* Avatar Preview */}
      <label htmlFor="avatarInput" className="relative cursor-pointer">
        <img
          src={dataProfile?.data?.profile_image?.split("/").pop() === 'null' ? PhotoProfile : dataProfile?.data?.profile_image}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
        />
        {/* Edit Icon */}
        <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a1.5 1.5 0 0 1 2.121 0l1.53 1.53a1.5 1.5 0 0 1 0 2.121l-9.878 9.879a2.25 2.25 0 0 1-1.06.594l-3.86.972a.75.75 0 0 1-.91-.91l.972-3.86a2.25 2.25 0 0 1 .594-1.06l9.879-9.878z"
            />
          </svg>
        </div>
      </label>
      <h1 className='text-4xl font-bold'>{dataProfile?.data?.first_name} {dataProfile?.data?.last_name}</h1>
      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-4 w-full mt-10 space-y-4'>
        <div className="w-full md:w-[600px] space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <label className="input w-full flex items-center gap-2">
            <svg width="20" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
              <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input id="email" name='email' placeholder="Masukkan email Anda" value={dataProfile?.data?.email} disabled />
          </label>
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="w-full md:w-[600px] space-y-2">
          <label htmlFor="first_name" className="block text-sm font-medium">
            Nama Depan
          </label>
          <input
            {...register("first_name")}
            id="first_name"
            placeholder="Nama depan"
            disabled={!isEdit}
            className="input w-full md:w-[600px]"
          />
          {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
        </div>

        <div className="w-full md:w-[600px] space-y-2">
          <label htmlFor="last_name" className="block text-sm font-medium">
            Nama Belakang
          </label>
          <input
            {...register("last_name")}
            id="last_name"
            placeholder="Nama belakang"
            disabled={!isEdit}
            className="input w-full md:w-[600px]"
          />
          {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message}</p>}
        </div>
        {isEdit && (
          <button className="btn w-full md:w-[600px]  bg-red-600 text-white" id='submit' type='submit'>
            Simpan
          </button>
        )}
      </form>
      {!isEdit && (
        <button className="btn w-full md:w-[600px] bg-red-600 text-white mt-4" id='edit' type='button' onClick={() => setIsEdit(true)}>
          Edit Profil
        </button>
      )}
      <button className={`btn w-full md:w-[600px] bg-white border-red-600 text-red-600 ${isEdit && 'hidden'}`} type='button' onClick={handleLogout}>
        Logout
      </button>
      <ToastContainer />
    </div>
  )
}

export default Account