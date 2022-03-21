import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    Dropdown,
    NavLink,
    Nav,
    NavbarBrand
} from 'reactstrap';
import "./NavBar.css"

export const NavBar = () => {

    // const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div >
            <h1>Groce' Inflation</h1>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
                {/* <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar> */}
                <Nav className="navbar" navbar>
                    {/* <Dropdown
                        onMouseEnter={setIsOpen(true)}
                        onmouseleave={setIsOpen(false)}
                        open={setIsOpen(true)}
                        noCaret> */}
                        <NavItem className="navlink">
                            <NavLink href="/vendors">Vendors</NavLink>
                        </NavItem>
                        <NavItem className="navlink">
                            <NavLink href="/purchases">Purchases</NavLink>
                        </NavItem>
                        <NavItem className="navlink">
                            <NavLink href="#" onClick={() => {
                                localStorage.removeItem("groce_user")
                            }}>Logout</NavLink>
                        </NavItem>
                    {/* </Dropdown> */}
                </Nav>
                {/* </Collapse> */}
            </Navbar>
        </div >
    )
                        }