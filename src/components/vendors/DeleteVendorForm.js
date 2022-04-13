import React from "react";
import { Button } from "reactstrap";
import "./DeleteVendorForm.css"

export const DeleteVendorConfirmation = () => {



    return (
        <>
        <p className="delete-message">Are you sure you want to delete this vendor?</p>
        <Button className="delete-button" onClick={() => document.dispatchEvent(new CustomEvent("Vendor Deleted"))}>Delete Vendor</Button>
        </>
    )
}