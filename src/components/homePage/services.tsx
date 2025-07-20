
import services from "../../data/service"



export default function Services(){
    return(
        <>
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8">
                    {services.map((service, index) => (
                    <div
                        key={index}
                        className="w-[264px] h-[264px] bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex justify-center mb-4">
                        <img src={service.icon} alt={service.title} className="w-16 h-16" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                    </div>
                    ))}
                </div>
            </section>
        </>
    )
}