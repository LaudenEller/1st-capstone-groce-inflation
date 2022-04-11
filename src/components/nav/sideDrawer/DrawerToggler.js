import  React  from "react";
import "./DrawerToggler.css"
import "animate.css"
import { useRef } from "react";

export const DrawerToggleButton = (props) => {
    // Holding the prop reference (the function's address) as the action for the onClick


    let buttonClasses = 'toggle-button'
    if (props.show) {
        buttonClasses = 'toggle-button animate__animated animate__rubberBand animate__repeat-3  animate__delay-3s'
    }


return ( <button id="toggle-button-id" className={buttonClasses} onClick={props.click}>
        <div className="toggle-button-line"></div>
        <div className="toggle-button-line"></div>
        <div className="toggle-button-line"></div>
    </button>
)}