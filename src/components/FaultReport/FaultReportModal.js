import React, { useState } from 'react';
import '../MainPage/MainPage.css';
import ReportModal from './ReportModal';
import FaultReportForm from './FaultReportForm';

export default function FaultReportModal(props) {
    const emptyDetails = {
        appears_in_errors_file: false, 
        description: '',
        fault_date: null,
        location: '',
        platform: 0,
        platform_num: 0,
        reporting_date: null,
        reporter_username: '',
        sub_platform: 0,
        system: 0,
        recurring_on_same_vehicle: false, 
        reoccuring_on_other_vehicles: false, 
        summary: '', 
        temp_solution_description: false, 
        temp_solution_found: false
    }

    // Handle Props
    const serverConnection = props.serverConnection;
    const reportDetails = props.reportDetails ? props.reportDetails : emptyDetails;
    const existingReport = props.reportDetails;
    const isModalOpen = props.isModalOpen;
    const closeModal = props.closeModal;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;
    const appElement = props.appElement;
    const getSystems = props.getSystems;
    const getPlatforms = props.getPlatforms;
    const getSubPlatforms = props.getSubPlatforms;
    ////

    // State
    const [titleText, setTitleText] = useState(existingReport 
        ? "צפייה בתקלה"
        : "דיווח תקלה");
    ////

    const onEditingEnabled = () => {
        setTitleText("עריכת תקלה");
    }

    const FormComponent = <FaultReportForm 
        serverConnection = {serverConnection} 
        reportDetails = {reportDetails} 
        platforms = {platforms} 
        subPlatforms = {subPlatforms} 
        systems = {systems} 
        closeModal = {closeModal} 
        onEditingEnabled = {onEditingEnabled} 
        existingReport = {existingReport} 
    />;
    
    return (
        <ReportModal
            isOpen = {isModalOpen} 
            onRequestClose = {closeModal} 
            title = {titleText}
            hostedComponent = {FormComponent}
            appElement = {appElement}
            getSystems = {getSystems}
            getPlatforms = {getPlatforms}
            getSubPlatforms = {getSubPlatforms}
        />
    )
}
