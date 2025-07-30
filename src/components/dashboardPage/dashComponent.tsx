

type VisitType = {
  _id: string;
  patient: string; // اگر بعداً اطلاعات بیمار کامل بیاد، میشه از نوع Patient استفاده کرد
  doctor: string;  // مشابه بالا
  closed: boolean;
  dateTime: string; // تاریخ به صورت ISO هست، اگر خواستی می‌تونی موقع استفاده تبدیل به Date کنی
  prescriptions: any[]; // اگر نسخه‌ها هم تایپ دارن، می‌تونم اونم برات بنویسم
};



export default function Dashcomponent({myVisits}:{myVisits:VisitType[]}){

      // ابتدا این قسمت رو بالای return بذار
  const getNearestVisit = () => {
    const now = new Date();
    const upcoming = myVisits
      .map((v: any) => ({ ...v, dateTime: new Date(v.dateTime) }))
      .filter((v) => v.dateTime > now)
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

    return upcoming.length > 0 ? upcoming[0] : null;
  };

  const nearestVisit = getNearestVisit();

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "short",
      timeStyle: "short",
      hour12: false,
    }).format(date);
  };
    return(
        <>
            <div className="flex-1 space-y-6">
        {/* نوبت بعدی */}
        
        <div className="bg-blue-600 text-white rounded-xl p-6 space-y-4 shadow-md">
          <p className="flex items-center justify-between">
            <span className="font-semibold text-lg">نوبت بعدی</span>
          </p>

          {nearestVisit ? (
            <>
              <p className="text-center text-xl font-bold">
                {formatDateTime(nearestVisit.dateTime)}
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full hover:bg-blue-100">
                  تغییر تاریخ نوبت
                </button>
                <button className="bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-full hover:bg-red-200">
                  لغو نوبت
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-lg font-semibold">
              هیچ نوبتی ثبت نشده است.
            </p>
          )}
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
        </>
    )
}