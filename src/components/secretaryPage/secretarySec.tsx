"use client";

import { useEffect, useState } from "react";
import { Search, Pencil, Check, X, RefreshCcw } from "lucide-react";
import axios from "axios";

import nobat from "../../svg/nobat.svg";
import nobat1 from "../../svg/nobat1.svg";
import patientIcon from "../../assets/patientIcon.png";
import expriment from "../../svg/expriment.svg";
import logout from "../../svg/logout.svg";
import RegisterV from "../../svg/register-visit.svg";
import RegisterPay from "../../svg/register-pay.svg";
import invoice from "../../svg/invoice.svg";

type Visit = {
  _id: string;
  patient: { name: string; phone: string } | string;
  doctor: string;
  closed: boolean;
  dateTime: string;
};

export default function SecretarySec() {
  const [appointments, setAppointments] = useState<any[]>([]);

  const fetchVisits = async () => {
    try {
      // const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://127.0.0.1:5000/api/v1/visits/doctor/today",
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials:true,
        }
      );

      const visits: Visit[] = res.data.data;
      console.log(visits);

      const formatted = visits.map((visit) => {
        const date = new Date(visit.dateTime);
        const time = date.toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        return {
          id: visit._id,
          name:
            typeof visit.patient === "object"
              ? visit.patient.name
              : "بیمار نامشخص",
          phone:
            typeof visit.patient === "object" ? visit.patient.phone : "نامشخص",
          time: time || "بدون زمان", // 👈 ساعت به‌جای تاریخ کامل
          status: visit.closed ? "تایید شده" : "در انتظار تایید",
          doctor: visit.doctor,
        };
      });

      setAppointments(formatted);
    } catch (error) {
      console.error("خطا در دریافت نوبت‌ها:", error);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  return (
    <div className="h-1/2 flex flex-col md:flex-row gap-6 px-28 py-8">
      {/* Sidebar */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full md:max-w-xs space-y-6">
        <div>
          <p className="text-blue-700 font-semibold text-lg text-center">
            خوش آمدید!
          </p>
          <div className="flex justify-center items-center mt-4">
            <img
              src={patientIcon}
              alt="PatientIcon"
              className="w-[64px] h-[64px]"
            />
            <div>
              <p className="font-bold mt-1">مارال تهرانی</p>
              <p className="text-sm text-gray-500">منشی مطب</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-right text-base text-gray-700 p-8">
          {[
            [nobat, "داشبورد"],
            [nobat1, "لیست نوبت ها"],
            [RegisterV, "ثبت بیمار جدید"],
            [RegisterPay, "ثبت پرداخت"],
            [expriment, "ارسال نتیجه آزمایش"],
            [invoice, "گزارش ها"],
          ].map(([icon, label], idx) => (
            <div key={idx} className="flex items-center justify-start gap-3">
              <img src={icon} alt={label.toString()} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <button className="flex items-center justify-center w-full text-red-500 text-sm mt-4">
          <span>خروج از حساب</span>
          <img src={logout} alt="logout" />
        </button>
      </div>

      {/* Main content */}
      <div className="p-6 w-full mx-auto">
        {/* Header Stats */}
        <div className="flex justify-between text-sm md:text-base mb-6">
          <span>
            تعداد نوبت‌های امروز: <strong>۲۴</strong>
          </span>
          <span className="text-green-600">نوبت‌های تاییدشده: ۱۸ ✅</span>
          <span className="text-red-600">نوبت‌های لغوشده: ۳ ❌</span>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center px-6 py-4 border-b gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none"
                placeholder="جستجو بر اساس نام یا کد ملی"
              />
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            <div className="flex-1 text-center">
              <h2 className="text-lg font-semibold">جدول نوبت‌ها</h2>
            </div>

            <div className="flex-1">
              <select
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                defaultValue=""
                onChange={(e) => console.log("فیلتر:", e.target.value)}
              >
                <option value="">همه وضعیت‌ها</option>
                <option value="تایید شده">تایید شده</option>
                <option value="لغو شده">لغو شده</option>
                <option value="در انتظار تایید">در انتظار تایید</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
            <table className="w-full text-right text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-2">نوبت</th>
                  <th className="px-4 py-2">نام بیمار</th>
                  <th className="px-4 py-2">ساعت</th>
                  <th className="px-4 py-2">شماره تماس</th>
                  <th className="px-4 py-2">وضعیت نوبت</th>
                  <th className="px-4 py-2">اقدامات</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item, idx) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.time}</td>
                    <td className="px-4 py-2">{item.phone}</td>
                    <td className="px-4 py-2 text-green-600">{item.status}</td>
                    <td className="px-4 py-2 flex items-center gap-2 justify-end">
                      {item.status === "در انتظار تایید" && (
                        <>
                          <button className="text-green-600 hover:text-green-800">
                            <Check size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <X size={16} />
                          </button>
                        </>
                      )}
                      {item.status === "تایید شده" && (
                        <button className="text-indigo-600 hover:text-indigo-800">
                          <Pencil size={16} />
                        </button>
                      )}
                      {item.status === "لغو شده" && (
                        <button className="text-blue-600 hover:text-blue-800">
                          <RefreshCcw size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex justify-center">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={() => console.log(appointments)}
            >
              افزودن نوبت دستی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
