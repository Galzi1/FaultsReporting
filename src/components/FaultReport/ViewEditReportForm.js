import React, { useEffect, useState } from 'react';
import '../MainPage/MainPage.css';
import formatISODate from '../../utils/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons'
import { defaultFillStyle } from 'ol/render/canvas';

export default function ViewEditReportForm(props) {
    const serverConnection = props.serverConnection;
    const reportDetails = props.reportDetails;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;
    
    const onEditingEnabled = props.onEditingEnabled;
    const closeViewEditReportModal = props.closeViewEditReportModal;

    const displayedButtonClass = "btn btn-primary";
    const hiddenButtonClass = "btn btn-primary d-none";

    const [appearsInErrorsFile, setAppearsInErrorsFile] = useState(false);
    const [description, setDescription] = useState('');
    const [faultDate, setFaultDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [platform, setPlatform] = useState(0);
    const [platformNum, setPlatformNum] = useState(0);
    const [reportingDate, setReportingDate] = useState(new Date());
    const [reporterUsername, setReporterUsername] = useState('');
    const [subPlatform, setSubPlatform] = useState(0);
    const [system, setSystem] = useState(0);
    const [recurringOnSameVehicle, setRecurringOnSameVehicle] = useState(false);
    const [recurringOnOtherVehicles, setRecurringOnOtherVehicles] = useState(false);
    const [summary, setSummary] = useState('');
    const [tempSolutionDescription, setTempSolutionDescription] = useState('');
    const [tempSolutionFound, setTempSolutionFound] = useState(false);


    useEffect(() => {
        if (reportDetails) {
            initDetails(reportDetails);
        }
    }, []);

    const initDetails = (_details) => {
        if (_details.appears_in_errors_file) {
            setAppearsInErrorsFile(_details.appears_in_errors_file);
        }
        if (_details.description) {
            setDescription(_details.description);
        }
        if (_details.fault_date) {
            setFaultDate(_details.fault_date);
        }
        if (_details.location) {
            setLocation(_details.location);
        }
        if (_details.platform) {
            setPlatform(_details.platform);
        }
        if (_details.platform_num) {
            setPlatformNum(_details.platform_num);
        }
        if (_details.reporting_date) {
            setReportingDate(_details.reporting_date);
        }
        if (_details.reporter_username) {
            setReporterUsername(_details.reporter_username);
        }
        if (_details.sub_platform) {
            setSubPlatform(_details.sub_platform);
        }
        if (_details.system) {
            setSystem(_details.system);
        }
        if (_details.recurring_on_same_vehicle) {
            setRecurringOnSameVehicle(_details.recurring_on_same_vehicle);
        }
        if (_details.reoccuring_on_other_vehicles) {
            setRecurringOnOtherVehicles(_details.reoccuring_on_other_vehicles);
        }
        if (_details.summary) {
            setSummary(_details.summary);
        }
        if (_details.temp_solution_description) {
            setTempSolutionDescription(_details.temp_solution_description);
        }
        if (_details.temp_solution_found) {
            setTempSolutionFound(_details.temp_solution_found);
        }
    }

    const getDetailsFromState = () => {
        var tempDetails = {
            appears_in_errors_file: appearsInErrorsFile, 
            description: description,
            fault_date: faultDate, 
            location: location, 
            platform: platform, 
            platform_num: platformNum,  
            reporting_date: reportingDate, 
            reporter_username: reporterUsername, 
            sub_platform: subPlatform, 
            system: system, 
            recurring_on_same_vehicle: recurringOnSameVehicle, 
            recurring_on_other_vehicles: recurringOnOtherVehicles, 
            summary: summary, 
            temp_solution_description: tempSolutionDescription, 
            temp_solution_found: tempSolutionFound
        }

        return tempDetails;
    }

    const enableEditing = () => {
        var formControls = document.getElementsByClassName("form-control");
        for(var i = 0; i < formControls.length; i++) {
            formControls[i].disabled = false;
        }

        document.getElementById("edit-button").className = hiddenButtonClass;
        document.getElementById("save-button").className = displayedButtonClass;

        onEditingEnabled();
    }

    const updateReport = () => {
        serverConnection.updateReport((res) => {
            if (res.status.toString()[0] === "2") {
                alert("התקלה עודכנה בהצלחה!");
            }
            else if (res.status.toString()[0] === "4") {
                alert("קרתה תקלה בעדכון התקלה");
            }
            console.log(res);
            closeViewEditReportModal();
        }, reportDetails._id, getDetailsFromState());
    }

    return (
        <form className="form-wrapper">
            <div className="form-group">
                <label className="form-label form-label-sm">תקציר התקלה</label>
                <input value={summary} onChange={e => setSummary(e.target.value)} type="text" className="form-control form-control-sm" placeholder="תקציר התקלה" disabled/>
            </div>
            <div className="form-group">
                <label className="form-label form-label-sm">תיאור התקלה</label>
                <textarea value={description} rows="3" onChange={e => setDescription(e.target.value)} type="text" className="form-control form-control-sm" placeholder="תיאור התקלה (בפירוט)" disabled/>
            </div>
            <div className="form-group" style={{marginBottom: "1rem"}}>
                <label className="form-label form-label-sm">המדווח על התקלה</label>
                <input value={reporterUsername} type="text" className="form-control form-control-sm" placeholder="המדווח על התקלה" disabled/>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label form-label-sm">פלטפורמה</label>
                        <select value={platform} onChange={e => setPlatform(e.target.value)} className="form-control form-control-sm" disabled>
                            <option value="0" disabled>פלטפורמה</option>
                            {
                                platforms.map((platform, index) =>
                                    <option key={platform.id} value={platform.id}>{platform.name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label form-label-sm">מערכת</label>
                        <select value={system} onChange={e => setSystem(e.target.value)} className="form-control form-control-sm" disabled>
                            <option value="0" disabled>מערכת</option>
                            {
                                systems.map((system, index) =>
                                    <option key={system.id} value={system.id}>{system.name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>                      
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label form-label-sm">תת-פלטפורמה</label>
                        <select value={subPlatform} onChange={e => setSubPlatform(e.target.value)} className="form-control form-control-sm" disabled>
                            <option value="0" disabled>תת-פלטפורמה</option>
                            {
                                subPlatforms.map((sub_platform, index) =>
                                    <option key={sub_platform.id} value={sub_platform.id}>{sub_platform.name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label form-label-sm">תאריך התקלה</label>
                        <input value={formatISODate(faultDate)} 
                        onChange={e => setFaultDate(new Date(e.target.value)).toISOString()} type="date" className="form-control form-control-sm" placeholder="תאריך התקלה" disabled/>
                    </div>
                </div>                         
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label form-label-sm">מספר פלטפורמה</label>
                        <input value={platformNum} onChange={e => setPlatformNum(e.target.value)} type="number" className="form-control form-control-sm" placeholder="מספר פלטפורמה" disabled/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label form-label-sm">מיקום</label>
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control form-control-sm" placeholder="מיקום" disabled/>
                    </div>
                </div>                         
            </div>

            <div className="buttons-wrapper">
                <button id="edit-button" onClick={enableEditing} type="button" className={displayedButtonClass}>
                    <FontAwesomeIcon icon={faEdit}/> ערוך
                </button>
                <button id="save-button" onClick={updateReport} type="button" className={hiddenButtonClass}>
                    <FontAwesomeIcon icon={faSave}/> שמור
                </button>
            </div>
        </form>
    )
}