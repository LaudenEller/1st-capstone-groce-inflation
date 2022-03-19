// This module will display the new purchase form

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllVendors } from "../json/ApiManger";
import { getAllVendorProducts } from "../json/ApiManger";
import TextField from '@material-ui/core/TextField';

// export a function that returns html for a form
export const PurchaseForm = () => {

    // Populates the vendor dropdown box
    const [vendors, setVendors] = useState([])

    // Populates the product dropdown box with products that match the selected vendor
    const [vendorProducts, setVendorProducts] = useState([])

    // Stores user input that will eventually get sent to Json
    const [purchase, setPurchase] = useState({})

    const history = useHistory()

    // GETs the vendors with userIds that match the current user's id
    useEffect(
        () => {
            fetch(`http://localhost:8088/vendors?userId=${parseInt(localStorage.getItem("groce_user"))}`)
                .then(r => r.json())
                .then((data) => {
                    setVendors(data)
                })},
        []
    )

    // Declare a useEffect that observes initial state of vendorProducts and invokes a fetch function from apiManager
    useEffect(
        () => { 
                getAllVendorProducts()
                .then((data) => {
                    setVendorProducts(data)
                })},
                []
    )

    // Declare a function that accepts an event as a parameter and builds a new object
    const recordPurchase = (event) => {
        // Add keys to the object that match the user input
        const newPurchase = {
            date: purchase.date,
            price: parseInt(purchase.price),
            productId: parseInt(purchase.productId),
            vendorId: parseInt(purchase.vendorId),
            userId: parseInt(localStorage.getItem("groce_user"))
        }


        // Use .prventDefault() to stop default event behaviour from the DOM
        event.preventDefault()

        // Post new object to Json
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }
        return fetch("http://localhost:8088/purchases", fetchOption)
            .then(history.push("/vendors"))
    }

    return (
        // Return a dropdown box that displays all the current user's vendors
        <form className="purchaseForm">
            <h2 className="purchaseForm_title">New Purchase</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="vendor">Vendor</label>
                    <select
                        required autoFocustype="text"
                        className="form-control"
                        onChange={(evt) => {
                            const copy = { ...purchase }
                            copy.vendorId = evt.target.value
                            setPurchase(copy)
                        }
                        }
                    ><option value="0">Choose Vendor...</option>
                        {vendors.map(vendor => <option value={vendor.id}>{vendor.name}</option>)}
                    </select>
                </div>
            </fieldset>
            {/* Return a select box for each vendorProduct with a vendor id that matches the user's chosen vendor */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="product">Product</label>
                    <select
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
                    </select>
                </div>
            </fieldset>
            {/* // Return an input field for purchase price */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price: </label>
                    <input
                        required autoFocus
                        type="int"
                        className="form-control"
                        placeholder="9.99"
                        onChange={
                            (evt) => {
                                const copy = { ...purchase }
                                copy.price = evt.target.value
                                setPurchase(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            {/* // Return a calendar to select purchase date */}
            <fieldset>
                <div>
                    <TextField
                    required autoFocus
                    className="calendar"
                    label="Choose purchase date"
                    type="date"
                    defaultValue="2022-03-18"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={
                        (evt) => {
                            const copy = { ...purchase }
                            copy.date = evt.target.value
                            setPurchase(copy)
                        }
                    }
                    />
                </div>
            </fieldset>
                    {/* Return a submit form button */}
            <button className="btn btn-primary" onClick={recordPurchase}>
                Record Purchase
            </button>
        </form>
    )
}
