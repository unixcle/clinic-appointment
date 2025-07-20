import PatientDashboard from "../components/dashboardPage/patientDashboard";
import Footer from "../components/homePage/footer";
import Header from "../components/homePage/header";





export default function DashboardPage(){
    return(
        <>
            <Header/>
            <PatientDashboard/>
            <Footer/>
        </>
    )
}