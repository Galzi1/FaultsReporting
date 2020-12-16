import React, { useState } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';


export default function Registration(props) {
    var rtlDetect = require('rtl-detect');
    const isRightToLeft = rtlDetect.isRtlLang(navigator.language);

    // Handle Props
    const isOpen = props.isOpen;
    const onRequestClose = props.onRequestClose;
    const serverConnection = props.serverConnection;
    const afterRegistrationCallback = props.afterRegistrationCallback;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [unitName, setUnitName] = useState('');

    const dictionary = {
        first_name: 'שם פרטי', 
        last_name: 'שם משפחה', 
        username: 'שם משתמש',
        password: 'סיסמה',
        registration: 'הרשמה',
        connect: 'התחבר',
        save: "שמור",
        role: "תפקיד",
        unit: "יחידה",
        phone: "נייד",
        registration_text: "נא למלא כל הפרטים"
    };

    const getUserFromState = () => {
        var tempUser = {
            first_name: firstName, 
            last_name: lastName,
            username: userName, 
            password: password, 
            phone_number: phone, 
            unit: unitName,  
            role: role
        }

        return tempUser;
    }

    const registerUser = (callback = null, err_callback = null) => {
            const tempUser = getUserFromState();
            serverConnection.createUser(res => {
                if (res.status.toString()[0] === "2") {
                    alert("נרשמת בהצלחה");
                    if (afterRegistrationCallback) {
                        afterRegistrationCallback(tempUser);
                    }
                }
                if (callback) {
                    callback();
                }
            }, tempUser, err => {
                if (err) {
                    alert("אירעה שגיאה בהרשמה");
                    if (err.code) {
                        console.error(err.code);
                    }
                    if (err.message) {
                        console.error(err.message);
                    }
                    if (err.stack) {
                        console.error(err.stack);
                    }
                }
            });
    };

    const onRegistration = () => {
        registerUser();
    }

    return (
        <Modal
            show={isOpen} onHide={onRequestClose}
            className="Registration"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="header">
                <Modal.Title>{dictionary.registration}</Modal.Title>
                <Modal.Title className="close-modal-btn" onClick={onRequestClose}>x</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body">
                <label>{dictionary.registration_text + ':'}</label>
                <div className="form">
                    <label>{dictionary.first_name + ':'}</label>
                    <input name='first_name' value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    <label>{dictionary.last_name + ':'}</label>
                    <input name='last_name' value={lastName} onChange={e => setLastName(e.target.value)} required />
                    <label>{dictionary.username + ':'}</label>
                    <input name='username' value={userName} onChange={e => setUserName(e.target.value)} required />
                    <label>{dictionary.password + ':'}</label>
                    <input name='password' value={password} type='password' onChange={e => setPassword(e.target.value)} required />
                    <label>{dictionary.phone + ':'}</label>
                    <input name='phone' value={phone} type="number" onChange={e => setPhone(e.target.value)} required />
                    <label>{dictionary.unit + ':'}</label>
                    <input name='unitname' value={unitName} onChange={e => setUnitName(e.target.value)} required />
                    <label>{dictionary.role + ':'}</label>
                    <input name='role' value={role} onChange={e => setRole(e.target.value)} required />
                </div>
            </Modal.Body>
            <Modal.Footer className="footer">
                <Button className="btn btn-success" onClick={onRegistration}>{dictionary.save} </Button>
            </Modal.Footer>
        </Modal>
    )
}