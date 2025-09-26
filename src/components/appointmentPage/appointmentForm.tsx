"use client";
import { useEffect, useState } from "react";
import DaySelector from "./daySelector";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Reviews from "./reviews";
import { useUser } from "../../contexts/userContext";


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
    const isoDateTime = buildISODate(Number(selectedDate), selectedTime);
    console.log("تاریخ و ساعت نهایی:", isoDateTime, formData);

    if (!formData.name || !formData.idCard) {
      alert("لطفاً تمام اطلاعات شخصی را وارد کنید.");
      return;
    }

    

    try {

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
        Swal.fire({
        icon: "success",
        title: "نوبت با موفقیت ثبت شد!",
        html: `
          <p>دکتر: ${appointmentPayload.doctor}</p>
          <p>تاریخ: ${appointmentPayload.dateTime}</p>
        `,
        confirmButtonText: "باشه",
      });
      } else {
        Swal.fire({
        icon: "warning",
        title: "ثبت نوبت با مشکل مواجه شد",
        confirmButtonText: "باشه",
      });
      }
    } catch (error: any) {
      Swal.fire({
      icon: "error",
      title: "خطا در ارتباط با سرور",
      confirmButtonText: "باشه",})
    }
  };

  function getNextDateWithPersianWeekday(dayIndex: number): Date {
  const today = new Date();
  const currentDay = today.getDay(); // روز امروز به میلادی (0 = یکشنبه, 6 = شنبه)
  
  let diff = dayIndex - currentDay; // محاسبه تفاوت روز انتخاب‌شده با روز امروز

  if (diff < 0) {
    diff += 7; // اگر تاریخ انتخابی از امروز گذشته باشد، هفته بعدی را در نظر می‌گیریم
  }

  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff - 1); // تعیین تاریخ دقیق با توجه به تفاوت روزها

  // بررسی اینکه تاریخ انتخابی بیشتر از 30 روز از امروز نباشد
  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  if (targetDate > thirtyDaysFromNow) {
    alert("لطفاً تاریخی را انتخاب کنید که بیشتر از ۳۰ روز جلوتر نباشد.");
    return today; // بازگشت به تاریخ امروز در صورت انتخاب تاریخ اشتباه
  }

  return targetDate; // بازگشت تاریخ انتخابی
}

  function buildISODate(dayIndex: number, timeStr: string): string {
  const baseDate = getNextDateWithPersianWeekday(dayIndex); // محاسبه تاریخ روز انتخاب‌شده

  const [hourStr, minuteStr] = timeStr.replace(/\s/g, "").split(":");
  const hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  // تبدیل تاریخ و ساعت به فرمت صحیح
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

  return `${yyyy}-${mm}-${dd}T${hh}:${min}:00`; // تاریخ ISO فرمت شده
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
