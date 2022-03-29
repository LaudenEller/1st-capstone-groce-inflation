import React from "react";
import "./DrawerToggler.css"

export const DrawerToggleButton = props => (
    // Holding the prop reference (the function's address) as the action for the onClick
    <button className="toggle-button" onClick={props.click}>
        <div className="toggle-button-line"></div>
        <div className="toggle-button-line"></div>
        <div className="toggle-button-line"></div>
    </button>
)