import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import "./SideDrawer.css"
import { useHistory } from "react-router-dom";
import Popup from "../../Popup";
import { VendorForm } from "../../vendors/VendorForm"
import { DeleteVendorConfirmation } from "../../vendors/DeleteVendorForm";
import "animate.css"

export const SideDrawer = props => {
    const [vendors, setVendors] = useState([])
    const [deletedVendorId, setDeletedVendorId] = useState()
    const [vendorDeleted, setVendorDeleted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState(false)

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
        },
        []
    )

    useEffect(() => {
        if (vendorDeleted){ ToggleDeletePopup()
         Update()
     }},
     [vendorDeleted]
     )


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

    const history = useHistory()

    const DeleteVendor = (id) => {
        fetch(`http://localhost:8088/vendors/${id}`, {
            method: "DELETE"
        })
            .then(() => Update())
    }

    const Update = () => {
        fetch(`http://localhost:8088/vendors?userId=${parseInt(localStorage.getItem("groce_user"))}`)
            .then(r => r.json())
            .then((data) => {
                setVendors(data)
            })
    }

    const TogglePopup = () => {
        setIsOpen(!isOpen)
    }

    const ToggleDeletePopup = () => {
        setDeleteIsOpen(!deleteIsOpen)
    }

        const HandleVendorDelete = (id) => {
            setDeletedVendorId(id)
            ToggleDeletePopup()
        }

    const HandleVendorClick = (id) => {
        document.dispatchEvent(new CustomEvent("Vendor View Selected"))
        history.push(`/vendors/${id}`)
    }

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
                            return <li><Button className="vendorList-button" onClick={() => {HandleVendorDelete(vendor.id)}}>X</Button>
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