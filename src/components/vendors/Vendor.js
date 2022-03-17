// This module displays a single vendor and all of the products they offer, it also allows the user to add/remove products

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllProducts, getAllVendorProducts } from "../json/ApiManger"


export const Vendor = () => {
    const [vendor, setVendor] = useState({})  // State variable for current vendor object
    const { vendorId } = useParams()  // Variable storing the route parameter
    const [vendorProducts, setVendorProducts] = useState([])
    const [products, setProducts] = useState([])

    // useEffect(
    //     () => {
    //         getAllProducts()
    //         .then((data) => {
    //             for (const vendorProduct of vendor.vendorProducts) {
    //             setProducts(data.filter(product => product.id === vendorProduct.id))
    //         }})
    //     }
    // )

    useEffect(
        () => {
            fetch(`http://localhost:8088/vendors/${vendorId}`) // Get the vendor object with a vendorId 
                // that matches the id in the route parameter
                .then(r => r.json())
                .then((data) => {
                    setVendor(data)
                })
        },
        [vendorId]  // This useEffect runs when the value of vendorId changes
    )

    useEffect(
        () => {
           if (vendor.id){ fetch("http://localhost:8088/vendorProducts?_expand=product")
           .then(r => r.json())
                .then((data) => {
                    setVendorProducts(data.filter(vendorProduct => vendorProduct.vendorId === vendor.id))
                })}
        },
        [vendor] // NEEDS TO WAIT UNTIL THE VENDOR STATE IS UPDATED BECAUSE IT NEEDS THE VENDOR ID TO KNOW WHICH VENDOR PRODUCTS TO GET FROM JSON
    )

    // const Update = () => {
    //     getAllVendorProducts()
    //         .then((data) => {
    //             setVendorProducts(data.filter(vendorProduct => vendorProduct.vendorId === vendor.id))
    //         })
    // }

    const DeleteVendorProduct = (id) => {
        fetch(`http://localhost:8088/vendorProducts/${id}`, {
            method: "DELETE"
        })
            // .then(() => { Update() })
    }

    return (
        <>
            <section className="vendor">
                <h3 className="vendor__name">{vendor.name}</h3>
                <p>Products</p>
                <ul>
                    {vendorProducts?.map((vendorProduct) => {
                        return <li key={`vendorProduct--${vendorProduct.id}`}>{vendorProduct.product.description}<button 
                        onClick={DeleteVendorProduct(vendorProduct.id)}>-</button></li>
                    })}
                </ul>
            </section>
        </>
    )
}