import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, NavLink } from "reactstrap";
import { VendorList } from "../../vendors/Vendors";
import "./SideDrawer.css"
import { useHistory } from "react-router-dom";
import Popup from "../../Popup";
import { VendorForm } from "../../vendors/VendorForm"
import { DeleteVendorConfirmation } from "../../vendors/DeleteVendorForm";



// COMMENTED OUT CODE IS AN ATTEMPT AT DELETING ALL MATCHING VENDORPRODUCTS WHEN A VENDOR IS DELETED, 
// IS THERE A TIMING ISSUE IN THE CHAIN OF EVENTS???


// ADD LOGOUT BUTTON TO SIDEDRAWER


export const SideDrawer = props => {
    const [vendors, setVendors] = useState([])
    const [deletedVendorId, setDeletedVendorId] = useState()
    const [vendorDeleted, setVendorDeleted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState(false)
    // const [deletedVendorId, setDeletedVendorId] = useState("0")
    // const [vendorProducts, setVendorProducts] = useState()

    useEffect(
        () => {
            let cancel = false;
            fetch(`http://localhost:8088/vendors?userId=${localStorage.getItem("groce_user")}`)
                .then(r => r.json())
                .then((data) => {
                    if (cancel) return;
                    setVendors(data);
                });
            return () => {
                cancel = true;
            }
            // .then((data) => {
            //     setVendors(data)
            // })
        },
        []
    )

    const history = useHistory()


    // useEffect(
    //     () => {
    //         if (typeof deletedVendorId === "number") {
    //             GetVendorProducts(deletedVendorId)
    //         }
    //     },
    //     deletedVendorId
    // )

    const DeleteVendor = (id) => {
        // setDeletedVendorId(id)
        fetch(`http://localhost:8088/vendors/${id}`, {
            method: "DELETE"
        })
            .then(() => Update())
    }

    // const GetVendorProducts = (id) => {
    //     fetch(`http://localhost:8088/vendorProducts?userId=${parseInt(localStorage.getItem("groce_user"))}`)
    //         .then(r => r.json())
    //         .then((data) => {
    //             setVendorProducts(data.filter(vendorProduct =>
    //                 vendorProduct.vendorId === id))
    //         })
    //         .then(() => Update())
    // }

    const Update = () => {
        fetch(`http://localhost:8088/vendors?userId=${parseInt(localStorage.getItem("groce_user"))}`)
            .then(r => r.json())
            .then((data) => {
                setVendors(data)
            })
        // .then(() => DeleteVendorProducts)
    }

    // const DeleteVendorProducts = () => {
    //     for (const vendorProduct of vendorProducts) {
    //         DeleteVendorProduct(vendorProduct.id)
    //     }
    // }

    // const DeleteVendorProduct = (id) => {
    //     fetch(`http://localhost:8088/vendorProducts/${id}`, {
    //         method: "DELETE"
    //     })
    // }

    const TogglePopup = () => {
        setIsOpen(!isOpen)
    }

    const ToggleDeletePopup = () => {
        setDeleteIsOpen(!deleteIsOpen)
    }

    document.addEventListener(
        "New Vendor POSTed",
        (customEvent) => {
            Update()
            TogglePopup()
        })
    
        document.addEventListener(
            "Vendor Deleted",
        (customEvent) => {
           DeleteVendor(deletedVendorId)
           setVendorDeleted(!vendorDeleted)
        })

        useEffect(() => {
           if (vendorDeleted){ ToggleDeletePopup()
            Update()
        }},
        [vendorDeleted]
        )

        const HandleVendorDelete = (id) => {
            setDeletedVendorId(id)
            ToggleDeletePopup()
        }

    const HandleVendorClick = (id) => {
        document.dispatchEvent(new CustomEvent("Vendor View Selected"))
        history.push(`/vendors/${id}`)
    }

    // <nav className is either option a, or b, 
    // which could be many classes when utilizing []s and .join()
    let drawerClasses = 'sidedrawer'
    if (props.show) {
        drawerClasses = 'sidedrawer open'
    }

    return (
        <>
            <div>
                {isOpen && <Popup
                    handleClose={TogglePopup}
                    content={<VendorForm />} />}
            </div>
            <div>
                {deleteIsOpen && <Popup
                    handleClose={ToggleDeletePopup}
                    content={<DeleteVendorConfirmation />} />}
            </div>
            <nav className={drawerClasses}>
                <div className="myVendors-container">
                    <div className="myVendors-title">
                        <h3>My Vendors</h3>
                    </div>
                    <ul>
                        {vendors?.map(vendor => {
                            return <li><Button className="vendorList-button" onClick={() => {HandleVendorDelete(vendor.id)}}>-</Button>
                            <a onClick={() => HandleVendorClick(vendor.id)} key={vendor.id}>{vendor.name}</a></li>
                        })}
                    </ul>
                </div>
                <div className="sidedrawer-navigation-items">
                    <div className="add-vendor-container"><a href="#" onClick={() => TogglePopup()}><h3>Add Vendor</h3></a></div>
                    <div className="logout-container"><a href="#" onClick={() => { { localStorage.removeItem("groce_user") } }}><h3>Logout</h3></a></div>
                </div>
            </nav>
        </>
    )
}