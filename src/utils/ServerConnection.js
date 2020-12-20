import axios from 'axios';
import { getRandomInt } from './common';

const default_ip = "http://127.0.0.1"
const default_port = "4000"

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

const get_ip_from_storage = () => {
    try {
        const ip_from_storage = localStorage.getItem('server_ip');
        if (!ip_from_storage) {
            console.error('Error getting server IP from storage');
        }
        return ip_from_storage;
    } catch (error) {
        console.error('Error getting server IP from storage: ' + error);
    }
    return default_ip;
};

const get_port_from_storage = () => {
    try {
        const port_from_storage = localStorage.getItem('server_port');
        if (!port_from_storage) {
            console.error('Error getting server port from storage');
        }
        return port_from_storage;
    } catch (error) {
        console.error('Error getting server port from storage: ' + error);
    }
    return default_port;
};

export default class ServerConnection {
    static getReports = (callback, err_callback = null) => {
        
        const getReportsUrl = `${get_ip_from_storage()}:${get_port_from_storage()}/reports/`;
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

    static getReportById = (callback, id, err_callback = null) => {
        const getReportUrl = `${get_ip_from_storage()}:${get_port_from_storage()}/reports/${id}`;
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

    static updateReport = (callback, id, report, err_callback = null) => {
        const updateReportUrl = `${get_ip_from_storage()}:${get_port_from_storage()}/reports/update/${id}`;
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

    static addReport = (callback, report, err_callback = null) => {
        const newReportUrl = `${get_ip_from_storage()}:${get_port_from_storage()}/reports/add`;
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

    static getPlatforms = (callback, err_callback = null) => {
        const getPlatformsUrl = `${get_ip_from_storage()}:${get_port_from_storage()}/platforms/`;
        axios
        .get(getPlatformsUrl, {
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

    static getSubPlatforms = (callback, err_callback = null) => {
        const getSubPlatformsUrl = `${get_ip_from_storage()}:${get_port_from_storage()}/subplatforms/`;
        axios
        .get(getSubPlatformsUrl, {
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

    static getSystems = (callback, err_callback = null) => {
        const getSystemsUrl = `${get_ip_from_storage()}:${get_port_from_storage()}/systems/`;
        axios
        .get(getSystemsUrl, {
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

    static createUser = (callback, user, err_callback = null) => {
        const createUserUrl = `${get_ip_from_storage()}:${get_port_from_storage()}/users/create`;
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

    static validateUsernamePassword = (callback, username, password, err_callback = null) => {
        const validateUsernamePasswordUrl = `${get_ip_from_storage()}:${get_port_from_storage()}/users/validate/${username}/${password}`;
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

