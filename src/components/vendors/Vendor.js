// This module displays a single vendor and all of the products they offer, it also allows the user to add/remove products

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllProducts, getAllVendorProducts } from "../json/ApiManger"


export const Vendor = () => {
    const [vendor, setVendor] = useState({})
    const { vendorId } = useParams()
    const [vendorProducts, setVendorProducts] = useState([])
    const [products, setProducts] = useState([])
    const [selectedProductId, setSelectedProductId] = useState()
    const [value, setValue] = useState(0)


    useEffect(
        () => {
            getAllProducts()
                .then((data) => {
                    setProducts(data)
                }
                )
        },
        []
    )

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
           if(typeof selectedProductId === "number") { AddVendorProduct()
            .then(() => { Update() })
        }},
        [selectedProductId]  // This useEffect runs when the value of vendorId changes
    )

    useEffect(
        () => {
            if (vendor.id) {
                fetch("http://localhost:8088/vendorProducts?_expand=product")
                .then(r => r.json())
                .then((data) => {
                    setVendorProducts(data.filter(vendorProduct => vendorProduct.vendorId === vendor.id))
                })
            }
        },
        [vendor] // Waiting because it needs the vendor id to filter the  vendorProduct response by
    )

    const Update = () => {
        getAllVendorProducts()
            .then((data) => {
                setVendorProducts(data.filter(vendorProduct => vendorProduct.vendorId === vendor.id))
            })
    }

    const DeleteVendorProduct = (id) => {
        fetch(`http://localhost:8088/vendorProducts/${id}`, {
            method: "DELETE"
        })
            .then(() => { Update() })
    }

    const AddVendorProduct = () => {

        const vendorProduct = {
            vendorId: vendor.id,
            productId: selectedProductId
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vendorProduct)
        }

        return fetch("http://localhost:8088/vendorProducts", fetchOption)
            .then(r => r.json())

    }
    return (
        <>
            <section className="vendor">
                <h3 className="vendor__name">{vendor.name}</h3>
                <p>Products</p>
                <ul>
                    {vendorProducts?.map((vendorProduct) => {
                        return <li key={`vendorProduct--${vendorProduct.id}`}>{vendorProduct.product.description}<button
                            onClick={() => DeleteVendorProduct(vendorProduct.id)}>-</button></li>
                    })}
                </ul>
                <div className="form-group">
                    <label htmlFor="product">Add a new product</label>
                    <select
                        required autofocustype="text"
                        className="form-control"
                        value={value}
                        onChange={(evt) => {
                            const copy = parseInt(evt.target.value)
                            setSelectedProductId(copy)
                            setValue(0)
                        }
                        }
                    ><option value="0">Add a new product</option>
                        {products?.map(product => <option key={product.id} value={product.id}>{product.description}</option>)}
                    </select>
                </div>
            </section>
        </>
    )
}