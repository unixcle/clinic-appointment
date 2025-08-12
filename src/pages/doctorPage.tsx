import AppointmentForm from "../components/appointmentPage/appointmentForm";
import Footer from "../components/homePage/footer";
import Header from "../components/homePage/header";
import PatientInfoForm from "../components/appointmentPage/patientInfoForm";
import { useUser } from "../contexts/userContext";






export default function (){
    const {user} = useUser()
    return(
        <>
            <Header/>
            {!user && <PatientInfoForm/>}
            <AppointmentForm onChange={()=>console.log("data")} formData={user}/>
            <Footer/>
        </>
    )
}