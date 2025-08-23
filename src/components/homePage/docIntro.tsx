import DoctorImg from "../../svg/docIntro.svg"; // مسیر صحیح تصویر رو تنظیم کن


export default function DocIntro() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-6 gap-8">

        {/* متن و دکمه */}
        <div className="text-center md:text-right space-y-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700">درباره ما</h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            کلینیک سپهر با بیش از ۱۵ سال تجربه در حوزه داخلی و عمومی، با هدف ارائه خدمات دقیق، سریع و امن به بیماران راه‌اندازی شده است. در این سیستم شما می‌توانید نوبت رزرو کنید، نسخه دیجیتال دریافت نمایید و نتایج آزمایش را آنلاین مشاهده کنید.
          </p>
          <button className="btn-primary bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
            بیشتر بدانید
          </button>
        </div>

        {/* تصویر و گفتاورد */}
        <div className="relative flex justify-center">
          <img src={DoctorImg} alt="دکتر زارعی" className="w-[300px] md:w-[350px] z-10" />
          <div className="absolute z-20 top-0 md:top-[-20px] md:right-[-40px] bg-gray-100 rounded-xl shadow px-4 py-2 w-72 text-sm text-gray-700 after:absolute after:-bottom-3 after:left-6 after:border-x-8 after:border-t-[12px] after:border-x-transparent after:border-t-gray-100">
            <p>“هدف ما ارائه مراقبتی ساده، در دسترس و انسانی برای همه بیماران است.”</p>
          </div>
        </div>

      </div>
    </section>
  );
}
