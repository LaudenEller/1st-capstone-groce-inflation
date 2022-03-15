// This module will display a new vendor form that will save new vendor, product, and vendorProduct objects to Json
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../json/ApiManger";

// export a function that returns Jsx for a form
export const VendorForm = () => {

    // Initiate useStates
    const [vendor, addVendors] = useState([])
    const [products, setProducts] = useState([])
    const [updatedProducts, setUpdatedProducts] = useState([])
    // Stores the response from the POST vendor function so vendorProducts can access the id
    const [vendorResponse, setVendorResponse] = useState({})
    // Stores a copy of the new products created in the addProducts function so vendorProducts can access the ids
    const [newProductArray, setNewProductArray] = useState([])
    const [newProductList, setProductList] = useState([
        { product: "" }
    ]) // newProductList is pre-loaded with an object because the form iterates over that array to build the input fields
    
    // These handle functions allow the user to add and remove input fields for products
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
    
    // updatedProducts changes when its' set function is invoked on line 61
    useEffect(
        () => {
            addVendorProducts()
        },
        [updatedProducts]
        )

    // Declare a string of function invocations within a .then() chain so the fetches are resolved before the next one begins

        // BELIEVE I CAN REMOVE THE SECOND GET PRODUCTS FUNCTION BECAUSE I NO LONGER NEED TO DO THE SECOND CHECK IN ADDVENDOR FUNCTION
    const updateJson = (event) => {
        
        // Stops the DOM from clearing the form
        event.preventDefault()
        
        // .THEN() FUNCTIONS ACCEPT AND INVOKE A CALLBACK FUNCTION
        addNewVendor()
            .then(setVendorResponse)
            .then(getAllProducts)
            .then(setProducts)
            .then(() => Promise.all(addProducts()))
            .then((data) => setNewProductArray(data))
            .then(getAllProducts)
            .then((data) => {
                setProducts(data)
                setUpdatedProducts(data)
            })
            .then(() => {console.log(newProductArray)})
        }

    // Send new vendor object to Json database
    const addNewVendor = () => {
        
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
    }
    // Checks to see if the new products from the form already exist in Json, 
        // and if not, sends new product objects to Json
    const addProducts = () => {
        // NEW PRODUCTS ARE BEING CREATED BUT THE CHECK IS NOT WORKING

        // Checks to see if the inputted products already exist in Json
        const checkProduct = () => {

            for (const product of products) {

                for (const newProduct of newProductList) {

                    if (product.description === newProduct.description && product.userId === parseInt(localStorage.getItem("groce_user"))) {
                        
                        return true
                    }
                }
            }
        }

        // Returns an array of Json responses (one for each POST products function)
        return newProductList.map(newProduct => {
            if (checkProduct === true) {
                console.log("product already exists in database")
            }
            else {
                const jsonProduct = {
                    description: newProduct.description,
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

    // ONLY SENDING ONE VENDORPRODUCT TO JSON
    const addVendorProducts = () => { 

        // for (const product of newProductArray) {
        for (const product of updatedProducts) {
            for (const newProduct of newProductArray) {
                        if (product.description === newProduct.product &&
                            product.userId === parseInt(localStorage.getItem("groce_user"))) {

                            const newVendorProduct = {
                                vendorId: vendorResponse.id,
                                productId: product.id,
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
                        }
                    }
                }
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