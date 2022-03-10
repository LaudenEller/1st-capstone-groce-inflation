// This module will display the new purchase form

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllVendors } from "../ApiManger";


// export a function that returns html for a form
export const PurchaseForm = () => {
    // Initiate useState for vendors
    const [vendors, addVendors] = useState([])

    // Initiate useState for vendorProducts
    const [vendorProducts, addVendorProducts] = useState([])
    
    // Initiate useState for vendorProducts
    const [purchase, addPurchase] = useState({})

    // Save useHistory to a local variable
    const history = useHistory()

    // Declare a useEffect that observes initial state of vendors and invokes a fetch function from apiManager
    useEffect(
        () => {
            getAllVendors()
                .then((data) => {
                    addVendors(data)
                }
                )
        },
        []
    )
    
    // Declare a useEffect that observes initial state of vendorProducts and invokes a fetch function from apiManager
    useEffect(
        () => {
            getAllVendorProducts()
                .then((data) => {
                    addVendorProducts(data)
                }
                )
        },
        []
    )

    // Declare a function that accepts an event as a parameter and builds a new object
    const recordPurchase = (event) => {
        // Add keys to the object that match the user input
        const newPurchase = {
            date: date.now(),
            price: 1,
            productId: 1,
            vendorId: 1,
            userId: 1
        }
    
    
    // Use .prventDefault() to stop default event behaviour from the DOM
    event.preventDefault

    // Post new object to Json
        const fetchOption = {
            metho: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }
        return fetch("http://localhost:8088/purchases", fetchOption)
        .then(history.push("/"))
    }

    return (
        // Return a dropdown box that displays all vendors
        <form className="purchaseForm">
                <h2 className="purchaseForm_title">New Purchase</h2>
                        {/* Return a dropdown box that displays that vendor's list of products */}
                <filedset>
                    <div className="form-group">
                        <label htmlFor="vendor">Vendor</label>
                        <select
                        required autoFocustype="text"
                        className="form-control"
                        onChange={(evt) => {
                            const copy = {...purchase}
                            copy.vendorId = evt.target.value
                            addPurchase(copy)
                        }
                    }
                    ><option value="0">Choose Vendor...</option>
                    {vendors.map(vendor => <option value={vendor.id}>{vendor.name}</option>)}
                    </select>
                    </div>
                    </filedset>
                    {/* Return a select box for each vendorProduct with a vendor id that matches the user's chose vendor */}
                <filedset>
                    <div className="form-group">
                        <label htmlFor="product">product</label>
                        <select
                        required autoFocustype="text"
                        className="form-control"
                        onChange={(evt) => {
                            const copy = {...purchase}
                            copy.productId = evt.target.value
                            addPurchase(copy)
                        }
                    }
                    ><option value="0">Products...</option>
                    {vendorProducts.map(vendorProduct => { if (vendorProduct.vendorId === purchase.vendorId) <option value={vendorProduct.id}>{vendorProduct.product.description}</option>})}
                    </select>
                    </div>
                    </filedset>
                    <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price: </label>
                    <input
                        required autoFocus
                        type="int"
                        className="form-control"
                        placeholder="9.99"
                        onChange={
                            (evt)=> {
                                const copy = {...purchase}
                                copy.price = evt.target.value
                                addPurchase(copy)
                            }
                        } 
                        />
                </div>
                {/* Return a submit form button */}
            </fieldset>
            <button className="btn btn-primary" onClick={recordPurchase}>
                Record Purchase
                </button>
                    </form>
    )
}
