import Header from "../components/homePage/header";
import Footer from "../components/homePage/footer";
import AppointmentForm from "../components/appointmentPage/appointmentForm";
import DoctorList from "../components/appointmentPage/doctorList";



export default function AppointmentPage() {
  return (
    <>
        <Header />
        <DoctorList/>
        {/* <AppointmentForm onChange={()=>console.log("data")}/> */}
        <Footer />
    </>
  );
}
