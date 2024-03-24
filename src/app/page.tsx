"use client";
import { login } from "@/api/fetch/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login(e.target.username.value, e.target.password.value);
      router.push('/home');
    } catch (error : any) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      }); 
    }
  }

  return (
    <>
      <div className='flex w-screen h-screen align items-center justify-center'>
      <form className="card flex w-96 h-1/2 rounded-md bg-white items-center justify-center flex-col gap-4"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}
      >
        <h1 className='text-2xl font-bold text-gray-500'>JOB BOARD</h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          required
          value={formData.username}
          onChange={handleInputChange}
          autoComplete='username'
          className='w-60 h-10 rounded-md border-2 border-gray-300 px-2'
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleInputChange}
          autoComplete='current-password'
          className='w-60 h-10 rounded-md border-2 border-gray-300 px-2'
        />
        <button type="submit" className='w-60 h-10 bg-blue-500 rounded-md text-white font-medium hover:bg-blue-600'>Login</button>
      </form>
      </div>  
    </>
  );
}
