import warning from "../../svg/warning-error.svg"



export default function WarnComponent(){
    return(
        <>
            <section className="pl-16">
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h4 className="text-center text-lg mb-6">هشدار های اتوماتیک</h4>
                    <div className="flex gap-6 mb-4">
                        <img src={warning} alt="warning" />
                        <p>هموگلوبین بیمار از حد نرمال پایین تر است</p>
                    </div>
                    <div className="flex gap-6">
                        <img src={warning} alt="warning" />
                        <p>هموگلوبین بیمار از حد نرمال پایین تر است</p>
                    </div>
                    
                </div>
                <div className="p-12 bg-white rounded-lg shadow-lg mt-8">
                    <h4 className="text-center text-lg mb-6">یادداشت پزشک</h4>
                    <textarea placeholder="اختیاری..." className="w-full"/>
                </div>
            </section>
        </>
    )
}