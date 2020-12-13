import React, { useEffect, useState } from 'react';
import '../MainPage/MainPage.css';
import './FaultReport.css';
import formatISODate from '../../utils/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faLongArrowAltRight, faLongArrowAltLeft, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

export default function FaultReportForm(props) {
    const serverConnection = props.serverConnection;
    const reportDetails = props.reportDetails;
    const platforms = props.platforms;
    const subPlatforms = props.subPlatforms;
    const systems = props.systems;
    
    const closeModal = props.closeModal;
    const onEditingEnabled = props.onEditingEnabled;
    const existingReport = props.existingReport;

    const displayedFormClass = "form-wrapper";
    const hiddenFormClass = "form-wrapper d-none";

    const displayedButtonClass = "btn btn-primary";
    const hiddenButtonClass = "btn btn-primary invisible";

    const [appearsInErrorsFile, setAppearsInErrorsFile] = useState(false);
    const [description, setDescription] = useState('');
    const [faultDate, setFaultDate] = useState((new Date()).toISOString());
    const [location, setLocation] = useState('');
    const [platform, setPlatform] = useState(0);
    const [platformNum, setPlatformNum] = useState(0);
    const [reportingDate, setReportingDate] = useState((new Date()).toISOString());
    const [reporterUsername, setReporterUsername] = useState('');
    const [subPlatform, setSubPlatform] = useState(0);
    const [system, setSystem] = useState(0);
    const [recurringOnSameVehicle, setRecurringOnSameVehicle] = useState(false);
    const [recurringOnOtherVehicles, setRecurringOnOtherVehicles] = useState(false);
    const [summary, setSummary] = useState('');
    const [tempSolutionDescription, setTempSolutionDescription] = useState('');
    const [tempSolutionFound, setTempSolutionFound] = useState(false);

    const [cachedTempSolutionDescription, setCachedTempSolutionDescription] = useState('');

    const [page1Class, setPage1Class] = useState(displayedFormClass);
    const [page2Class, setPage2Class] = useState(hiddenFormClass);
    const [editButtonClass, setEditButtonClass] = useState('center-button ' + (!!existingReport ? displayedButtonClass : hiddenButtonClass));
    const [submitButtonClass, setSubmitButtonClass] = useState('left-button ' + (!!existingReport ? hiddenButtonClass : displayedButtonClass));

    const onTempSolutionFoundCheckClicked = (e) => {
        let value = e.target.value === "on";
        const newTempSolutionFoundValue = tempSolutionFound  ? !tempSolutionFound : true
        setTempSolutionFound(newTempSolutionFoundValue);
        document.getElementById("temp-solution-textarea").disabled = tempSolutionFound;

        setCachedTempSolutionDescription(newTempSolutionFoundValue ? tempSolutionDescription : '');
    }

    const goToFirstPage = () => {
        setPage1Class(displayedFormClass);
        setPage2Class(hiddenFormClass);
    }

    const goToSecondPage = () => {
        setPage1Class(hiddenFormClass);
        setPage2Class(displayedFormClass);
    }

    const submitReport = () => {
        setTempSolutionDescription(cachedTempSolutionDescription);
        if (!!existingReport) {
            if (!reportDetails || !reportDetails._id) {
                console.error("Got existingReport == true but reportDetails or its _id is null");
                return;
            }
            serverConnection.updateReport((res) => {
                if (res.status.toString()[0] === "2") {
                    alert("התקלה עודכנה בהצלחה!");
                }
                else if (res.status.toString()[0] === "4") {
                    alert("קרתה תקלה בעדכון התקלה");
                }
                console.log(res);
            }, reportDetails._id, getDetailsFromState());
        }
        else {
            serverConnection.addReport((res) => {
                if (res.status.toString()[0] === "2") {
                    alert("התקלה דווחה בהצלחה!");
                }
                else if (res.status.toString()[0] === "4") {
                    alert("קרתה תקלה בדיווח התקלה");
                }
                console.log(res);
            }, getDetailsFromState());
        }
        
        closeModal();
    }

    useEffect(() => {
        if (reportDetails) {
            initDetails(reportDetails);
        }

        if (existingReport === void 0) {
            enableFormControls();
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
        enableFormControls();

        setEditButtonClass('center-button ' + hiddenButtonClass);
        setSubmitButtonClass('left-button ' + displayedButtonClass);

        onEditingEnabled();
    }

    const enableFormControls = () => {
        var formControls = document.getElementsByClassName("form-control");
        for(var i = 0; i < formControls.length; i++) {
            if (!formControls[i].classList.contains('starts-disabled')) {
                formControls[i].disabled = false;
            }
        }
    }

    return (
        <div>
            <form id="fault-report-form-page1" className={page1Class}>
                <div className="form-group">
                    <label className="form-label form-label-sm report-label">תקציר התקלה</label>
                    <input value={summary} onChange={
                        e => setSummary(e.target.value)
                    } type="text" className="form-control form-control-sm" placeholder="תקציר התקלה" disabled/>
                </div>
                <div className="form-group">
                    <label className="form-label form-label-sm report-label">תיאור התקלה</label>
                    <textarea value={description} rows="3" onChange={
                            e => setDescription(e.target.value)
                        } type="text" className="form-control form-control-sm" placeholder="תיאור התקלה (בפירוט)" disabled/>
                </div>
                <div className="form-group" style={{marginBottom: "1rem"}}>
                    <label className="form-label form-label-sm report-label">המדווח על התקלה</label>
                    <input value={reporterUsername} type="text" className="form-control form-control-sm starts-disabled" placeholder="המדווח על התקלה" disabled/>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label form-label-sm report-label">פלטפורמה</label>
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
                            <label className="form-label form-label-sm report-label">מערכת</label>
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
                            <label className="form-label form-label-sm report-label">תת-פלטפורמה</label>
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
                            <label className="form-label form-label-sm report-label">תאריך התקלה</label>
                            <input value={formatISODate(faultDate)} 
                            onChange={e => setFaultDate((new Date(e.target.value)).toISOString())} type="date" className="form-control form-control-sm" placeholder="תאריך התקלה" disabled/>
                        </div>
                    </div>                         
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label form-label-sm report-label">מספר פלטפורמה</label>
                            <input value={platformNum} onChange={e => setPlatformNum(e.target.value)} type="number" className="form-control form-control-sm" placeholder="מספר פלטפורמה" disabled/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label form-label-sm report-label">מיקום</label>
                            <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control form-control-sm" placeholder="מיקום" disabled/>
                        </div>
                    </div>                         
                </div>

                <div className="buttons-wrapper">
                    <button id="placeholder-butotn" type="button" className="btn invisible">
                        <FontAwesomeIcon icon={faEdit}/> זמני
                    </button>
                    <button id="edit-button1" onClick={enableEditing} type="button" className={editButtonClass}>
                        <FontAwesomeIcon icon={faEdit}/> ערוך
                    </button>
                    <button id="next-button" onClick={goToSecondPage} type="button" className="btn btn-primary left-button">
                        <FontAwesomeIcon icon={faLongArrowAltLeft}/> המשך
                    </button>
                </div>
            </form>
            <form id="fault-report-form-page2" className={page2Class}>
                <div className="row">
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <div className="form-check pull-right">
                            <input className="form-check-input" checked={recurringOnSameVehicle} type="checkbox" onChange={e => setRecurringOnSameVehicle(e.target.value === "on")} id="recurring-on-same-vehicle-check"/>
                            <label className="form-check-label report-label report-check-label" htmlFor="reoccuring-on-same-vehicle-check">
                                התקלה משתחזרת על הכלי
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <div className="form-check pull-right">
                            <input className="form-check-input" checked={recurringOnOtherVehicles} type="checkbox" onChange={e => setRecurringOnOtherVehicles(e.target.value === "on")} id="recurring-on-other-vehicles-check"/>
                            <label className="form-check-label report-label report-check-label" htmlFor="reoccuring-on-other-vehicles-check">
                                התקלה משתחזרת על כלים אחרים
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <div className="form-check pull-right">
                            <input className="form-check-input" type="checkbox" checked={appearsInErrorsFile} onChange={e => setAppearsInErrorsFile(e.target.value === "on")} id="appears-in-errors-file-check"/>
                            <label className="form-check-label report-label report-check-label" htmlFor="appears-in-errors-file-check">
                                התקלה מופיעה בקובץ התקלות של המערכת
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6" style={{textAlign: "right"}}>
                        <div className="form-check pull-right">
                            <input className="form-check-input" type="checkbox" onChange={onTempSolutionFoundCheckClicked} 
                            checked={tempSolutionFound} id="temp-solution-found-check"/>

                            <label className="form-check-label report-label report-check-label" htmlFor="temp-solution-found-check">
                                נמצא פתרון זמני לתקלה אצל המדווח
                            </label>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="form-group">
                    <label className="form-label form-label-sm report-label">תיאור הפתרון הזמני</label>
                    <textarea value={tempSolutionDescription} rows="3" 
                    onChange={e => setTempSolutionDescription(e.target.value)} type="text" className="form-control form-control-sm starts-disabled" placeholder="תיאור הפתרון הזמני" id="temp-solution-textarea" disabled/>
                </div>

                <div className="buttons-wrapper">
                    <button id="back-button" onClick={goToFirstPage} type="button" className="btn btn-outline-primary right-button">
                        <FontAwesomeIcon icon={faLongArrowAltRight}/> חזור
                    </button>
                    <button id="edit-button2" onClick={enableEditing} type="button" className={editButtonClass}>
                        <FontAwesomeIcon icon={faEdit}/> ערוך
                    </button>
                    <button id="submit-button" onClick={submitReport} type="submit" className={submitButtonClass}>
                        <FontAwesomeIcon icon={faSave}/> סיים
                    </button>
                </div>
            </form>
        </div>
    )
}