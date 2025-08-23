import axios from "axios"
import DocHeader from "../components/DocPanelPage/docHeader"
import PanelComponent from "../components/DocPanelPage/panelComponent"
import TodayVisits from "../components/DocPanelPage/todayVisits"

import { useEffect, useState } from "react"





export default function  DoctorPanel(){
    const [myVisits,setMyVisits] = useState(false)
    const [visits,setVisits] = useState([])
    const fetchTodayVisit = async ()=>{
        try{
            const res = await axios.get("http://127.0.0.1:5000/api/v1/visits/doctor/today",{
                withCredentials:true
            })
            if((res).status === 200){
                console.log(res.data.data)
                setVisits(res.data.data)
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchTodayVisit()
    },[myVisits])
    return(
        <>
            <DocHeader myVisits={myVisits} setMyVisits={setMyVisits}/>
            {myVisits && <TodayVisits visits={visits}/>}
            {!myVisits && <PanelComponent/>}
        </>
    )
}