import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

export default function PassChangeComponent() {
  const [passData, setPassData] = useState({
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    // const token = Cookies.get("token");
    try {
      const res = axios.patch(
        "http://127.0.0.1:5000/api/v1/auth/update-password",
        {
          currentPassword: passData.currentPassword,
          password: passData.password,
          confirmPassword: passData.confirmPassword,
        },
        {
          withCredentials:true,
        }
      ); 
      alert("رمز عبور با موفقیت تغییر کرد ✅");
      // optionally reset form:
      setPassData({
        password: "",
        confirmPassword: "",
        currentPassword: "",
      });
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex-1 p-8 space-y-6 shadow-lg rounded-3xl">
        <h2 className="text-2xl text-center font-bold text-blue-700 mb-6">
          تغییر رمز عبور
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={() => handleSubmit()}
        >
          {/* رمز فعلی  */}
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm text-gray-700"
            >
              رمز فعلی
            </label>
            <input
              type="Password"
              id="currentPassword"
              name="currentPassword"
              value={passData.currentPassword}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* رمز ورود */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-700">
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={passData.password}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* تایید رمز ورود */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-gray-700"
            >
              تایید رمز عبور
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passData.confirmPassword}
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
