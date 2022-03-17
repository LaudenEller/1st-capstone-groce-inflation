// This module will display the home page
import React, { useState, useEffect } from "react"
import { getAllProducts, getAllPurchases } from "../json/ApiManger"
import "./Graph.css"

export const GraphIt = () => {

    const [purchases, setPurchases] = useState()
    const [products, setProducts] = useState()

    useEffect(() => {
        getAllPurchases()
            .then((data) => {
                setPurchases(data)
            })
    },
        []
    )

    useEffect(() => {
        getAllProducts()
            .then((data) => {
                setProducts(data)
            })
    },
        []
    )

    const productPurchaseArray = []

    products?.map(product => {
        const newObject = {
            firstPurchaseDate: "",
            lastPurchaseDate: "",
            productName: "",
            inflation: ""
        }

        const filteredPurchases = purchases.filter(purchase => {
            return purchase.productId === product.id
        })
        if (filteredPurchases < 1) {

            console.log(`Current uset has not purchased ${product.description} yet`)

        } else {
            const sortedPurchases = filteredPurchases.sort((a, b) => b.date - a.date)
            const firstPurchase = sortedPurchases.shift()
            const lastPurchase = sortedPurchases.pop()

            newObject.productName = product.description
            newObject.firstPurchaseDate = firstPurchase.date
            newObject.lastPurchaseDate = lastPurchase.date
            newObject.inflation = (parseFloat(lastPurchase.price) - parseFloat(firstPurchase.price) / parseFloat(firstPurchase.price)) * 100



            productPurchaseArray.push(newObject)
        }
    })

    return (
        <>
        <div>
        <h1 className="page_title">Groce' Inflation</h1>
        </div>
        <div>
            <ul>
                {productPurchaseArray.map(productPurchase => {
                    return <li>Between {productPurchase.firstPurchaseDate} and {productPurchase.lastPurchaseDate} the price of {productPurchase.productName}s inflated by {productPurchase.inflation}%</li>
                })}
            </ul>
            </div>
        </>
    )
}