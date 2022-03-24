// CURRENTLY, THE HISTORY.PUSH AND FETCH THAT HAPPENS ON THE PURCHASES PAGE IS HAPPENING BEFORE THE POST NEW PURCHASE SO THE LIST PURCHASES
// THAT RENDERS DOESN'T INCLUDE THE NEWEST PURCHASE

// This module will display the new purchase form

import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { getAllVendorProducts } from "../json/ApiManger";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";

// export a function that returns html for a form
export const PurchaseForm = () => {

    // Populates the vendor dropdown box
    const [vendors, setVendors] = useState([])

    // Populates the product dropdown box with products that match the selected vendor
    const [vendorProducts, setVendorProducts] = useState([])

    // Stores user Input that will eventually get sent to Json
    const [purchase, setPurchase] = useState({})

    const history = useHistory()

    const exampleRef = useRef()

    // GETs the vendors with userIds that match the current user's id
    useEffect(
        () => {
            fetch(`http://localhost:8088/vendors?userId=${parseInt(localStorage.getItem("groce_user"))}`)
                .then(r => r.json())
                .then((data) => {
                    setVendors(data)
                })
        },
        []
    )

    // Declare a useEffect that observes initial state of vendorProducts and invokes a fetch function from apiManager
    useEffect(
        () => {
            getAllVendorProducts()
                .then((data) => {
                    setVendorProducts(data)
                })
        },
        []
    )

    // Declare a function that accepts an event as a parameter and builds a new object
    const recordPurchase = (event) => {
        // Add keys to the object that match the user Input
        const newPurchase = {
            date: purchase.date,
            price: parseFloat(purchase.price),
            productId: parseInt(purchase.productId),
            vendorId: parseInt(purchase.vendorId),
            userId: parseInt(localStorage.getItem("groce_user"))
        }

        // Post new object to Json
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }
        return fetch("http://localhost:8088/purchases", fetchOption)
    .then(history.push("/"))
    }

    return (
        // Return a dropdown box that displays all the current user's vendors
       <section className="main-container">
       <div className="form-container">
           <div className="purchaseForm-title">
       <h2>Enter your receipt</h2>
       </div>
       <Form inline className="purchaseForm">
            {/* <h2 className="purchaseForm_title">New Purchase</h2> */}
            {/* <FormGroup floating>
                <div className="form-group"> */}
            <FormGroup floating>
                <Col sm={10}>
                    <Input
                        id="vendorSelect"
                        name="select"
                        type="select"
                        placeholder="Choose Vendor..."
                        required autoFocustype="select"
                        className="form-control"
                        onChange={(evt) => {
                            const copy = { ...purchase }
                            copy.vendorId = evt.target.value
                            setPurchase(copy)
                        }
                        }
                    >
                        <option value="0">Choose Vendor...</option>
                        {vendors.map(vendor => <option key={vendor.id} value={vendor.id}>{vendor.name}</option>)}
                    </Input>
                    {/* <Label
                            for="vendorSelect"
                          sm={2}
                        >
                            Choose Vendor...
                        </Label> */}
                </Col>
            </FormGroup>
            {/* <select
                        required autoFocustype="text"
                        className="form-control"
                        onChange={(evt) => {
                            const copy = { ...purchase }
                            copy.vendorId = evt.target.value
                            setPurchase(copy)
                        }
                        }
                    ><option value="0">Choose Vendor...</option>
                        {vendors.map(vendor => <option key={vendor.id} value={vendor.id}>{vendor.name}</option>)}
                    </select> */}
            {/* <Label htmlFor="vendor">Vendor</Label> */}
            {/* </div>
            </FormGroup> */}
            {/* Return a select box for each vendorProduct with a vendor id that matches the user's chosen vendor */}
            <FormGroup floating>
                <Col sm={10}>
                    <Input
                        id="productSelect"
                        name="select"
                        type="select"
                        placeholder="Products..."
                        required autoFocustype="select"
                        className="form-control"
                        onChange={(evt) => {
                            const copy = { ...purchase }
                            copy.productId = evt.target.value
                            setPurchase(copy)
                        }
                        }
                    ><option value={0}>Choose Product...</option>
                        {vendorProducts?.filter(vendorProduct =>
                            vendorProduct.vendorId === parseInt(purchase.vendorId)).map((vendorProduct) => {
                                return <option value={vendorProduct.productId}>{vendorProduct.product.description}</option>
                            })}
                    </Input>
                    {/* <select
                        required autoFocustype="text"
                        className="form-control"
                        onChange={(evt) => {
                            const copy = { ...purchase }
                            copy.productId = evt.target.value
                            setPurchase(copy)
                        }
                        }
                    ><option value={0}>Products...</option>
                        {vendorProducts?.filter(vendorProduct =>
                            vendorProduct.vendorId === parseInt(purchase.vendorId)).map((vendorProduct) => {
                                return <option value={vendorProduct.productId}>{vendorProduct.product.description}</option>
                            })}
                    </select> */}
                </Col>
            </FormGroup>
            {/* // Return a calendar to select purchase date */}
            <FormGroup floating>
    <Input
    required autoFocus
    className="form-control"
      id="exampleDate"
      name="date"
      placeholder="date placeholder"
      type="date"
      onChange={
        (evt) => {
            const copy = { ...purchase }
            copy.date = evt.target.value
            setPurchase(copy)
        }
    }
    /></FormGroup>
            {/* // Return an Input field for purchase price */}
            <FormGroup floating>
                <Input
                ref={exampleRef}
                    required autoFocus
                    id="purchasePrice"
                    name="purchasePrice"
                    placeholder="Price"
                    type="int"
                    className="form-control"
                    // placeholder="Price eg. 9.99"
                    onChange={
                        (evt) => {
                            const copy = { ...purchase }
                            copy.price = evt.target.value
                            setPurchase(copy)
                        }
                    }
                />
                <Label className="price-label" htmlFor="purchasePrice">Price </Label>
            </FormGroup>
            {/* Return a submit form button */}
            <Button className="btn btn-primary" onClick={recordPurchase}>
                Record Purchase
            </Button>
        </Form>
        </div>
        </section>
    )
}
