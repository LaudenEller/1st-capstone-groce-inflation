// This module will dsiplay a list of vendors
// and this module will have links for viewing/editing any single vendor
// this module will have a Add Vendor Button that takes user to vendor form page

// CURRENTLY ALLOWS USER TO DELETE A VENDOR FROM JSON
// COMMENTED OUT CODE IS AN ATTEMPT AT AUTOMATICALLY HAVING
// ALL MATCHING VENDOR PRODUCTS GET DELETED AS WELL

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./Vendors.css"


// Export a function that returns html for vendors list
export const VendorList = () => {

    // Initial state to display a list of vendors
    const [vendors, setVendors] = useState()

    // const [deletedVendorId, setDeletedVendorId] = useState()

    // GET vendors and filter for userIds that match the current user's id
    useEffect(
        () => {
            fetch(`http://localhost:8088/vendors?userId=${parseInt(localStorage.getItem("groce_user"))}`)
                .then(r => r.json())
                .then(setVendors)
        },
        []
    )


    // useEffect(
    //     () => {
    //        if(typeof deletedVendorId === "number") { DeleteVendorProducts()
    //     }},
    //     [deletedVendorId]
    //     )

    // const DeleteVendorProducts = () => {
    //     fetch(`http://localhost:8088/vendorProducts?vendorId=${deletedVendorId}`, {
    //         method: "DELETE"
    //     })
    //     .then(() => { DeleteVendor(deletedVendorId) })
    // }

    const history = useHistory()

    // WHAT IS SHOWING UP IN DOM FOR DELETE FUNCTION IS NOT AN INTEGER
    const DeleteVendor = (id) => {
        fetch(`http://localhost:8088/vendors/${id}`, {
            method: "DELETE"
        })
            .then(() => { Update() })
    }

    // Refreshes DOM
    const Update = () => {
        fetch(`http://localhost:8088/vendors?userId=${parseInt(localStorage.getItem("groce_user"))}`)
            .then(r => r.json())
            .then((data) => {
                setVendors(data)
            }
            )
    }

// allows DOM to display a message while Json fetches are happening
    if (vendors === undefined) {
        return <>Still loading...</>;
    }
    else {

        return (
            <>
<section className="vendorList_Section"></section>
                <div className="vendorList_Title">
                <h2>Vendor List</h2>
                </div>
                <div>
                <ul className="vendorList">
                    {vendors.map(
                        (vendor) => {
                            return <li key={`vendor--${vendor.id}`}><div className="vendor">
                                <Link to={`/vendors/${vendor.id}`}>{vendor.name}</Link>
                                <Button className="btn_Secondary"
                                    onClick={() => DeleteVendor(vendor.id)}>-</Button></div></li>
                        })}
                </ul>
                </div>
                {/* <ul>
            {vendors.map(
                (vendor) => {
                    return <li key={`vendor--${vendor.id}`}>
                        <Link to={`/vendors/${vendor.id}`}>{vendor.name}</Link><Button
                            onClick={() => (setDeletedVendorId(vendor.id))}>-</Button></li>})}
            </ul> */}

{/* // Return a Button that send user to the add new vendor form page */}
                <Button className="btn_Primary" onClick={() => {
                    history.push("/vendors/create")
                }}>Add Vendor</Button>

            </>
        )
    }
}