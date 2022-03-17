// This module will render a form that sends one product object and one vendorProduct object to Json
import { useEffect, useState } from "react";
import { getAllVendors } from "../json/ApiManger";
import { getAllProducts } from "../json/ApiManger";
import { useHistory } from "react-router-dom";
import Popup from "./Popup";
import "./Popup.css"


export const AddProduct = () => {

    // Get and update state for vendors
    const [vendors, setVendors] = useState([])

    const [products, setProducts] = useState([])

    // Initialize state for selectedVendor that will be updated by user input
    const [selectedVendorId, changeSelectedVendorId] = useState(0)

    // Initialize state for products that will be updated by user input
    const [newProduct, setNewProduct] = useState({})

    // Initialize state for productResponse that will be updated when the POST products function is invoked
    const [productResponse, setProductResponse] = useState({})

    // const [vendorValue, setVendorValue] = useState(0)

    const [productValue, setProductValue] = useState("")

    const [isOpen, setIsOpen] = useState(false)

    const history = useHistory()
    
    useEffect(() => {
        getAllVendors()
            .then(setVendors)
    },
        []
    )

    // GET all the products from Json that have a userId that match the user id in local storage
    useEffect(
        () => {
            getAllProducts()
                .then(
                    (data) => {
                        setProducts(data.filter(product => product.userId === parseInt(localStorage.getItem("groce_user"))))
                    }
                )
        },
        []
    )

    useEffect(() => {

        if (productResponse.id) { AddVendorProduct() }
    },
        [productResponse]
    )

    // Declare a function that invokes the AddProduct function and accepts the event from the onClick 
    const updateJson = (event) => {

        event.preventDefault()

        AddProduct()
            // Set the productResponse state to the response sent back from the POST product function so the AddVendorFunction can access the id
            .then((data) => setProductResponse(data))
    }

    // Declare a function that opens the popup by changing the isOpen state variable
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }
    // Iterate over the products from Json and compare the new object.description to the object the user is building
    // if it the new object already exists, send a pop-up window that tells the user that product already exists
    // otherwise send the object to Json

    // Declare a function that sends the products to Json and is invoked when user clicks on the add product button
    const AddProduct = () => {

        for (const product of products) {
            if (product.description === newProduct.description) {
                togglePopup()
                break
            }
            else {

                const jsonProduct = {
                    description: newProduct.description,
                    userId: parseInt(localStorage.getItem("groce_user")),
                    categoryId: 1,
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
        }
    }

    // Declare a function that sends the vendorProducts to Json and is invoked when the productResponse state is changed
    const AddVendorProduct = () => {

        const vendorProduct = {
            vendorId: parseInt(selectedVendorId),
            productId: productResponse?.id
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vendorProduct)
        }

        return fetch("http://localhost:8088/vendorProducts", fetchOption)
        .then(history.push("/vendors"))
        // .then(changeSelectedVendorId(0))
        // .then(setProductValue(""))
        // .then(setNewProduct({}))
    }
    // Return jsx for a form with input for product descriptions, 
    // a dropdown box that allows the user to assign a product to a vendor and a add product button
        
        return (
        <>
            <div>
                {isOpen && <Popup
                    handleClose={togglePopup}
                    content={<div>
                        <h2>Hold On...</h2>
                        <p>This product already exists</p>
                    </div>} />}
            </div>
            <form className="productForm">
                <h2 className="productForm_title">New Product</h2>
                {/* // Return a dropdown box that displays all vendors */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="vendor">Vendor</label>
                        <select
                            required autofocustype="text"
                            className="form-control"
                            value={selectedVendorId}
                            onChange={(evt) => {
                                const copy = evt.target.value
                                changeSelectedVendorId(copy)
                            }
                            }
                        ><option value="0">Assign A Vendor...</option>
                            {vendors?.map(vendor => <option key={vendor.id} value={vendor.id}>{vendor.name}</option>)}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="product-description">Product </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Product Description eg. 'Apple'"
                            onChange={
                                (evt) => {
                                    const copy = { ...newProduct }
                                    copy.description = evt.target.value
                                    setNewProduct(copy)

                                }
                            }
                        />
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={updateJson}>
                    Add Product
                </button>
            </form>
        </>
    )
}