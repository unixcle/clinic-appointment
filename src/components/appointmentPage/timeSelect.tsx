"use client";
import { useEffect, useState } from "react";
import { getAvailableTimes } from "../../api/appointments";

type Props = {
  date: string;
  onSelect: (time: string) => void; // اضافه شده
};

type TimeSlot = {
  time: string;
  available: boolean;
};

export default function TimeSelect({ date, onSelect }: Props) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const res = await getAvailableTimes(date);
        setTimeSlots(res.data.times);
      } catch (err) {
        console.error("خطا در دریافت ساعت‌ها:", err);
      }
    };

    fetchTimes();
  }, [date]);

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    onSelect(time); // این خط مهمه: انتقال به والد
  };

  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold text-blue-600 text-center mb-4">
        انتخاب ساعت نوبت برای {date}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {timeSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => handleSelectTime(slot.time)}
            className={`p-3 rounded-xl border transition-all
              ${selectedTime === slot.time ? "bg-blue-100 border-blue-500" : "bg-white border-gray-200"}
              ${!slot.available ? "opacity-50 cursor-not-allowed" : "hover:border-blue-400"}
            `}
            disabled={!slot.available}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </section>
  );
}
