import service_1 from "../assets/service1.png"
import service_2 from "../assets/service2.png"
import service_3 from "../assets/service3.png"

import type { ServiceItem } from "../types/serviceType";



const services: ServiceItem[] = [
  {
    icon: service_1, // مسیر نمونه
    title: "ارسال اطلاعات بیمه",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با",
  },
  {
    icon: service_2,
    title: "پیگیری نتایج آزمایش",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با",
  },
  {
    icon: service_3,
    title: "نسخه‌نویسی دیجیتال",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با",
  },
];


export default services;