// This module will render a form that sends one product object and one vendorProduct object to Json
import { useEffect, useState } from "react";
import { getAllVendors } from "../json/ApiManger";
import { getAllProducts } from "../json/ApiManger";
import { useHistory } from "react-router-dom";
import Popup from "../Popup";
import "../Popup.css"
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";


export const AddProduct = () => {

    // Initialize state for products and vendors so the form that is returned can populate it's select boxes.
    const [vendors, setVendors] = useState([])
    const [products, setProducts] = useState([])

    // Initialize state for selectedVendorId that will be updated by user input and used by the POST vendorProduct function
    const [selectedVendorId, changeSelectedVendorId] = useState(0)

    // Initialize state for products that will be updated by user input and used by the POST product function
    const [newProduct, setNewProduct] = useState({})

    // Initialize state for productResponse that will be updated after the POST products function is invoked
    const [productResponse, setProductResponse] = useState({})

    // Initialize state that is set by the togglePopup function which controls the opening/closing of the popup message
    const [isOpen, setIsOpen] = useState(false)

    const history = useHistory()

    // useEffect(() => {
    //     getAllVendors()
    //         .then((data) => {
    //             setVendors(data.filter(vendor => vendor.userId === parseInt(localStorage.getItem("groce_user")
    //             )))})
    // },
    //     []
    // )

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

    // // Once the productResponse is updated with the POST product id from the response, 
    //     // AddVendorProduct POSTs a vendorProduct with a matching productId
    // useEffect(() => {

    //     if (productResponse.id) { AddVendorProduct() }
    // },
    //     [productResponse]
    // )

    // Declare a function that invokes the AddProduct function and accepts the event from the onClick 
    const updateJson = (event) => {

        event.preventDefault()

        AddProduct()
            // .then((data) => setProductResponse(data))
    }

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
        }
}

// Declare a function that sends the vendorProducts to Json and is invoked when the productResponse state is changed
// const AddVendorProduct = () => {

//     const vendorProduct = {
//         vendorId: parseInt(selectedVendorId),
//         productId: productResponse?.id,
//         userId: parseInt(localStorage.getItem("groce_user"))
//     }

//     const fetchOption = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(vendorProduct)
//     }

//     return fetch("http://localhost:8088/vendorProducts", fetchOption)
//         .then(() => togglePopup())
// }

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
        <Form className="productForm">
            <h2 className="productForm_title">New Product</h2>
            {/* // Return a dropdown box that displays all vendors */}
            {/* <FormGroup floating>
                    <Col sm={10}>
                    <Input
                        id="vendorSelect"
                        name="select"
                        type="select"
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
                    </Input>
                    </Col>
            </FormGroup> */}
            {/* // Return a text input field for the user to describe their new product */}
            <FormGroup floating>
                    
                    <Input
                    id="productField"
                    name="productField"
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Product"
                        onChange={
                            (evt) => {
                                const copy = { ...newProduct }
                                copy.description = evt.target.value
                                setNewProduct(copy)

                            }
                        }
                    />
                    <Label htmlFor="product-description">Product </Label>
            </FormGroup>
            <Button className="btn btn-primary" onClick={AddProduct}>
                Add Product
            </Button>
        </Form>
    </>
)
}