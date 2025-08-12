import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

export default function UpdateInfoForm() {
  // یک state برای همه فیلدها
  const [formData, setFormData] = useState({
    name: "",
    idCard: "",
    birthday: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
  };
  const handleSubmit = async ()=>{
    // const token = Cookies.get("token")
    const isoBirthDate = new Date(formData.birthday).toISOString();
    try{
      const res= await axios.patch("http://127.0.0.1:5000/api/v1/users/update-account",
        {
          name:formData.name,
          idCard:formData.idCard,
          birthday:isoBirthDate,
          phone:formData.phone,
          password:formData.password,
          confirmPassword:formData.confirmPassword,
        },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials:true,
        }
      )
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex-1 p-8 space-y-6 shadow-lg rounded-3xl">
        <h2 className="text-2xl text-center font-bold text-blue-700 mb-6">
          تغییر اطلاعات
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={()=>handleSubmit()}>
          {/* نام و نام خانوادگی */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-gray-700">
              نام و نام خوانوادگی
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              placeholder="مثال: علی"
              required
            />
          </div>

          {/* شماره موبایل */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm text-gray-700">
              شماره موبایل
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              placeholder="مثال: 09123456789"
              required
            />
          </div>

          {/* کد ملی */}
          <div className="mb-4">
            <label htmlFor="idCard" className="block text-sm text-gray-700">
              کد ملی
            </label>
            <input
              type="text"
              id="idCard"
              name="idCard"
              value={formData.idCard}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              placeholder="کد ملی"
              required
            />
          </div>

          {/* تاریخ تولد */}
          <div className="mb-4">
            <label htmlFor="birthday" className="block text-sm text-gray-700">
              تاریخ تولد
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-3 rounded-3xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ثبت اطلاعات
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
