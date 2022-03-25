import { React, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    Dropdown,
    NavLink,
    Nav,
    NavbarBrand,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import "./NavBar.css"
import { getAllVendors } from "../json/ApiManger";
import { useHistory } from "react-router-dom";
import NavBrand from "../../NavBrand.png"
import Popup from "../Popup";
import "../Popup.css"
import { VendorForm } from "../vendors/VendorForm";

// export const NavBar = () => {
//     return (
//         <Navbar>
//             <NavItem icon="Vendors" />
//             <NavItem icon="Purchases" />
//             <NavItem icon="Logout" />
//             </Navbar>
//     )
// }

// const Navbar = (props) => {
//     return (
//         <nav className="navbar">
//             <ul className="navbar-nav">{props.children}</ul>
//         </nav>
//     )
// }

// const NavItem = (props) => {

//     const [open, setOpen] = useState()

//     return(
//         <li className="nav-item">
//             {/* Give this link a differetn className so it can be aligned left instead of right */}
//             <NavLink href="/vendors" className="navLink-button" onClick={() => setOpen(!open)}>
//             {props.icon}
//             </NavLink>
//             {open && props.children}
//         </li>
//     )
// }

// const Dropdown = () => {

//     const DropdownItem = (props) => {

//         return (
//             // iterate over vendors and return a navLink for each
//         <a href="#" className="menu-item">
//         <span className="navLink-button">{props.leftIcon}</span>

//             {props.children}

//         <span className="navLink-button">{props.rightIcon}</span>
//         </a>
//             )
//     }

//     return (
//         <div className="dropdown">
//             <DropdownItem>My Profile</DropdownItem>
//             <DropdownItem
//             leftIcon={NavLink}>

//             </DropdownItem>
//         </div>
//     )
// }



export const NavBar = () => {

    const [vendors, setVendors] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [popIsOpen, setPopIsOpen] = useState(false)

    const brand = NavBrand

    const history = useHistory()
    let vendorArray = []

    useEffect(
        () => {
            fetch(`http://localhost:8088/vendors?userId=${localStorage.getItem("groce_user")}`)
                .then(r => r.json())
                .then((data) => {
                    setVendors(data)
                })
        },
        []
    )

    useEffect(() => {
        if (vendors.length > 1) {
            for (const vendor of vendors) {
                vendorArray.push(
                    <li>
                    </li>
                )
            }
        }
    },
        [vendors]
    )

    // Declare a function that opens the popup by changing the isOpen state variable
    const togglePopup = () => {
        setPopIsOpen(!popIsOpen)
    }

    return (
        <>
            {/* // Return a div containing the Popup function and a display message as the content for that function */}
            <div>
                {popIsOpen && <Popup
                    handleClose={togglePopup}
                    content={<VendorForm />} />}
            </div>
            <Navbar light expand="lg" className="navbarParent">
                {/* <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                    <Collapse isOpen={isOpen} navbar>
                       <Nav vertical navbar>
                        {vendors.map(vendor => (
                            <NavItem onClick={() => history.push(`/vendors/${vendor.id}`)}>{vendor.name}</NavItem>))}
                    </Nav>
                    </Collapse> */}
                <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                    <DropdownToggle caret id="vendor-dropdown">
                        Vendors
                    </DropdownToggle>
                    <DropdownMenu >
                        {vendors.map(vendor => (
                            <DropdownItem className="vendor-dropdownItem" onClick={() => history.push(`/vendors/${vendor.id}`)}>{vendor.name}</DropdownItem>))}
                        <DropdownItem className="addVendor-dropdownItem" onClick={() => togglePopup()}>Add Vendor</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarBrand className="brand-container" href="/">
                    <img
                        alt=""
                        src={brand}
                        className="title-image" />
                </NavbarBrand>
                <NavLink id="purchase-link" href="/purchases/create">Purchases</NavLink>
                <NavLink id="logout-link" href="#" onClick={() => {
                    localStorage.removeItem("groce_user")
                }}>Logout</NavLink>
            </Navbar>
        </>
    )
}