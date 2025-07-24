

function PatientInfoForm({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  return (
    <>
      <section className="bg-gray-50 mt-30 p-30">
        <h2 className="text-blue-700 text-center text-4xl font-bold">
            گرفتن نوبت
        </h2>
        <p className="text-center mt-6 text-gray-500">
            لطفا اطلاعات زیر را کامل کنید تا نوبت شما ثبت شود
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 p-6 md:p-14 rounded-lg">
            {/* نام کامل */}
            <div className="w-full text-right">
            <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                نام و نام خانوادگی
            </label>
            <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="مثال: سامان سپهری"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.fullName}
                onChange={handleChange}
            />
            </div>

            {/* شماره موبایل */}
            <div className="w-full text-right">
            <label
                htmlFor="dob"
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                تاریخ تولد
            </label>
            <input
                type="date"
                name="birthDay"
                id="birthDay"
                placeholder="مثال:1376/5/30"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.birthDay}
                onChange={handleChange}
            />
            </div>
            <div className="w-full text-right">
            <label
                htmlFor="idNumber"
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                کد ملی
            </label>
            <input
                type="text"
                name="idCard"
                pattern="\d{10}"
                id="idCard"
                placeholder="مثال:0312424807"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.idCard}
                onChange={handleChange}
            />
            </div>
        </div>
      </section>
    </>
  );
}

export default PatientInfoForm;
