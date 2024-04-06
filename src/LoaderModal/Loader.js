import React, { useEffect, useState } from 'react'
import './Loader.css'
import ReactModal from "react-modal";
const LoaderModal = (props) => {
    const customStyles = {
        content: {
            width: "370px",
            height: "auto",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: "4px",
            overflow: 'hidden',
            padding: '5px 0 0 0',
            border: "none",
            background: "transparent"


        },
    };
    const style = {
        width: "45%"
    };

    useEffect(() => {
        props.setLoader == true ?
            LoaderOpen() : LoaderClose()
    }, [props.setLoader])
    //Loader Function
    const [Loader, setLoader] = useState({
        isOpen: false,
        onRequestClose: ""

    })
    const LoaderClose = () => {
        setLoader({
            isOpen: false,
            onRequestClose: true

        })
    }
    const LoaderOpen = () => {
        setLoader({
            isOpen: true,
            onRequestClose: ""
        })
    }
    return (
        <ReactModal ariaHideApp={false}
            isOpen={Loader.isOpen}
            contentLabel="Minimal Modal Example"
            className={props.class}
            overlayClassName="LoaderOverlay"
            onRequestClose={Loader.onRequestClose}
            style={customStyles}
        >
            <div className="MsgDiv">
                <div>
                    <div class="sk-chase">
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}
export default LoaderModal;

