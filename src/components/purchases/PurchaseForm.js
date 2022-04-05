// This module will display the new purchase form

import React, { useState, useEffect } from "react";
import { getAllVendorProducts } from "../json/ApiManger";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import "./PurchaseForm.css"


// export a function that returns html for a form
export const PurchaseForm = () => {

    // Populates the vendor dropdown box
    const [vendors, setVendors] = useState([])

    // Populates the product dropdown box with products that match the selected vendor
    const [vendorProducts, setVendorProducts] = useState([])
    
    // Handles the form input state
    const [date, setDate] = useState()
    const [vendorId, setVendorId] = useState()
    const [productId, setProductId] = useState()
    const [price, setPrice] = useState()

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
            date: date,
            price: parseFloat(price),
            productId: parseInt(productId),
            vendorId: parseInt(vendorId),
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
    .then(setPrice(""))
    .then(setDate(""))
    .then(setVendorId(""))
    .then(setProductId(""))
    }

    return (
        // Return a dropdown box that displays all the current user's vendors
       <section className="main-container-purchaseForm">
       <div className="form-container">
           <div className="purchaseForm-title">
       <h2>Enter your receipt</h2>
       </div>
       <Form inline className="purchaseForm">
            <FormGroup floating>
                <Col sm={10}>
                    <Input
                        id="vendorSelect"
                        name="select"
                        type="select"
                        placeholder="Choose Vendor..."
                        required 
                        autoFocus
                        className="form-control"
                        value={vendorId}
                        onChange={(evt) => {
                            const copy = evt.target.value
                            setVendorId(copy)
                        }
                        }
                    >
                        <option value="0">Choose Vendor...</option>
                        {vendors.map(vendor => <option key={vendor.id} value={vendor.id}>{vendor.name}</option>)}
                    </Input>
                </Col>
            </FormGroup>
            {/* Return a select box for each vendorProduct with a vendor id that matches the user's chosen vendor */}
            <FormGroup floating>
                <Col sm={10}>
                    <Input
                        id="productSelect"
                        name="select"
                        type="select"
                        placeholder="Products..."
                        required 
                        autoFocus
                        className="form-control"
                        value={productId}
                        onChange={(evt) => {
                            const copy = evt.target.value
                            setProductId(copy)
                        }
                        }
                    ><option value={0}>Choose Product...</option>
                        {vendorProducts?.filter(vendorProduct =>
                            vendorProduct.vendorId === parseInt(vendorId)).map((vendorProduct) => {
                                return <option value={vendorProduct.productId}>{vendorProduct.product.description}</option>
                            })}
                    </Input>
                </Col>
            </FormGroup>
            {/* // Return a calendar to select purchase date */}
            <FormGroup floating>
    <Input
    required 
    autoFocus
    className="form-control"
      id="exampleDate"
      name="date"
      placeholder="date placeholder"
      type="date"
      value={date}
                        onChange={(evt) => {
                            const copy = evt.target.value
                            setDate(copy)
                        }
                        }
    /></FormGroup>
            {/* // Return an Input field for purchase price */}
            <FormGroup floating>
                <Input
                    required
                    autoFocus
                    id="purchasePrice"
                    name="purchasePrice"
                    placeholder="Price"
                    type="int"
                    className="form-control"
                    // placeholder="Price eg. 9.99"
                    value={price}
                        onChange={(evt) => {
                             const copy = evt.target.value
                            setPrice(copy)
                        }
                        }
                />
                {/* <Label className="price-label" htmlFor="purchasePrice">Price </Label> */}
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
