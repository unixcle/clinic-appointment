"use client";
import { useState } from "react";

type Props = {
  visitWeekdays: number[]; // مثل [0, 2, 4]
  visitRange: [string, string]; // مثل ["7: 00", "14: 00"]
  onSelect: (dayIndex: number, time: string) => void;
  takenTimes: string[];
  onDayChange: (dayIndex: number) => void;
};

const weekdayNames: Record<number, string> = {
  0: "شنبه",
  1: "یکشنبه",
  2: "دوشنبه",
  3: "سه‌شنبه",
  4: "چهارشنبه",
  5: "پنجشنبه",
  6: "جمعه",
};

// تبدیل "7: 00" به دقیقه عددی → 420
const parseTime = (timeStr: string): number => {
  const [hour, minute] = timeStr.replace(/\s/g, "").split(":").map(Number);
  return hour * 60 + minute;
};

// تولید بازه‌های 15 دقیقه‌ای بین دو زمان
const generateTimeSlots = (start: string, end: string): string[] => {
  const startMin = parseTime(start);
  const endMin = parseTime(end);
  const slots: string[] = [];

  for (let t = startMin; t < endMin; t += 15) {
    const h = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const m = (t % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
  }

  return slots;
};
const getNextDateForWeekday = (weekday: number): string => {
  const today = new Date();
  const day = today.getDay();
  const distance = (weekday + 7 - day) % 7 || 7;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + distance);

  return new Intl.DateTimeFormat("fa-IR").format(targetDate); // تبدیل به شمسی
};

export default function DaySelector({
  visitWeekdays,
  visitRange,
  onSelect,
  takenTimes,
  onDayChange,
}: Props) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  console.log(takenTimes);
  const timeSlots =
    selectedDay !== null ? generateTimeSlots(visitRange[0], visitRange[1]) : [];
  console.log(timeSlots);

  const handleDayClick = (dayIndex: number) => {
    setSelectedDay(dayIndex);
    setSelectedTime(null);
    onDayChange?.(dayIndex); // ← صدا زدن تابعی که روز رو به بیرون می‌فرسته
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    if (selectedDay !== null) {
      onSelect(selectedDay, time);
    }
  };

  return (
    <section className="mt-10 text-center">
      <h3 className="text-xl font-bold text-blue-700 mb-6">انتخاب روز</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {visitWeekdays.map((dayIndex) => {
          const dateLabel = getNextDateForWeekday(dayIndex);
          return (
            <button
              key={dayIndex}
              onClick={() => handleDayClick(dayIndex)}
              className={`w-[90px] h-[90px] rounded-xl border flex flex-col justify-center items-center transition-all
                ${
                  selectedDay === dayIndex
                    ? "bg-blue-500 text-white border-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }
              `}
            >
              <div className="text-sm font-semibold">
                {weekdayNames[dayIndex]}
              </div>
              <div className="text-xs mt-1 text-gray-500">{dateLabel}</div>
            </button>
          );
        })}
      </div>

      {selectedDay !== null && (
        <>
          <h4 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
            انتخاب ساعت
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleTimeClick(slot)}
                disabled={takenTimes.includes(slot)}
                className={`px-3 py-2 rounded-lg text-sm border transition-all
                ${
                  takenTimes.includes(slot)
                    ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                    : selectedTime === slot
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-white border-gray-300 hover:border-blue-400"
                }`}
                          >
                {slot}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
