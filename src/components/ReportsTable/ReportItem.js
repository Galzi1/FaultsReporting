import React from 'react';
import Fab from '@material-ui/core/Fab';
import {StyledTableCell, StyledTableRow} from '../../styles/TableStyle';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ReportItem(props) {
    const report = props.report;
    const eyeButtonCallback = props.eyeButtonCallback;
    const onSelectCallback = props.onSelectCallback;
    
    return (
        <StyledTableRow key={report._id}>
            <StyledTableCell align="center">
                <Fab aria-label="view" size="small" onClick={() => eyeButtonCallback(report)}>
                    <FontAwesomeIcon icon={faEye}/>
                </Fab>
            </StyledTableCell>
            <StyledTableCell align="center" ><span className="HyperlinkText" onClick={() => {onSelectCallback(report)}}>{report._id}</span></StyledTableCell>
            <StyledTableCell align="center" >{report.summary}</StyledTableCell>
            <StyledTableCell align="center" >{new Date(report.reporting_date).toLocaleDateString("he-IL", "short") || "-"}</StyledTableCell>
            <StyledTableCell align="center" >{report.priority || "טרם הוגדר"}</StyledTableCell>
            <StyledTableCell align="center" >{"-"}</StyledTableCell>
            <StyledTableCell align="center" >{report.reporter_username}</StyledTableCell>
            <StyledTableCell align="center" >{report.platform}</StyledTableCell>
            <StyledTableCell align="center" >{report.status || "טרם עודכן"}</StyledTableCell>
        </StyledTableRow >
    )
}