import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, NavLink } from "reactstrap";
import { VendorList } from "../../vendors/Vendors";
import "./SideDrawer.css"
import { useHistory } from "react-router-dom";
import Popup from "../../Popup";
import { VendorForm } from "../../vendors/VendorForm"

// COMMENTED OUT CODE IS AN ATTEMPT AT DELETING ALL MATCHING VENDORPRODUCTS WHEN A VENDOR IS DELETED

export const SideDrawer = props => {
    const [vendors, setVendors] = useState([])
    const [isOpen, setIsOpen] = useState()
    // const [deletedVendorId, setDeletedVendorId] = useState("0")
    // const [vendorProducts, setVendorProducts] = useState()

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
            <nav className={drawerClasses}>
                <div className="sidedrawer-title">
                    Vendors
                </div>
                <ul>
                    {vendors?.map(vendor => {
                        return <li><Button onClick={() => DeleteVendor(vendor.id)}>-</Button><a onClick={() => history.push(`/vendors/${vendor.id}`)} key={vendor.id}>{vendor.name}</a></li>
                    })}
                    <li><div onClick={() => TogglePopup()}>Add Vendor</div></li>
                </ul>
            </nav>
        </>
    )
}