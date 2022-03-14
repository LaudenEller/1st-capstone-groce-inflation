// This module will display a new vendor form that will save new vendor, product and vendorProduct objects to Json

// DO NOT KNOW WHY THE DEBUGGER CLEARS THE NETWORK WINDOW WHEN THE ADD VENDOR BUTTON IS CLICKED: NEED ACCESS TO SEE DATA!

import React, { useState, useEffect } from "react";
import { getAllProducts, getAllVendors } from "../json/ApiManger";
// import { VendorProducts } from "./VendorProducts";

// export a function that returns html for a form
export const VendorForm = () => {

    // Initiate useState
    const [vendor, addVendors] = useState([])
    const [products, setProducts] = useState([])
    const [newProductList, setProductList] = useState([
        { product: "" }
    ])

    const handleProductAdd = () => {
        setProductList([...newProductList, { product: "" }])
    }

    const handleProductRemove = (index) => {
        const list = [...newProductList]
        list.splice(index, 1)
        setProductList(list)
    }

    const handleProductChange = (e, index) => {
        const { name, value } = e.target
        const list = [...newProductList]
        list[index][name] = value
        setProductList(list)
    }

    // Save empty objects to module-scope variables for storing the object which comes back in the response from the post functions
    let productResponse = {}
    let vendorResponse = {}

    // Declare a string of function invocations within a .then chain so the fetches are resolved before the next one begins
    const updateJson = () => {

        addNewVendor()
            .then((newVendorResponse) => {
                newVendorResponse = vendorResponse
                getAllProducts()
                    .then((data) => {
                        setProducts(data)
                    })
            })
            .then(addProducts())
            .then((newProductResponse) => {
                newProductResponse = productResponse
                addVendorProducts()
            })
    }

    // Send new vendor object to Json database
    const addNewVendor = () => {
        const newVendor = {
            // Add keys to the object that match the user input
            address: vendor.address,
            name: vendor.name,
            userId: parseInt(localStorage.getItem("groce_user"))
        }
        // // Use .prventDefault() to stop default event behaviour from the DOM
        // event.preventDefault()

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
    }
    // NEW PRODUCTS ARE BEING CREATED BUT THE CHECK IS NOT WORKING
    const addProducts = () => {

        // CREATE CHECK TO SEE IF INPUTTED PRODUCTS ALREADY EXIST FOR CURRENT USER
        const checkProduct = () => {

            // ITERATE THROUGH DATA
            products.map(product => {
                // COMPARE NEW PRODUCT TO EXISTING DATABASE
                newProductList.map(newProduct => {
                    if (product.description === newProduct.product && product.userId === parseInt(localStorage.getItem("groce_user"))) {
                        // RETURN TRUE OR FALSE
                        return true
                    }
                })
            })
        }

        newProductList.map(newProduct => {
            if (checkProduct === true) {
                console.log("product exists")
            }
            // IF NOT, CREATE NEW PRODUCTS
            else {
                const jsonProduct = {
                    description: newProduct.product,
                    userId: parseInt(localStorage.getItem("groce_user"))
                }

                const fetchOption = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonProduct)
                }

                return fetch("http://localhost:8088/products", fetchOption)
                    .then(r => r.json())
            }
        })
    }

    // NEW VENDORPROdUCTS ARE BEING CREATED BUT THEY DO NOT HAVE THE CORRECT KEYS
    const addVendorProducts = () => {

        newProductList.map(() => {

            const newVendorProduct = {
                vendorId: vendorResponse.id,
                productId: productResponse.Id,
                userId: parseInt(localStorage.getItem("groce_user"))
            }


            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newVendorProduct)
            }

            return fetch("http://localhost:8088/vendorProducts", fetchOption)
        })

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
            {/* // Return input fields that can be added/removed for new products */}
            <fieldset>
                <div className="form-field">
                    <label htmlFor="vendorProduct">Product</label>
                    {newProductList.map((newProduct, index) => (
                        <div key={index} className="vendorProducts">
                            <div className="first-division">
                                <input name="product" type="text" id="product" required
                                    value={newProduct.description}
                                    onChange={(e) => handleProductChange(e, index)} />
                                {newProductList.length > 1 && (
                                    <button type="button" className="remove-btn"
                                        onClick={() => handleProductRemove(index)}>
                                        <span>-</span>
                                    </button>
                                )}
                                <div className="second-division">
                                    {newProductList.length - 1 === index && newProductList.length < 10 &&
                                        (
                                            <button type="button" className="add-btn"
                                                onClick={handleProductAdd}>
                                                <span>+</span>
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </fieldset>

            <button className="btn btn-primary" onClick={updateJson}>
                Add New Vendor
            </button>
        </form>
    )
}