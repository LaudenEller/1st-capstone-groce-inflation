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

    const history = useHistory()
    let vendorArray = []

    useEffect(() => {
        getAllVendors()
            .then(setVendors)
    },
        []
    )

    useEffect(() => {
        if (vendors.length > 1) {
            for (const vendor of vendors) {
                vendorArray.push(
                    <li><NavLink to={`/vendors/${vendor.id}`}>{vendor.name}</NavLink>
                    </li>
                )
            }
        }
    },
        [vendors]
    )


    return (
            <Navbar light expand="md">
                <select
                    required autoFocus
                    type="text"
                    id="navlink-vendor"
                    className="form-control"
                    onChange={(evt) => {
                        history.push(`/vendors/${evt.target.value}`)
                    }}
                    >
                        <option value="0">Vendors</option>
                        {vendors.map(vendor => <option key={vendor.id} value={vendor.id}>{vendor.name}</option>)}
                        </select>
                    
                    {/* <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                        <DropdownToggle caret id="vendor-dropdown">
                            Vendors
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>1</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                                            
                        
                        
                        <div className="dropdown">
                            <Button className="dropbtn">Vendors</Button>
                            <ul className="dropdown-content">
                                <NavLink className="navlink-vendor-links" href="vendors">Vendors</NavLink>
                            </ul>
                        </div> */}
                <NavbarBrand href="/">
                    {/* <img
                        alt=""
                        src="public/logoG1"
                        className="title-image" /> */}
                    <h1>Groce' Inflation</h1>
                    {/* <img
                        alt=""
                        src="public/logoG2"
                        className="title-image" /> */}
                </NavbarBrand>
                    <NavLink className="navlink" id="purchase-link" href="/purchases/create">Purchases</NavLink>
                    <NavLink className="navlink" id="logout-link" href="#" onClick={() => {
                        localStorage.removeItem("groce_user")
                    }}>Logout</NavLink>
            </Navbar>
    )
}