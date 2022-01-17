import "./alarms.css"
import React from "react";
import FullTrackerLogo from "../../assets/images/3DTracker.svg"
import { useState } from "react";
import NavBar from "../../components/navBar/navBar";
import { Table } from "@material-ui/core";
import AlarmDataTable from "../../components/alarmDataTable/alarmDataTable";

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

    return(
        <body>
        <NavBar/>
        <div className="alarm__background">
            <img src={FullTrackerLogo} alt="technipLogo" className="fullLogo__image"/> 
            
            <div style={{width:"2000px", marginTop:"350px"}} className="isotracker__table__table__container">
                                  
                <AlarmDataTable/>
            </div>
            
        </div>


        </body>
    );
};

export default Alarms;