// This module exports a default function that returns a popup box that,
    // displays a message which comes from the parent component in ProductForm.js

import React from "react";
import "./Popup.css"


const Popup = props => {
    return (
        <div className="popup-box">
            <div className="bigger-box">
            <div className="box">
                <button className="btn-close" 
                onClick={props.handleClose}></button>
            {props.content}
            </div>
            </div>
        </div>
    )
}

export default Popup