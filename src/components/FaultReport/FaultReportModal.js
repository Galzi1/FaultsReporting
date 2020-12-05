import React from 'react';
import '../MainPage/MainPage.css';
import ReportModal from './ReportModal';
import FaultReportForm from './FaultReportForm';

export default function FaultReportModal(props) {
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

    // Handle Props
    const serverConnection = props.serverConnection;
    const reportDetails = props.reportDetails == null ? emptyDetails : props.reportDetails;
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

    const FormComponent = <FaultReportForm 
        serverConnection = {serverConnection} 
        reportDetails = {reportDetails} 
        platforms = {platforms} 
        subPlatforms = {subPlatforms} 
        systems = {systems} 
        closeModal = {closeModal}
    />;
    
    return (
        <ReportModal
            isOpen = {isModalOpen} 
            onRequestClose = {closeModal} 
            title = "דיווח תקלה" 
            hostedComponent = {FormComponent}
            appElement = {appElement}
            getSystems = {getSystems}
            getPlatforms = {getPlatforms}
            getSubPlatforms = {getSubPlatforms}
        />
    )
}
