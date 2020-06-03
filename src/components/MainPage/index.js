import React, { useState } from 'react';
import './MainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ServerConnection from '../../utils/ServerConnection';
import ErrorReportModal from '../ErrorReportModal';
import logoRapat from '../../Images/mantak.png'
import ReportsTable from '../ReportsTable';
import { Route, BrowserRouter } from "react-router-dom";
import Clock from 'react-live-clock'

const server_ip = "http://127.0.0.1"
const server_port = "4000"

export default function MainPage() {
    const self = document.getElementById("main-page"); //Getting current element manually as no better method found
    const serverConnection = new ServerConnection(server_ip, server_port);

    const dictionary = {
        user: "יוסי כהן",
        system_name: "מערכת דיווח תקבלות",
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
    const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
    ////

    function openNewReportModal() {
        setIsNewReportModalOpen(true);
    }

    function closeNewReportModal() {
        getReports(() => {
            setIsNewReportModalOpen(false);
        });
    }

    const getReports = (callback = null) => {
        serverConnection.getReports(res => {
            const reports = res.data;
            console.log("Reports: " + reports);
            setTableData(reports);
            if (callback) {
                callback();
            }
        });
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
            <div className="header">

                <img src={logoRapat} alt="Logo" className="logo"></img>
                <p>{dictionary.system_name}</p>
                <Clock className={'clock'} format={'HH:mm:ss'} ticking={true} timezone={'Jerusalem/Israel'} />
            </div>
            <div className="nav">
                <p>{dictionary.user}</p>
                <button className="navbar-toggler menu" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars} />
                </button>

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
                    getSubPlatforms={getSubPlatforms} />
                <ErrorReportModal
                    serverConnection={serverConnection}
                    reportDetails={emptyDetails}
                    isModalOpen={isNewReportModalOpen}
                    closeModal={closeNewReportModal}
                    platforms={platforms}
                    subPlatforms={subPlatforms}
                    systems={systems}
                    appElement={self}
                    getSystems={getSystems}
                    getPlatforms={getPlatforms}
                    getSubPlatforms={getSubPlatforms} />
            </div>
        </div >
    )
}
