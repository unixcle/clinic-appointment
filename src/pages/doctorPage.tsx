import AppointmentForm from "../components/appointmentPage/appointmentForm";
import Footer from "../components/homePage/footer";
import Header from "../components/homePage/header";






export default function (){
    return(
        <>
            <Header/>
            <AppointmentForm onChange={()=>console.log("data")}/>
            <Footer/>
        </>
    )
}