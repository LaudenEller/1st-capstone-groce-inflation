import  React  from "react";
import "./DrawerToggler.css"
import "animate.css"
import { useRef } from "react";

export const DrawerToggleButton = (props) => {
    // Holding the prop reference (the function's address) as the action for the onClick

return ( <button id="toggle-button-id" className="toggle-button" onClick={props.click}>
        <div className="toggle-button-line"></div>
        <div className="toggle-button-line"></div>
        <div className="toggle-button-line"></div>
    </button>
)}