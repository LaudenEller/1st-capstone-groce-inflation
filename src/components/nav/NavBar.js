import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul style={{ listStyleType: "none"}} className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/vendors">Vendors</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/purchases/create">Record Purchase</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#"
                onClick={() => {
                    localStorage.removeItem("groce_user")
                }}>logout</Link>
            </li>
        </ul>
    )
}