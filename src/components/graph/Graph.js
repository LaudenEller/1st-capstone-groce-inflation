// This module will display the home page
import React, { useState, useEffect } from "react"
import { getAllProducts, getAllPurchases } from "../json/ApiManger"
import "./Graph.css"

export const GraphIt = () => {

    // Initial state is needed in the returned ul of calculations using the current user's purchases
    const [purchases, setPurchases] = useState()
    const [products, setProducts] = useState()

    useEffect(() => {
        getAllPurchases()
            .then((data) => {
                setPurchases(data.filter(purchase => purchase.userId === parseInt(localStorage.getItem("groce_user"))))
            })
    },
        []
    )

    useEffect(() => {
        getAllProducts()
            .then((data) => {
                setProducts(data.filter(product => product.userId === parseInt(localStorage.getItem("groce_user"))))
            })
    },
        []
    )

    const productPurchaseArray = []

    // Iterate through products so we can search for matching purchases, 
        //and either print a message or push a copy of the purchase to the productPurchaseArray

    products?.map(product => {
        
        // This object will save the information needed to print the returned ul of strings
        const newObject = {
            firstPurchaseDate: "",
            lastPurchaseDate: "",
            productName: "",
            inflation: ""
        }

        // Notice the ?s anytime the app is looking at purchase things, sometimes a product has one or fewer purchases
            // WHAT IS THIS?.METHOD CALLED AGAIN??? CONDITIONAL SOMETHING....?
        const filteredPurchases = purchases?.filter(purchase => {
            return purchase.productId === product.id
        })
        if (filteredPurchases < 1) {

            console.log(`Current user has not purchased ${product.description}\(s\) yet`)

            // In order to get the inflation of a price, sort and isolate the oldest/newest purchase
        } else {
            const sortedPurchases = filteredPurchases?.sort((a, b) => b.date - a.date)
            const firstPurchase = sortedPurchases?.shift()
            const lastPurchase = sortedPurchases?.pop()

            // Copy the name and dates of a purchase
            newObject.productName = product.description
            newObject.firstPurchaseDate = firstPurchase?.date
            newObject.lastPurchaseDate = lastPurchase?.date
            
            // Copy a math calculation using the oldest/newest purchase prices
            newObject.inflation = Math.round(((parseFloat(lastPurchase?.price) - parseFloat(firstPurchase?.price)) / parseFloat(firstPurchase?.price)) * 100)



            productPurchaseArray.push(newObject)
        }
    })

    return (
        <div>
            <ul>
                {/* // Returns a string for every purchase on the array */}
                {productPurchaseArray.map(productPurchase => {
                    return <li>Between {productPurchase.firstPurchaseDate} and {productPurchase.lastPurchaseDate} the price of {productPurchase.productName}s inflated by {productPurchase.inflation}%</li>
                })}
            </ul>
            </div>
    )
}