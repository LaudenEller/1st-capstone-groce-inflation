// This module will dsiplay a list of vendors
// and this module will have links for viewing/editing any single vendor
// this module will have a Add Vendor button that takes user to vendor form page

// CURRENTLY ALLOWS USER TO DELETE A VENDOR FROM JSON
// COMMENTED OUT CODE IS AN ATTEMPT AT AUTOMATICALLY HAVING
// ALL MATCHING VENDOR PRODUCTS GET DELETED AS WELL

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/";
import { Link } from "react-router-dom";


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

                <h2>Vendor List</h2>

                <ul>
                    {vendors.map(
                        (vendor) => {
                            return <li key={`vendor--${vendor.id}`}>
                                <Link to={`/vendors/${vendor.id}`}>{vendor.name}</Link><button
                                // WHAT IS SHOWING UP IN DOM FOR DELETE FUNCTION IS NOT AN INTEGER
                                    onClick={() => DeleteVendor(vendor.id)}>-</button></li>
                        })}
                </ul>
                {/* <ul>
            {vendors.map(
                (vendor) => {
                    return <li key={`vendor--${vendor.id}`}>
                        <Link to={`/vendors/${vendor.id}`}>{vendor.name}</Link><button
                            onClick={() => (setDeletedVendorId(vendor.id))}>-</button></li>})}
            </ul> */}

{/* // Return a button that send user to the add new vendor form page */}
                <button onClick={() => {
                    history.push("/vendors/create")
                }}>Add Vendor</button>

            </>
        )
    }
}