import React, { useState, useEffect } from 'react';
import logoRapat from '../../Images/mantak.png'
import './Login.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import axios from 'axios'
import { useAuthContext, permission } from './AuthApi';
// import {useHistory} from "react-router-dom";
import Registration from './Registration';

export default function Login(props) {
    // const history = useHistory();
    const serverConnection = props.serverConnection;

    const dictionary = {
        user: 'שם משתמש',
        password: 'סיסמה',
        registration: 'הרשמה',
        connect: 'התחבר',
        save: "שמור",
        role: "תפקיד",
        unit: "יחידה",
        phone: "נייד",
        registration_text: "נא למלא כל הפרטים"
    };
    const ENTER_KEY = "Enter";
    const ENTER_KEY_CODE = 13;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [unitName, setUnitName] = useState('');

    const { setAuth } = useAuthContext();


    const onKeyPress = (e) => {
        if (e.key === ENTER_KEY || e.code === ENTER_KEY || e.keyCode === ENTER_KEY_CODE) {
            stopBubbling(e)
            onLogin()
        }
    };

    useEffect(() => {
        window.addEventListener("keypress", onKeyPress);
        return () => window.removeEventListener("keypress", onKeyPress);
    }, [userName, password]);

    const validateUsernamePassword = (userState = null, callback = null, err_callback = null) => {
        const _userName = !!userState ? userState.username : userName;
        const _password = !!userState ? userState.password : password;

        serverConnection.validateUsernamePassword(res => {
            if (res.status === 200) {
                alert("התחברת בהצלחה");
                const loggedUser = res.data;

                if (loggedUser && loggedUser.username === 'admin') {
                    setAuth(permission.ADMIN);
                    console.log("Logged in as administrator");
                }
                else {
                    setAuth(permission.GUEST);
                    console.log("Logged in as guest");
                }

                sessionStorage.setItem("loggedUser",loggedUser.username);
            }
            if (callback) {
                callback();
            }
        }, _userName, _password, err => {
            if (err) {
                alert("שם משתמש או סיסמה לא נכונים");
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

    const onLogin = () => {
        // axios.post('http://' + ServerIp + '/login',
        //     {
        //         name: name,
        //         password: password
        //     })
        //     .then(res => {
        //         if (res.data.token) {
        //             alert("התחברת בהצלחה");
        //             //   setAuth(res.data.token);
        //         }
        //         else {
        //             alert("שם משתמש או סיסמה לא נכונים");
        //         }
        //     })
        //     .catch(err => {
        //     })

        // if (name === "admin" && password === "12345") {
        //     alert("התחברת בהצלחה");
        //     setAuth(
        //         permission.ADMIN
        //     )
        // }
        // else {
        //     alert("שם משתמש או סיסמה לא נכונים");
        // }

        validateUsernamePassword();
    }

    const stopBubbling = (event) => {
        event.preventDefault();
        event.stopPropagation()
    }

    const openRegistration = () => {
        setShowRegistration(true)
    }

    const closeRegistration = () => {
        setShowRegistration(false)
    }
    return (

        <div className="Login">
            <div className='logos-box'>
                <button type="button" className="btn btn-success logo" onClick={openRegistration}>{dictionary.registration}</button>
                <img src={logoRapat} alt="Logo" className="logo Rapat"></img>
            </div>
            <div className="Title">
                <h1><b>ברוכים הבאים למערכת דיווח תקלות</b></h1>
                <h5>המערכת נועדה לצורך דיווח תקלות מהשטח ישירות ליחידה לטובת קבלת טיפול מהיר ויעיל</h5>
            </div>
            <div className="form">
                <h3>כניסה למערכת</h3>
                <div className='Card'>
                    <label>{dictionary.user + ':'}</label>
                    <input name="user" type="text" value={userName} onChange={e => setUserName(e.target.value)} required />
                    <label>{dictionary.password + ':'}</label>
                    <input name="password " type="password" onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-secondary btn-lg mt-4" onClick={onLogin}>{dictionary.connect}</button>
            </div>
            <Registration isOpen={showRegistration} onRequestClose={closeRegistration} serverConnection={serverConnection} afterRegistrationCallback={validateUsernamePassword}/>
        </div>
    )
}