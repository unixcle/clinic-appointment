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
        console.log(res.data.data)
      }
    } catch (error) {
      console.error("خطا در دریافت پزشکان");
    } finally {
      setLoading(false);
    }
  };
  const fetchUserInfo = async ()=>{
    const token = localStorage.getItem("token")
    try{
      const res = await axios.get("http://127.0.0.1:5000/api/v1/users/get-my-info",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      if(res.status === 200){
        console.log(res.data.data)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDoctors();
    fetchUserInfo();
  }, []);

  // استخراج لیست تخصص‌ها
  const specializations = Array.from(
    new Set(
      doctors
        .map((doc) => doc.doctorOptions?.specification)
        .filter(Boolean) // حذف null و undefined
    )
  );

  // فیلتر نهایی
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = typeof doc.name === "string" && doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = selectedSpec === "" || doc.doctorOptions?.specification === selectedSpec;
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

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <ul className="space-y-4">
          {showDoctors.map((doc) => (
            <Link to={`/doctorPage/${doc._id}`} key={doc._id}>
            <li
              key={doc._id}
              className="flex items-center bg-white shadow-sm border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <img
                src={`http://127.0.0.1:5000/api/v1/users/photos/${doc.photo}`}
                alt={doc.name}
                className="w-16 h-16 rounded-full object-cover border ml-4"
              />
              <div className="text-right flex-1">
                <h3 className="font-semibold text-lg">{doc.name}</h3>
                <p className="text-sm text-gray-600">{doc.doctorOptions?.specification}</p>
                <p className="text-sm text-yellow-600 mt-1">
                  امتیاز: {doc.doctorOptions?.ratingsAverage?.toFixed(1)} ⭐
                </p>
              </div>
            </li></Link>
          ))}
        </ul>
      )}
    </div>
  );
}
