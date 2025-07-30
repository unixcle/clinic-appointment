import React, { useState } from 'react';
import photo from "../../assets/userPage.png";
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

const UserForm: React.FC = () => {
  const [role, setRole] = useState<'patient' | 'assistant' | 'doctor'>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (role: 'patient' | 'assistant' | 'doctor') => {
    setRole(role);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('ایمیل:', email);
    console.log('رمز عبور:', password);
    console.log('نقش کاربر:', role);
    const payload = {
      email,
      password,
    }
    try{
      const res = await axios.post("http://127.0.0.1:5000/api/v1/auth/login/email",payload)
      if(res.data.token){
        alert("ورود با موفقیت انجام شد!");
        navigate("/appointment")
      }   else {
              alert("ورود موفق نبود. توکن دریافت نشد.");
              }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <section>
        <div className='mt-20 mr-40 text-sm'>
          <ul className='flex'>
              <li className="">صفحه اصلی</li>/ 
              <li>صفحه ورود</li>
          </ul>
        </div>
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
            <div className="flex w-full max-w-6xl bg-white rounded-lg">
                
                

                {/* باکس فرم سمت راست */}
                <div className="flex-1 p-8 space-y-6 shadow-lg rounded-3xl">
                <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">خوش آمدید! لطفا وارد حساب خود شوید.</h2>

                <div className="mb-4 flex space-x-4 justify-center border border-gray-400 bg-gray-100 w-[280px] mx-auto py-1 rounded-4xl">
                    <button
                    onClick={() => handleRoleChange('patient')}
                    className={`px-5 py-2 rounded-4xl  ${role === 'patient' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                    بیمار
                    </button>
                    <button
                    onClick={() => handleRoleChange('assistant')}
                    className={`px-4 py-2 rounded-4xl ${role === 'assistant' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                    منشی
                    </button>
                    <button
                    onClick={() => handleRoleChange('doctor')}
                    className={`px-5 py-2 rounded-4xl ${role === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                    دکتر
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 px-6 py-4">
                    <label htmlFor="email" className="block text-sm text-gray-700">ایمیل</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-2xl"
                        placeholder="ایمیل را وارد کنید"
                        required
                    />
                    </div>

                    <div className="px-6 py-4">
                    <label htmlFor="password" className="block text-sm text-gray-700">رمز عبور</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full mt-2 p-3 border border-gray-300 rounded-2xl"
                        placeholder="رمز عبور خود را وارد کنید"
                        required
                    />
                    </div>

                    {role === 'assistant' && (
                    <div className="px-6 py-4">
                        <label htmlFor="assistant-id" className="block text-sm text-gray-700">کد منشی</label>
                        <input
                        type="text"
                        id="assistant-id"
                        name="assistant-id"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-2xl"
                        placeholder="کد منشی را وارد کنید"
                        />
                    </div>
                    )}

                    {role === 'doctor' && (
                    <div className="px-6 py-4">
                        <label htmlFor="doctor-id" className="block text-sm text-gray-700">کد دکتر</label>
                        <input
                        type="text"
                        id="doctor-id"
                        name="doctor-id"
                        className="w-full mt-2 p-3 border border-gray-300 rounded-2xl"
                        placeholder="کد دکتر را وارد کنید"
                        />
                    </div>
                    )}
                    <p className='text-xs mr-6 text-blue-700 mb-6 cursor-pointer'>رمز عبور خود را فراموش کرده اید؟</p>

                    <div className='text-center'>
                        <button
                            type="submit"
                            className="w-[200px] bg-blue-500 text-white p-3 rounded-4xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                            ورود به حساب کاربری 
                        </button>
                        <Link to={'/getOTP'}><p className='text-sm text-blue-700 mt-4 cursor-pointer'>ورود با رمز یکبار مصرف</p></Link>
                        <Link to={'/register'}><p className='text-sm mt-4'>هنوز ثبت نام نکرده اید؟ <span className='text-sm text-blue-700 cursor-pointer'>اینجا کلیک کنید.</span></p></Link>
                    </div>
                </form>
                </div>
                {/* باکس عکس سمت چپ */}
                <div className="flex-shrink-0 w-1/2 items-center">
                <img src={photo} alt="Doctor" className="w-[552px] mx-auto" />
                </div>
            </div>
        </div>
    </section>
  );
};

export default UserForm;
