// This module will display a new vendor form that will save new vendor object to Json

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// export a function that returns Jsx for a form
export const VendorForm = () => {

    const history = useHistory()

    // This useState stores the vendor information as the form is filled out and that is then sent to the API
    const [vendor, addVendors] = useState([])

    // Send new vendor object to Json database
    const AddNewVendor = () => {

        const newVendor = {
            // Add keys to the object that match the user input
            address: vendor.address,
            name: vendor.name,
            userId: parseInt(localStorage.getItem("groce_user"))
        }

        // Post new object to Json
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newVendor)
        }

        return fetch("http://localhost:8088/vendors", fetchOption)
            .then(r => r.json())
            .then(history.push("/vendors"))
    }

    return (
        <form className="vendorForm">
            <h2 className="vendorForm__title">New Vendor</h2>
            {/* // Return an input field for new vendor name */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={
                            (evt) => {
                                const copy = { ...vendor }
                                copy.name = evt.target.value
                                addVendors(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            {/* // Return an input field for new vendor address */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="123 Test St"
                        onChange={
                            (evt) => {
                                const copy = { ...vendor }
                                copy.address = evt.target.value
                                addVendors(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            {/* // Return a button that when clicked, sends the user input to the API */}
            <button className="btn btn-primary" onClick={AddNewVendor}>
                Add New Vendor
            </button>
        </form>
    )
}