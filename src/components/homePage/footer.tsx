import logo from "../../svg/logo.svg"
import location from "../../svg/loacation1.svg"
import call from "../../svg/Call.svg"
import youtube from "../../svg/youtube.svg"
import whatsapp from "../../svg/whatsapp.svg"
import telegram from "../../svg/telegram.svg"
import instagram from "../../svg/instagram.svg"



export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 px-32 py-12 mt-20">
      <div className="container h-[406px] special-gradient mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base items-center rounded-4xl">
        
        {/* ستون دسترسی سریع */}
        <div className="space-y-10 text-right mr-8">
          <h4 className="font-bold text-lg">دسترسی سریع</h4>
          <ul className="space-y-5">
            <li><a href="#" className="hover:text-blue-600 font-semibold">صفحه اصلی</a></li>
            <li><a href="#" className="hover:text-blue-600">مقالات</a></li>
            <li><a href="#" className="hover:text-blue-600">درباره ما</a></li>
            <li><a href="#" className="hover:text-blue-600">تماس با ما</a></li>
          </ul>
        </div>

        {/* ستون وسط - عضویت و لوگو */}
        <div className="text-center space-y-10">
          <img src={logo} alt="لوگو" className="mx-auto w-10" />
          <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم</p>
          <p className="text-sm text-gray-500">اولین نفری باشید که از مطالب باخبر می‌شوید!</p>
          <div className="flex items-center justify-center">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید."
              className="px-4 py-2 rounded-r-full outline-none bg-white shadow"
            />
            <button className="bg-blue-600 text-white px-5 py-2 rounded-l-full hover:bg-blue-700 transition font-semibold">
              عضویت
            </button>
          </div>
        </div>

        {/* ستون اطلاعات تماس */}
        <div className="flex flex-col justify-end text-right space-y-4">
          <h4 className="font-bold text-lg">اطلاعات تماس</h4>

          <div className="flex items-start gap-3">
            <img src={location} alt="آدرس" className="w-5 h-5 mt-1" />
            <p>
              <span className="font-semibold">آدرس شرکت:</span><br />
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
            </p>
          </div>

          <div className="flex items-center gap-3">
            <img src={call} alt="تلفن" className="w-5 h-5" />
            <p>
              <span className="font-semibold">تلفن:</span> ۰۱۲۳۴۵۶۷۸۹
            </p>
          </div>

          <div className="flex gap-4 mt-2 justify-center">
            <a href="#" className="media"><img src={instagram} alt="Instagram" className="w-5" /></a>
            <a href="#" className="media"><img src={telegram} alt="Telegram" className="w-5" /></a>
            <a href="#" className="media"><img src={whatsapp} alt="WhatsApp" className="w-5" /></a>
            <a href="#" className="media"><img src={youtube} alt="youtube" className="w-5" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-8 text-gray-500">
        © ۱۴۰۴ - مطب دکتر زارعی
      </div>
    </footer>
  );
}
