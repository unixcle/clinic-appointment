import "tailwindcss";
import logo from "../../svg/logo.svg";
import health from "../../svg/health.svg";
import user1 from "../../svg/user.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../contexts/userContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const {user} = useUser()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 mt-5 z-50">
      <nav
        className="container bg-white mx-auto grid grid-cols-3 items-center md:shadow-md shadow-none round-nav mobile py-4 px-6"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* منوی ناوبری - راست */}
        <ul className="hidden lg:flex gap-6 text-gray-700 font-medium text-sm rtl:flex-row-reverse justify-start mr-4">
          <Link to={"/"}>
            <li className="hover:text-blue-600 cursor-pointer active">
              صفحه اصلی
            </li>
          </Link>
          <Link to={"/maghale"}>
            <li className="hover:text-blue-600 cursor-pointer">مقالات</li>
          </Link>
          <Link to={"about"}>
            <li className="hover:text-blue-600 cursor-pointer">درباره ما</li>
          </Link>
          <Link to={"contact"}>
            <li className="hover:text-blue-600 cursor-pointer">تماس با ما</li>
          </Link>
        </ul>

        {/* منوی همبرگر برای موبایل */}
        <div
          className="lg:hidden flex items-center justify-start mx-4"
          onClick={toggleMenu}
        >
          <button className="text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* لوگو - وسط */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="لوگوی مطب"
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* دکمه‌ها - چپ */}
        <div className="flex justify-end text-blue-700 gap-4">
          { !user ? <Link to={"/user"}>
            <button className="flex items-center gap-1 hover-btn">
              <img src={user1} alt="users" />
              <p className="sm:hidden none lg:block">ورود کاربران</p>
            </button>
          </Link>:<Link to={"/dashboard"}>
            <button className="flex items-center gap-1 hover-btn">
              <img src={user1} alt="users"/>
              <p className="sm:hidden none lg:block">پروفایل من</p>
            </button>
          </Link>}
          <Link to="/appointment">
            <button className="btn-primary flex items-center gap-2 cursor-pointer">
              <img src={health} alt="health" />
              <p className="sm:hidden none lg:block">گرفتن نوبت</p>
            </button>
          </Link>
        </div>
      </nav>

      {/* منوی کشویی برای گوشی */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="text-gray-700 font-medium text-sm text-center">
          <Link to={"/"}>
            <li className="py-2 hover:text-blue-600">صفحه اصلی</li>
          </Link>
          <Link to={"/maghale"}>
            <li className="py-2 hover:text-blue-600">مقالات</li>
          </Link>
          <Link to={"about"}>
            <li className="py-2 hover:text-blue-600">درباره ما</li>
          </Link>
          <Link to={"contact"}>
            <li className="py-2 hover:text-blue-600">تماس با ما</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
