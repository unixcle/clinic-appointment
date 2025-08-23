import AppointmentForm from "../components/appointmentPage/appointmentForm";
import Footer from "../components/homePage/footer";
import Header from "../components/homePage/header";
import PatientInfoForm from "../components/appointmentPage/patientInfoForm";
import { useUser } from "../contexts/userContext";
import PostReview from "../components/appointmentPage/postReview";
import axios from "axios";
import { useEffect, useState } from "react";





export default function (){
    const {user} = useUser()
    const [visits,setVisits] = useState([])
    const fetchMyVisit = async ()=>{
        try{
            const res = await axios.get("http://127.0.0.1:5000/api/v1/visits/patient",{
                withCredentials:true
            })
            if(res.status === 200){
                setVisits(res.data.data)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchMyVisit()
    },[user])
    console.log(visits)
    return(
        <>
            <Header/>
            {(!user?.name && !user?.idCard && !user?.birthday) && <PatientInfoForm/>}
            <AppointmentForm onChange={()=>console.log("data")} formData={user}/>
            <PostReview visits={visits}/>
            <Footer/>
        </>
    )
}