import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FaultReportModal from '../FaultReport/FaultReportModal';
import Fab from '@material-ui/core/Fab';
import './ReportsTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import ReportItem from './ReportItem';
import {StyledTableCell, TableWrapperStyle} from '../../styles/TableStyle';

export default function ReportsTable(props) {

    // Handle Props
    const getReports = props.getReports;
    const tableData = props.tableData;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;
    const appElement = props.appElement;
    const getSystems = props.getSystems;
    const getPlatforms = props.getPlatforms;
    const getSubPlatforms = props.getSubPlatforms;
    ////

    // State
    const [selectedReport, setSelectedReport] = useState(null);
    const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
    const [isViewEditReportModalOpen, setIsViewEditReportModalOpen] = useState(false);
    const [tableTitle, setTableTitle] = useState('כל התקלות');
    ////

    const dictionary = {
        user: "יוסי כהן",
        system_name: "מערכת דיווח תקבלות",
        newReport: "דיווח תקלות",
        add: "הוספה תקלה",
        save: "שמור",
        newReport_title: "תקציר תקלה",
        newReport_date: "תאריך התקלה",
        newReport_location: "מיקום",
        newReport_platform: "פלטפורמה",
        newReport_subplatform: "תת פלטפורמה",
        newReport_system: "מערכת",
        newReport_description: "תיאור תקלה",
        newReport_idPlatform: "מספר פלטפורמה",
        detail_text: "נא למלא את כל הפרטים",
        report_done:"בוצע",
        report_notDone:"טרם בוצע",
        reportPriority_VeryHigh:"גבוהה מאוד",
        reportPriority_High:"גבוהה",
        reportPriority_Medium:"בינונית",
        reportPriority_Slow:"נמוכה",
    }

    const onSelectReportOnTable = (report) => {
        setSelectedReport(report);
        // openAddReportModal();
    }

    function openNewReportModal() {
        setIsNewReportModalOpen(true);
    }

    function closeNewReportModal() {
        getReports();
        setIsNewReportModalOpen(false);
    }

    function openViewEditReportModal(report) {
        setIsViewEditReportModalOpen(true);
        if (report) {
            onSelectReportOnTable(report);
        }
    }

    function closeViewEditReportModal() {
        getReports();
        setIsViewEditReportModalOpen(false);
    }

    useEffect(() => {
        getReports();
    }, []);

    const renderTableData = () => {
        return tableData.map((report) => {
        //return reportsState.map((report) => {
            return (
                <ReportItem report={report} eyeButtonCallback={openViewEditReportModal} onSelectCallback={onSelectReportOnTable}/>
            )
        })
    }

    const renderHeaderTable = () => {
        return (
            <TableHead style={{ backgroundColor: "#1B507C" }}>
                <TableRow>
                <StyledTableCell align="center" scope="col"></StyledTableCell>
                    <StyledTableCell align="center" scope="col">תקציר</StyledTableCell>
                    <StyledTableCell align="center" scope="col">תאריך התקלה</StyledTableCell>
                    <StyledTableCell align="center" scope="col">תאריך דיווח</StyledTableCell>
                    <StyledTableCell align="center" scope="col">עדיפות</StyledTableCell>
                    <StyledTableCell align="center" scope="col">המדווח</StyledTableCell>
                    <StyledTableCell align="center" scope="col">פלטפורמה</StyledTableCell>
                    <StyledTableCell align="center" scope="col">מערכת</StyledTableCell>
                    <StyledTableCell align="center" scope="col">סטאטוס</StyledTableCell>
                </TableRow>
            </TableHead>)
    }
    
    return (
        <div id="reports-table">
            <div className="Header">
                <FontAwesomeIcon className="reload_icon" icon={faSyncAlt} size="2x" />
                <span>{tableTitle}</span>
                <Fab aria-label="add" size="small" className="add_button" onClick={openNewReportModal}>
                    <FontAwesomeIcon size="xs" icon={faPlus} />
                </Fab>
            </div>
            <TableContainer style={TableWrapperStyle}>
                <Table>
                    {renderHeaderTable()}
                    <TableBody>
                        {renderTableData()}
                    </TableBody>
                </Table>
            </TableContainer>
            <FaultReportModal
                    id="fault-report-modal"
                    isModalOpen={isNewReportModalOpen}
                    closeModal={closeNewReportModal}
                    platforms = {platforms} 
                    subPlatforms = {subPlatforms} 
                    systems = {systems} 
                    appElement={appElement} 
                    getSystems = {getSystems}
                    getPlatforms = {getPlatforms}
                    getSubPlatforms = {getSubPlatforms}/>
            <FaultReportModal 
                    id="view-edit-report-modal" 
                    reportDetails={selectedReport} 
                    isModalOpen={isViewEditReportModalOpen} 
                    closeModal={closeViewEditReportModal} 
                    platforms = {platforms} 
                    subPlatforms = {subPlatforms} 
                    systems = {systems}     
                    appElement={appElement} 
                    getSystems = {getSystems}
                    getPlatforms = {getPlatforms}
                    getSubPlatforms = {getSubPlatforms}/>
        </div>
    )
}
