import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FaultReportModal from '../FaultReport/FaultReportModal';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import './ReportsTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt, faPen, faEye} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import reports from '../../data/reports.json'


export default function ReportsTable(props) {

    // Handle Props
    const getReports = props.getReports;
    const serverConnection = props.serverConnection;
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
    const [addReportModal, setAddReportModal] = useState(false);
    const [fault_desc, setFault_Desc] = useState('');
    const [fault_title, setFault_Title] = useState('');
    const [fault_data, setFault_Date] = useState('');
    const [fault_location, setFault_Location] = useState('');
    const [fault_platform, setFault_Platform] = useState('');
    const [fault_subPlatform, setFault_SubPlatform] = useState('');
    const [fault_system, setFault_System] = useState('');
    const [fault_idPlatform, setFault_idPlatform] = useState('');
    const [reportsState, setReportState] = useState(reports);
    const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);

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

    // Custom Styles
    const StyledTableCell = withStyles((theme) => ({
        head: {
            fontSize: "1.1rem",
            fontWeight: "bold",
            padding: 8,
            color: theme.palette.common.white
        },
        body: {
            fontSize: "1.1rem",
            padding: 8
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }))(TableRow);

    const tableWrapperStyle = {
        paddingBottom: "2%",
        paddingTop: "2%",
        paddingLeft: "1.5%",
        paddingRight: "1.5%"
    };
    ////

    const onSelectReportOnTable = (report) => {
        setSelectedReport(report);
        // openAddReportModal();
    }

    const openAddReportModal = () => setAddReportModal(true);

    const closeAddReportModal = () => setAddReportModal(false);

    function openNewReportModal() {
        setIsNewReportModalOpen(true);
    }

    function closeNewReportModal() {
        getReports(() => {
            setIsNewReportModalOpen(false);
        }, err => {
            console.log(err.code);
            console.log(err.message);
            console.log(err.stack);
            setIsNewReportModalOpen(false);
        });
    }

    // useEffect(() => {
    //     getReports();
    // }, []);

    const renderTableData = () => {
        return reportsState.map((report) => {
            return (<StyledTableRow key={report._id}>
                <StyledTableCell align="center" ><FontAwesomeIcon size="xs" icon={faEye} /></StyledTableCell>
                <StyledTableCell align="center" ><span className="HyperlinkText" onClick={() => onSelectReportOnTable(report)}>{report._id}</span></StyledTableCell>
                <StyledTableCell align="center" >addf</StyledTableCell>
                <StyledTableCell align="center" >{new Date(report.reporting_date).toLocaleDateString("he-IL", "short") || "-"}</StyledTableCell>
                <StyledTableCell align="center" >{report.priority || "טרם הוגדר"}</StyledTableCell>
                <StyledTableCell align="center" >{"-"}</StyledTableCell>
                <StyledTableCell align="center" >{report.reporter_username}</StyledTableCell>
                <StyledTableCell align="center" >{report.platform}</StyledTableCell>
                <StyledTableCell align="center" >{report.status || "טרם עודכן"}</StyledTableCell>
                <StyledTableCell align="center" ><FontAwesomeIcon size="xs" icon={faPen} /></StyledTableCell>
            </StyledTableRow >
            )
        })
    }

    const renderHeaderTable = () => {
        return (
            <TableHead style={{ backgroundColor: "#1B507C" }}>
                <TableRow>
                <StyledTableCell align="center" scope="col"></StyledTableCell>
                    <StyledTableCell align="center" scope="col">#</StyledTableCell>
                    <StyledTableCell align="center" scope="col">תקציר התקלה</StyledTableCell>
                    <StyledTableCell align="center" scope="col">תאריך דיווח</StyledTableCell>
                    <StyledTableCell align="center" scope="col">עדיפות</StyledTableCell>
                    <StyledTableCell align="center" scope="col">סוג המדווח</StyledTableCell>
                    <StyledTableCell align="center" scope="col">המדווח</StyledTableCell>
                    <StyledTableCell align="center" scope="col">פלטפורמה</StyledTableCell>
                    <StyledTableCell align="center" scope="col">סטאטוס</StyledTableCell>
                    <StyledTableCell align="center" scope="col">פעולות</StyledTableCell>
                </TableRow>
            </TableHead>)
    }

    const addReportForm = () => {
        return (
            <div className="form">
                <label style={{ fontStyle: "italic", color: "grey" }}>{dictionary.detail_text + ':'}</label>
                <label>{dictionary.newReport_title + ':'}</label>
                <input name='title' type="text" onChange={e => setFault_Title(e.target.value)} required />
                <label>{dictionary.newReport_date + ':'}</label>
                <input name='data' type="text" onChange={e => setFault_Date(e.target.value)} required />
                <label>{dictionary.newReport_location + ':'}</label>
                <input name='location' type="text" onChange={e => setFault_Location(e.target.value)} required />
                <label>{dictionary.newReport_idPlatform + ':'}</label>
                <input name='idPlatform' type="number" onChange={e => setFault_idPlatform(e.target.value)} required />
                <label>{dictionary.newReport_platform + ':'}</label>
                <select name='platform' onChange={e => setFault_Platform(e.target.value)} required>
                    <option value="0">פלטפורמה</option>
                    <option value="1">פלטפורמה</option>
                </select>
                <label>{dictionary.newReport_subplatform + ':'}</label>
                <select name='suvplatform' onChange={e => setFault_SubPlatform(e.target.value)} required>
                    <option value="0">תת-פלטפורמה</option>
                    <option value="1">תת-פלטפורמה</option>
                </select>
                <label>{dictionary.newReport_system + ':'}</label>
                <select name='system' onChange={e => setFault_System(e.target.value)} required>
                    <option value="0">מערכת</option>
                    <option value="1">מערכת</option>
                </select>
                <label>{dictionary.newReport_description + ':'}</label>
                <textarea name="desc" rows="10" cols="100" onChange={e => setFault_Desc(e.target.value)} required></textarea>
            </div>
        )
    }

    return (
        <div id="reports-table">
            <div className="Header">
                <FontAwesomeIcon className="reload_icon" icon={faSyncAlt} size="2x" />
                <span>{dictionary.newReport}</span>
                <Fab aria-label="add" size="small" className="add_button" onClick={openNewReportModal}>
                    <FontAwesomeIcon size="xs" icon={faPlus} />
                </Fab>
            </div>
            <TableContainer style={tableWrapperStyle}>
                <Table>
                    {renderHeaderTable()}
                    <TableBody>
                        {renderTableData()}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <Modal
                show={addReportModal} onHide={closeAddReportModal}
                size="lg"
                className="AddReport"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="header">
                    <Modal.Title>{dictionary.add}</Modal.Title>
                    <Modal.Title className="close-modal-btn" onClick={closeAddReportModal}>x</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {addReportForm()}
                </Modal.Body>
                <Modal.Footer className="footer">
                    <Button className="btn" style={{ backgroundColor: "#1B507C" }}>{dictionary.save} </Button>
                </Modal.Footer>
            </Modal> */}
            <FaultReportModal
                    id="fault-report-modal"
                    serverConnection={serverConnection}
                    isModalOpen={isNewReportModalOpen}
                    closeModal={closeNewReportModal}
                    platforms = {platforms} 
                    subPlatforms = {subPlatforms} 
                    systems = {systems} 
                    appElement={appElement} 
                    getSystems = {getSystems}
                    getPlatforms = {getPlatforms}
                    getSubPlatforms = {getSubPlatforms}/>
            {/* <div className="button-wrapper">
                <button onClick={openNewReportModal} type="button" className="btn btn-outline-primary">פתח תקלה חדשה</button>
            </div> */}
        </div>
    )
}
