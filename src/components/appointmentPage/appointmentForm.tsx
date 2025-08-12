"use client";
import { useEffect, useState } from "react";
import DaySelector from "./daySelector";
import axios from "axios";
import { useParams } from "react-router-dom";

import Reviews from "./reviews";
import { useUser } from "../../contexts/userContext";
import Cookies from "js-cookie";

type Visit = {
  _id: string;
  dateTime: string;
  closed: boolean;
};
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
  visits: Visit[]; // 👈 این خط رو اضافه کن
  reviews?: Review[];
};
type Review = {
  id: string;
  name: string;
  rating: number; // از ۱ تا ۵
  comment: string;
  date: string; // ISO format
};

export default function AppointmentForm({
  formData,
}: {
  onChange: (data: any) => void;
  formData: any;
}) {
  const { id } = useParams<string>();

  const { user } = useUser();

  const [selectedDoc, setSelectedDoc] = useState<Doctor | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [taken, setTaken] = useState<string[]>([]);

  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchDoctor = async () => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:5000/api/v1/users/doctor/${id}`,
        method: "GET",
      });
      const data = await res;
      if (data.status === 200) {
        setSelectedDoc(data.data.data);
        setTaken(data.data.data.visits);
        setReviews(data.data.data.reviews);
      }
    } catch (error) {
      console.error("خطایی رخ داد");
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);
  useEffect(() => {
    if (!selectedDoc || !selectedDate) return;

    // استخراج تاریخ دقیق روز انتخاب‌شده به صورت YYYY-MM-DD
    const dateObj = getNextDateWithPersianWeekday(Number(selectedDate));
    if (!dateObj) return;
    const selectedDateISO = dateObj.toISOString().split("T")[0]; // فقط بخش تاریخ

    // فرض بر اینه که visits در selectedDoc موجوده
    const allVisits: { dateTime: string }[] = selectedDoc?.["visits"] ?? [];

    const takenTimes = allVisits
      .filter((v) => v.dateTime.startsWith(selectedDateISO))
      .map((v) => {
        const localDate = new Date(v.dateTime);
        const hour = localDate.getHours();
        const minute = localDate.getMinutes();
        return `${hour}:${minute.toString().padStart(2, "0")}`;
      });

    setTaken(takenTimes);
  }, [selectedDoc, selectedDate]);

  const submitAppointment = async () => {
    // const token = Cookies.get("token");
    const isoDateTime = buildISODate(Number(selectedDate), selectedTime);
    console.log("تاریخ و ساعت نهایی:", isoDateTime, formData);

    if (!formData.name || !formData.idCard) {
      alert("لطفاً تمام اطلاعات شخصی را وارد کنید.");
      return;
    }

    const isoBirthDate = new Date(formData.birthday).toISOString();

    try {
      if (!user) {
        await axios.patch(
          "http://127.0.0.1:5000/api/v1/users/update-account",
          {
            name: formData.fullName,
            birthday: isoBirthDate,
            idCard: formData.idCard,
          },
          {
            withCredentials:true,
          }
        );
      }

      const appointmentPayload = {
        doctor: selectedDoc?._id,
        dateTime: isoDateTime,
      };
      const res = await axios.post(
        "http://127.0.0.1:5000/api/v1/visits/patient",
        appointmentPayload,
        {
          withCredentials:true,
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
      console.log(selectedTime);
    }
  };

  function getNextDateWithPersianWeekday(dayIndex: number): Date {
    const today = new Date();
    const currentDay = (today.getDay() + 1) % 7; // تبدیل Sunday=0 → شنبه=0
    const diff = dayIndex - currentDay;

    const result = new Date(today);
    result.setDate(today.getDate() + diff);
    return result;
  }

  function buildISODate(dayIndex: number, timeStr: string): string {
    const baseDate = getNextDateWithPersianWeekday(dayIndex); // مثلاً چهارشنبه آینده

    const [hourStr, minuteStr] = timeStr.replace(/\s/g, "").split(":");
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    // به‌جای استفاده از toISOString (که به UTC تبدیل می‌کنه)
    // تاریخ را به‌صورت دستی فرمت می‌کنیم
    const localDate = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      hour,
      minute,
      0
    );

    const yyyy = localDate.getFullYear();
    const mm = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const dd = localDate.getDate().toString().padStart(2, "0");
    const hh = localDate.getHours().toString().padStart(2, "0");
    const min = localDate.getMinutes().toString().padStart(2, "0");

    return `${yyyy}-${mm}-${dd}T${hh}:${min}:00`; // مثل 2025-08-06T12:00:00
  }

  return (
    <section className="bg-white mt-20 px-6 md:px-32">
      <div className="shadow-md rounded-2xl bg-[linear-gradient(147deg,rgba(86,87,235,0.3)_2%,rgba(50,59,180,0.1)_50%,rgba(86,87,235,0.3)_100%)]">
        {selectedDoc && (
          <div className="p-6 text-right flex flex-col items-center space-y-4">
            <img
              src={`http://127.0.0.1:5000/photos/users/${selectedDoc.photo}`}
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
          <div className="p-2">
            <DaySelector
              visitWeekdays={selectedDoc.doctorOptions.visitWeekdays}
              visitRange={selectedDoc.doctorOptions.visitRange}
              takenTimes={taken}
              onSelect={(dayIndex, time) => {
                setSelectedDate(dayIndex.toString()); // همین‌جا خوبه
                setSelectedTime(time); // ساعت هم اختیاریه
              }}
              onDayChange={(dayIndex) => {
                setSelectedDate(dayIndex.toString()); // وقتی فقط روز انتخاب میشه
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
        {id && <Reviews reviews={reviews} />}
      </div>
    </section>
  );
}
