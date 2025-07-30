
type VisitType = {
  _id: string;
  patient: string; // اگر بعداً اطلاعات بیمار کامل بیاد، میشه از نوع Patient استفاده کرد
  doctor: string;  // مشابه بالا
  closed: boolean;
  dateTime: string; // تاریخ به صورت ISO هست، اگر خواستی می‌تونی موقع استفاده تبدیل به Date کنی
  prescriptions: any[]; // اگر نسخه‌ها هم تایپ دارن، می‌تونم اونم برات بنویسم
};

export default function VisitsComponent({myVisits}:{myVisits:VisitType[]}) {
  return (
    <>
      <div className="flex-1 space-y-6">
        
          <div className="bg-white p-6 rounded-xl shadow text-right">
            <p className="text-lg font-semibold mb-4">نوبت‌های من</p>
            {myVisits.length > 0 ? (
              <ul className="space-y-2">
                {myVisits.map((visit: any, index) => (
                  <li key={index} className="border rounded-lg p-3">
                    تاریخ:{" "}
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                      hour12: false,
                    }).format(new Date(visit.dateTime))}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">هیچ نوبتی ثبت نشده است.</p>
            )}
          </div>
      </div>
    </>
  );
}
