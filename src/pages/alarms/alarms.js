import "./alarms.css"
import React from "react";
import FullTrackerLogo from "../../assets/images/3DTracker.svg"
import { useState } from "react";
import NavBar from "../../components/navBar/navBar";
import AlarmDataTable from "../../components/alarmDataTable/alarmDataTable";
import ProjectsExcelTable from "../../components/projectsExcelTable/projectsExcelTable";
import AlarmsExcelTable from "../../components/alarmsExcelTable/alarmsExcelTable";
import FolderIcon from "../../assets/images/FolderOpen.png"
import ClockIcon from "../../assets/images/clock.png"
import BackIcon from "../../assets/images/back.svg"
import AlertF from "../../components/alert/alert"

const Alarms = () =>{
    document.body.style.zoom = 0.9

    const [tab, setTab] = useState("view")
    const [update, setUpdate] = useState(false)
    const [success, setSuccess] = useState(false)


    async function refresh(){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }
    
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/refresh", options).then(setUpdate(!update))
            
    }

    let table = null
    let manageProjectsBtn = null
    let manageAlarmsBtn = null
    let refreshButton = <button className="projects__button" style={{float:"right"}} onClick={() => {refresh()}}>Refresh files</button>

    if(tab === "view"){
        table = <AlarmDataTable update={update}/>
        manageProjectsBtn = <button className="navBar__button" onClick={()=>setTab("projects")} style={{ width:"170px"}}><p className="navBar__button__text"><img src={FolderIcon} alt="pro" className="panel__icon"/>Manage projects</p></button>
        manageAlarmsBtn = <button className="navBar__button" onClick={()=>setTab("alarms")} style={{ width:"170px"}}><p className="navBar__button__text"><img src={ClockIcon} alt="alarm" className="panel__icon"/>Manage alarms</p></button>
        refreshButton = <button className="navBar__button" onClick={()=>refresh()} style={{ width:"100px", marginLeft:"1480px"}}><p className="navBar__button__text">Refresh files</p></button>
    }else if(tab === "projects"){
        table = <ProjectsExcelTable success={() => setSuccess(true)}/>
        manageProjectsBtn = <button className="navBar__button" onClick={()=>setTab("view")} style={{ width:"100px"}}><p className="navBar__button__text"><img src={BackIcon} alt="b1" className="panel__icon"/>Back</p></button>
        manageAlarmsBtn = null
        refreshButton = null
    }else{
        table = <AlarmsExcelTable success={() => setSuccess(true)}/>
        manageProjectsBtn = null
        manageAlarmsBtn = <button className="navBar__button" onClick={()=>setTab("view")} style={{ width:"100px"}}><p className="navBar__button__text"><img src={BackIcon} alt="b2" className="panel__icon"/>Back</p></button>
        refreshButton = null

    }

    return(
        <div> 
        <NavBar/>
            <div className={`alert alert-success ${success ? 'alert-shown' : 'alert-hidden'}`} onTransitionEnd={() => setSuccess(false)}>
                <AlertF type="success" text="Changes saved!"/>
            </div>
            <div className="isotracker__row">
                <img src={FullTrackerLogo} alt="technipLogo" className="fullLogo__image"/>

            </div>
            <table className="isotracker__table__container">
                <tr className="isotracker__table__navBar__container" style={{height:"65px "}}>
                    <th  className="isotracker__table__navBar">
                        <div style={{display:"flex", height:"50px"}}>
                            {manageAlarmsBtn}
                            {manageProjectsBtn}
                            {refreshButton}  
                        </div>                           
                        
                    </th>
                </tr>
                <tr className="isotracker__table__tray__and__table__container">
                    <td className="discplines__table__table">
                        <div  style={{height: "400px", width:"1900px"}} className="isotracker__table__table__container">
                        {table}
                        </div>
                    </td>
                    
                </tr>
            </table>
        


        </div>
    );
};

export default Alarms;