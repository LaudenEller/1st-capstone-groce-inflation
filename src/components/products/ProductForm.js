// This module will render a form that sends one product object and one vendorProduct object to Json
import { useEffect, useState } from "react";
import { getAllProducts } from "../json/ApiManger";
import { useHistory } from "react-router-dom";
import Popup from "../Popup";
import "../Popup.css"
import { Button, Form, FormGroup, Input } from "reactstrap";
import "./ProductForm.css"


export const AddProduct = () => {

    // Initialize state for products so the form that is returned can populate it's select boxes.
    const [products, setProducts] = useState([])

    // Initialize state for products that will be updated by user input and used by the POST product function
    const [newProduct, setNewProduct] = useState({})

    // Initialize state that is set by the togglePopup function which controls the opening/closing of the popup message
    const [isOpen, setIsOpen] = useState(false)


    // GET all the products from Json and filter them when saved to state by userIds that match the user id in local storage
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


    // Declare a function that opens the popup by changing the isOpen state variable
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }
    
    // Declare a function that sends the products to Json and is invoked when user clicks on the add product button
    const AddProduct = () => {
        
        // Use .find to compare the product.description that is saved to state with the product descriptions in Json
            // if the new object already exists, send a pop-up window that tells the user that product already exists
                // otherwise send the object to Json as a new product for the current user

        const foundProduct = products.find(product => product.description === newProduct.description)
       
        if (foundProduct) { togglePopup() }
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
                .then(() => {
                    document.dispatchEvent(new CustomEvent("New Product POSTed"))
                })
        }
}

// Return jsx for a form with input for product descriptions, 
// a dropdown box that allows the user to assign a product to a vendor and an add product button
return (
    <>
    {/* // Return a div containing the Popup function and a display message as the content for that function */}
        <div>
            {isOpen && <Popup
                handleClose={togglePopup}
                content={<div>
                    <h2>Hold On...</h2>
                    <p>This product already exists</p>
                </div>} />}
        </div>
        {/* Return a form with a title */}
        <Form className="product-form">
            {/* // Return a text input field for the user to describe their new product */}
            <FormGroup floating >
                    
                    <Input
                    name="product-field"
                        required autoFocus
                        type="text"
                        id="product-field"
                        placeholder="Product Name"
                        onChange={
                            (evt) => {
                                const copy = { ...newProduct }
                                copy.description = evt.target.value
                                setNewProduct(copy)

                            }
                        }
                    />
            </FormGroup>
            <Button className="vendor-button" onClick={AddProduct}>
                Create Product
            </Button>
        </Form>
    </>
)
}