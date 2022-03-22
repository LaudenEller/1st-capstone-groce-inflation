import { React, useState } from "react";
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
    const [style, setStyle] = useState({ display: 'block' });

const handleClose = () => {
    setStyle({ display: 'none' })
}

const handleOpen = () => {
    setStyle({ display: 'block' });
}




    return (
        <div >
            <div 
                onMouseEnter={e => {
                    handleOpen()
                }}
                onMouseLeave={e => {
                    handleClose()
                }}
                >
                <Navbar light expand="md" style={style}>
                    <Nav className="navbar" navbar>
                        <NavItem className="navlink">
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
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
                    </Nav>
                </Navbar>
            </div>
        </div >
    )
}