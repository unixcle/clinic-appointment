"use client";


import patientIcon from "../../assets/patientIcon.png";

import link from "../../svg/link.svg";






export default function SideComponent() {
  return (
    <>
      <div className="h-1/2 flex flex-col md:flex-row pr-16 py-8 mx-5">
        {/* Sidebar */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full md:max-w-xs space-y-6">
          <div>
            <div className="flex justify-center items-center mt-4">
              <img
                src={patientIcon}
                alt="PatientIcon"
                className="w-[64px] h-[64px]"
              />
              <div>
                <p className="font-bold mt-1">اسم بیمار</p>
                <p className="text-sm text-gray-500">بیمار شماره #4</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-right text-base text-gray-700 p-5">
            <p><span className="text-bold">کد ملی : </span> 0312424607</p>
            <p><span className="text-bold">شماره تماس : </span> 09125678965</p>
            <p><span className="text-bold">سوابق بیماری : </span> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان</p>
            <p><span className="text-bold">آخرین نتایج آزمایش : </span> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان <img src="" alt="test" /></p>
          </div>

          <button className="flex items-center justify-center w-full text-blue-700 text-sm mt-4">
            <span>فایل کامل</span>
            <img src={link} alt="logout" />
          </button>
        </div>
      </div>
    </>
  );
}
