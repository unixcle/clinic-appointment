import axios from "axios";

type Visit = {
  patient: {
    _id: string;
    name: string;
    phone: string;
    idCard: string;
  };
  _id:string;
  closed: boolean;
};

type TodayVisitsProps = {
  visits: Visit[];
};

const TodayVisits: React.FC<TodayVisitsProps> = ({ visits }) => {

  const handleClose =async (id:string)=>{
    try{
      const res = await axios.patch(`http://127.0.0.1:5000/api/v1/visits/${id}/doctor/close-visit`,{},{
        withCredentials:true
      })
      if(res.status=== 200){
        alert("نوبت بسته شد")
        console.log(res)
      }
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        نوبت‌های امروز دکتر
      </h1>

      {visits.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">
          هیچ نوبتی برای امروز وجود ندارد.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-6 text-center">نام و نام خانوادگی</th>
                <th className="py-3 px-6 text-center">شماره تماس</th>
                <th className="py-3 px-6 text-center">کد ملی</th>
                <th className="py-3 px-6 text-center">وضعیت نوبت</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit) => (
                <tr
                  key={visit.patient._id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-4 px-6 text-center">
                    {visit.patient.name}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {visit.patient.phone ? visit.patient.phone : "نامشخص"}
                  </td>
                  <td className="py-4 px-6 text-center">{visit.patient.idCard}</td>
                  <td className="py-4 px-6 text-center">
                    {visit.closed ? (
                      <span className="text-green-600 font-semibold">بسته</span>
                    ) : (
                      <span className="text-red-600 font-semibold cursor-pointer" onClick={()=>handleClose(visit._id)}>باز</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TodayVisits;
