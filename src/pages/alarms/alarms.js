import "./alarms.css"
import React from "react";
import FullTrackerLogo from "../../assets/images/3DTracker.svg"
import { useState } from "react";
import NavBar from "../../components/navBar/navBar";
import { Table } from "@material-ui/core";
import AlarmDataTable from "../../components/alarmDataTable/alarmDataTable";
import ProjectsExcelTable from "../../components/projectsExcelTable/projectsExcelTable";
import AlarmsExcelTable from "../../components/alarmsExcelTable/alarmsExcelTable";

const CryptoJS = require("crypto-js");
const SecureStorage = require("secure-web-storage");
var SECRET_KEY = 'sanud2ha8shd72h';
 
var secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY);
 
        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);
 
        data = data.toString();
 
        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);
 
        data = data.toString(CryptoJS.enc.Utf8);
 
        return data;
    }
});

//Página de welcome que actua como portada


const Alarms = () =>{
    document.body.style.zoom = 0.9

    const [tab, setTab] = useState("view")
    const [update, setUpdate] = useState(false)


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
        manageProjectsBtn = <button className="projects__button" style={{marginLeft: "10px"}} onClick={() => {setTab("projects")}}>Manage projects</button>
        manageAlarmsBtn = <button className="projects__button" style={{marginLeft: "50px"}} onClick={() => {setTab("alarms")}}>Manage alarms</button>
        refreshButton = <button className="projects__button" style={{float:"right", marginRight:"60px"}} onClick={() => {refresh()}}>Refresh files</button>
    }else if(tab === "projects"){
        table = <ProjectsExcelTable/>
        manageProjectsBtn = <button className="projects__button" style={{marginLeft: "50px"}} onClick={() => {setTab("view")}}>Back</button>
        manageAlarmsBtn = null
        refreshButton = null
    }else{
        table = <AlarmsExcelTable/>
        manageProjectsBtn = null
        manageAlarmsBtn = <button className="projects__button" style={{marginLeft: "50px"}} onClick={() => {setTab("view")}}>Back</button>
        refreshButton = null
    }

    return(
        <body>
        <NavBar/>
        <div className="alarm__background">
            <img src={FullTrackerLogo} alt="technipLogo" className="fullLogo__image"/>

            <div>
                {manageAlarmsBtn}
                {manageProjectsBtn}
                {refreshButton}
            </div> 
            
            <div style={{width:"2000px", marginTop:"20px"}} className="isotracker__table__table__container">
                                  
                {table}
            </div>
            
        </div>


        </body>
    );
};

export default Alarms;