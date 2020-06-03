import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import ViewEditReportModal from '../ViewEditReportModal/ReportModal';
import './ReportsTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';


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
    ////


    const dictionary = {
        user: "יוסי כהן",
        system_name: "מערכת דיווח תקבלות",
        new_fault: "פתח תקלה חדשה",
        fault_report: "דיווח תקלות",
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
    
    useEffect(() => {
        getReports();
    }, []);

    const renderTableData = () => {
        return tableData.map((report, index) => {
            const {
                _id,
                report_summary,
                report_reporting_date,
                report_priority,
                report_reporter_username,
                report_platform,
                report_status
            } = report //destructuring
            return (
                <StyledTableRow key={_id}>
                    <StyledTableCell align="center"><span className="HyperlinkText" onClick={() => onSelectReportOnTable(report)}>{_id}</span></StyledTableCell>
                    <StyledTableCell align="center">{report_summary}</StyledTableCell>
                    <StyledTableCell align="center">{new Date(report_reporting_date).toLocaleDateString("he-IL", "short") || "-"}</StyledTableCell>
                    <StyledTableCell align="center">{report_priority || "טרם הוגדר"}</StyledTableCell>
                    <StyledTableCell align="center">{"-"}</StyledTableCell>
                    <StyledTableCell align="center">{report_reporter_username}</StyledTableCell>
                    <StyledTableCell align="center">{report_platform}</StyledTableCell>
                    <StyledTableCell align="center">{report_status || "טרם עודכן"}</StyledTableCell>
                </StyledTableRow>
            )
        })
    }

    return (
        <div>
            <div className="Header">
                <FontAwesomeIcon className="reload_icon" icon={faSyncAlt} size="2x" />
                <span>{dictionary.fault_report}</span>
                <Fab aria-label="add" size="small" className="add_button" onClick={openAddReportModal}>
                    <FontAwesomeIcon size="xs" icon={faPlus} />
                </Fab>
            </div>
            <TableContainer style={tableWrapperStyle}>
                <Table>
                    <TableHead className="bg-primary">
                        <TableRow>
                            <StyledTableCell align="center" scope="col">#</StyledTableCell>
                            <StyledTableCell align="center" scope="col">תקציר התקלה</StyledTableCell>
                            <StyledTableCell align="center" scope="col">תאריך דיווח</StyledTableCell>
                            <StyledTableCell align="center" scope="col">עדיפות</StyledTableCell>
                            <StyledTableCell align="center" scope="col">סוג המדווח</StyledTableCell>
                            <StyledTableCell align="center" scope="col">המדווח</StyledTableCell>
                            <StyledTableCell align="center" scope="col">פלטפורמה</StyledTableCell>
                            <StyledTableCell align="center" scope="col">סטאטוס</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTableData()}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                show={addReportModal} onHide={closeAddReportModal}
                className="Registration"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="header">
                    <Modal.Title>{dictionary.registration}</Modal.Title>
                    <Modal.Title className="close-modal-btn" onClick={closeAddReportModal}>x</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">
                    <label>{dictionary.registration_text + ':'}</label>
                    <div className="form">
                        <label>{dictionary.user + ':'}</label>
                    </div>
                </Modal.Body>
                <Modal.Footer className="footer">
                    {/* <Button className="btn btn-success" onClick={onRegistration}>{dictionary.save} </Button> */}
                </Modal.Footer>
            </Modal>

        </div>
    )
}
