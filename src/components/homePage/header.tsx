import "tailwindcss"
import logo from "../../svg/logo.svg"
import health from "../../svg/health.svg"
import user from "../../svg/user.svg"
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 mt-5 z-50">
      <nav className="container bg-white mx-auto grid grid-cols-3 items-center shadow-md round-nav py-4 px-6" role="navigation" aria-label="Main navigation">
      
        {/* منوی ناوبری - راست */}
        <ul className="flex gap-6 text-gray-700 font-medium text-sm rtl:flex-row-reverse justify-start mr-4">
          <Link to={'/'}><li className="hover:text-blue-600 cursor-pointer active">صفحه اصلی</li></Link>
          <Link to={'/maghale'}><li className="hover:text-blue-600 cursor-pointer">مقالات</li></Link>
          <Link to={'about'}><li className="hover:text-blue-600 cursor-pointer">درباره ما</li></Link>
          <Link to={'contact'}><li className="hover:text-blue-600 cursor-pointer">تماس با ما</li></Link>
        </ul>

        {/* لوگو - وسط */}
        <div className="flex justify-center">
          <img src={logo} alt="لوگوی مطب" className="w-10 h-10 object-contain" />
        </div>

        {/* دکمه‌ها - چپ */}
        <div className="flex justify-end text-blue-700 gap-4">
          <Link to={'/user'}><button className="flex items-center gap-1 hover-btn"><img src={user} alt="users" />ورود کاربران</button></Link>
          <Link to="/appointment"><button className="btn-primary flex items-center gap-2 cursor-pointer"><img src={health} alt="health" />گرفتن نوبت</button></Link>
        </div>

      </nav>
    </header>

  );
}
