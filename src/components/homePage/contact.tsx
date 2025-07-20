import phone from "../../svg/phone.svg"
import loaction from "../../svg/location.svg"
import whenIsOpen from "../../svg/whenIsOpen.svg"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';



export default function Contact() {

  const position : LatLngExpression=  [35.757, 51.421]; // موقعیت تهران

  const contactItems = [
    {
      icon: phone,
      label: "شماره تماس:",
      value: "+021-123-4567",
    },
    {
      icon: loaction,
      label: "آدرس:",
      value: "تهران، میرداماد، لورم ایپسوم متن ساختگی موقتی.",
    },
    {
      icon: whenIsOpen,
      label: "ساعت کاری:",
      value: "9 تا 17",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 place-items-center">
        <div className="space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-blue-700">ارتباط با ما</h3>

          {contactItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <img src={item.icon} alt="" className="w-6 h-6 mt-1" />
              <p className="text-gray-700">
                <span className="font-semibold">{item.label}</span> {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="w-[364px] h-[465px] rounded-xl overflow-hidden shadow">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full z-0">
                <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">Carto</a>'
                />
                <Marker position={position}>
                <Popup>
                    مطب دکتر زارعی
                </Popup>
                </Marker>
            </MapContainer>
        </div>
      </div>
    </section>
  );
}
