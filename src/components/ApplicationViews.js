import React from "react";
import { Route } from "react-router-dom";
import { LandingPage } from "./landingPage/LandingPage";
import { PurchaseForm } from "./purchases/PurchaseForm";
import { VendorForm } from "./vendors/VendorForm";
import { Vendor } from "./vendors/Vendor";
import { AddProduct } from "./products/ProductForm";
import { GraphInflation } from "./lineChart/LineChart";


export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/">
            <LandingPage />
        </Route>
        <Route exact path="/inflationchart">
            <GraphInflation />
        </Route>
        <Route exact path="/purchases/create">
            <PurchaseForm />
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