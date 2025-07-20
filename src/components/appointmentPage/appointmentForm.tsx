"use client";
import { useEffect, useState } from "react";
import DaySelector from "./daySelector";
// import TimeSelect from "./timeSelect";
import axios from "axios";
import { useParams } from "react-router-dom";

import Reviews from "./reviews";

type Doctor = {
  _id: string;
  name: string;
  photo: string;
  doctorOptions: {
    specification: string;
    mcNumber: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    visitWeekdays: number[];
    visitRange: [string, string];
    visitExceptions: string[];
  };
};

export default function AppointmentForm({
  onChange,
}: {
  onChange: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDay: "",
    idCard: "",
  });
  const { id } = useParams<string>();

  const [selectedDoc, setSelectedDoc] = useState<Doctor | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [taken, setTaken] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    onChange(updated);
  };

  const fetchDoctor = async () => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:5000/api/v1/users/doctor/${id}`,
        method: "GET",
      });
      const data = await res;
      if (data.status === 200) {
        setSelectedDoc(data.data.data);
        fetchTakenAppointments(data.data.data._id);
      }
      
    } catch (error) {
      console.error("خطایی رخ داد");
    }
  };
  const checkAvailability = async (
    doctorId: string,
    dateTime: string
  ): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://127.0.0.1:5000/api/v1/visits", {
        params: { doctorId, dateTime },
        headers:{
          Authorization: `Bearer ${token}`,
        }
        
      });
      console.log(res.data);
      return res.data.available; // فرض بر اینکه API این رو برمی‌گردونه
    } catch (error) {
      console.error("خطا در بررسی ظرفیت نوبت:", error);
      return false; // در صورت خطا، نوبت رو غیردسترس در نظر می‌گیریم
    }
  };
  const fetchTakenAppointments = async (doctorId: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://127.0.0.1:5000/api/v1/visits", {
        params: { doctorId },
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      // فرض بر اینکه هر visit یک dateTime به فرمت ISO دارد
      const booked = res.data.data.map((visit: any) => visit.dateTime);
      setTaken(booked); // state رو آپدیت کن
      console.log(booked)
    } catch (error) {
      console.error("خطا در گرفتن نوبت‌های گرفته‌شده:", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);
  console.log(selectedDoc);

  const submitAppointment = async () => {
    const token = localStorage.getItem("token");
    const isoDateTime = buildISODate(Number(selectedDate), selectedTime);
    console.log("تاریخ و ساعت نهایی:", isoDateTime);
    const isoBirthDate = new Date(formData.birthDay).toISOString();

    try {
      const isAvailable = await checkAvailability(
        selectedDoc?._id!,
        isoDateTime
      );
      if (!isAvailable) {
        alert("این نوبت قبلاً رزرو شده است. لطفاً زمان دیگری انتخاب کنید.");
        return;
      }
      await axios.patch(
        "http://127.0.0.1:5000/api/v1/users/update-account",
        {
          name: formData.fullName,
          birthday: isoBirthDate,
          idCard: formData.idCard,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const appointmentPayload = {
        doctor: selectedDoc?._id,
        dateTime: isoDateTime,
      };
      const res = await axios.post(
        "http://127.0.0.1:5000/api/v1/visits/patient",
        appointmentPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        alert("نوبت با موفقیت ثبت شد!");
        console.log(appointmentPayload);
      } else {
        alert("ثبت نوبت با مشکل مواجه شد");
        console.log(appointmentPayload);
      }
    } catch (error: any) {
      console.error("خطا در ثبت نوبت:", error.response?.data || error.message);
      alert("خطا در ارتباط با سرور");
    }
  };

  function getNextDateWithPersianWeekday(dayIndex: number): Date {
    const today = new Date();
    const currentDay = (today.getDay() + 1) % 7; // تبدیل Sunday=0 → شنبه=0
    const diff = (dayIndex + 7 - currentDay) % 7 || 7;
    const result = new Date(today);
    result.setDate(today.getDate() + diff);
    return result;
  }

  function buildISODate(dayIndex: number, timeStr: string): string {
    const baseDate = getNextDateWithPersianWeekday(dayIndex); // مثلاً چهارشنبه آینده

    const [hourStr, minuteStr] = timeStr.replace(/\s/g, "").split(":");
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);
    baseDate.setHours(hour, minute, 0, 0);

    const pad = (n: number) => String(n).padStart(2, "0");

    return `${baseDate.getFullYear()}-${pad(baseDate.getMonth() + 1)}-${pad(
      baseDate.getDate()
    )}T${pad(hour)}:${pad(minute)}:00`;
  }

  return (
    <section className="bg-white mt-20 px-6 md:px-32">
      <h2 className="text-blue-700 text-center text-4xl font-bold">
        گرفتن نوبت
      </h2>
      <p className="text-center mt-6 text-gray-500">
        لطفا اطلاعات زیر را کامل کنید تا نوبت شما ثبت شود
      </p>
      <div className="shadow-md bg-gray-50 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 p-6 md:p-14 rounded-lg">
          {/* نام کامل */}
          <div className="w-full text-right">
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="مثال: سامان سپهری"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          {/* شماره موبایل */}
          <div className="w-full text-right">
            <label
              htmlFor="dob"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              تاریخ تولد
            </label>
            <input
              type="date"
              name="birthDay"
              id="birthDay"
              placeholder="مثال:1376/5/30"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.birthDay}
              onChange={handleChange}
            />
          </div>
          <div className="w-full text-right">
            <label
              htmlFor="idNumber"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              کد ملی
            </label>
            <input
              type="text"
              name="idCard"
              pattern="\d{10}"
              id="idCard"
              placeholder="مثال:0312424807"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.idCard}
              onChange={handleChange}
            />
          </div>
        </div>
        {selectedDoc && (
          <div className="p-6 text-right flex flex-col items-center space-y-4">
            <img
              src={selectedDoc.photo}
              alt={selectedDoc.name}
              className="w-28 h-28 rounded-full object-cover border"
            />
            <h3 className="text-2xl font-bold">{selectedDoc.name}</h3>
            <p className="text-gray-600">
              {selectedDoc.doctorOptions.specification}
            </p>
            <p className="text-yellow-600">
              ⭐ {selectedDoc.doctorOptions.ratingsAverage?.toFixed(1)} / 5
            </p>
          </div>
        )}
        {/* انتخاب روز و ساعت */}
        {selectedDoc && (
          <div className="p-10">
            <DaySelector
              visitWeekdays={selectedDoc.doctorOptions.visitWeekdays}
              visitRange={selectedDoc.doctorOptions.visitRange}
              isAvailable={taken}
              onSelect={(dayIndex, time) => {
                console.log("روز:", dayIndex, "ساعت:", time);
                setSelectedDate(dayIndex.toString()); // یا ساختار مناسب
                setSelectedTime(time);
              }}
            />
          </div>
        )}

        {/* دکمه ارسال */}
        <div className="p-10 text-center">
          <button className="btn-primary" onClick={() => submitAppointment()}>
            ثبت نوبت
          </button>
          <p className="mt-6 text-sm text-gray-400">
            پس از ثبت نوبت، پیام تایید برایتان ارسال خواهد شد.
          </p>
        </div>
        {id && <Reviews doctorId={id} />}
      </div>
    </section>
  );
}
