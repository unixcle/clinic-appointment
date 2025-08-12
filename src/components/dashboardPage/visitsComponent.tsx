type VisitType = {
  _id: string;
  patient: string;
  doctor: string;
  closed: boolean;
  dateTime: string;
  prescriptions: any[];
};

export default function VisitsComponent({
  myVisits,
}: {
  myVisits: VisitType[];
}) {
  return (
    <div className="flex-1 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow text-right">
        <p className="text-lg font-semibold mb-4 border-b pb-2">نوبت‌های من</p>

        {myVisits.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-3 border-b">ردیف</th>
                  <th className="p-3 border-b">تاریخ</th>
                  <th className="p-3 border-b">ساعت</th>
                  <th className="p-3 border-b">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {myVisits.map((visit, index) => {
                  const date = new Date(visit.dateTime);
                  const faDate = new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                  }).format(date);
                  const faTime = new Intl.DateTimeFormat("fa-IR", {
                    timeStyle: "short",
                    hour12: false,
                  }).format(date);
                  const isVisitClosed =
                    visit.closed || new Date(visit.dateTime) < new Date();

                  return (
                    <tr key={visit._id} className="hover:bg-gray-50 border-b">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{faDate}</td>
                      <td className="p-3">{faTime}</td>
                      <td className="p-3">
                        {isVisitClosed ? (
                          <span className="text-red-600 font-medium">
                            بسته‌شده
                          </span>
                        ) : (
                          <span className="text-yellow-600 font-medium">
                            باز
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">هیچ نوبتی ثبت نشده است.</p>
        )}
      </div>
    </div>
  );
}
