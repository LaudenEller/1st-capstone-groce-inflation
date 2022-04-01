import React from "react";
import "./Navbar.css"
import { DrawerToggleButton } from "./sideDrawer/DrawerToggler";
import NavBrand from "../../NavBrand.png"


// REMOVE LOGOUT BUTTON FROM NAVBAR

// CHANGE VENDORS BUTTON TO HAMBURGER SHAPE

export const Navbar = props => {

    const navbrand = NavBrand

    return (
        <header className="navbar">
            <nav className="navbar-navigation">
                <div>
                    {/* forwards prop reference from Groce'Inflation.js to DrawerToggler.js */}
                    <DrawerToggleButton click={props.drawerClickHandler} />
                </div>
                <div className="spacer"></div>
                <div className="navbar-logo"><a href="/inflationchart"><h1>Groce' Inflation</h1></a></div>
                <div className="spacer"></div>
                <div className="navbar-navigation-items">
                    <div><a href="/purchases/create"><h4>New Purchase</h4></a></div>
                </div>
            </nav>

        </header>
    )
}