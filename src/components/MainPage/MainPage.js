import React, { useState } from 'react';
import './MainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logoRapat from '../../Images/mantak.png'
import ReportsTable from '../ReportsTable/ReportsTable';
import MainMenu from '../MainMenu/MainMenu';
// import { logOut } from '../Login/AuthApi'
import ServerConnection from '../../utils/ServerConnection';

export default function MainPage(props) {
    const self = document.getElementById("main-page"); //Getting current element manually as no better method found

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
        ServerConnection.getReports(res => {
            const reports = res.data;
            console.log("Reports: " + reports);
            setTableData(reports);
            if (callback) {
                callback();
            }
        }, err_callback);
    }

    const getSystems = (callback = null) => {
        ServerConnection.getSystems(res => {
            const systems = res.data;
            console.log("Systems: " + systems);
            setSystems(systems);
            if (callback) {
                callback();
            }
        });
    }

    const getPlatforms = (callback = null) => {
        ServerConnection.getPlatforms(res => {
            const platforms = res.data;
            console.log("Platforms: " + platforms);
            setPlatforms(platforms);
            if (callback) {
                callback();
            }
        });
    }

    const getSubPlatforms = (callback = null) => {
        ServerConnection.getSubPlatforms(res => {
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
                <div className="container-fluid header ">
                    <div className="row">
                        {/* <div className="col menu-button-div dropdown">
                            <button id="mainMenuButton" type="button" className="btn dropdown-toggle menu white-text vertical-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                            <div class="dropdown-menu" aria-labelledby="mainMenuButton">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div> */}
                        <div className="col menu-button-div">
                            <MainMenu/>
                        </div>
                        <div className="col">
                            <p className="white-text">{dictionary.system_name}</p>
                        </div>
                        <div className="col">
                            <div className="horizontal-group">
                                <p className="white-text normal-text">{loggedUserName}</p>
                                <img src={logoRapat} alt="Logo" className="logo"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ReportsTable
                    getReports={getReports}
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
