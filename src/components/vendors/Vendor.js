// This module displays a single vendor and all of the products they offer, 
    // it also allows the user to assign products to a vendor
        // and returns an Add New Product button which sends the user to the New Product Form page

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Button, Input } from "reactstrap"
import Popup from "../Popup";
import "../Popup.css"
import { AddProduct } from "../products/ProductForm";
import "./Vendor.css"

export const Vendor = () => {
    // Initial state of the vendor this page displays info about
    const [vendor, setVendor] = useState({})
   
    // Initial route paramter to allow the DOM to display correct vendor page
    const { vendorId } = useParams()
   
    // Initial state for the list of products available from this vendor
    const [vendorProducts, setVendorProducts] = useState([])
   
    // Products are fetched and filtered by the current User Id in local storage
    const [products, setProducts] = useState([])
   
    // Saves the user input which = productId on the vendorProducts 
        // that are sent to Json when user assigns a new product to the vendor
    const [selectedProductId, setSelectedProductId] = useState()
   
    // Initial state for value of the Select Box 
        // that is reset once the Add New Product button is clicked 
    const [value, setValue] = useState(0)

    // Initialize state that is set by the togglePopup function which controls the opening/closing of the popup message
    const [isOpen, setIsOpen] = useState(false)

// GETs products from Json with userIds that match current user id
    useEffect(
        () => {
            fetch(`http://localhost:8088/products?userId=${localStorage.getItem("groce_user")}`)
            .then(r => r.json())
                .then((data) => {
                    setProducts(data)})
        },
        []
    )

    // Get the vendor object with a vendorId 
        // that matches the id in the route parameter
    useEffect(
        () => {
            fetch(`http://localhost:8088/vendors/${vendorId}`) 
                
                .then(r => r.json())
                .then((data) => {
                    setVendor(data)
                })
        },
        [vendorId]  // This useEffect runs when the value of vendorId changes which happens immediately
    )
    
    // This will send vendorProduct to Json once a selection in the dropdown box is made
    useEffect(
        () => {
           if(typeof selectedProductId === "number") { 
               AddVendorProduct()
        }},
        [selectedProductId]  
    )

// Once a vendor is copied to useState, fetch user's vendorProducts with ?_expand=product and filter by vendorId
    useEffect(
        () => {
            if (vendor.id) {
                fetch(`http://localhost:8088/vendorProducts?userId=${parseInt(localStorage.getItem("groce_user"))}&_expand=product`)
                .then(r => r.json())
                .then((data) => {
                    setVendorProducts(data.filter(vendorProduct => vendorProduct.vendorId === vendor.id))
                })
            }
        },
        [vendor] // Waiting because it needs the vendor id to filter the  vendorProduct response by
    )

const history = useHistory()

 // Declare a function that opens the popup by changing the isOpen state variable
 const togglePopup = () => {
    setIsOpen(!isOpen)
}

// resets the list of available products once one is removed or added
    const Update = () => {
        fetch(`http://localhost:8088/vendorProducts?userId=${parseInt(localStorage.getItem("groce_user"))}&_expand=product`)
                .then(r => r.json())
            .then((data) => {
                setVendorProducts(data.filter(vendorProduct => 
                    vendorProduct.vendorId === vendor.id))
            })
            .then(UpdateProducts())
    }

    const UpdateProducts = () => {
        fetch(`http://localhost:8088/products?userId=${localStorage.getItem("groce_user")}`)
            .then(r => r.json())
                .then((data) => {
                    setProducts(data)})
    }

    // This is invoked when user selects the - remove icon and deletes that object from Json
    const DeleteVendorProduct = (id) => {
        fetch(`http://localhost:8088/vendorProducts/${id}`, {
            method: "DELETE"
        })
            .then(() => { Update() })
    }

    // This function is invoked once a a selection in the dropdown box is made
        // and POSTs a vendorProduct to Json
    const AddVendorProduct = () => {

        const vendorProduct = {
            vendorId: vendor.id,
            productId: selectedProductId,
            userId: parseInt(localStorage.getItem("groce_user"))
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vendorProduct)
        }

        return fetch("http://localhost:8088/vendorProducts", fetchOption)
        .then(() => { Update() })

    }

    document.addEventListener(
        "New Product POSTed",
        (customEvent) => {
            Update()
            togglePopup()
        })

    
    return (
        <>
         {/* // Return a div containing the Popup function and a display message as the content for that function */}
         <div>
            {isOpen && <Popup
                handleClose={togglePopup}
                content={<AddProduct /> } />}
        </div>
       <section className="main-container-vendor">
        {/* // Returns a title, subtitle, a list of products that can be purchased from this vendor and a - remove icon for each */}
            <section className="vendor-container">
                <h3 className="vendor-name">{vendor.name}</h3>
                <div>Inventory</div>
                <ul className="vendorProduct-list">
                    {vendorProducts?.map((vendorProduct) => {
                        return <li key={`vendorProduct--${vendorProduct.id}`}><Button className="btn-deleteVendorProduct"
                        onClick={() => DeleteVendorProduct(vendorProduct.id)}>X</Button>{vendorProduct.product?.description}</li>
                    })}
                </ul>
                {/* // Return a select box that displays all the products available to the current user */}
                <div className="vendor-products">
                    <Input
                        required autofocustype="text"
                        id="vendorProduct-select"
                        name="select"
                        type="select"
                        className="form-control"
                        value={value}
                        onChange={(evt) => {
                            const copy = parseInt(evt.target.value)
                            setSelectedProductId(copy)
                            setValue(0)
                        }
                        }
                    ><option value="0">Add a product to inventory</option>
                        {products?.map(product => <option key={product.id} value={product.id}>{product.description}</option>)}
                    </Input>
                </div>
                {/* // Return a button that sends the user to the New Product page */}
                <Button className="btn-createProduct" onClick={() => togglePopup()}>Create New Product</Button>
            </section>
            </section>
        </>
    )
}