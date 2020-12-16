import React, { useState } from 'react';
import './MainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logoRapat from '../../Images/mantak.png'
import ReportsTable from '../ReportsTable/ReportsTable';
import Clock from 'react-live-clock';
// import { logOut } from '../Login/AuthApi'

export default function MainPage(props) {
    const self = document.getElementById("main-page"); //Getting current element manually as no better method found
    const serverConnection = props.serverConnection;

    const loggedUserName = sessionStorage.getItem("loggedUser");

    const dictionary = {
        system_name: "מערכת דיווח תקלות",
        new_fault: "פתח תקלה חדשה"
    }

    //State
    const [tableData, setTableData] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [subPlatforms, setSubPlatforms] = useState([]);
    const [systems, setSystems] = useState([]);

    ////

    const getReports = (callback = null, err_callback = null) => {
        serverConnection.getReports(res => {
            const reports = res.data;
            console.log("Reports: " + reports);
            setTableData(reports);
            if (callback) {
                callback();
            }
        }, err_callback);
    }

    const getSystems = (callback = null) => {
        serverConnection.getSystems(res => {
            const systems = res.data;
            console.log("Systems: " + systems);
            setSystems(systems);
            if (callback) {
                callback();
            }
        });
    }

    const getPlatforms = (callback = null) => {
        serverConnection.getPlatforms(res => {
            const platforms = res.data;
            console.log("Platforms: " + platforms);
            setPlatforms(platforms);
            if (callback) {
                callback();
            }
        });
    }

    const getSubPlatforms = (callback = null) => {
        serverConnection.getSubPlatforms(res => {
            const subPlatforms = res.data;
            console.log("Sub-Platforms: " + subPlatforms);
            setSubPlatforms(subPlatforms);
            if (callback) {
                callback();
            }
        });
    }

    return (
        <div className="mainPage">
            <div>
                <div className="header">
                    <img src={logoRapat} alt="Logo" className="logo"></img>
                    <p className={"white_text"}>{dictionary.system_name}</p>
                    <Clock className={'clock white_text'} format={'HH:mm:ss'} ticking={true} />
                </div>
                <div className="nav">
                    <p className={"white_text"}>{loggedUserName}</p>
                    <button className="navbar-toggler menu" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </div>
            <div>
                <ReportsTable
                    getReports={getReports}
                    serverConnection={serverConnection}
                    tableData={tableData}
                    platforms={platforms}
                    subPlatforms={subPlatforms}
                    systems={systems}
                    appElement={self}
                    getSystems={getSystems}
                    getPlatforms={getPlatforms}
                    getSubPlatforms={getSubPlatforms} 
                />
            </div>
        </div >
    )
}
