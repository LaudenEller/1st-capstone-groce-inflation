// import { React, useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//     Navbar,
//     NavItem,
//     NavbarToggler,
//     Collapse,
//     Dropdown,
//     NavLink,
//     Nav,
//     NavbarBrand,
//     Button,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem
// } from 'reactstrap';
// import "./NavBar.css"
// import { getAllVendors } from "../json/ApiManger";
// import { useHistory } from "react-router-dom";
// import NavBrand from "../../NavBrand.png"
// import Popup from "../Popup";
// import "../Popup.css"
// import { VendorForm } from "../vendors/VendorForm";

// // export const NavBar = () => {
// //     return (
// //         <Navbar>
// //             <NavItem icon="Vendors" />
// //             <NavItem icon="Purchases" />
// //             <NavItem icon="Logout" />
// //             </Navbar>
// //     )
// // }

// // const Navbar = (props) => {
// //     return (
// //         <nav className="navbar">
// //             <ul className="navbar-nav">{props.children}</ul>
// //         </nav>
// //     )
// // }

// // const NavItem = (props) => {

// //     const [open, setOpen] = useState()

// //     return(
// //         <li className="nav-item">
// //             {/* Give this link a differetn className so it can be aligned left instead of right */}
// //             <NavLink href="/vendors" className="navLink-button" onClick={() => setOpen(!open)}>
// //             {props.icon}
// //             </NavLink>
// //             {open && props.children}
// //         </li>
// //     )
// // }

// // const Dropdown = () => {

// //     const DropdownItem = (props) => {

// //         return (
// //             // iterate over vendors and return a navLink for each
// //         <a href="#" className="menu-item">
// //         <span className="navLink-button">{props.leftIcon}</span>

// //             {props.children}

// //         <span className="navLink-button">{props.rightIcon}</span>
// //         </a>
// //             )
// //     }

// //     return (
// //         <div className="dropdown">
// //             <DropdownItem>My Profile</DropdownItem>
// //             <DropdownItem
// //             leftIcon={NavLink}>

// //             </DropdownItem>
// //         </div>
// //     )
// // }



// export const NavBar = ({handleClose, open }) => {

//     const [vendors, setVendors] = useState([])
//     const [isOpen, setIsOpen] = useState(false)
//     const [popIsOpen, setPopIsOpen] = useState(false)

//     const brand = NavBrand

//     const history = useHistory()
//     let vendorArray = []

//     useEffect(
//         () => {
//             fetch(`http://localhost:8088/vendors?userId=${localStorage.getItem("groce_user")}`)
//                 .then(r => r.json())
//                 .then((data) => {
//                     setVendors(data)
//                 })
//         },
//         []
//     )

//     useEffect(() => {
//         if (vendors.length > 1) {
//             for (const vendor of vendors) {
//                 vendorArray.push(
//                     <li>
//                     </li>
//                 )
//             }
//         }
//     },
//         [vendors]
//     )

//     // Declare a function that opens the popup by changing the isOpen state variable
//     const togglePopup = () => {
//         setPopIsOpen(!popIsOpen)
//     }

//     // const handleChange = (event: React.MouseEvent) => {
//     //     setSidebarState(!isOpened);
//     //     onChange && onChange(event, isOpened);
//     //   };
    
//     // styling so far
    

//     return (
//         <>
//             {/* // Return a div containing the Popup function and a display message as the content for that function */}
//             <div>
//                 {popIsOpen && <Popup
//                     handleClose={togglePopup}
//                     content={<VendorForm />} />}
//             </div>
//             {/* <div className="w-12 h-12 bg-red-700 ">
//   <button onClick={handleChange}>click me</button>
//   <div className={`h-screen mt-5 fixed z-10 left-0 w-max transition-all ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
//    {/* ... // content */}
//   {/* </div>
// </div>  */}
//             {/* <nav className={open ? "show_side_bar side_bar" : "side_bar"}>
//       <span onClick={handleClose}>X</span>
//       <div className="flex flex-row items-center">
// <img src="../NavBrand.png" alt="Groce' Inflation" />
// </div>
//       <ul>
//         <li className="subMenu navItem">
//         <a href="./purchases/create">Purchases</a>
//         </li>
//         <li className="navItem">
//         <a href="#" onClick={() => {
//                     localStorage.removeItem("groce_user")
//                 }}>Logout</a>
//         </li>
//         <li className="navItem">
//           <a href="/">Mission</a>
//         </li>
//         <li className="subMenu navItem">
//           <a href="/">About us</a>
//         </li>
//       </ul>
//     </nav> */}
           

           
           
           
           
           
//             {/* <header className="px-4 max-w-desktop mx-auto text-blacklight">

//             <nav
//           className="
//           flex
//           lg:flex-row
//           items-center
//           flex-auto
//           justify-between
//           lg:mx-auto
//           md:py-6
//           py-4
//           relative
//           navigation
//         "
//           id="navigation"
//         >
// <div className="vendor-link">
//     Vendors
// </div>
// <div className="flex flex-row items-center">
// <img src="../NavBrand.png" alt="Groce' Inflation" />
// </div>
// <ul 
// className="
// lg:flex lg:flex-row
// flex-col
// max-w-full
// lg:w-2/3
// mt-4
// lg:mt-0
// hidden
// lg:items-center
// justify-between
// flex-none
// "
// >
// <li className="menu-links">
//               <a href="./purchases/create">Purchases</a>
//             </li>
//             <li className="menu-links">
//               <a href="#" onClick={() => {
//                     localStorage.removeItem("groce_user")
//                 }}>Logout</a>
//             </li>
// </ul>
// <div className="lg:hidden">
//             <svg
//               className="w-8 h-8 lg:hidden"
//               id="hamburger"
//               onClick={() => setSidebar(true)}
//               fill="none"
//               stroke="#354650"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               ></path>
//             </svg>
//           </div>
//         </nav>
//             </header> */}
            
            
            
            
            
            
            
            
            
//             {/* <Navbar light expand="lg"> */}
//                 {/* <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
//                     <Collapse isOpen={isOpen} navbar>
//                        <Nav vertical navbar>
//                         {vendors.map(vendor => (
//                             <NavItem onClick={() => history.push(`/vendors/${vendor.id}`)}>{vendor.name}</NavItem>))}
//                     </Nav>
//                     </Collapse> */}
//                 {/* <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
//                     <DropdownToggle caret id="vendor-dropdown">
//                         Vendors
//                     </DropdownToggle>
//                     <DropdownMenu >
//                         {vendors.map(vendor => (
//                             <DropdownItem onClick={() => history.push(`/vendors/${vendor.id}`)}>{vendor.name}</DropdownItem>))}
//                         <DropdownItem onClick={() => togglePopup()}>Add Vendor</DropdownItem>
//                     </DropdownMenu>
//                 </Dropdown>
//                 <NavbarBrand href="/">
//                     <img
//                         alt=""
//                         src={brand}
//                         className="title-image" />
//                 </NavbarBrand>
//                 <NavLink className="navlink" id="purchase-link" href="/purchases/create">Purchases</NavLink>
//                 <NavLink className="navlink" id="logout-link" href="#" onClick={() => {
//                     localStorage.removeItem("groce_user")
//                 }}>Logout</NavLink>
//             </Navbar>
//         </> */}
//     )
// }