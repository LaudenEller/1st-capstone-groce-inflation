import React from "react";
import { Route } from "react-router-dom";
import { GraphIt } from "./graph/Graph";
import { VendorList } from "./vendors/Vendors";
import { PurchaseForm } from "./purchases/PurchaseForm";
import { VendorForm } from "./vendors/VendorForm";
import { Vendor } from "./vendors/Vendor";
import { AddProduct } from "./products/ProductForm";
import { Purchases } from "./purchases/Purchases";


export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/">
            <GraphIt />
        </Route>
        <Route exact path="/vendors">
            <VendorList />
        </Route>
        <Route exact path="/purchases/create">
            <PurchaseForm />
        </Route>
        <Route exact path="/purchases">
            <Purchases />
        </Route>
        <Route exact path="/vendors/create">
            <VendorForm />
        </Route>
        <Route exact path="/vendors/:vendorId(\d+)">
            <Vendor />
        </Route>
        <Route exact path="/product">
            <AddProduct />
        </Route>
            </>
    )
}