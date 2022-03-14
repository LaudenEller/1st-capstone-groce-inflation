import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllVendorProducts } from "../json/ApiManger"


export const Vendor = () => {
    const [vendor, setVendor] = useState({})  // State variable for current vendor object
    const { vendorId } = useParams()  // Variable storing the route parameter
    const [vendorProducts, setVendorProducts] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/vendors/${vendorId}`) // Get the vendor object with a vendorId 
            // that matches the id in the route parameter
                .then(r => r.json())
                .then((data) => {
                    setVendor(data)})
            },
                    [vendorId]  // This useEffect runs when the value of vendorId changes
                )

            useEffect(
                () => {
                    getAllVendorProducts()
                        .then((data) => {
                        setVendorProducts(data)})
                },
                []
            
            )

            return (
                <>
                    <section className="vendor">
                        <h3 className="vendor__name">{vendor.name}</h3>
                        <p>Products</p>
                        <ul>
                            {vendorProducts.map((vendorProduct) => {
                                return <li key={`vendorProduct--${vendorProduct.id}`}>{vendorProduct.product.description}</li>
                            })}
                        </ul>
                    </section>
                </>
            )
        }