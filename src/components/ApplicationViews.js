import React from "react";
import { Route } from "react-router-dom";
import { GraphIt } from "./Graph";
import { VendorList } from "./vendors/Vendors";
import { PurchaseForm } from "./purchases/Purchases";
import { VendorForm } from "./vendors/VendorForm";


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
        <Route exact path="/vendors/create">
            <VendorForm />
        </Route>
            </>
    )
}