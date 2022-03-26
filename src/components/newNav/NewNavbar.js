import React from "react";
import "./NewNavbar.css"
import { DrawerToggleButton } from "./sideDrawer/DrawerToggler";
import  NavBrand  from "../../NavBrand.png"


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
            <div className="navbar-logo"><a href="/"><img src={navbrand} /></a></div>
            <div className="spacer"></div>
            <div className="navbar-navigation-items">
                <ul>
                    <li><a href="/purchases/create">New Purchase</a></li>
                    <li><a href="#" onClick={() => {{localStorage.removeItem("groce_user")}}}>Logout</a></li>
                </ul>
            </div>
        </nav>

    </header>
)}