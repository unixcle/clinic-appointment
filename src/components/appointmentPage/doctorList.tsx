import { useEffect, useState } from "react";
import axios from "axios";
import { data, Link } from "react-router-dom";

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

// تابع برای شافل کردن آرایه
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function DoctorList() {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("");

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/v1/users/doctor");
      if (res.status === 200) {
        setDoctors(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.error("خطا در دریافت پزشکان");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // استخراج لیست تخصص‌ها
  const specializations = Array.from(
    new Set(
      doctors.map((doc) => doc.doctorOptions?.specification).filter(Boolean) // حذف null و undefined
    )
  );

  // فیلتر نهایی
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      typeof doc.name === "string" &&
      doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesSpec =
      selectedSpec === "" || doc.doctorOptions?.specification === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  // اگر هیچ فیلتر یا جستجویی فعال نیست → ۱۰ پزشک رندوم
  const showDoctors =
    search === "" && selectedSpec === ""
      ? shuffleArray(doctors).slice(0, 10)
      : filteredDoctors;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">پزشکان</h2>

      {/* فیلترها */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="جستجوی نام پزشک..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/2"
        />

        <select
          value={selectedSpec}
          onChange={(e) => setSelectedSpec(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/2"
        >
          <option value="">همه تخصص‌ها</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* لیست دکترها */}
      {loading ? (
        <p className="text-center py-12">در حال بارگذاری…</p>
      ) : (
        <ul
          dir="rtl"
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {showDoctors.map((doc) => {
            return (
              <li key={doc._id} className="list-none">
                <Link to={`/doctorPage/${doc._id}`} className="block h-full">
                  <div className="relative bg-white rounded-3xl border border-gray-200 shadow-sm p-6 text-center hover:shadow-md transition">
                    {/* آواتار */}
                    <img
                      src={`http://127.0.0.1:5000/photos/users/${doc.photo}`}
                      alt={doc.name}
                      className="mx-auto w-20 h-20 rounded-full object-cover ring-4 ring-gray-100"
                    />
                    <div className="flex justify-between mt-4">
                      {/* تخصص - بالا راست */}
                      <span className=" text-xs text-blue-600">
                        {doc.doctorOptions?.specification || "تخصص"}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 2l2.9 6.6L22 9.3l-5 4.8 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.8 7.1-1 2.9-6.6z" />
                        </svg>
                        <span>
                          {(doc.doctorOptions?.ratingsAverage ?? 4.8).toFixed(
                            1
                          )}
                        </span>
                      </div>
                    </div>

                    {/* نام */}
                    <h3 className="mt-4 font-semibold text-gray-900 truncate">
                      {doc.name || "اسم پزشک"}
                    </h3>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
