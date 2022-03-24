// This module will display a vendor form that will save a new vendor object to Json

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, Form, FormGroup, Input, Label } from "reactstrap";

// export a function that returns Jsx for a form
export const VendorForm = () => {

    const history = useHistory()

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
            .then(history.push("/"))
    }

    return (


        <Form inline className="form">
            <FormGroup floating>
                <Input
                    id="vendorName"
                    name="vendorName"
                    placeholder="Vendor Name"
                    type="text"
                    onChange={
                        (evt) => {
                            const copy = { ...vendor }
                            copy.name = evt.target.value
                            addVendors(copy)
                        }
                    }
                />
                <Label for="vendorName">
                    Vendor Name
                </Label>
            </FormGroup>
            {' '}
            <FormGroup floating>
                <Input
                    id="vendorAddress"
                    name="address"
                    placeholder="Vendor Address"
                    type="text"
                    onChange={
                        (evt) => {
                            const copy = { ...vendor }
                            copy.address = evt.target.value
                            addVendors(copy)
                        }
                    }
                />
                <Label for="vendorAddress">
                    Vendor Address
                </Label>
            </FormGroup>
            {' '}
            <Button onClick={() => AddNewVendor()}>
                Add Vendor
            </Button>
        </Form>
    )
}