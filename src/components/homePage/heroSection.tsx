import health from "../../svg/health.svg"
import heroSection from "../../assets/heroSection.png"
import { Link } from "react-router-dom"

import StatBox from "./statBox"


export default function HeroSection(){
    return(
        <>
            <section className="container mx-auto mt-25 px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">

                {/* متن خوش‌آمدگویی و اطلاعات */}
                <div className="text-center md:text-right space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-800 leading-relaxed">
                    به کلینیک سپهر<br /> خوش آمدید!
                    </h1>
                    <p className="text-gray-600 leading-7">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است.
                    </p>

                    {/* دکمه CTA */}
                    <button className="btn-primary px-6 py-3 rounded-full text-white mx-auto sm:mx-auto md:-mx-0 bg-blue-600 hover:bg-blue-700 transition flex gap-2">
                    <img src={health} alt="health" />
                    <Link to="/appointment"><p> گرفتن نوبت</p> </Link>
                    </button>

                    {/* آمارها */}
                    <div className="flex justify-center md:justify-start gap-10 text-center pt-6">
                        {[
                            { end: 15, label: "سال سابقه" },
                            { end: 98, suffix: "%", label: "رضایت بیمار" },
                            { end: 1200, label: "بیمار درمان‌شده" },
                        ].map((stat, i) => (
                            <StatBox key={i} {...stat} />
                        ))}
                    </div>

                </div>

                {/* تصویر دکتر */}
                <div className="flex justify-center relative">
                    <div className="relative z-10">
                    <img src={heroSection} alt="دکتر" className="w-[300px] md:w-[400px]" />
                    </div>
                    {/* پس‌زمینه بیضی یا تزئینات */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] bg-gradient-to-br from-pink-200 to-purple-200 rounded-[50%] blur-2xl z-0"></div>
                </div>
            </section>
        </>
    )
}