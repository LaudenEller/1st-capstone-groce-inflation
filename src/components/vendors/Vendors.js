// This module will dsiplay a list of vendors
// AND this module will have a vendor pop-up window for editing a vendor
// This module will have a Add Vendor button that takes user to vendor form page

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/";
import { getAllVendors } from "../json/ApiManger";
import { Link } from "react-router-dom";


// Export a function that returns html for vendors list
export const VendorList = () => {
    // Initiatie state for vendors
    const [vendors, setVendors] = useState()
    
    // Update state from Json
    useEffect(
        () => {
            getAllVendors()
            .then((data) => {
                setVendors(data)
            }
            )
        },
        []
        )

        const history = useHistory()
      
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
                        <Link to={`/vendors/${vendor.id}`}>{vendor.name}</Link></li>})}
            </ul>

<button onClick={() => {
    history.push("/vendors/create")}}>Add Vendor</button>
    
    </>
)
}
}