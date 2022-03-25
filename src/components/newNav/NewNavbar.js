import React from "react";
import "./NewNavbar.css"
import { DrawerToggleButton } from "./sideDrawer/DrawerToggler";

export const Navbar = props => (
    <header className="navbar">
        <nav className="navbar-navigation">
            <div>
                {/* forwards prop reference from Groce'Inflation.js to DrawerToggler.js */}
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="navbar-logo"><a href="/">THE LOGO</a></div>
            <div className="spacer"></div>
            <div className="navbar-navigation-items">
                <ul>
                    <li><a href="#">Purchases</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </div>
        </nav>

    </header>
)