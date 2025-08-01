import { useState } from "react";

export default function TreatmentPlan() {
  const [medicine, setMedicine] = useState("");
  const [duration, setDuration] = useState(5);
  const [dose, setDose] = useState("");
  const [testRequest, setTestRequest] = useState("اختیاری");
  const [testType, setTestType] = useState("نوع آزمایش");
  return (
    <>
      <div className="max-w-xl mx-auto p-16 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">نوشتن نسخه جدید</h2>

        {/* داروها */}
        <div className="mb-4">
          <label
            htmlFor="medicine"
            className="block text-sm font-medium text-gray-700"
          >
            دارو
          </label>
          <div className="flex items-center space-x-4">
            <select
              id="medicine"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            >
              <option>انتخاب از لیست داروها</option>
              <option>آنتی‌بیوتیک</option>
              <option>استامینوفن</option>
            </select>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-1/4 p-2 border border-gray-300 rounded-md"
              placeholder="مدت مصرف (روز)"
            />
          </div>
        </div>

        {/* دوز مصرف */}
        <div className="mb-4">
          <label
            htmlFor="dose"
            className="block text-sm font-medium text-gray-700"
          >
            دوز مصرف
          </label>
          <input
            type="text"
            id="dose"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            placeholder="مثال: روزی ۲ بار"
          />
        </div>

        {/* اضافه کردن دارو */}
        <div className="mb-6">
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            افزودن به داروهای جدید
          </button>
        </div>

        {/* درخواست آزمایش */}
        <div className="mb-4">
          <label
            htmlFor="test-request"
            className="block text-sm font-medium text-gray-700"
          >
            درخواست آزمایش
          </label>
          <div className="flex items-center space-x-4">
            <select
              id="test-request"
              value={testRequest}
              onChange={(e) => setTestRequest(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            >
              <option>اختیاری</option>
              <option>اجباری</option>
            </select>
            <select
              id="test-type"
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            >
              <option>نوع آزمایش</option>
              <option>آزمایش خون</option>
              <option>آزمایش ادرار</option>
            </select>
          </div>
        </div>

        {/* ثبت درخواست */}
        <div className="flex justify-center">
          <button className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">
            ثبت درخواست آزمایش
          </button>
        </div>
      </div>
    </>
  );
}
