import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import ServerConnection from '../../utils/ServerConnection';
import logoRapat from '../../Images/mantak.png'
import ReportsTable from '../../Components/ReportsTable';
import Clock from 'react-live-clock';
import Users from '../../Data/users.json';
import { getAuth, logOut } from '../../Pages/Login/AuthApi'
import { get } from 'ol/proj';
const server_ip = "http://127.0.0.1"
const server_port = "4000"

export default function MainPage() {
    const self = document.getElementById("main-page"); //Getting current element manually as no better method found
    // const serverConnection = new ServerConnection(server_ip, server_port);

    const dictionary = {
        user:"Yossi K",
        system_name: "מערכת דיווח תקלות",
        new_fault: "פתח תקלה חדשה"
    }

    const emptyDetails = {
        report_description: '',
        report_fault_date: null,
        report_location: '',
        report_platform: 0,
        report_platform_num: 0,
        report_reporting_date: null,
        report_reporter_username: '',
        report_sub_platform: 0,
        report_system: 0,
        report_summary: ''
    }

    //State
    const [tableData, setTableData] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [subPlatforms, setSubPlatforms] = useState([]);
    const [systems, setSystems] = useState([]);
    const [LoginId, setLoginId] = useState('')
    const [userName, setUserName] = useState('')

    const auth = getAuth;
    ////

    // const getReports = (callback = null) => {
    //     serverConnection.getReports(res => {
    //         const reports = res.data;
    //         console.log("Reports: " + reports);
    //         setTableData(reports);
    //         if (callback) {
    //             callback();
    //         }
    //     });
    // }

    // const getSystems = (callback = null) => {
    //     serverConnection.getSystems(res => {
    //         const systems = res.data;
    //         console.log("Systems: " + systems);
    //         setSystems(systems);
    //         if (callback) {
    //             callback();
    //         }
    //     });
    // }

    // const getPlatforms = (callback = null) => {
    //     serverConnection.getPlatforms(res => {
    //         const platforms = res.data;
    //         console.log("Platforms: " + platforms);
    //         setPlatforms(platforms);
    //         if (callback) {
    //             callback();
    //         }
    //     });
    // }

    // const getSubPlatforms = (callback = null) => {
    //     serverConnection.getSubPlatforms(res => {
    //         const subPlatforms = res.data;
    //         console.log("Sub-Platforms: " + subPlatforms);
    //         setSubPlatforms(subPlatforms);
    //         if (callback) {
    //             callback();
    //         }
    //     });
    // }

    // useEffect(() => {
    //     setLoginId(getAuth.id);
    // })

    // const getUserName = () => {
    //     Users.forEach(user => {
    //         if (user.id === LoginId) {
    //             setUserName(user.name)
    //         }
    //     })
    // }

    return (
        <div className="mainPage">
            <div>
                <div className="header">
                    <img src={logoRapat} alt="Logo" className="logo"></img>
                    <p className={"white_text"}>{dictionary.system_name}</p>
                    <Clock className={'clock white_text'} format={'HH:mm:ss'} ticking={true} />
                </div>
                <div className="nav">
                    <p className={"white_text"}>{dictionary.user}</p>
                    <button className="navbar-toggler menu" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </div>
            <div>
                <ReportsTable
                    // getReports={getReports}
                    // serverConnection={serverConnection}
                    tableData={tableData}
                    platforms={platforms}
                    subPlatforms={subPlatforms}
                    systems={systems}
                    appElement={self}
                // getSystems={getSystems}
                // getPlatforms={getPlatforms}
                // getSubPlatforms={getSubPlatforms} 
                />
            </div>
        </div >
    )
}
