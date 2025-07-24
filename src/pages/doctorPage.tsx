import AppointmentForm from "../components/appointmentPage/appointmentForm";
import Footer from "../components/homePage/footer";
import Header from "../components/homePage/header";
import PatientInfoForm from "../components/appointmentPage/patientInfoForm";
import { useState } from "react";






export default function (){
    const [formData, setFormData] = useState({
        fullName: "",
        birthDay: "",
        idCard: "",
      });
    return(
        <>
            <Header/>
            <PatientInfoForm formData={formData} setFormData={setFormData}/>
            <AppointmentForm onChange={()=>console.log("data")} formData={formData}/>
            <Footer/>
        </>
    )
}