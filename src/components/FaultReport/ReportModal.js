import React, { useEffect } from 'react';
// import Modal from 'react-modal'
import '../MainPage/MainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';

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
    const appElement = props.appElement;
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
        // <Modal
        //         id="report-modal"
        //         isOpen={isReportModalOpen}
        //         onRequestClose={closeReportModal}
        //         contentLabel="Report Modal"
        //         className="Modal container"
        //         overlayClassName="Overlay"
        //         appElement={appElement}
        //     >
        //     <div className="container" style={{position: "relative"}}>
        //         <label className="headline text-center" style={{fontSize: "22px", paddingBottom: 0, paddingTop: ".5rem"}}>
        //             <p style={{marginBottom: 0}}>{modalTitle}</p>
        //         </label>
        //         <button className='btn' style={closeButtonStyle} onClick={closeReportModal}>
        //             <FontAwesomeIcon icon={faTimes}/> 
        //         </button>
        //     </div>
        //     <div>{hostedComponent}</div>
        // </Modal>

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
                {/* <Modal.Title className="close-modal-btn" onClick={closeReportModal}>x</Modal.Title> */}
                <button className='btn' style={closeButtonStyle} onClick={closeReportModal}>
                    <FontAwesomeIcon icon={faTimes}/> 
                </button>
            </Modal.Header>
            <Modal.Body>
                {hostedComponent}
            </Modal.Body>
            {/* <Modal.Footer className="footer">
                <Button className="btn" style={{ backgroundColor: "#1B507C" }}>{dictionary.save} </Button>
            </Modal.Footer> */}
        </Modal>
    )
}