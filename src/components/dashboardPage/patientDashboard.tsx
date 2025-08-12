// components/PatientDashboard.tsx

"use client";
//components
import Dashcomponent from "./dashComponent";
import VisitsComponent from "./visitsComponent";
import UpdateInfoForm from "./updateInfoForm";


//svg Icons
import  nobat from "../../svg/nobat.svg";
import nobat1 from "../../svg/nobat1.svg";
import patientIcon from "../../assets/patientIcon.png";
import medicalInfo from "../../svg/medical-information.svg";
import logout from "../../svg/logout.svg";
import { Pencil } from "lucide-react";


import axios from "axios";
import { useEffect, useState } from "react";
//context
import { useUser } from "../../contexts/userContext";
import PassChangeComponent from "./passChangeComponent";

const PatientDashboard = () => {
  const [myVisits, setMyVisits] = useState([]);
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"dashboard" | "visits" | "update" | "pass">(
    "dashboard"
  );

  const fetchVisit = async () => {
    try {
      // const token = Cookies.get("token");
      const res = await axios.get(
        "http://127.0.0.1:5000/api/v1/visits/patient",
        {
          withCredentials:true,
        },
      );
      if (res.status === 200) {
        setMyVisits(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVisit();
  }, []);


  if (!user) return <div className="p-8">در حال بارگذاری اطلاعات کاربر...</div>;
  return (
    <div className="h-1/2 flex flex-col md:flex-row gap-6 px-28 py-8">
      {/* Sidebar */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full md:max-w-xs space-y-6">
        <div className="">
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
              <p className="font-bold mt-1">{user.name}</p>
              <p className="text-sm text-gray-500">مراجع کننده</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 text-right text-based text-gray-700 p-8">
          <div
            className={`flex items-center justify-start gap-3 cursor-pointer ${
              activeTab === "dashboard" ? "text-blue-600 font-bold" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <img src={nobat} alt="dashboard" />
            <span>داشبورد</span>
          </div>
          <div
            className={`flex items-center justify-start gap-3 cursor-pointer ${
              activeTab === "visits" ? "text-blue-600 font-bold" : ""
            }`}
            onClick={() => setActiveTab("visits")}
          >
            <img src={nobat1} alt="dashboard" />
            <span>نوبت‌های من</span>
          </div>
          <div className="flex items-center justify-start gap-3">
            <img src={medicalInfo} alt="nobat" />
            <span>نسخه‌های من</span>
          </div>
          <div
            className={`flex items-center justify-start gap-3 cursor-pointer ${
              activeTab === "update" ? "text-blue-600 font-bold" : ""
            }`}
            onClick={() => setActiveTab("update")}
          >
            <img src={nobat1} alt="dashboard" />
            <span>تغییر اطلاعات</span>
          </div>
          <div
            className={`flex items-center justify-start gap-3 cursor-pointer ${
              activeTab === "pass" ? "text-blue-600 font-bold" : ""
            }`}
            onClick={() => setActiveTab("pass")}
          >
            <Pencil className="w-5 h-5 text-grey-600" />
            <span>تغییر رمز عبور</span>
          </div>
        </div>

        <button className="flex items-center justify-center w-full text-red-500 text-sm mt-4">
          <span>خروج از حساب</span>
          <img src={logout} alt="logout" />
        </button>
      </div>

      {/* Main content */}
      {activeTab === "dashboard" && (<Dashcomponent myVisits={myVisits}/>)}
      {activeTab === "visits" && (<VisitsComponent myVisits={myVisits}/>)}
      {activeTab === "update" && (<UpdateInfoForm/>)}
      {activeTab === "pass" && (<PassChangeComponent/>)}
      
    </div>
  );
};

export default PatientDashboard;
