// This module will display a vendor form that will save a new vendor object to Json
import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import "./VendorForm.css"


// export a function that returns Jsx for a form
export const VendorForm = () => {

    // This useState stores the vendor information as the form is filled out and eventually sent to Json
    const [vendor, addVendors] = useState([])

    // Sends new vendor object to Json database and pushes the user to the homepage
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
            .then(document.dispatchEvent(new CustomEvent("New Vendor POSTed")))
    }

    return (


        <Form inline className="vendor-form">
            <FormGroup floating>
                <Input
                    id="vendor-name"
                    name="vendor-name"
                    placeholder="Name - Location"
                    type="text"
                    onChange={
                        (evt) => {
                            const copy = { ...vendor }
                            copy.name = evt.target.value
                            addVendors(copy)
                        }
                    }
                />
            </FormGroup>
            <FormGroup floating>
                <Input
                    id="vendorAddress"
                    name="address"
                    placeholder="Address"
                    type="text"
                    onChange={
                        (evt) => {
                            const copy = { ...vendor }
                            copy.address = evt.target.value
                            addVendors(copy)
                        }
                    }
                />
            </FormGroup>
            <Button className="add-vendor-button" onClick={() => AddNewVendor()}>
                Add Vendor
            </Button>
        </Form>
    )
}