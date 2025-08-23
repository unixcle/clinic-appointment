import { useState } from "react";
import { useUser } from "../../contexts/userContext";
import axios from "axios";

type user={
  fullName:string;
  birthday:string;
  idCard:string;
}

function PatientInfoForm() {
  const { user, setUser } = useUser();
  const [formData,setFormData] = useState<user>({
    fullName:user?.name || "",
    idCard:user?.idCard || "",
    birthday:user?.birthday || ""
  })

  if(user === null) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };


  
  const patchForm = async()=>{
    console.log()
    try{
      if (formData?.fullName && formData?.idCard && formData?.birthday) {
        const isoBirthDate = new Date(formData.birthday).toISOString();
        await axios.patch(
          "http://127.0.0.1:5000/api/v1/users/update-account",
          {
            name: formData.fullName,
            birthday: isoBirthDate,
            idCard: formData.idCard,
          },
          {
            withCredentials:true,
          }
        );
        if(user){setUser({
        ...user,
        name: formData.fullName,
        birthday: formData.birthday,
        idCard: formData.idCard,
      })};
        console.log("yes")
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
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
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-700">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="مثال: سامان سپهری"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.fullName}
            onChange={(e)=>handleChange(e)}
          />
        </div>

        {/* تاریخ تولد */}
        <div className="w-full text-right">
          <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-700">
            تاریخ تولد
          </label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.birthday}
            onChange={(e)=>handleChange(e)}
          />
        </div>

        {/* کد ملی */}
        <div className="w-full text-right">
          <label htmlFor="idCard" className="block mb-2 text-sm font-medium text-gray-700">
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
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <button className="text-center p-6 bg-white" onClick={patchForm}> 
          ثبت
        </button>
      </div>
    </section>
  );
}

export default PatientInfoForm;
