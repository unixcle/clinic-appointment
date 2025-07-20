import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/visits",
});

// 📅 گرفتن روزهایی که دکتر نوبت دارد (فرض: در پاسخ، نوبت‌های قابل نمایش برحسب روز مرتب شده‌اند)
export const getAvailableDays = () => API.get("/doctor");

// ⏰ گرفتن ساعت‌های آزاد در یک روز خاص (تاریخ باید در فرمت ISO باشد)
export const getAvailableTimes = (date: string, doctorId: string) =>
  API.get("/doctor", { params: { date, doctorId } });

// 📥 ثبت نوبت جدید برای بیمار
export const bookAppointment = (data: {
  doctor: string;
  dateTime: string; // فرمت ISO مانند "2025-06-12T14:30:00"
}) => API.post("/patient", data);
