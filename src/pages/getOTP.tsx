import { useState } from "react";
import otpIcon from "../svg/otpIcon.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

export default function GetOTP() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const { setUser } = useUser();

  const navigate = useNavigate();
  const handleSendOtp = async () => {
    // TODO: send phone to backend
    setStep("otp");
    fetchOtp();
  };

  const fetchOtp = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/v1/auth/otp", {
        phone,
      });
      if (res.data?.otp) {
        setOtp(res.data.otp); // ذخیره کد دریافتی
      }
    } catch (error) {}
  };

  const handleVerifyOtp = async () => {
    // TODO: verify OTP
    loginOtp();
  };

  const loginOtp = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/v1/auth/login/phone",
        { phone, otp },
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert("ورود موفقیت امیز");
        const me = await axios.get(
          "http://127.0.0.1:5000/api/v1/users/get-my-info",
          { withCredentials: true }
        );
        console.log(me)
        const meUser = me.data.data; // یا هر کلیدی که بکند برمی‌گرداند
        
        if (meUser) {
          setUser(meUser);
          if (meUser.role === "secretary") {
            navigate("/secretary");
          } else if(meUser.role === "doctor") {
            navigate("/doctorPanel");
          }
        } else {
          // fallback
          navigate("/appointment");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-12 rounded-xl shadow-md space-y-6">
          <img src={otpIcon} alt="otpIcon" className="w-16 h-16 mx-auto mb-2" />
          <h2 className="text-2xl font-semibold text-center">
            ورود با شماره تلفن
          </h2>

          {step === "phone" && (
            <>
              <input
                type="tel"
                placeholder="شماره موبایل (مثلاً 09121234567)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-blue-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                onClick={handleSendOtp}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                ارسال کد ورود
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <input
                type="text"
                maxLength={6}
                placeholder="کد ۶ رقمی"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center tracking-widest text-lg focus:outline-none focus:ring focus:ring-blue-400"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                ورود
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
