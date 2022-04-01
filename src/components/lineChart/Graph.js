// This module will display the home page
import React, { useState, useEffect } from "react"
import { getAllProducts, getAllPurchases } from "../json/ApiManger"
import "./Graph.css"

export const GraphIt = () => {

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