import React, { useState } from 'react';
import photo from "../../assets/register.png"; // مسیر تصویر خود را وارد کنید
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass,setConfirmPass] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
        name,
        email,
        birthday:dob,
        idCard:idNumber,
        password,
        passwordConfirm:confirmPass
    }
    if (password !== confirmPass) {
        alert("رمز عبور و تکرار آن یکسان نیست!");
        return;
    }
    try{
       const res = await axios ({
        url:"http://127.0.0.1:5000/api/v1/auth/sign-up/email",
        method:"POST",
        data:payload,
       })
       const data = await res;
       console.log("yes")
    }
    catch(error){
        console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="flex max-w-6xl w-full bg-white">
            
            {/* باکس فرم سمت راست */}
            <div className="flex-1 p-8 space-y-6 shadow-lg rounded-3xl">
            <h2 className="text-2xl text-center font-bold text-blue-700 mb-6">ثبت‌نام بیمار جدید</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* email*/}
                <div className="mb-4 col-span-2">
                <label htmlFor="email" className="block text-sm text-gray-700">ایمیل</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                    placeholder="مثال: hello@gmial.com"
                    required
                />
                </div>

                {/* رمز عبور */}
                <div className="mb-4">
                <label htmlFor="password" className="block text-sm text-gray-700">رمز عبور</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                    placeholder="رمز عبور خود را وارد کنید"
                    required
                />
                </div>

                {/* تایید رمز عبور */}
                <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm text-gray-700">تایید رمز عبور</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                    placeholder="رمز عبور را تایید کنید"
                    required
                />
                </div>
                <div className='col-span-2'>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white p-3 rounded-3xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >  
                        ایجاد حساب کاربری
                    </button>
                </div>   
            </form>
            <div className='text-center'>
                <p className='mt-4 mb-4 text-blue-700 curser:point'>ایجاد حساب با رمز یبار مصرف</p>
                <Link to={'/user'}><p className='text-sm mt-4'>حساب کاربری دارید؟<span className='text-sm text-blue-700 cursor-pointer'>اینجا کلیک کنید.</span></p></Link>
            </div>
            </div>

            {/* باکس عکس سمت چپ */}
            <div className="flex-shrink-0 w-1/2 flex justify-center items-center">
            <img src={photo} alt="Nurse" className="w-[552px] mx-auto" />
            </div>
        </div>
    </div>
  );
};

export default RegisterForm;



