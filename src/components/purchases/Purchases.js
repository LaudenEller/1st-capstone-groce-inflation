import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Purchases = () => {

    const [purchases, setPurchases] = useState()

    useEffect(() => {
        fetch('http://localhost:8088/purchases?_expand=product&_expand=vendor')
            .then(r => r.json())
            .then((data) => {
                setPurchases(data.filter(purchase => purchase.userId === parseInt(localStorage.getItem("groce_user"))))
            })
    },
        []
    )

    const history = useHistory()

    const DeletePurchase = (id) => {
        fetch(`http://localhost:8088/purchases/${id}`, {
            method: "DELETE"
        })
            .then(() => { Update() })
    }

    // Refreshes DOM
    const Update = () => {
        fetch('http://localhost:8088/purchases?_expand=product&_expand=vendor')
        .then(r => r.json())
        .then((data) => {
            setPurchases(data.filter(purchase => purchase.userId === parseInt(localStorage.getItem("groce_user"))))
        })
    }


    return (
        <>
            <div>
                <h2>Purchase List</h2>
            </div>
            <div>
                <ul>
                    {purchases?.map(
                        (purchase) => {
                            return <li key={`purchase--${purchase.id}`}>{purchase.product.description} from {purchase.vendor.name} for {purchase.price} on {purchase.date}<button
                                onClick={() => DeletePurchase(purchase.id)}>-</button></li>
                        })}
                </ul>
            </div>
            <button onClick={() => history.push("./purchases/create")}>Add Purchase</button>
        </>
    )
}