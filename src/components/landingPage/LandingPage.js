// This module will display the home page
import React from "react"
import "./LandingPage.css"

export const LandingPage = () => {

// Dispatch welcome page arrival announcement to trigger the sidebar animation
document.dispatchEvent(new CustomEvent("New User Arrived"))

    return (
        <section className="main-container-welcome">
        <div className="welcome-container">
           <p>In order to track purchases, you'll have to add some vendors.</p>
            </div>
            </section>
    )
}