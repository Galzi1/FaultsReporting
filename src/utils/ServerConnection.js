import axios from 'axios';
import { getRandomInt } from './common';

var _default_err_callback = (err) => {
    if (err) {
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
};

export default class ServerConnection {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }

    getReports = (callback, err_callback = null) => {
        const getReportsUrl = `${this.ip}:${this.port}/reports/`;
        axios
        .get(getReportsUrl, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => {
            if (err_callback) {
                err_callback(err);
            }
            else {
                _default_err_callback(err);
            }
        });
    }

    getReportById = (callback, id, err_callback = null) => {
        const getReportUrl = `${this.ip}:${this.port}/reports/${id}`;
        axios
        .get(getReportUrl, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => {
            if (err_callback) {
                err_callback(err);
            }
            else {
                _default_err_callback(err);
            }
        });
    }

    updateReport = (callback, id, report, err_callback = null) => {
        const updateReportUrl = `${this.ip}:${this.port}/reports/update/${id}`;
        axios
        .put(updateReportUrl, report, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => {
            if (err_callback) {
                err_callback(err);
            }
            else {
                _default_err_callback(err);
            }
        });
    }

    addReport = (callback, report, err_callback = null) => {
        const newReportUrl = `${this.ip}:${this.port}/reports/add`;
        axios
        .post(newReportUrl, report, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => {
            if (err_callback) {
                err_callback(err);
            }
            else {
                _default_err_callback(err);
            }
        });
    }

    getPlatforms = (callback, err_callback = null) => {
        const p = new Promise((resolve, reject) => {
            const rand = getRandomInt(0, 10);
            const platforms = [
                {
                    name: "פלטפורמה 1", id: "1"
                }, 
                {
                    name: "פלטפורמה 2", id: "2"
                }];
            const res = {
                data: platforms
            }

            if (rand >= 0) { //Change to "> 0" if you want to simulate a 1:10 chance of failing in getting platforms from server
                resolve(res);
            }
            else {
                reject("Error");
            }
        });
        
        p.then(callback)
        .catch(err => {
            if (err_callback) {
                err_callback(err);
            }
            else {
                _default_err_callback(err);
            }
        });
    }

    getSubPlatforms = (callback, err_callback = null) => {
        const p = new Promise((resolve, reject) => {
            const rand = getRandomInt(0, 10);
            const subPlatforms = [
                {
                    name: "תת-פלטפורמה 1", id: "1"
                },
                {
                    name: "תת-פלטפורמה 2", id: "2"
                }, 
                {
                    name: "תת-פלטפורמה 3", id: "3"
                }];
            const res = {
                data: subPlatforms
            }

            if (rand >= 0) { //Change to "> 0" if you want to simulate a 1:10 chance of failing in getting sub-platforms from server
                resolve(res);
            }
            else {
                reject("Error");
            }
        });
        
        p.then(callback)
        .catch(err => {
            if (err_callback) {
                err_callback(err);
            }
            else {
                _default_err_callback(err);
            }
        });
    }

    getSystems = (callback, err_callback = null) => {
        const p = new Promise((resolve, reject) => {
            const rand = getRandomInt(0, 10);
            const systems = [
                {
                    name: "מערכת 1", id: "1"
                }, 
                {
                    name: "מערכת 2", id: "2"
                }, 
                {
                    name: "מערכת 3", id: "3"
                }, 
                {
                    name: "מערכת 4", id: "4"
                }];
            const res = {
                data: systems
            }

            if (rand >= 0) { //Change to "> 0" if you want to simulate a 1:10 chance of failing in getting systems from server
                resolve(res);
            }
            else {
                reject("Error");
            }
        });
        
        p.then(callback)
        .catch(err => {
            if (err_callback) {
                err_callback(err);
            }
            else {
                _default_err_callback(err);
            }
        });
    }

    createUser = (callback, user, err_callback = null) => {
        const createUserUrl = `${this.ip}:${this.port}/users/create`;
        axios
        .post(createUserUrl, user, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => {
            if (err_callback) {
                err_callback(err);
            }
            else {
                _default_err_callback(err);
            }
        });
    }

    validateUsernamePassword = (callback, username, password, err_callback = null) => {
        const validateUsernamePasswordUrl = `${this.ip}:${this.port}/users/validate/${username}/${password}`;
        axios
        .get(validateUsernamePasswordUrl, {
            timeout: 5000
        })
        .then(callback)
        .catch(err => {
            if (err_callback) {
                err_callback(err);
            }
            else {
                _default_err_callback(err);
            }
        });
    }
}

