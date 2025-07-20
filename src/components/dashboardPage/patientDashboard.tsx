// components/PatientDashboard.tsx

"use client";
import nobat from "../../svg/nobat.svg"
import nobat1 from "../../svg/nobat1.svg"
import patientIcon from "../../assets/patientIcon.png"
import medicalInfo from "../../svg/medical-information.svg"
import logout from "../../svg/logout.svg"

const PatientDashboard = () => {
  return (
    <div className="h-1/2 flex flex-col md:flex-row gap-6 px-28 py-8">

      {/* Sidebar */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full md:max-w-xs space-y-6">
        <div className="">
          <p className="text-blue-700 font-semibold text-lg text-center">خوش آمدید!</p>
          <div className="flex justify-center items-center mt-4">
            <img src={patientIcon} alt="PatientIcon" className="w-[64px] h-[64px]" />
            <div>
                <p className="font-bold mt-1">حمید نیکوفهم</p>
                <p className="text-sm text-gray-500">مراجع کننده</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 text-right text-based text-gray-700 p-8">
          <div className="flex items-center justify-start gap-3">
            <img src={nobat} alt="dashboard"/>
            <span>داشبورد</span>
          </div>
          <div className="flex items-center justify-start gap-3">
            <img src={nobat1} alt="dashboard"/>
            <span>نوبت‌های من</span>
          </div>
          <div className="flex items-center justify-start gap-3">
            <img src={medicalInfo} alt="nobat" />
            <span>نسخه‌های من</span>
          </div>
        </div>

        <button className="flex items-center justify-center w-full text-red-500 text-sm mt-4">
          <span>خروج از حساب</span>
          <img src={logout} alt="logout" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-6">

        {/* نوبت بعدی */}
        <div className="bg-blue-600 text-white rounded-xl p-6 space-y-4 shadow-md">
          <p className="flex items-center justify-between">
            <span className="font-semibold text-lg">نوبت بعدی</span>
            {/* <FaCalendarAlt className="text-white" /> */}
          </p>
          <p className="text-center text-xl font-bold">1404/04/10 ساعت 10:30</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full hover:bg-blue-100">
              تغییر تاریخ نوبت
            </button>
            <button className="bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-full hover:bg-red-200">
              لغو نوبت
            </button>
          </div>
        </div>

        {/* آخرین نسخه */}
        <div className="bg-white rounded-xl p-6 shadow-md space-y-3 text-right">
          <p className="font-semibold text-lg">آخرین نسخه</p>
          <p className="text-gray-600">نسخه تجویز شده در تاریخ 1404/03/25</p>
          <p className="text-sm text-green-600">وضعیت: فعال</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            داروها: استامینوفن 500 - هر 6 ساعت <br />
            ایبوپروفن 400 - عدد 1 (روز)
          </p>
          <button className="mt-2 text-blue-600 font-semibold hover:underline">
            مشاهده جزئیات نسخه
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
