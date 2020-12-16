import React, { useEffect } from 'react';
// import Modal from 'react-modal'
import '../MainPage/MainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/esm/Modal';

export default function ReportModal(props) {
    var rtlDetect = require('rtl-detect');
    const isRightToLeft = rtlDetect.isRtlLang(navigator.language);
    const closeButtonStyle = isRightToLeft ? {position: "absolute", top: "5px", right: "5px", fontSize: "26px", backgroundColor: 'transparent', borderRadius: 0, padding: 0}
                                             : {position: "absolute", top: "5px", left: "5px", fontSize: "26px", backgroundColor: 'transparent', borderRadius: 0, padding: 0};

    // Handle Props
    const isReportModalOpen = props.isOpen;
    const closeReportModal = props.onRequestClose;
    const modalTitle = props.title;
    const hostedComponent = props.hostedComponent;
    const getSystems = props.getSystems;
    const getPlatforms = props.getPlatforms;
    const getSubPlatforms = props.getSubPlatforms;
    ////

    useEffect(() => {
        getSystems();
        getPlatforms();
        getSubPlatforms();
    }, []);
    
    return (
        <Modal
            id="report-modal"
            show={isReportModalOpen} onHide={closeReportModal}
            size="lg"
            className="Modal container"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="header">
                <Modal.Title className="headline text-center black-text" >{modalTitle}</Modal.Title>
                <button className='btn' style={closeButtonStyle} onClick={closeReportModal}>
                    <FontAwesomeIcon icon={faTimes}/> 
                </button>
            </Modal.Header>
            <Modal.Body>
                {hostedComponent}
            </Modal.Body>
        </Modal>
    )
}